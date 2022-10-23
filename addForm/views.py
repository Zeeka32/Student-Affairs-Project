from django.shortcuts import render
from .models import Student
from django.views.decorators.csrf import csrf_protect
# Create your views here.

@csrf_protect
def addFormMainView(request):
    return render(request, 'pages/add_stud.html')

@csrf_protect
def addData(request):
    Name = request.POST.get('name')
    Phone = request.POST.get('phone')
    Email = request.POST.get('email')
    StudID = request.POST.get('id')
    Gpa = request.POST.get('gpa')
    
    if request.POST.get('stat') == 'on':
        Status = 'Active'
    else:
        Status = 'Inactive'

    if request.POST.get('gender') == 'on':
        Gender = 'Male'
    else:
        Gender = 'Female'

    if request.POST.get('dep') == '1':
        Department = 'General'
    elif request.POST.get('dep') == '2':
        Department = 'Computer Science'
    elif request.POST.get('dep') == '3':
        Department = 'Information Systems'
    elif request.POST.get('dep') == '4':
        Department = 'Information Technology'
    elif request.POST.get('dep') == '5':
        Department = 'Artifical Intelligence'
    elif request.POST.get('dep') == '6':
        Department = 'Decision Support'
    else:
        Department = 'null'


    Date = request.POST.get('date')

    Level = request.POST.get('level')

    data = Student(name = Name, phone = Phone,email = Email,stud_ID = StudID,
    GPA = Gpa,status = Status, gender = Gender, department = Department, 
    date = Date, level = Level)
    
    if request.method == 'POST':
        data.save()

    return render(request, 'pages/add_stud.html')