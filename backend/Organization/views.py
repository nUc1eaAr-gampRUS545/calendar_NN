from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status,permissions
from .models import Organization
from .serializer import OrganizationSerializer
from rest_framework.views import APIView

class OrganizationList(generics.ListAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        organizations = self.get_queryset()
        serializer = self.serializer_class(organizations, many=True)
        
        # Preparing the user_data dictionary
        org_data = {"data": serializer.data}
        
        return Response(org_data, status=status.HTTP_200_OK)

class OrganizationGetAPIView(APIView):
        def get(self, request, pk, *args, **kwargs):
            try:
               org_instance = Organization.objects.get(id=pk)
               serializer = OrganizationSerializer(org_instance)
               user_data = {"data": serializer.data}
               return Response(user_data, status=status.HTTP_200_OK)
            except Organization.DoesNotExist:
               return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
