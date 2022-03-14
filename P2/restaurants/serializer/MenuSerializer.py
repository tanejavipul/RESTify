from django.shortcuts import get_object_or_404
from rest_framework import serializers, request, status
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.serializers import ModelSerializer

from restaurants.models import MenuItem, Restaurant, OwnerNotification
from restaurants.views import NotificationSelector as NS


class MenuSerializer(ModelSerializer):

    class Meta:
        model = MenuItem
        fields = ['restaurant', 'name', 'description', 'price', 'type', 'notificationAdded']


class EditMenuSerializer(ModelSerializer):

    notification = ''
    notificationAdded = serializers.SerializerMethodField('notification_added')

    name = serializers.CharField(max_length=50, required=False)
    description = serializers.CharField(max_length=100, required=False)
    price = serializers.FloatField(required=False)
    type = serializers.CharField(max_length=50, required=False)

    class Meta:
        model = MenuItem
        fields = ['restaurant', 'name', 'description', 'price', 'type', 'notificationAdded']

    def notification_added(self, obj):
        if self.notification == '':
            return False
        return {'message': self.notification.title}

    def update(self, instance, validated_data):
        user = self.context['request'].user

        rest_id = MenuItem.objects.get(id=self.context['menu_item_id']).restaurant_id
        restaurant = Restaurant.objects.get(id=rest_id)

        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.type = validated_data.get('type', instance.type)

        instance.save()

        # create new notification for updating menu item
        message = NS.getRestaurantNotificationTitle(NS.MENU, restaurant)
        self.notification = OwnerNotification.objects.create(restaurant=restaurant, user=user, title=message)
        self.notification.save()

        if self.notification:
            self.notificationAdded = True
            return instance

        return instance


class AddMenuSerializer(ModelSerializer):

    notification = ''
    notificationAdded = serializers.SerializerMethodField('notification_added')

    class Meta:
        model = MenuItem
        fields = ['restaurant', 'name', 'description', 'price', 'type', 'notificationAdded']

    def notification_added(self, obj):
        if self.notification == '':
            return False
        return {'message': self.notification.title}

    def validate(self, attrs):
        if attrs['price'] < 0:
            raise serializers.ValidationError({"Error": "Menu Item prices must be 0 or more"})

        return attrs

    def create(self, validated_data):
        user = self.context['request'].user
        restaurant = self.context['restaurant']
        owner_id = restaurant.owner_id

        try:
            restaurant = Restaurant.objects.get(owner_id=user.id)
        except:
            return Response({'Error': "Not an owner of a restaurant"}, status=status.HTTP_400_BAD_REQUEST)

        menu_item = MenuItem.objects.create(
            restaurant_id=owner_id, **validated_data
        )

        # create new notification for updating menu item
        message = NS.getRestaurantNotificationTitle(NS.MENU, restaurant)
        self.notification = OwnerNotification.objects.create(restaurant=restaurant, user=user, title=message)
        self.notification.save()

        if self.notification:
            self.notificationAdded = True
            return menu_item

        return menu_item
