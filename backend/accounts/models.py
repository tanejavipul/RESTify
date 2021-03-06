from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
#https://stackoverflow.com/questions/19130942/whats-the-best-way-to-store-phone-number-in-django-models

# Create your models here.
from django.db.models import CASCADE

# from restaurants.models import Restaurant
from restaurants.models import Restaurant


class User(AbstractUser):
    avatar = models.ImageField(upload_to='Avatars/', default='Avatars/avatar.png', blank=False)
    phone = PhoneNumberField(null=True, blank=True)

