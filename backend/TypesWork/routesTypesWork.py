from collections import UserList
from django.urls import path
from rest_framework import routers

from .views import TypesWorkList

router = routers.SimpleRouter()
urlpatterns = [
    path('', TypesWorkList.as_view(), name='types-list'),
]
   