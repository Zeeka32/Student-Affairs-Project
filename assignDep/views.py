from django.shortcuts import render
from addForm.models import Student

# Create your views here.
def assign(req):
    query1 = req.GET.get("studID")
    query2 = req.GET.get("dept")
    obj = Student.objects.get(stud_ID=query1)
    if not query2:
        return render(req, 'search/Assign_dept.html', {"Student":obj})
    else:
        if query2 =="1":
            obj.department=Student.DEP_GENERAL
        elif query2 =="2":
            obj.department=Student.DEP_CS

        elif query2 =="3":
            obj.department=Student.DEP_IS

        elif query2 =="4":
            obj.department=Student.DEP_IT

        elif query2 =="5":
            obj.department=Student.DEP_AI
        
        elif query2 =="6":
            obj.department=Student.DEP_DS

        obj.save()
        return render(req, 'search/Search_Stud.html', {"Student":Student.objects.filter(status='Active')})