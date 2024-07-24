from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
# from datetime import datetime, timedelta
# from django.utils import timezone
from django.conf import settings
from django.db import models
from django.core import validators
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission

from Organization.models import Organization
from Users.models import User

class ApplicationModel(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, max_length=255)
    surname = models.CharField(max_length=30, blank=False)
    start_date =models.DateTimeField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    tell = models.CharField(max_length=11,validators=[validators.validate_integer],
        unique=True,
        blank=False)
    createdUser = models.ForeignKey(User, related_name='application_createdUser', on_delete=models.CASCADE, default=1)
    responsiblePerson = models.ForeignKey(User, related_name='application_persons', on_delete=models.DO_NOTHING)
    organization = models.ForeignKey(Organization, related_name='application_orgs', on_delete=models.DO_NOTHING)
    groups = models.ManyToManyField(Group, related_name='application_customuser_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='application_customuser_set', blank=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} {self.surname}"
