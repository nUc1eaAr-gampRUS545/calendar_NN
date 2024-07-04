from asyncio import Task
from flask import Response
from rest_framework.views import APIView

from .serializer import TaskSerializer

class GetFullTasksView(APIView):
    def get(self, request):
        queryset = Task.objects.all()
        serializer_for_queryset = TaskSerializer(
            instance=queryset, 
            many=True 
        )
        return Response(serializer_for_queryset.data)
