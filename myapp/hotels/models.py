from django.db import models

# Create your models here.

class City(models.Model):
    name = models.CharField(max_length=50)
    def __unicode__(self):
        return self.name

class Hotel(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    email = models.EmailField(max_length=75)
    address = models.CharField(max_length=100)
    city = models.ForeignKey('City')
    image = models.FileField(upload_to='uploads', max_length=100)
    phone = models.CharField(max_length=40)
    date_from =  models.DateTimeField()
    date_thru =  models.DateTimeField()
    def __unicode__(self):
        return self.name

#admin.site.register(City, Hotel)

