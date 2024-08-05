from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView

from .auth import JWTAuthentication

from .models import User
from .serializer import LoginSerializer, RegistrationSerializer, UserSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        context = self.get_queryset()
        serializer = self.serializer_class(context, many=True)
        users = {"data": serializer.data}
        return Response(users, status=status.HTTP_200_OK)



class RegistrationAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                "token": serializer.data.get("token", None),
            },
            status=status.HTTP_201_CREATED,
        )

class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data_response = {"data": serializer.data}

        return Response(data_response, status=status.HTTP_200_OK)

class TokenVerifyView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_data = {"data":{
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'surname':user.surname,
            'role': user.role,
            'work_mode': user.work_mode,
            'tell':user.tell
        }}

        return Response(user_data, status=status.HTTP_200_OK)


class UserUpdateInfo(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
class UserGetAPIView(APIView):
        def get(self, request, pk, *args, **kwargs):
            try:
               user_instance = User.objects.get(id=pk)
               serializer = UserSerializer(user_instance)
               user_data = {"data": serializer.data}
               return Response(user_data, status=status.HTTP_200_OK)
            except User.DoesNotExist:
               return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
