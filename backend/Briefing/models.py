from django.db import models
from django.db import models
from Files.models import UploadedFile
class BriefingModel(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255,default='')
    description = models.TextField(blank=True,default='')
    # users = models.ManyToManyField(User, related_name='tasks')
    files = models.ManyToManyField(UploadedFile, related_name='filesID', blank=False,)

    def __str__(self):
        return self.title
