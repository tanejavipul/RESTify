from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from blogs.models import BlogPost
from restaurants.models import Restaurant


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
