from rest_framework import status
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from blogs.models import BlogPost
from restaurants.models import Restaurant


class BlogPostSerializer(ModelSerializer):

    class Meta:
        model = BlogPost
        fields = ['restaurant', 'title', 'description', 'primary_photo', 'photo_1', 'photo_2', 'photo_3']

    def create(self, validated_data):
        title = validated_data.get('title', '')
        description = validated_data.get('description', '')
        primary_photo = validated_data.get('primary_photo', '')
        photo_1 = validated_data.get('photo_1', '')
        photo_2 = validated_data.get('photo_2', '')
        photo_3 = validated_data.get('photo_3', '')

        try:
            restaurant_id = Restaurant.objects.get(owner_id=self.context['request'].user.id).id
            print(restaurant_id)
        except:
            return Response({'Error': "Not an owner of a restaurant"}, status=status.HTTP_401_UNAUTHORIZED)

        new_post = BlogPost.objects.create(
            user_id=self.context['request'].user.id,
            restaurant_id=restaurant_id,
            title=title,
            description=description,
            primary_photo=primary_photo,
            photo_1=photo_1,
            photo_2=photo_2,
            photo_3=photo_3
        )

        return new_post
