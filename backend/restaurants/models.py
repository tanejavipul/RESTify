# from django.contrib.auth.models import User
from django.contrib.auth.models import User
from django.db import models
from django.db.models import SET_NULL, IntegerField, DateTimeField, CASCADE
from django.conf import settings
from phonenumber_field.modelfields import PhoneNumberField

class Restaurant(models.Model):
    owner = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete=CASCADE, null=True, related_name='restaurant')

    #fields required for adding new restaurant
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    postal = models.CharField(max_length=10)
    phone = PhoneNumberField(null=True)
    logo = models.ImageField(upload_to='Restaurants/Logo/', default='Restaurants/Logo/restaurant-logo.png', blank=False)

    #extra fields on restaurant page
    description = models.TextField(max_length=2000, blank=True)
    cover_img = models.ImageField(upload_to='Restaurants/Cover/', default='Restaurants/Cover/image.png', blank=True, null=True)
    carousel_img_1 = models.ImageField(upload_to='Restaurants/Carousel/', default='Restaurants/Carousel/image.png', blank=True, null=True)
    carousel_img_2 = models.ImageField(upload_to='Restaurants/Carousel/', default='Restaurants/Carousel/image.png', blank=True, null=True)
    carousel_img_3 = models.ImageField(upload_to='Restaurants/Carousel/', default='Restaurants/Carousel/image.png', blank=True, null=True)
    image_1 = models.ImageField(upload_to='Restaurants/Image/', blank=True, null=True)
    image_2 = models.ImageField(upload_to='Restaurants/Image/',  blank=True, null=True)
    image_3 = models.ImageField(upload_to='Restaurants/Image/',  blank=True, null=True)
    image_4 = models.ImageField(upload_to='Restaurants/Image/',  blank=True, null=True)
    

    def __str__(self):
        return self.name

class MenuItem(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True, related_name='menuitem')
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    price = models.FloatField()
    type = models.CharField(max_length=50)

class RestaurantNotification(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True, related_name='restaurantUpdate')
    title = models.CharField(max_length=200)
    last_modified = DateTimeField(auto_now=True,editable=True)
    type = models.CharField(max_length=200)
    type_id = models.IntegerField()
    def __str__(self):
        return str(self.id)+ ". Notification: " + '"'+ str(self.restaurant.name) +'"' + " - " + str(self.title)

class OwnerNotification(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True, related_name='ownerNotification')
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True, related_name='ownerNotification')
    title = models.CharField(max_length=200)
    last_modified = models.DateTimeField(auto_now=True)
    type = models.CharField(max_length=200)
    type_id = models.IntegerField()
    def __str__(self):
        return str(self.id)+ ". Notification: " + '"'+ str(self.restaurant.name) +'"' + " - " + str(self.title)


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

class Following(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=CASCADE, related_name='following')
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, related_name='followers')
    def __str__(self):
        return "User: " + str(self.user) + " - Follows - Restaurant: " +  str(self.restaurant)