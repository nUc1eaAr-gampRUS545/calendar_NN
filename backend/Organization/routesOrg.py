from django.urls import path
from rest_framework import routers

from .views import OrganizationList

router = routers.SimpleRouter()
urlpatterns = [
    path('', OrganizationList.as_view(), name='organizations'),
   
]