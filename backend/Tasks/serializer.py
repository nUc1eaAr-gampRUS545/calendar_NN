from django.utils import timezone
from rest_framework import serializers

from Users.serializer import UserSerializer
from Places.serializers import PlaceSerializer
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True, source='users_ids')
    place = PlaceSerializer(read_only=True, source='place_id')
    
    class Meta:
        model = Task
        fields = ['users','description', 'due_date','start_date', 'files', 'id', 'importance', 'is_completed', 'title','updated_at', 'place']
        read_only_fields = ['created_at']