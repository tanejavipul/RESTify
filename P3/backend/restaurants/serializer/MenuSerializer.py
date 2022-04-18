from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from restaurants.models import MenuItem, Restaurant, OwnerNotification, RestaurantNotification
from restaurants.views import NotificationSelector as NS

validTypes = ["Appetizers", "Main Course", "Sides", "Specials", "Desserts", "Drinks"]


class MenuSerializer(ModelSerializer):
    
    is_owner = serializers.SerializerMethodField('get_owner_status')

    class Meta:
        model = MenuItem
        fields = ['is_owner', 'name', 'description', 'price', 'type', 'id']

    def get_owner_status(self, obj):
        user_id = self.context['request'].user.id
        menu_item = get_object_or_404(MenuItem, id=obj.id)
        restaurant_id = get_object_or_404(Restaurant, owner_id=user_id).id
        print(restaurant_id)
        if menu_item.restaurant_id == restaurant_id:
            self.is_owner = True
        else:
            self.is_owner = False
        return self.is_owner


class EditMenuSerializer(ModelSerializer):

    notification = ''

    name = serializers.CharField(max_length=50, required=False)
    description = serializers.CharField(max_length=100, required=False)
    price = serializers.FloatField(required=False)
    type = serializers.CharField(max_length=50, required=False)
    is_owner = serializers.SerializerMethodField('get_owner_status')

    class Meta:
        model = MenuItem
        fields = ['name', 'description', 'price', 'type', 'is_owner']

    def validate(self, attrs):
        errors = {}

        item_type = attrs.get('type', None)
        price = attrs.get('price', None)

        if item_type is not None and item_type not in validTypes:
            errors['type'] = 'Please enter a valid item type (Ex: Appetizers, Main Course, Sides, Specials, Desserts, Drinks)'

        if price is not None and price < 0:
            errors['price'] = "Menu Item prices must be 0 or more"

        # return all validation errors in one
        if len(errors) != 0:
            raise serializers.ValidationError(errors)

        return attrs

    def get_owner_status(self, obj):
        user_id = self.context['request'].user.id
        menu_item = get_object_or_404(MenuItem, id=obj.id)
        restaurant_id = get_object_or_404(Restaurant, owner_id=user_id).id
        print(restaurant_id)
        if menu_item.restaurant_id == restaurant_id:
            self.is_owner = True
        else:
            self.is_owner = False
        return self.is_owner

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
        print(instance.id)
        message = NS.getRestaurantNotificationTitle(NS.MENU, restaurant)
        self.notification = RestaurantNotification.objects.create(restaurant=restaurant, user=user, title=message, type=NS.MENU, type_id=instance.id)
        self.notification.save()

        return instance


class AddMenuSerializer(ModelSerializer):

    notification = ''

    class Meta:
        model = MenuItem
        fields = ['name', 'description', 'price', 'type', 'id']

    def validate(self, attrs):
        errors = {}

        item_type = attrs.get('type', None)
        price = attrs.get('price', None)

        if item_type is not None and item_type not in validTypes:
            errors['type'] = 'Please enter a valid item type (Ex: Appetizers, Main Course, Sides, Specials, Desserts, Drinks)'

        if price is not None and price < 0:
            errors['price'] = "Menu Item prices must be 0 or more"

        # return all validation errors in one
        if len(errors) != 0:
            raise serializers.ValidationError(errors)

        return attrs

    def create(self, validated_data):
        user = self.context['request'].user

        try:
            restaurant = Restaurant.objects.get(owner_id=user.id)
            rest_id = restaurant.id
        except:
            raise serializers.ValidationError({'Error': "Not an owner of a restaurant"})

        menu_item = MenuItem.objects.create(
            restaurant_id=rest_id, **validated_data
        )

        # create new notification for updating menu item
        message = NS.getRestaurantNotificationTitle(NS.MENU, restaurant)
        self.notification = RestaurantNotification.objects.create(restaurant=restaurant, user=user, title=message, type=NS.MENU, type_id=menu_item.id)
        self.notification.save()

        return menu_item
