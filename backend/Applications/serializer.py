from django.db import IntegrityError
from rest_framework import serializers

from Applications.models import ApplicationModel
from TypesWork.serializer import TypeWorkSerializer
from Users.serializer import UserSerializer
from Organization.serializer import OrganizationSerializer
from Places.serializers import PlaceSerializer

class ApplicationSerializer(serializers.ModelSerializer):
    types_works = TypeWorkSerializer(many=True, read_only=True, source='types_works_ids')
    created_user = UserSerializer(read_only=True, source='createdUser_id')
    responsible_person = UserSerializer(read_only=True, source='responsiblePerson_id')
    organization = OrganizationSerializer(read_only=True, source='organization_id')
    place = PlaceSerializer(read_only=True, source='place_id')
    zone_owner_person = UserSerializer(read_only=True, source='zone_owner')
    
    class Meta:
        model = ApplicationModel
        fields = [
            'id',
            'name',
            'surname',
            'organization',
            'start_date',
            'due_date',
            'created_user',
            'responsible_person',
            'created_at',
            'tell',
            'types_works',
            'is_completed',
            'zone_owner_approval',
            'security_approval',
            'contractor_supervisor_approval',
            'briefings',
            'place',
            'zone_owner_person'
        ]

    # def create(self, validated_data):
    #     phone = validated_data.get('phone')
    #     if ApplicationModel.objects.filter(phone=phone).exists():
    #         raise serializers.ValidationError({"phone": "This phone number already exists."})
    #     return super().create(validated_data)