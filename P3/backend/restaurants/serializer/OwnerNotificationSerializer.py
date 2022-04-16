from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from restaurants.models import OwnerNotification


class OwnerNotificationSerializer(ModelSerializer):
    last_modified = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = OwnerNotification
        fields = ['id', 'restaurant', 'title', 'last_modified']
