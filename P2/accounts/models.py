from django.db import models
from django.contrib.auth.models import AbstractUser
# from phonenumber_field.modelfields import PhoneNumberField
#https://stackoverflow.com/questions/19130942/whats-the-best-way-to-store-phone-number-in-django-models

# Create your models here.
from django.db.models import SET_NULL


class User(AbstractUser):
    avatar = models.ImageField(upload_to='Avatars/', default='Avatars/avatar.png', blank=False)  # TODO change NULL to default Profile Pic
    # phone = PhoneNumberField()


#TODO ADDED THIS WHEN RESTAURANT MODEL IS CREATED
# class Following(models.Model):
#     user = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='user')
#     restuarant =  models.ForeignKey(to=Restaurant)

