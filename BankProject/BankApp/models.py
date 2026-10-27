from django.db import models


class User(models.Model):
    account_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    passwordhash = models.CharField(max_length=64)
    firstname = models.CharField(max_length=100, null=True, blank=True)
    lastname = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=50, default="active")
    created_at = models.DateTimeField(auto_now_add=True)
    reset_code = models.CharField(max_length=255, null=True, blank=True)
    reset_code_expiry = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "users"

    def __str__(self):
        return f"{self.firstname} {self.lastname} ({self.email})"