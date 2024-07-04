from django.contrib import admin
from django.urls import include, path, re_path
from Users.views import *
from Users import routes

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include(routes)),
    path('api/v1/tasks',include(routes))
]