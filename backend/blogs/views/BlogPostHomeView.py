from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from accounts.models import User
from blogs.models import BlogPost
from blogs.serializers.BlogPostSerializer import BlogPostHomeSerializer


class BlogPostHomeView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = BlogPostHomeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        # given user id find all restaurants user follows
        # return according to time stamp all blog posts of each restaurant id

        blogs = BlogPost.objects.all()\
            .prefetch_related('restaurant__owner', 'restaurant__followers')\
            .filter(restaurant__followers__user=self.request.user).order_by('-last_modified')

        return blogs


class BlogPostRestaurantHomeView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = BlogPostHomeSerializer

    def get_queryset(self):

        # find all the blog posts associated with the restaurant id

        blogs = BlogPost.objects.all()\
            .filter(restaurant_id=self.kwargs['restaurant_id']).order_by('-last_modified')

        return blogs