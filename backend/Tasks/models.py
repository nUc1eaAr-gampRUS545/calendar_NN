from django.db import models
from django.utils import timezone
from Users.models import User
from Files.models import File
class Task(models.Model):
    title = models.CharField(max_length=255,default='')
    description = models.TextField(blank=True,default='')
    users = models.ManyToManyField(User, related_name='tasks')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    venue = models.CharField(max_length=255)
    importance = models.CharField(max_length=255)
    files = models.ManyToManyField(File, related_name='files',)

    def __str__(self):
        return self.title
