import json
from decimal import Decimal, InvalidOperation

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from BankProject.settings import connectDB, disconnectDB, sendResponse


@csrf_exempt
def dt_transaction(request):
    if request.method != "POST":
        return JsonResponse(sendResponse(request, 1001, [{"function": "dt_transaction"}]))

    try:
        payload = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(sendResponse(request, 1002, [{"function": "dt_transaction"}]))

    required_fields = ["action", "account_id", "to_account_number", "amount"]
    if not isinstance(payload, dict) or any(
        field not in payload or payload[field] in (None, "") for field in required_fields
    ):
        return JsonResponse(sendResponse(request, 1003, [{"function": "dt_transaction"}]))

    action = payload["action"]
    try:
        account_id = int(payload["account_id"])
        amount = Decimal(str(payload["amount"]))
    except (TypeError, ValueError, InvalidOperation):
        return JsonResponse(sendResponse(request, 400, [{"error": "Invalid account or amount"}], action))

    if account_id <= 0 or not amount.is_finite() or amount <= 0:
        return JsonResponse(sendResponse(request, 400, [{"error": "Amount must be greater than zero"}], action))

    recipient_number = str(payload["to_account_number"]).strip()
    description = str(payload.get("description") or "Ð”Ð°Ð½Ñ Ñ…Ð¾Ð¾Ñ€Ð¾Ð½Ð´Ñ‹Ð½ ÑˆÐ¸Ð»Ð¶Ò¯Ò¯Ð»ÑÐ³").strip()[:250]
    conn = None
    cur = None

    try:
        conn = connectDB()
        cur = conn.cursor()

        # Lock both accounts in a stable order so concurrent transfers cannot spend stale balances.
        cur.execute(
            """
            SELECT account_id, account_number, balance, currency
            FROM accounts
            WHERE account_number = %s OR account_id = %s
            ORDER BY account_number
            FOR UPDATE
            """,
            (recipient_number, account_id),
        )
        accounts = cur.fetchall()
        sender = next((row for row in accounts if row[0] == account_id), None)
        recipient = next((row for row in accounts if str(row[1]) == recipient_number), None)

        if sender is None or recipient is None:
            conn.rollback()
            return JsonResponse(sendResponse(request, 1004, [{"error": "Account not found"}], action))
        if sender[1] == recipient[1]:
            conn.rollback()
            return JsonResponse(sendResponse(request, 400, [{"error": "Cannot transfer to the same account"}], action))

        sender_balance = Decimal(str(sender[2]))
        recipient_balance = Decimal(str(recipient[2]))
        currency = sender[3] or "MNT"
        if (recipient[3] or "MNT") != currency:
            conn.rollback()
            return JsonResponse(sendResponse(request, 400, [{"error": "Account currencies do not match"}], action))
        if sender_balance < amount:
            conn.rollback()
            return JsonResponse(sendResponse(request, 400, [{"error": "Insufficient balance"}], action))

        new_sender_balance = sender_balance - amount
        new_recipient_balance = recipient_balance + amount
        cur.execute("UPDATE accounts SET balance = %s WHERE account_id = %s", (new_sender_balance, sender[0]))
        cur.execute("UPDATE accounts SET balance = %s WHERE account_id = %s", (new_recipient_balance, recipient[0]))

        cur.execute(
            """
            INSERT INTO transactions
                (account_id, default_account_id, secondary_account_id, amount, currency,
                 transaction_type, status, description, balance, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
            RETURNING transaction_id
            """,
            (sender[0], sender[1], recipient[1], amount, currency, "transfer_out", "completed", description, new_sender_balance),
        )
        transaction_id = cur.fetchone()[0]
        cur.execute(
            """
            INSERT INTO transactions
                (account_id, default_account_id, secondary_account_id, amount, currency,
                 transaction_type, status, description, balance, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
            """,
            (recipient[0], recipient[1], sender[1], amount, currency, "transfer_in", "completed", description, new_recipient_balance),
        )
        conn.commit()

        data = [{
            "transaction_id": transaction_id,
            "from_account_number": sender[1],
            "to_account_number": recipient[1],
            "amount": str(amount),
            "currency": currency,
            "balance": str(new_sender_balance),
            "status": "completed",
        }]
        return JsonResponse(sendResponse(request, 200, data, action))

    except Exception as error:
        if conn:
            conn.rollback()
        return JsonResponse(sendResponse(request, 1006, [{"error": str(error)}], action))
    finally:
        if cur:
            cur.close()
        if conn:
            disconnectDB(conn)
