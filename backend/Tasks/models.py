from django.db import models
from django.utils import timezone
from Users.models import User
from Files.models import UploadedFile
class Task(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255,default='')
    description = models.TextField(blank=True,default='')
    users = models.ManyToManyField(User, related_name='tasks')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    start_date =models.DateTimeField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    venue = models.CharField(max_length=255, blank=False)
    importance = models.CharField(max_length=255)
    files = models.ManyToManyField(UploadedFile, related_name='files', blank=False)

    def __str__(self):
        return self.title
