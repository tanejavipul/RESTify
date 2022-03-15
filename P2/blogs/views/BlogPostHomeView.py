from rest_framework.generics import ListAPIView

from accounts.models import User
from blogs.models import BlogPost
from blogs.serializers.BlogPostSerializer import BlogPostSerializer


class BlogPostHomeView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = BlogPostSerializer

    def get_queryset(self):

        # given user id find all restaurants user follows
        # return according to time stamp all blog posts of each restaurant id

        blogs = BlogPost.objects.all()\
            .prefetch_related('restaurant__owner', 'restaurant__followers')\
            .filter(restaurant__followers__user=self.request.user).order_by('-last_modified')

        return blogs
