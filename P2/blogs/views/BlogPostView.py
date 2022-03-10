from rest_framework.generics import RetrieveAPIView, get_object_or_404

from blogs.models import BlogPost
from blogs.serializer import BlogPostSerializer


class BlogPostView(RetrieveAPIView):
    serializer_class = BlogPostSerializer

    def get_object(self):
        return get_object_or_404(BlogPost, id=self.kwargs['blogpost_id'])
