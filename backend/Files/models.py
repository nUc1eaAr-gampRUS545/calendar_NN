from django.db import models

from django.utils import timezone
from Users.models import User

class File(models.Model):
    title = models.CharField(max_length=255,default='')
    file = models.FileField(upload_to='uploads/')
    description = models.TextField(blank=True,default='')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

