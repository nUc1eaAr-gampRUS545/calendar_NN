from django.utils import timezone
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    # title = serializers.CharField(max_length=128, write_only=True)
    # description = serializers.CharField(max_length=128, write_only=True)
    # is_completed = serializers.BooleanField(default=False)
    # created_at = serializers.DateTimeField(default=timezone.now)
    # updated_at = serializers.DateTimeField(auto_now=True)
    # due_date = serializers.DateTimeField(null=True, blank=True)
    # user = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = Task
        fields = ['description', 'due_date', 'files', 'id', 'importance', 'is_completed', 'title','updated_at', 'users', 'venue']
        read_only_fields = ['created_at']