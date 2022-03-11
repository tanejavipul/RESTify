from django.shortcuts import get_object_or_404
from rest_framework import serializers, request
from rest_framework.reverse import reverse
from rest_framework.serializers import ModelSerializer

from restaurants.models import MenuItem, Restaurant


class MenuSerializer(ModelSerializer):

    class Meta:
        model = MenuItem
        fields = ['restaurant', 'name', 'description', 'price', 'type']

#Not working yet
class EditMenuSerializer(ModelSerializer):
    # owner = serializers.CharField(source='owner.get_full_name', read_only=True)
    # id = serializers.ReadOnlyField()

    class Meta:
        model = MenuItem
        fields = ['restaurant', 'name', 'description', 'price', 'type']

    def validate(self, attrs):
        _user = self.context['request'].user
        r_id = self.context['restaurant_id']

        print(_user)
        print(_user.id)

        # make sure owner of restaurant to be edited is the current user
        restaurant = get_object_or_404(Restaurant, id=r_id)

        owner_id = restaurant.owner

        print(owner_id)

        if owner_id != _user.id:
            raise serializers.ValidationError({"Error": "This restaurants menu does not belong to signed in user"})

        return attrs

    def update(self, instance, validated_data):

        instance.restaurant = validated_data.get('restaurant', instance.restaurant)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.type = validated_data.get('type', instance.type)

        instance.save()
        return instance


class AddMenuSerializer(ModelSerializer):

    class Meta:
        model = MenuItem
        fields = ['restaurant', 'name', 'description', 'price', 'type']

    def validate(self, attrs):
        _user = self.context['request'].user
        restaurant = get_object_or_404(Restaurant, id=self.context['restaurant_id'])

        owner_id = restaurant.owner_id

        if owner_id != _user.id:
            raise serializers.ValidationError({"Error": "This restaurants menu does not belong to signed in user"})

        if attrs['price'] < 0:
            raise serializers.ValidationError({"Error": "Menu Item prices must be 0 or more"})

        return attrs

    def create(self, validated_data):
        restaurant_id = self.context['restaurant_id']
        restaurant = get_object_or_404(Restaurant, id=restaurant_id)
        owner_id = restaurant.owner_id

        menu_item = MenuItem.objects.create(
            restaurant_id=owner_id, **validated_data
        )
        return menu_item
