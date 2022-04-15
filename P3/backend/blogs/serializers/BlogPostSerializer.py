from django.shortcuts import get_object_or_404
from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from blogs.models import BlogPost
from restaurants.models import Restaurant, OwnerNotification
from restaurants.views import NotificationSelector as NS


class BlogPostSerializer(ModelSerializer):

    notification = ''
    rest_name = ''
    restaurant_name = serializers.SerializerMethodField('get_restaurant_name')
    restaurant_id = serializers.SerializerMethodField('get_restaurant_id')
    num_likes = serializers.IntegerField(read_only=True, required=False, default=0)
    is_owner = serializers.SerializerMethodField('get_owner_status')

    class Meta:
        model = BlogPost
        fields = ['is_owner', 'restaurant_name', 'restaurant_id', 'title', 'description', 'primary_photo', 'photo_1', 'photo_2', 'photo_3', 
                  'num_likes', 'last_modified']

    def get_restaurant_name(self, obj):
        if self.rest_name == '':
            print(self.context)
            rest_id = BlogPost.objects.get(id=self.context['blogpost_id']).restaurant_id
            self.rest_name = Restaurant.objects.get(id=rest_id).name
        return self.rest_name

    def get_owner_status(self, obj):
        user_id = self.context['request'].user.id
        blog_post = get_object_or_404(BlogPost, id=self.context['blogpost_id'])

        if blog_post.user_id == user_id:
            self.is_owner = True
        else:
            self.is_owner = False
        return self.is_owner

    def get_restaurant_id(self, obj):
        return BlogPost.objects.get(id=self.context['blogpost_id']).restaurant_id

    def create(self, validated_data):
        user = self.context['request'].user

        try:
            restaurant = Restaurant.objects.get(owner_id=user.id)
            self.rest_name = restaurant.name
        except:
            raise serializers.ValidationError({'Error': "Not an owner of a restaurant"})

        new_post = BlogPost.objects.create(
            user_id=self.context['request'].user.id,
            restaurant=restaurant, **validated_data
        )

        # create new notification for posting comment
        message = NS.getRestaurantNotificationTitle(NS.BLOG, restaurant)
        self.notification = OwnerNotification.objects.create(restaurant=restaurant, user=user, title=message)
        self.notification.save()

        return new_post


class EditBlogPostSerializer(ModelSerializer):

    title = serializers.CharField(max_length=100, required=False)
    description = serializers.CharField(max_length=100, required=False)

    class Meta:
        model = BlogPost
        fields = ['title', 'description', 'primary_photo', 'photo_1', 'photo_2', 'photo_3',
                  'last_modified']

    def update(self, instance, validated_data):

        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.primary_photo = validated_data.get('primary_photo', instance.primary_photo)
        instance.photo_1 = validated_data.get('photo_1', instance.photo_1)
        instance.photo_2 = validated_data.get('photo_2', instance.photo_2)
        instance.photo_3 = validated_data.get('photo_2', instance.photo_3)

        instance.save()

        return instance


class BlogPostHomeSerializer(ModelSerializer):
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'description', 'primary_photo', 'last_modified', 'bloglikes'] # not sure if i should use bloglikes or something else but seems to work
