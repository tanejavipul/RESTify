# from django.contrib.auth.models import User
from accounts.models import User
from django.db import models
from django.db.models import SET_NULL, IntegerField, DateTimeField, CASCADE


class Restaurant(models.Model):
    owner = models.OneToOneField(to=User, on_delete=SET_NULL, null=True, related_name='restaurants')
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    postal = models.CharField(max_length=10)
    #phone
    logo = models.ImageField(upload_to='Restaurant/Logo/', default='Restaurant/Logo/logo.png', blank=False)  # TODO change NULL to default Profile Pic

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

class MenuItem(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True, related_name='items')
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    price = models.FloatField()
    type = models.CharField(max_length=20)

class Notifications(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True, related_name='notifications')
    title = models.CharField(max_length=200)
    time = models.TimeField(auto_now=True)

class Comments(models.Model):
    user = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='comments')
    restaurant = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True, related_name='comments')
    comment = models.CharField(max_length=200)
    datetime = DateTimeField(auto_now=True)
    # def __str__(self):
    #     return str(self.user) + " commented " + str(self.restaurant)

class RestaurantLikes(models.Model):
    user = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='likes')
    restaurant = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True, related_name='likes')
    # def __str__(self):
    #     return str(self.user) + " liked " + str(self.restaurant)
