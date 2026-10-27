import json
import secrets

from django.db import DatabaseError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from BankProject.settings import connectDB, sendResponse, disconnectDB


@csrf_exempt
def dt_forgotpassword(request):
    if request.method != "POST":
        return JsonResponse(
            sendResponse(request, 1001, [{"function": "dt_forgotpassword"}])
        )

    try:
        jsons = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            sendResponse(request, 1002, [{"function": "dt_forgotpassword"}])
        )

    if not isinstance(jsons, dict):
        return JsonResponse(
            sendResponse(request, 1002, [{"function": "dt_forgotpassword"}])
        )

    required_fields = ["action", "email"]

    if not all(
        field in jsons and jsons[field] is not None and str(jsons[field]).strip()
        for field in required_fields
    ):
        return JsonResponse(
            sendResponse(request, 1003, [{"function": "dt_forgotpassword"}])
        )

    action = jsons["action"]
    email = str(jsons["email"]).strip().lower()

    conn = None
    cur = None

    try:
        conn = connectDB()
        cur = conn.cursor()

        cur.execute(
            "SELECT account_id FROM users WHERE email = %s",
            (email,),
        )
        row = cur.fetchone()

        if not row:
            return JsonResponse(
                sendResponse(request, 400, [], action)
            )

        account_id = row[0]
        verification_code = f"{secrets.randbelow(1000000):06d}"

        cur.execute(
            """
            UPDATE users
            SET reset_code = %s,
                reset_code_expiry = NOW() + INTERVAL '15 minutes'
            WHERE account_id = %s
            """,
            (verification_code, account_id),
        )
        conn.commit()

        # Одоогийн код и-мэйлээр илгээх тохиргоогүй байна.
        # Иймээс кодыг response-д буцаахгүй.
        # SMTP тохируулсны дараа verification_code-ийг email-ээр илгээнэ.

        return JsonResponse(
            sendResponse(
                request,
                200,
                [{"email": email, "message": "Verification code created"}],
                action,
            )
        )

    except Exception as e:
        print("FORGOT PASSWORD ERROR:", repr(e))

        if conn:
            try:
                conn.rollback()
            except Exception:
                pass

        return JsonResponse(
            sendResponse(
                request,
                1006,
                [{"error": "Password reset request failed"}],
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


@csrf_exempt
def dt_verifyuser(request):
    if request.method != "POST":
        return JsonResponse(
            sendResponse(request, 1001, [{"function": "dt_verifyuser"}])
        )

    try:
        jsons = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            sendResponse(request, 1002, [{"function": "dt_verifyuser"}])
        )

    if not isinstance(jsons, dict):
        return JsonResponse(
            sendResponse(request, 1002, [{"function": "dt_verifyuser"}])
        )

    required_fields = ["action", "reset_code"]

    if not all(
        field in jsons and jsons[field] is not None and str(jsons[field]).strip()
        for field in required_fields
    ):
        return JsonResponse(
            sendResponse(request, 1003, [{"function": "dt_verifyuser"}])
        )

    action = jsons["action"]
    reset_code = str(jsons["reset_code"]).strip()

    conn = None
    cur = None

    try:
        conn = connectDB()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT account_id, email
            FROM users
            WHERE reset_code = %s
              AND reset_code_expiry > NOW()
            """,
            (reset_code,),
        )

        rows = cur.fetchall()

        if len(rows) != 1:
            return JsonResponse(
                sendResponse(request, 400, [], action)
            )

        account_id, email = rows[0]

        data = [{
            "account_id": account_id,
            "email": email,
            "verified": True,
        }]

        return JsonResponse(
            sendResponse(request, 200, data, action)
        )

    except Exception as e:
        print("VERIFY USER ERROR:", repr(e))

        return JsonResponse(
            sendResponse(
                request,
                1006,
                [{"error": "Verification failed"}],
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


@csrf_exempt
def dt_newpassword(request):
    if request.method != "POST":
        return JsonResponse(
            sendResponse(request, 1001, [{"function": "dt_newpassword"}])
        )

    try:
        jsons = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            sendResponse(request, 1002, [{"function": "dt_newpassword"}])
        )

    if not isinstance(jsons, dict):
        return JsonResponse(
            sendResponse(request, 1002, [{"function": "dt_newpassword"}])
        )

    required_fields = ["action", "account_id", "new_password"]

    if not all(
        field in jsons and jsons[field] is not None and str(jsons[field]).strip()
        for field in required_fields
    ):
        return JsonResponse(
            sendResponse(request, 1003, [{"function": "dt_newpassword"}])
        )

    action = jsons["action"]
    account_id = jsons["account_id"]
    new_password = str(jsons["new_password"])

    conn = None
    cur = None

    try:
        conn = connectDB()
        cur = conn.cursor()

        cur.execute(
            """
            UPDATE users
            SET passwordhash = %s,
                reset_code = NULL,
                reset_code_expiry = NULL
            WHERE account_id = %s
            """,
            (new_password, account_id),
        )

        if cur.rowcount == 0:
            conn.rollback()
            return JsonResponse(
                sendResponse(request, 400, [], action)
            )

        conn.commit()

        data = [{
            "account_id": account_id,
            "message": "Password reset successfully",
        }]

        return JsonResponse(
            sendResponse(request, 200, data, action)
        )

    except Exception as e:
        print("NEW PASSWORD ERROR:", repr(e))

        if conn:
            try:
                conn.rollback()
            except Exception:
                pass

        return JsonResponse(
            sendResponse(
                request,
                1006,
                [{"error": "Password reset failed"}],
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