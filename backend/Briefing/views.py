from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import BriefingModel
from .serializer import BriefingSerializer

class BriefingList(generics.ListAPIView):
    queryset = BriefingModel.objects.all()
    serializer_class = BriefingSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        context = self.get_queryset()
        serializer = self.serializer_class(context, many=True)
        brienfings = {"data": serializer.data}
        return Response(brienfings, status=status.HTTP_200_OK)

