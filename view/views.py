import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render
from addForm.models import Student
# Create your views here.
@csrf_protect
def view(request):
    return render(request, 'pages/View_stud.html', {'stud': Student.objects.all()})

@csrf_protect
def updateStatus(request):
    data = json.loads(request.body)
    obj = Student.objects.get(stud_ID = data['id'])
    if obj.status == 'Active':
        obj.status = 'Inactive'
    else:
        obj.status = 'Active'

    if request.method == 'POST':
        obj.save()
    return HttpResponse("Success")
