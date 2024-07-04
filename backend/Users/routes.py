from django.urls import path
from rest_framework import routers

from .views import LoginAPIView, RegistrationAPIView, TokenVerifyView, UserDeleteView, UserUpdateInfo,UserList

router = routers.SimpleRouter()
urlpatterns = [
    path('auth/register/', RegistrationAPIView.as_view(), name='register'),
    path('auth/login/', LoginAPIView.as_view(), name='login'),
    path('auth/token/', TokenVerifyView.as_view(),name="verify_token"),
    path('', UserList.as_view()),
    path('<int:pk>/', UserUpdateInfo.as_view(), name='user-update'),
    path('<int:pk>/', UserDeleteView.as_view(), name='user-delete'),
]