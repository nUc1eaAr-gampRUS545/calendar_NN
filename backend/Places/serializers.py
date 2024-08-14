from rest_framework import serializers
from .models import PlaceModel

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceModel
        fields = '__all__'