import profile
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from accounts.models import User

from restaurants.models import Comment, Restaurant, OwnerNotification
from restaurants.views import NotificationSelector as NS


class CommentSerializer(ModelSerializer):

    commenter = ''
    profile_pic = ''
    username = serializers.SerializerMethodField('get_commenter_name')
    profile_pic = serializers.SerializerMethodField('get_profile_photo')
    class Meta:
        model = Comment
        fields = ['comment', 'datetime', 'username', 'profile_pic']

    def get_commenter_name(self, obj):
        return str(obj.user)

    def get_profile_photo(self, obj):
        profile_photo = str(User.objects.get(id=obj.user_id).avatar)
        return profile_photo


class AddCommentSerializer(ModelSerializer):

    notification = ''
    commenter = ''
    username = serializers.SerializerMethodField('get_commenter_name')

    class Meta:
        model = Comment
        fields = ['comment', 'datetime', 'username']

    # probably not needed?
    def get_commenter_name(self, obj):
        return str(obj.user)

    def create(self, validated_data):
        user = self.context['request'].user
        restaurant = get_object_or_404(Restaurant, id=self.context['restaurant_id'])

        comment = Comment.objects.create(
            user_id=user.id,
            restaurant_id=restaurant.id, **validated_data
        )

        # create new notification for posting comment
        message = NS.getOwnerNotificationTitle(NS.COMMENT, user, restaurant)
        self.notification = OwnerNotification.objects.create(restaurant=restaurant, user=user, title=message, type=NS.COMMENT ,type_id=restaurant.id)
        self.notification.save()

        return comment
