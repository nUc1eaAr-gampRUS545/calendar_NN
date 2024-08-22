import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.db import models
from django.core import validators
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission

from Organization.models import Organization

class UserManager(BaseUserManager):

    def _create_user(self, name, surname, email, role, work_mode, password=None, **extra_fields):
        if not name:
            raise ValueError('Указанное имя пользователя должно быть установлено')

        if not surname:
            raise ValueError('Указанная фамилия пользователя должна быть установлено')

        if not email:
            raise ValueError('Данный адрес электронной почты должен быть установлен')

        email = self.normalize_email(email)
        user = self.model(name=name, surname=surname, email=email, role=role, work_mode=work_mode, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, name, surname, email, role, work_mode, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(name, surname, email, role, work_mode, password, **extra_fields)

    def create_superuser(self, name, surname, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Суперпользователь должен иметь is_staff=True.')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Суперпользователь должен иметь is_superuser=True.')

        return self._create_user(name, surname, email, 'admin', 'full-time', password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, max_length=255)
    surname = models.CharField(max_length=30, blank=False)
    tell = models.CharField(max_length=11,validators=[validators.validate_integer],
        unique=True,
        blank=False)
    organization = models.ManyToManyField(Organization, related_name='organizations')
    role = models.CharField(blank=False, max_length=255, default='user')
    work_mode = models.CharField(blank=False, max_length=255)
    email = models.EmailField(
        validators=[validators.validate_email],
        unique=True,
        blank=False
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',
        blank=True
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'surname']

    objects = UserManager()

    def __str__(self):
        return f"{self.name} {self.surname}"

    @property
    def token(self):
        return self._generate_jwt_token()

    def get_full_name(self):
        return f"{self.name} {self.surname}"

    def _generate_jwt_token(self):
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode({
            'id': self.pk,
            'exp':  dt.utcfromtimestamp(dt.timestamp()) 
        }, settings.SECRET_KEY, algorithm='HS256')

        return token
