from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import ApplicationModel
from .serializer import ApplicationSerializer

class ApplicationsListView(generics.ListAPIView):
    queryset = ApplicationModel.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

class ApplicationsCreateView(generics.CreateAPIView):
  queryset = ApplicationModel.objects.all()
  serializer_class = ApplicationSerializer
 # ermission_classes = [IsAuthenticated]


class ApplicationUpdateView(generics.UpdateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

class ApplicationDeleteView(generics.DestroyAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]