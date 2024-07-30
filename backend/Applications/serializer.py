from django.db import IntegrityError
from rest_framework import serializers

from Applications.models import ApplicationModel

class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplicationModel
        fields = ['id', 'name', 'surname','organization', 'start_date','due_date','is_active']

    # def create(self, validated_data):
    #     phone = validated_data.get('phone')
    #     if ApplicationModel.objects.filter(phone=phone).exists():
    #         raise serializers.ValidationError({"phone": "This phone number already exists."})
    #     return super().create(validated_data)