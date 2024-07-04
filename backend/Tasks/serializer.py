from datetime import timezone
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=128, write_only=True)
    description = serializers.CharField(max_length=128, write_only=True)
    is_completed = serializers.BooleanField(default=False)
    created_at = serializers.DateTimeField(default=timezone.now)
    updated_at = serializers.DateTimeField(auto_now=True)
    due_date = serializers.DateTimeField(null=True, blank=True)
    user = serializers.CharField(max_length=128, write_only=True)
    title = serializers.CharField(max_length=128, write_only=True)

# class RegistrationSerializer(serializers.ModelSerializer):
   
#     password = serializers.CharField(
#         max_length=128,
#         min_length=8,
#         write_only=True,
#     )

#     # The client should not be able to send a token along with a registration
#     # request. Making `token` read-only handles that for us.
#     token = serializers.CharField(max_length=255, read_only=True)

#     class Meta:
#         model = User
#         fields = ('email', 'name','surname','role','work_mode', 'password', 'token',)

#     def create(self, validated_data):
#         return User.objects.create_user(**validated_data)

# class LoginSerializer(serializers.Serializer):
#     email = serializers.EmailField(write_only=True)
#     password = serializers.CharField(max_length=128, write_only=True)
#     token = serializers.CharField(max_length=255, read_only=True)
#     id = serializers.IntegerField(read_only=True)
 
#     def validate(self, data):
        
#         emailе:str = data.get('email')
#         password:str = data.get('password')

#         if not emailе:
#             raise serializers.ValidationError('An email address is required to log in.')

#         if not password:
#             raise serializers.ValidationError('A password is required to log in.')

#         user = authenticate(request=self.context.get('request'), username=emailе, password=password)

#         if not user:
#             raise serializers.ValidationError('Incorrect email or password.')

#         if not user.is_active:
#             raise serializers.ValidationError('This user has been deactivated.')

#         return {
#             'id':user.id,
#             'token': user.token,
#         }


