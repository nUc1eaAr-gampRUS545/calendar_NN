from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PlaceModel
from .serializers import PlaceSerializer

class PlaceListView(APIView):
    def get(self, request):
        try:
            exits = PlaceModel.objects.all()
            serializer = PlaceSerializer(exits, many=True)
            placesLMK = {"data":serializer.data}
            return Response(placesLMK,status=status.HTTP_200_OK)
        except PlaceModel.DoesNotExist:
            return Response({"detail": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
            

class PlaceGetAPIView(APIView):
        def get(self, request, pk, *args, **kwargs):
            try:
               place_instance = PlaceModel.objects.get(id=pk)
               serializer = PlaceSerializer(place_instance)
               place_data = {"data": serializer.data}
               return Response(place_data, status=status.HTTP_200_OK)
            except PlaceModel.DoesNotExist:
               return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)