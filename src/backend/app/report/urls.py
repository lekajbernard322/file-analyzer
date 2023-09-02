from django.urls import path, include
from rest_framework.routers import DefaultRouter

from report import views

router = DefaultRouter()
router.register('', views.ReportViewSet)

app_name = 'report'

urlpatterns = [
    path('', include(router.urls))
]
