from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=11)
    email = models.EmailField(max_length=254)
    stud_ID = models.CharField(max_length=8, primary_key=True)
    GPA = models.DecimalField(max_digits=4, decimal_places=2)
    
    STATUS_ACTIVE = 'Active'
    STATUS_INACTIVE = 'Inactive'
    STATUS_CHOICES = [(STATUS_ACTIVE, 'Active'), (STATUS_INACTIVE, 'Inactive')]
    status = models.CharField(choices=STATUS_CHOICES, max_length=12)

    GENDER_MALE = 'Male'
    GENDER_FEMALE = 'Female'
    GENDER_CHOICES = [(GENDER_MALE, 'Male'), (GENDER_FEMALE, 'Female')]
    gender = models.CharField(choices=GENDER_CHOICES, max_length=8)

    DEP_GENERAL = 'General'
    DEP_CS = 'Computer Science'
    DEP_IT = 'Information Technology'
    DEP_IS = 'Information Systems'
    DEP_DS = 'Decision Support'
    DEP_AI = 'Artifical Intelligence'

    DEPARTMENT_CHOICES = [(DEP_GENERAL, 'General'), (DEP_CS, 'Computer Science'), (DEP_IT, 'Information Technology'), (DEP_IS, 'Information Systems'), (DEP_DS, 'Decision Support'), (DEP_AI, 'Artifical Intelligence')]
    department = models.CharField(choices=DEPARTMENT_CHOICES, max_length=25)

    date = models.DateField()

    LEVEL1 = 1
    LEVEL2 = 2
    LEVEL3 = 3
    LEVEL4 = 4
    LEVEL_CHOICES = [(LEVEL1, '1'), (LEVEL2, '2'), (LEVEL3, '3'), (LEVEL4, '4')]
    level = models.IntegerField(choices=LEVEL_CHOICES)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']