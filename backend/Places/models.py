from django.db import models

# Create your models here.
class PlaceModel(models.Model):
    id = models.AutoField(primary_key=True)
    room_number = models.CharField(max_length=255,null=True)
    name = models.CharField(max_length=255,null=True)
    zone = models.CharField(max_length=144,null=True)
    quantity = models.IntegerField(null=True)
    type_of_place=models.CharField(max_length=30,null=True)
    frame = models.CharField(max_length=30,null=True)

    def __str__(self):
        return self.name