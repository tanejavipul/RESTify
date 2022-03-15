from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from restaurants.models import MenuItem, Restaurant, OwnerNotification
from restaurants.views import NotificationSelector as NS

validTypes = ["Appetizers", "Main Course", "Sides", "Specials", "Desserts", "Drinks"]


class MenuSerializer(ModelSerializer):

    class Meta:
        model = MenuItem
        fields = ['restaurant', 'name', 'description', 'price', 'type']


class EditMenuSerializer(ModelSerializer):

    notification = ''

    name = serializers.CharField(max_length=50, required=False)
    description = serializers.CharField(max_length=100, required=False)
    price = serializers.FloatField(required=False)
    type = serializers.CharField(max_length=50, required=False)

    class Meta:
        model = MenuItem
        fields = ['name', 'description', 'price', 'type']

    def validate(self, attrs):
        if not (attrs['type'] in validTypes):
            raise serializers.ValidationError({"Error": "Please enter a valid item type "
                                                        "(Ex: Appetizers, Main Course, Sides, Specials, Desserts, Drinks)"})
        if attrs['price'] < 0:
            raise serializers.ValidationError({"Error": "Menu Item prices must be 0 or more"})

        return attrs

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

        return instance


class AddMenuSerializer(ModelSerializer):

    notification = ''

    class Meta:
        model = MenuItem
        fields = ['restaurant', 'name', 'description', 'price', 'type']

    def validate(self, attrs):
        if not (attrs['type'] in validTypes):
            raise serializers.ValidationError({"Error": "Please enter a valid item type "
                                                        "(Ex: Appetizers, Main Course, Sides, Specials, Desserts, Drinks)"})
        if attrs['price'] < 0:
            raise serializers.ValidationError({"Error": "Menu Item prices must be 0 or more"})

        return attrs

    def create(self, validated_data):
        user = self.context['request'].user

        try:
            restaurant = Restaurant.objects.get(owner_id=user.id)
            rest_id = restaurant.id
        except:
            return Response({'Error': "Not an owner of a restaurant"}, status=status.HTTP_400_BAD_REQUEST)

        menu_item = MenuItem.objects.create(
            restaurant_id=rest_id, **validated_data
        )

        # create new notification for updating menu item
        message = NS.getRestaurantNotificationTitle(NS.MENU, restaurant)
        self.notification = OwnerNotification.objects.create(restaurant=restaurant, user=user, title=message)
        self.notification.save()

        return menu_item
