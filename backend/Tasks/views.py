from rest_framework import generics, permissions
from .models import Task
from .serializer import TaskSerializer
from rest_framework import generics, permissions
from .models import Task
from .serializer import TaskSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Фильтруем задачи, связанные с текущим пользователем
        return Task.objects.filter(users=self.request.user)

    def perform_create(self, serializer):
        # Сохраняем задачу и добавляем текущего пользователя в ManyToManyField
        serializer.save()
        serializer.instance.users.add(self.request.user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Фильтруем задачи, связанные с текущим пользователем
        return Task.objects.filter(users=self.request.user)
