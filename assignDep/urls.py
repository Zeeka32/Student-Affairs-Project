from django.urls import path
from . import views

urlpatterns = [
    path('assignDepartment/', views.assign, name='assignDept'),
]