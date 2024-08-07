from collections import UserList
from django.urls import path
from rest_framework import routers

from .views import TypesWorkCreate, TypesWorkList, TypeWorkSpecialList

router = routers.SimpleRouter()
urlpatterns = [
    path('', TypesWorkList.as_view(), name='types-list'),
    path("create-type/", TypesWorkCreate.as_view(), name='types-create'),
    path("get_list/", TypeWorkSpecialList.as_view(), name='types-get-list'),
]
   