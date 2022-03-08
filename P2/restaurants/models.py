# from django.contrib.auth.models import User
from ctypes import addressof
from os import POSIX_FADV_SEQUENTIAL
from unicodedata import name
from accounts.models import User
from django.db import models
from django.db.models import SET_NULL



class Restaurant(models.Model):
    owner = models.OneToOneField(to=User, on_delete=SET_NULL, null=True, related_name='restaurant')
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    #phone
    #logo

    #extra fields on restaurant page
    # description
    # num_likes
    # num_followers
    # num_blog_posts
    # num_comments
    # carousel_img
    # image_1
    # image_2
    # image_3
    # image_4
    

    def __str__(self):
        return self.name

class Notifications(models.Model):
    pass

class Comments(models.Model):
    pass

class RestaurantLikes(models.Model):
    pass
