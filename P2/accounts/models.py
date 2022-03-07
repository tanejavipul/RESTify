from django.db import models
from django.contrib.auth.models import AbstractUser
# from phonenumber_field.modelfields import PhoneNumberField
#https://stackoverflow.com/questions/19130942/whats-the-best-way-to-store-phone-number-in-django-models

# Create your models here.
class User(AbstractUser):
    avatar = models.ImageField(upload_to='Avatars/', null=True, blank=True)  # TODO change NULL to default Profile Pic
    # phone = PhoneNumberField()
