from collections import UserList
from django.urls import path
from rest_framework import routers

from .views import FileUploadAPIView,FileRetrieveAPIView

router = routers.SimpleRouter()
urlpatterns = [
    path('', FileUploadAPIView.as_view(), name='task-list-create'),
    path('<int:pk>', FileRetrieveAPIView.as_view(), name='file-response'),
]
   