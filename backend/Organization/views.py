from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Organization
from .serializer import OrganizationSerializer

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
