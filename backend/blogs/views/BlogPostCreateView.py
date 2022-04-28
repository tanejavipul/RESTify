from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from blogs.serializers.BlogPostSerializer import BlogPostSerializer


class BlogPostCreateView(CreateAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticated]
