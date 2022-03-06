from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    avatar = models.ImageField(upload_to='Avatars/', null=True, blank=True)  # TODO change NULL to default Profile Pic
