from rest_framework import serializers

from Applications.models import ApplicationModel

class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplicationModel
        fields = ['id', 'name', 'surname','organization', 'start_date','due_date','is_active']