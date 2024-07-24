from rest_framework import serializers

from .models import BriefingModel

class BriefingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BriefingModel
        fields = ['id','title','description','title']
