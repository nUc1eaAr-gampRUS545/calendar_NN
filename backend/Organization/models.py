from django.db import models
from django.utils import timezone
from Users.models import User  
from Tasks.models import Task

class Organization(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_organizations')
    members = models.ManyToManyField(User, related_name='organizations')
    tasks = models.ManyToManyField(Task, related_name='organizations')

    def __str__(self):
        return self.name

