from django.contrib import admin

# Register your models here.
from restaurants.models import Restaurant, MenuItem, OwnerNotification, Comment, RestaurantLike, RestaurantUpdate

admin.site.register(Restaurant)
admin.site.register(MenuItem)
admin.site.register(OwnerNotification)
admin.site.register(Comment)
admin.site.register(RestaurantLike)
admin.site.register(RestaurantUpdate)
