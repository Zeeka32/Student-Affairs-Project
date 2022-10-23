from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_view, name='search'),
    path('searchActive/', views.search_for_active, name='searchActive'),
    path('searchAll/', views.search_for_all, name='searchAll'),
]