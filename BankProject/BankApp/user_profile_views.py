import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from BankProject.settings import connectDB, disconnectDB, sendResponse


@csrf_exempt
def get_user_profile(request):
    if request.method != "POST":
        return JsonResponse(sendResponse(request, 1001, [{"function": "get_user_profile"}]))

    try:
        payload = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(sendResponse(request, 1002, [{"function": "get_user_profile"}]))

    if not isinstance(payload, dict) or payload.get("action") != "getProfile" or not payload.get("account_id"):
        return JsonResponse(sendResponse(request, 1003, [{"function": "get_user_profile"}]))

    try:
        account_id = int(payload["account_id"])
        if account_id <= 0:
            raise ValueError("Invalid account id")
    except (TypeError, ValueError):
        return JsonResponse(sendResponse(request, 400, [{"error": "Invalid account id"}], payload.get("action")))

    conn = None
    cur = None
    try:
        conn = connectDB()
        cur = conn.cursor()
        cur.execute(
            """
            SELECT account_id, email, firstname, lastname, created_at
            FROM users
            WHERE account_id = %s
            """,
            (account_id,),
        )
        row = cur.fetchone()
        if row is None:
            return JsonResponse(sendResponse(request, 1004, [], payload["action"]))

        data = [{
            "account_id": row[0],
            "email": row[1],
            "firstname": row[2],
            "lastname": row[3],
            "created_at": row[4].strftime("%Y-%m-%d %H:%M:%S") if row[4] else None,
        }]
        return JsonResponse(sendResponse(request, 200, data, payload["action"]))
    except Exception as error:
        return JsonResponse(sendResponse(request, 1006, [{"error": str(error)}], payload["action"]))
    finally:
        if cur:
            cur.close()
        if conn:
            disconnectDB(conn)
