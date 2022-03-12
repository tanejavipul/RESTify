# from django.contrib.auth.models import User
from django.contrib.auth.models import User
from django.db import models
from django.db.models import SET_NULL, IntegerField, DateTimeField, CASCADE
from django.conf import settings


class Restaurant(models.Model):
    owner = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete=CASCADE, null=True, related_name='restaurant')
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    postal = models.CharField(max_length=10)
    #phone
    logo = models.ImageField(upload_to='Restaurants/Logo/', default='Restaurant/Logo/logo.png', blank=False)  # TODO change NULL to default Profile Pic

    #extra fields on restaurant page
    description = models.TextField(max_length=2000, blank=True)
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

class MenuItem(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True, related_name='items')
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    price = models.FloatField()
    type = models.CharField(max_length=50)

class RestaurantNotification(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True, related_name='restaurantUpdate')
    title = models.CharField(max_length=200)
    last_modified = DateTimeField(auto_now=True,editable=True)

class OwnerNotification(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True, related_name='ownerNotification')
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True, related_name='ownerNotification')
    title = models.CharField(max_length=200)
    last_modified = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True, related_name='comments')
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True, related_name='comments')
    comment = models.CharField(max_length=200)
    datetime = DateTimeField(auto_now=True)
    def __str__(self):
        return "User:" + str(self.user) + " commented on Restaurant:" + str(self.restaurant) + " page"

class RestaurantLike(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True, related_name='likes')
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True, related_name='likes')
    def __str__(self):
        return "User:" + str(self.user) + " liked Restaurant:" + str(self.restaurant) + " page"
