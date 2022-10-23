from django.urls import path
from . import views

urlpatterns = [
    path('', views.addFormMainView, name='addFormMainView'),
    path('addData', views.addData, name='addData'),
]