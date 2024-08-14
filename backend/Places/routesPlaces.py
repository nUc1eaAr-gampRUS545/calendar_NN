from collections import UserList
from django.urls import path
from rest_framework import routers

from .views import PlaceListView

router = routers.SimpleRouter()
urlpatterns = [
    path('', PlaceListView.as_view(), name='types-list'),
]