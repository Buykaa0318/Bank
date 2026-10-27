from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.db import DatabaseError
from .models import User


@require_GET
def dt_user(request):
    try:
        users = User.objects.all().values(
            "account_id",
            "email",
            "firstname",
            "lastname",
            "is_active",
            "created_at",
        )

        data = list(users)

        return JsonResponse({
            "resultCode": 0,
            "resultMessage": "success",
            "data": data,
            "dataSize": len(data),
        })

    except DatabaseError:
        return JsonResponse({
            "resultCode": 500,
            "resultMessage": "Database error",
            "data": [],
            "dataSize": 0,
        }, status=500)