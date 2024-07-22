
from django.utils import timezone
from django.db import models

class UploadedFile(models.Model):
    id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='uploads/')
    uploaded_on = models.DateField(auto_now_add=True)
    type = models.CharField(max_length=10,default='')
    
   
