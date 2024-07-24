from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class TypeWorkModel (AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    description = models.TextField(blank=True,default='')
    
    def __str__(self):
        return self.description

