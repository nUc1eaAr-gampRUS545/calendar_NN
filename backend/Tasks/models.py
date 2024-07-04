from django.db import models
from django.utils import timezone
from Users.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission

class TaskManager(BaseUserManager):

    def _create_task(self, title, description, user, role, work_mode, password=None, **extra_fields):
        if not title:
            raise ValueError('Указанное название задачи должно быть установлено')

        if not description:
            raise ValueError('Указанное описание задачи должна быть установлено')

        email = self.normalize_email(email)
        task = self.model(title= title, description=description, email=email, role=role, work_mode=work_mode, **extra_fields)
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

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
