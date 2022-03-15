from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from restaurants.models import Comment, Restaurant, OwnerNotification
from restaurants.views import NotificationSelector as NS


class CommentSerializer(ModelSerializer):

    class Meta:
        model = Comment
        fields = ['comment', 'datetime']


class AddCommentSerializer(ModelSerializer):

    notification = ''

    class Meta:
        model = Comment
        fields = ['comment', 'datetime']

    def create(self, validated_data):
        user = self.context['request'].user
        restaurant = get_object_or_404(Restaurant, id=self.context['restaurant_id'])

        comment = Comment.objects.create(
            user_id=user.id,
            restaurant_id=restaurant.id, **validated_data
        )

        # create new notification for posting comment
        message = NS.getOwnerNotificationTitle(NS.COMMENT, user, restaurant)
        self.notification = OwnerNotification.objects.create(restaurant=restaurant, user=user, title=message)
        self.notification.save()

        return comment
