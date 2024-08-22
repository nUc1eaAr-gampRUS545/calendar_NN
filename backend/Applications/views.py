from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated
from .models import ApplicationModel
from rest_framework.response import Response
from .serializer import ApplicationSerializer
from rest_framework.views import APIView

class ApplicationsListView(generics.ListAPIView):
    queryset = ApplicationModel.objects.all().select_related(
        'createdUser_id', 'responsiblePerson_id', 'organization_id', 'place_id', 'zone_owner'
    ).prefetch_related('types_works_ids')
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            context = self.get_queryset()
            serializer = self.serializer_class(context, many=True)
            applications = {"data": serializer.data}
            return Response(applications, status=status.HTTP_200_OK)
        except ApplicationModel.DoesNotExist:
            return Response({"detail": "Applications not found"}, status=status.HTTP_404_NOT_FOUND)
class ApplicationsCreateView(generics.CreateAPIView):
  queryset = ApplicationModel.objects.all()
  serializer_class = ApplicationSerializer
 # ermission_classes = [IsAuthenticated]


class ApplicationUpdateView(generics.UpdateAPIView):
    queryset = ApplicationModel.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

class ApplicationDeleteView(generics.DestroyAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    
class ApproveApplicationViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # def approve_contractor_supervisor(self, request, pk=None):
    #     application = ApplicationModel.objects.get(pk=pk)
    #     if request.user.has_perm('can_approve_contractor_supervisor'):  # Пример проверки прав
    #         application.contractor_supervisor_approval = True
    #         application.save()
    #         return Response({"status": "Approved by contractor supervisor"},status=status.HTTP_200_OK)
    #     return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
    
    def approve_zone_owner(self, request, pk=None,user_id=None):
        application = ApplicationModel.objects.get(pk=pk)
        if user_id == application.zone_owner:
            application.zone_owner_approval = True
            application.save()
            return Response({"status": "Approved by zone owner"}, status=status.HTTP_200_OK)
        
        return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
    
# class ApplicationGetAPIView(APIView):
#         def get(self, request, pk, *args, **kwargs):
#             try:
#                apl_instance = ApplicationModel.objects.get(id=pk)
#                serializer = ApplicationSerializer(apl_instance)
#                user_data = {"data": serializer.data}
#                return Response(user_data, status=status.HTTP_200_OK)
#             except ApplicationModel.DoesNotExist:
#                return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
