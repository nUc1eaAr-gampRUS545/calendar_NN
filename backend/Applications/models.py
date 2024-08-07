from django.utils import timezone
from django.db import models
from django.contrib.auth.models import Group, Permission
from Organization.models import Organization
from django.core import validators
from Users.models import User
from TypesWork.models import TypeWorkModel

class ApplicationModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, max_length=255)
    surname = models.CharField(max_length=30, blank=False)
    place = models.TextField(blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    tell = models.CharField(max_length=11,validators=[validators.validate_integer],
        unique=False,
        blank=False, default="79503495599")
    created_at = models.DateTimeField(default=timezone.now)
    createdUser_id  = models.ForeignKey(User, related_name='application_createdUser', on_delete=models.CASCADE,default=1)
    responsiblePerson_id = models.ForeignKey(User, related_name='application_persons', on_delete=models.CASCADE,default=1)
    organization_id = models.ForeignKey(Organization, related_name='application_orgs', on_delete=models.CASCADE, default=1)
    groups = models.ManyToManyField(Group, related_name='application_customuser_set', blank=True)
    types_works_ids = models.ManyToManyField(TypeWorkModel, related_name='type_work', blank=False,)
    user_permissions = models.ManyToManyField(Permission, related_name='application_customuser_set', blank=True)
    is_completed = models.BooleanField(default=False) 

    def __str__(self):
        return f'{self.name} {self.surname}'

