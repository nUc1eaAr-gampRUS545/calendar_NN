from collections import UserList
from django.urls import path
from rest_framework import routers

from .views import TaskDetailView, TaskListCreateView

router = routers.SimpleRouter()
urlpatterns = [
    path('', TaskListCreateView.as_view(), name='task-list-create'),
    path('<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
]
   