
from django.core.validators import validate_email
from django.shortcuts import redirect, get_object_or_404
from rest_framework import serializers, request, status
from rest_framework.reverse import reverse
from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework.validators import UniqueValidator

from rest_framework.fields import CurrentUserDefault

from restaurants.models import Restaurant, RestaurantLike, OwnerNotification
from restaurants.views import NotificationSelector as NS
import re
from rest_framework.response import Response
from django.http import JsonResponse


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
        
        if 'phone' not in attrs:
            raise serializers.ValidationError({"phone": "This field is required"})

        if attrs['phone'] == None:
            raise serializers.ValidationError({"phone": "This field cannot be blank"})
        
        if 'logo' not in attrs:
            raise serializers.ValidationError({"logo": "This field is required"})
        
        
        
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
    name = serializers.CharField(max_length=100, required=False)
    address = serializers.CharField(max_length=100, required=False)
    postal = serializers.CharField(max_length=10, required=False)
    class Meta:
        model = Restaurant
        fields = ['name', 'address', 'postal', 'phone', 'logo', 'description', 'cover_img', 'carousel_img_1', 'carousel_img_2', 'carousel_img_3', 'image_1', 'image_2', 'image_3', 'image_4'] 

    def validate(self, attrs):
        _user = self.context['request'].user
        r_id = self.context['restaurant_id'] #r_id existence already validated by django, 404 returned
        
        #make sure owner of restaurant to be edited is the current user
        restaurant = get_object_or_404(Restaurant, pk=r_id)
        if restaurant.owner != _user:
            raise serializers.ValidationError({"Error": "Restaurant does not belong to user"})

        if 'postal' in attrs:
            try:
                validate_postal(attrs['postal'])
            except:
                raise serializers.ValidationError({"Value Error": "Invalid Postal Code"})
        
        #pre populate phone field
        if 'phone' in attrs and attrs['phone'] == None:
            attrs['phone'] = restaurant.phone

        return attrs

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.address = validated_data.get('address', instance.address)
        instance.postal = validated_data.get('postal', instance.postal)

        instance.description = validated_data.get('description', instance.description)

        instance.carousel_img_1 = validated_data.get('carousel_img_1', instance.carousel_img_1)
        instance.carousel_img_2 = validated_data.get('carousel_img_2', instance.carousel_img_2)
        instance.carousel_img_3 = validated_data.get('carousel_img_3', instance.carousel_img_3)

        instance.image_1 = validated_data.get('image_1', instance.image_1)
        instance.image_2 = validated_data.get('image_1', instance.image_2)
        instance.image_3 = validated_data.get('image_1', instance.image_3)
        instance.image_4 = validated_data.get('image_1', instance.image_4)

        instance.save()
        return instance


class RestaurantLikeSerializer(ModelSerializer):
    notification = ''
    notificationAdded = serializers.SerializerMethodField('notification_added')
    class Meta:
        model = RestaurantLike
        fields = ['user', 'restaurant', 'notificationAdded'] #will NOT be provided in POST body
    
    def notification_added(self, obj):
        if self.notification == '':
            return False
        return {'message': self.notification.title}

    def validate(self, attrs):
        _user = self.context['request'].user
        r_id = self.context['restaurant_id']
        #check if restaurant with provided id exists
        try:
            restaurant = Restaurant.objects.get(pk=r_id)
        except:
            raise serializers.ValidationError({"Object Error": "No restaurant exists with given ID"})
        
        if restaurant.owner == _user:
            raise serializers.ValidationError({"Error": "User cannot like their own restaurant"})
        return attrs
    
    def create(self, validated_data):
        _user = self.context['request'].user
        restaurant_id = self.context["restaurant_id"]
        _restaurant = Restaurant.objects.get(pk=restaurant_id)

        #do not create new RestaurantLike object if it already exists
        # user_likes = _user.likes.all()
        # if user_likes.exists():
        #     restaurant_like = user_likes.filter(restaurant=_restaurant) 
        #     if restaurant_like.exists():
        #         print("like already exists")
        #         return restaurant_like[0] #return first entry in filter, 
        
        try:
            restaurantLike = _user.likes.get(restaurant = _restaurant)
        except:
        # otherwise create new object
            restaurantLike = RestaurantLike.objects.create(
                user=_user, restaurant=_restaurant
            )
            restaurantLike.save()

            #create new notification for liking the restaurant
            message = NS.getOwnerNotificationTitle(NS.LIKE_REST, _user, _restaurant)
            self.notification = OwnerNotification.objects.create(restaurant=_restaurant, user=_user, title=message)
            self.notification.save()
            
        #TODO: remove later
        # if self.notification:
        #     print('notification was created')
        # else:
        #     print('like already exists, returning value')
        return restaurantLike


class SearchSerializer(Serializer):
    search = serializers.CharField(max_length=200)  

#source https://stackoverflow.com/questions/29859743/python-canadian-address-regex-validation   
def validate_postal(postal_code):
    if re.search("[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]", postal_code , re.IGNORECASE | re.DOTALL):
        return True
    else:
        raise ValueError