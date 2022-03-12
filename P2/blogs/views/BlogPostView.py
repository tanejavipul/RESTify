from rest_framework import pagination
from rest_framework.generics import RetrieveAPIView, get_object_or_404
from rest_framework.response import Response

from blogs.models import BlogPost
from blogs.serializer import BlogPostSerializer


class BlogPostView(RetrieveAPIView):
    serializer_class = BlogPostSerializer

    def get_object(self):
        return get_object_or_404(BlogPost, id=self.kwargs['blogpost_id'])
