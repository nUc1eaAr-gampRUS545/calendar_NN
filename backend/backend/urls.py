from django.contrib import admin
from django.urls import include, path, re_path
from Users.views import *
from Users import routesUser
from Tasks import routesTasks
from Organization import routesOrg
from Files import routesFile
from backend import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include(routesUser)),
    path('api/v1/tasks/',include(routesTasks)),
    path('api/v1/organizations/',include(routesOrg)),
    path('api/v1/files/',include(routesFile)),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)