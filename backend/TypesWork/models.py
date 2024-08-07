from django.db import models

class TypeWorkModel (models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField(blank=True,default='')
    
    def __str__(self):
        return self.description

