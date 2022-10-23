from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render
from addForm.models import Student
import json

# Create your views here.
@csrf_protect
def main_view(req):
    return render(req,'editStudents/search_Edit.html', {'stud': Student.objects.all()})


@csrf_protect
def edit(request):
    query = request.GET.get('studID')
    try:
        obj = Student.objects.get(stud_ID = query)
    except Student.DoesNotExist:
        obj = None
    return render(request, 'editStudents/Edit_stud.html', {'stud': obj})

@csrf_protect
def update(request):
    if request.accepts('ajax'):
        data = json.loads(request.body)
        obj = Student.objects.get(stud_ID = data['old'])
        Name = data['name']
        Phone = data['phone']
        Email = data['email']
        StudID = data['id']
        Gpa = data['gpa']

        print(data['status'])
        if data['status'] == 'Active':
            Status = 'Active'
        else:
            Status = 'Inactive'

        if data['gender'] == 'Male':
            Gender = 'Male'
        else:
            Gender = 'Female'

        if obj != None:
            Department = obj.department
        else:
            Department = None

        Date = data['date']

        Level = data['level']

        student = Student(name = Name, phone = Phone,email = Email,stud_ID = StudID,
        GPA = Gpa,status = Status, gender = Gender, department = Department, 
        date = Date, level = Level)
        if obj != None:
            obj.delete()
            student.save()
    
    return HttpResponse("success")

@csrf_protect
def delete(request):
    data = json.loads(request.body)
    obj = Student.objects.get(stud_ID = data['old'])
    obj.delete()
    return HttpResponse("success")
