import json
import random
import string

from django.db import DatabaseError, transaction
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from BankProject.settings import connectDB, sendResponse, disconnectDB


@csrf_exempt
def dt_register(request):
    if request.method != "POST":
        return JsonResponse(
            sendResponse(request, 1001, [{"function": "dt_register"}])
        )

    try:
        jsons = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            sendResponse(request, 1002, [{"function": "dt_register"}])
        )

    if not isinstance(jsons, dict):
        return JsonResponse(
            sendResponse(request, 1002, [{"function": "dt_register"}])
        )

    required_fields = [
        "action",
        "email",
        "firstname",
        "lastname",
        "passwordhash",
    ]

    if not all(
        field in jsons and jsons[field] is not None and str(jsons[field]).strip()
        for field in required_fields
    ):
        return JsonResponse(
            sendResponse(request, 1003, [{"function": "dt_register"}])
        )

    action = jsons["action"]
    email = str(jsons["email"]).strip().lower()
    firstname = str(jsons["firstname"]).strip()
    lastname = str(jsons["lastname"]).strip()
    passwordhash = str(jsons["passwordhash"])

    conn = None
    cur = None

    try:
        conn = connectDB()
        cur = conn.cursor()

        cur.execute(
            "SELECT account_id FROM users WHERE email = %s",
            (email,),
        )

        if cur.fetchone():
            return JsonResponse(
                sendResponse(
                    request,
                    1008,
                    [{"message": "Email already exists"}],
                    action,
                )
            )

        chars = string.ascii_letters + string.digits
        account_token = "".join(random.choices(chars, k=20))
        balance = 100000000.00
        currency = "MNT"

        # User болон account-ийг нэг transaction-д үүсгэнэ.
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO users
                        (email, firstname, lastname, passwordhash, status, created_at)
                    VALUES (%s, %s, %s, %s, %s, NOW())
                    RETURNING account_id
                    """,
                    (
                        email,
                        firstname,
                        lastname,
                        passwordhash,
                        "active",
                    ),
                )

                account_id = cur.fetchone()[0]

                cur.execute(
                    """
                    INSERT INTO accounts
                        (account_id, balance, currency, created_at, account_token)
                    VALUES (%s, %s, %s, NOW(), %s)
                    RETURNING account_number
                    """,
                    (
                        account_id,
                        balance,
                        currency,
                        account_token,
                    ),
                )

                account_number = cur.fetchone()[0]

        data = [{
            "account_id": account_id,
            "account_number": account_number,
            "balance": balance,
            "currency": currency,
            "account_token": account_token,
        }]

        return JsonResponse(sendResponse(request, 200, data, action))

    except Exception as e:
        print("REGISTER ERROR:", repr(e))
        if conn:
            try:
                conn.rollback()
            except Exception:
                pass

        return JsonResponse(
            sendResponse(
                request,
                1006,
                [{"error": "Registration failed"}],
                action,
            )
        )

    finally:
        if cur:
            try:
                cur.close()
            except Exception:
                pass

        if conn:
            disconnectDB(conn)