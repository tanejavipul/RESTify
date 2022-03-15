from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer, Serializer
from django.shortcuts import get_object_or_404

from blogs.models import BlogPost, BlogLike
from restaurants.models import Restaurant, OwnerNotification

from restaurants.views import NotificationSelector as NS


class BlogPostSerializer(ModelSerializer):

    class Meta:
        model = BlogPost
        fields = ['restaurant', 'title', 'description', 'primary_photo', 'photo_1', 'photo_2', 'photo_3']

    def create(self, validated_data):

        try:
            restaurant_id = Restaurant.objects.get(owner_id=self.context['request'].user.id).id
        except:
            return Response({'Error': "Not an owner of a restaurant"}, status=status.HTTP_401_UNAUTHORIZED)

        new_post = BlogPost.objects.create(
            user_id=self.context['request'].user.id,
            restaurant_id=restaurant_id, **validated_data
        )

        return new_post

class BlogPostLikeSerializer(ModelSerializer):
    notification = ''
    #notificationAdded = serializers.SerializerMethodField('notification_added')
    Success = serializers.SerializerMethodField('success_message')
    class Meta:
        model = BlogLike
        fields = ['Success'] #will NOT be provided in POST body
    
    # def notification_added(self, obj):
    #     if self.notification == '':
    #         return False
    #     return {'message': self.notification.title}

    def success_message(self, obj):
        if self.notification == '':
            return "User already likes the blog post."
        return "User now likes the blog post."

    def validate(self, attrs):
        _user = self.context['request'].user
        b_id = self.context['blogpost_id']

        #check if blogpost with provided id exists
        # try:
        #     blogPost = BlogPost.objects.get(pk=b_id)
        # except:
        #     raise serializers.ValidationError({"Object Error": "No blog post exists with given ID"})
        blogPost = get_object_or_404(BlogPost, pk=b_id)
        
        #400 
        if blogPost.user == _user:
            raise serializers.ValidationError({"Error": "User cannot like their own blog post"})
        return attrs
    
    def create(self, validated_data):
        _user = self.context['request'].user
        blogpost_id = self.context["blogpost_id"]
        _blogpost = BlogPost.objects.get(pk=blogpost_id)
  
        try:
            blogpostLike = _user.blogLikes.get(blog_post = _blogpost)
        except:
            # otherwise create new object
            blogpostLike = BlogLike.objects.create(
                user=_user, blog_post=_blogpost
            )
            blogpostLike.save()

            #create new notification for liking the blog post
            message = NS.getOwnerNotificationTitle(NS.LIKE_BLOG, _user, _blogpost.restaurant)
            self.notification = OwnerNotification.objects.create(restaurant=_blogpost.restaurant, user=_user, title=message)
            self.notification.save()
            
        #TODO: remove later
        # if self.notification:
        #     print('notification was created')
        # else:
        #     print('like already exists, returning value')

        return blogpostLike

class BlogLikeGetSerializer(Serializer):
    result = serializers.SerializerMethodField('result_message')

    def result_message(self, obj):
        if obj:
            return True