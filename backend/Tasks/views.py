from flask import Response
from rest_framework import generics, permissions
from .models import Task
from rest_framework import status
from .serializer import TaskSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(users=self.request.user)

    def perform_create(self, serializer):
        serializer.save()
        serializer.instance.users.add(self.request.user)


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(users=self.request.user)
class TaskDeleteView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'pk'

    def delete(self, request, *args, **kwargs):
        user_id = kwargs.get('user')
        task_id = kwargs.get('pk')

        try:
            task = Task.objects.get(pk=task_id, users=user_id)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        task.delete()
        return Response(task,status=status.HTTP_204_NO_CONTENT)
