from django.shortcuts import render
# Create your views here.

def index(request):
    return render(request, 'pages/index.html')

def homepage(request):
    return render(request, 'pages/homepage.html')