from django.urls import path
from rest_framework import routers

from .views import ApplicationDeleteView,ApplicationsCreateView,ApplicationUpdateView, ApplicationsListView,ApproveApplicationViewSet

router = routers.SimpleRouter()
urlpatterns = [
    path('', ApplicationsListView.as_view(),),
    path('create_action/', ApplicationsCreateView.as_view(),),
    path('<int:pk>/', ApplicationDeleteView.as_view(),),
    path('update/<int:pk>/', ApplicationUpdateView.as_view(),),
    path('<int:user_id>/<int:pk>/', ApproveApplicationViewSet.as_view({'approve_zone_owner':'patch'}),),
]
   