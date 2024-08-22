from rest_framework import serializers

from .models import TypeWorkModel

class TypeWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeWorkModel 
        fields = '__all__'
