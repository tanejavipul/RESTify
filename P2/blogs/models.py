from django.db import models

# Create your models here.
from django.db.models import SET_NULL

from accounts.models import User
from restaurants.models import Restaurant


class BlogPost(models.Model):
    user = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='blogpost')
    restaurant = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True, related_name='blogpost')
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    primary_photo = models.ImageField(upload_to='BlogPosts/photos/', blank=True)  # Allowing for no photos in blog post
    photo_1 = models.ImageField(upload_to='BlogPosts/photos/', blank=True)
    photo_2 = models.ImageField(upload_to='BlogPosts/photos/', blank=True)
    photo_3 = models.ImageField(upload_to='BlogPosts/photos/', blank=True)


class BlogLikes(models.Model):
    user = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='user')
    blog_post = models.ForeignKey(to=BlogPost, on_delete=SET_NULL, null=True, related_name='blogpost')
