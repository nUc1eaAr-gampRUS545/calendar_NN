from django.urls import path
from rest_framework import routers

from .views import ApplicationsListView,ApplicationDeleteView,ApplicationsCreateView,ApplicationUpdateView

router = routers.SimpleRouter()
urlpatterns = [
    path('', ApplicationsListView.as_view(),),
    path('create_action/', ApplicationsCreateView.as_view(),),
    path('<int:pk>/', ApplicationDeleteView.as_view(),),
    path('<int:pk>/', ApplicationUpdateView.as_view(),),
]
   