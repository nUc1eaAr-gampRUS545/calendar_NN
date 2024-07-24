from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import ApplicationModel
from .serializer import ApplicationSerializer

class ApplicationsListView(generics.APIView):
    queryset = ApplicationModel.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

class ApplicationsCreateView(generics.CreateAPIView):
    queryset = ApplicationModel.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

class ApplicationUpdateView(generics.UpdateAPIView):
    queryset = ApplicationModel.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

class ApplicationDeleteView(generics.DestroyAPIView):
    queryset = ApplicationModel.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]