from django.urls import path
from rest_framework import routers

from .views import OrganizationList, OrganizationGetAPIView

router = routers.SimpleRouter()
urlpatterns = [
    path('', OrganizationList.as_view(), name='organizations'),
    path('<int:pk>/', OrganizationGetAPIView.as_view(), name='organization-response'),
   
]