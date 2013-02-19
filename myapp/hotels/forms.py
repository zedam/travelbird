#from django.utils import timezone
from django.db import models

class Hotel(models.Model):
    city = models.Charfield(max_length=75)
    date_from =  models.DateTimeField()
    date_thru =  models.DateTimeField()