from rest_framework.serializers import ModelSerializer

from blogs.models import BlogPost


class BlogPostSerializer(ModelSerializer):

    class Meta:
        model = BlogPost
        fields = ['restaurant', 'title', 'description', 'primary_photo', 'photo_1', 'photo_2', 'photo_3']
