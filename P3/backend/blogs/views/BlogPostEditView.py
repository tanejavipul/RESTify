from rest_framework.generics import UpdateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated

from blogs.models import BlogPost
from blogs.serializers.BlogPostSerializer import EditBlogPostSerializer


class BlogPostEditView(UpdateAPIView):
    serializer_class = EditBlogPostSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(BlogPost, id=self.kwargs['blogpost_id'])

    def check_permissions(self, request):
        user_id = request.user.id
        blog_post = get_object_or_404(BlogPost, id=self.kwargs['blogpost_id'])

        if blog_post.user_id != user_id:
            self.permission_denied(self.request)
