
from django.core.validators import validate_email
from django.shortcuts import redirect, get_object_or_404
from restaurants.models import RestaurantLike
from rest_framework import serializers, request
from rest_framework.reverse import reverse
from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework.validators import UniqueValidator

from rest_framework.fields import CurrentUserDefault

from restaurants.models import Restaurant

import re

class RestaurantSerializer(ModelSerializer):
    num_likes = serializers.IntegerField(read_only=True, required=False, default=0)
    num_follows = serializers.IntegerField(read_only=True, required=False, default=0)
    num_comments = serializers.IntegerField(read_only=True, required=False, default=0)
    num_blogs = serializers.IntegerField(read_only=True, required=False, default=0)

    class Meta:
        model = Restaurant
        fields = ['owner', 'name', 'address', 'postal', 'phone', 'logo', 'num_likes', 'num_follows', 'num_comments', 'num_blogs'] 

    def validate(self, attrs):
        _user = self.context['request'].user
        restaurant = Restaurant.objects.filter(owner=_user)
        if restaurant.exists():
            raise serializers.ValidationError({"Error": "User already owns a restaurant"})
        
        if 'postal' in attrs:
            try:
                validate_postal(attrs['postal'])
            except:
                raise serializers.ValidationError({"Value Error": "Invalid Postal Code"})
        return attrs

    def create(self, validated_data):
        owner = self.context['request'].user
        restaurant = Restaurant.objects.create(
            owner=owner, **validated_data
        )
        restaurant.save()
        print(restaurant)
        return restaurant
    
class EditRestaurantSerializer(ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'address', 'postal', 'description', 'phone', 'carousel_img_1', 'carousel_img_2', 'carousel_img_3', 'image_1', 'image_2', 'image_3', 'image_4'] 

    def validate(self, attrs):
        _user = self.context['request'].user
        r_id = self.context['restaurant_id'] #r_id existence already validated by django, 404 returned
        
        #make sure owner of restaurant to be edited is the current user
        restaurant = get_object_or_404(Restaurant, id=r_id)
        if restaurant.owner != _user:
            raise serializers.ValidationError({"Error": "Restaurant does not belong to user"})

        if 'postal' in attrs:
            try:
                validate_postal(attrs['postal'])
            except:
                raise serializers.ValidationError({"Value Error": "Invalid Postal Code"})
                
        return attrs

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        # instance.phone = validated_data.get('phone', instance.phone)
        instance.address = validated_data.get('address', instance.address)
        instance.postal = validated_data.get('postal', instance.postal)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance


class RestaurantLikeSerializer(ModelSerializer):
    class Meta:
        model = RestaurantLike
        fields = ['user', 'restaurant'] #will NOT be provided in POST body

    def validate(self, attrs):
        _user = self.context['request'].user
        r_id = self.context['restaurant_id']
        #check if restaurant with provided id exists
        try:
            restaurant = Restaurant.objects.get(pk=r_id)
        except:
            raise serializers.ValidationError({"Object Error": "No restaurant exists with given ID"})
        return attrs
    
    def create(self, validated_data):
        _user = self.context['request'].user
        restaurant_id = self.context["restaurant_id"]
        _restaurant = Restaurant.objects.get(pk=restaurant_id)

        #do not create new RestaurantLike object if it already exists
        user_likes = _user.likes.all()
        if user_likes.exists():
            restaurant_like = get_object_or_404(user_likes, restaurant=_restaurant) #user_likes.get(restaurant = _restaurant) 
            if restaurant_like:
                print("like already exists")
                return restaurant_like

        # otherwise create new object
        restaurantLike = RestaurantLike.objects.create(
            user=_user, restaurant=_restaurant
        )
        restaurantLike.save()
        return restaurantLike

    #default implementation of delete, override if needed
    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)

class SearchSerializer(Serializer):
    search = serializers.CharField(max_length=200)  



#source https://stackoverflow.com/questions/29859743/python-canadian-address-regex-validation   
def validate_postal(postal_code):
    if re.search("[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]", postal_code , re.IGNORECASE | re.DOTALL):
        return True
    else:
        raise ValueError