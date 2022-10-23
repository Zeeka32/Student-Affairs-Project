import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render
from addForm.models import Student

# Create your views here.
@csrf_protect
def main_view(request):
    return render(request,'search/Search_Stud.html', {"Student":Student.objects.filter(status='Active')})

@csrf_protect
def search_for_active(request):
    if request.accepts('ajax'):
        series = json.loads(request.body)
        query = Student.objects.filter(name__icontains=series['series']).filter(status='Active')

        if len(query) > 0 and len(series) > 0:
            data = []
            for pos in query:
                item = {
                    'name' : pos.name,
                    'phone' : pos.phone,
                    'email' : pos.email,
                    'stud_ID' : pos.stud_ID,
                    'GPA' : pos.GPA,
                    'status' : pos.status,
                    'department' : pos.department,
                    'date' : pos.date,
                    'level' : pos.level,
                }
                data.append(item)
            res = data
        else:
            if series == "":
                res = list(Student.objects.filter(status='Active').values())
            else:
                res = ""
        return JsonResponse({'data' : res})
    
    return JsonResponse({'data': Student.objects.filter(status='Active')})
    
@csrf_protect
def search_for_all(request):
    if request.accepts('ajax'):
        series = json.loads(request.body)
        query = Student.objects.filter(name__icontains=series['series'])

        if len(query) > 0 and len(series) > 0:
            data = []
            for pos in query:
                item = {
                    'name' : pos.name,
                    'phone' : pos.phone,
                    'email' : pos.email,
                    'stud_ID' : pos.stud_ID,
                    'GPA' : pos.GPA,
                    'status' : pos.status,
                    'department' : pos.department,
                    'date' : pos.date,
                    'level' : pos.level,
                }
                data.append(item)
            res = data
        else:
            if series == "":
                res = list(Student.objects.all().values())
            else:
                res = ""
        return JsonResponse({'data' : res})
    
    return JsonResponse({'data': Student.objects.all()})