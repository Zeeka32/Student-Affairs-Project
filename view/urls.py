from django.urls import path
from . import views

urlpatterns = [
    path('', views.view, name='view'),
    path('update/', views.updateStatus, name='update')
]