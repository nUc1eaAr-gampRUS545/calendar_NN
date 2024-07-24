from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView

from .models import TypeWorkModel
from .serializer import TypeWorkSerializer

class TypesWorkList(generics.ListAPIView):
    queryset = TypeWorkModel.objects.all()
    serializer_class = TypeWorkSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        context = self.get_queryset()
        serializer = self.serializer_class(context, many=True)
        types = {"data": serializer.data}
        return Response(types, status=status.HTTP_200_OK)
