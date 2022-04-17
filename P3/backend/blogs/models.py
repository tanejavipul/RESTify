from django.db import models

# Create your models here.
from django.db.models import CASCADE, DateTimeField

from accounts.models import User
from restaurants.models import Restaurant


class BlogPost(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE, null=True, related_name='blogpost')
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True, related_name='blogpost')
    title = models.CharField(max_length=100)
    description = models.TextField()
    primary_photo = models.ImageField(upload_to='Blogs/Post/', blank=True, null=True)  # Allowing for no photos in blog post
    photo_1 = models.ImageField(upload_to='Blogs/Post/', blank=True, null=True)
    photo_2 = models.ImageField(upload_to='Blogs/Post/', blank=True, null=True)
    photo_3 = models.ImageField(upload_to='Blogs/Post/', blank=True, null=True)
    last_modified = DateTimeField(auto_now=True, editable=True)


class BlogLike(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE, null=True, related_name='blogLikes')
    blog_post = models.ForeignKey(to=BlogPost, on_delete=CASCADE, null=True, related_name='bloglikes')
    def __str__(self):
        return "User:" + str(self.user) + " liked BlogPost:" + str(self.blog_post)
