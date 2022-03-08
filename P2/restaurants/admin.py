from django.contrib import admin

# Register your models here.
from restaurants.models import Restaurant, MenuItem, Notification, Comment, RestaurantLike

admin.site.register(Restaurant)
admin.site.register(MenuItem)
admin.site.register(Notification)
admin.site.register(Comment)
admin.site.register(RestaurantLike)
