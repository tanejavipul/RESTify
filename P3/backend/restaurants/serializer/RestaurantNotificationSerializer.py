from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from restaurants.models import RestaurantNotification


class RestaurantNotificationSerializer(ModelSerializer):
    logo = serializers.ImageField(source='restaurant.logo')
    last_modified = serializers.DateTimeField(format="%a %B %d %Y, %I:%M%p")
    class Meta:
        model = RestaurantNotification
        fields = ['id', 'restaurant', 'title', 'last_modified', 'logo']
