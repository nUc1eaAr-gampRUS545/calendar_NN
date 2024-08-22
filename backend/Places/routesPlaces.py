from collections import UserList
from django.urls import path
from rest_framework import routers

from .views import PlaceListView,PlaceGetAPIView

router = routers.SimpleRouter()
urlpatterns = [
    path('', PlaceListView.as_view(), name='types-list'),
    path('<int:pk>/',PlaceGetAPIView.as_view())
]