from rest_framework import serializers
from django.contrib.auth import authenticate

from Organization.models import Organization
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'name', 'surname','organization', 'is_active']


class RegistrationSerializer(serializers.ModelSerializer):
   
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True,
    )
    token = serializers.CharField(max_length=255, read_only=True)
    organization = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Organization.objects.all(), write_only=True)

    class Meta:
        model = User
        fields = ('email',
                   'name',
                     'surname',
                       'role',
                         'work_mode',
                           'tell',
                             'organization',
                               'password',
                                 'token',
                                   'is_staff')

    def create(self, validated_data):
        organization = validated_data.pop('organization', '')
        user = User.objects.create_user(**validated_data)
        user.organization.set(organization)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)
    id = serializers.IntegerField(read_only=True)

    def validate(self, data):
        
        emailе:str = data.get('email')
        password:str = data.get('password')

        if not emailе:
            raise serializers.ValidationError('An email address is required to log in.')

        if not password:
            raise serializers.ValidationError('A password is required to log in.')

        user = authenticate(request=self.context.get('request'), username=emailе, password=password)

        if not user:
            raise serializers.ValidationError('Incorrect email or password.')

        if not user.is_active:
            raise serializers.ValidationError('This user has been deactivated.')

        return {
            'id':user.id,
            'token': user.token,
        }


