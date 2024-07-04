from collections import UserList
from django.urls import path
from rest_framework import routers

from .views import GetFullTasksView

router = routers.SimpleRouter()
urlpatterns = [
    path('', GetFullTasksView.as_view(), name='full_tasks'),]
   
   