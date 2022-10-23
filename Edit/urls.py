from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_view, name='edit'),
    path('Edit_Student_data/', views.edit, name='editdata'),
    path('delete/', views.delete, name="delete"),
    path('update/', views.update, name= 'update'),
]