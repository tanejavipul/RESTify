from rest_framework.generics import CreateAPIView, RetrieveDestroyAPIView
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from blogs.models import BlogPost
from blogs.serializer import BlogPostLikeSerializer, BlogLikeGetSerializer

class AddBlogPostLikeView(CreateAPIView): #POST
    queryset = BlogPost.objects.all()
    permission_classes =  [IsAuthenticated]
    serializer_class = BlogPostLikeSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["blogpost_id"] = self.kwargs['blogpost_id']
        return context
    
class BlogPostLikeView(RetrieveDestroyAPIView): #GET, DELETE
    queryset = BlogPost.objects.all()
    permission_classes =  [IsAuthenticated]
    serializer_class = BlogLikeGetSerializer

    def get_object(self):
        user_bloglikes = (self.request.user).blogLikes.all()
        _blogpost = get_object_or_404(BlogPost, id=self.kwargs['blogpost_id'])
        blogpost_like = get_object_or_404(user_bloglikes, blog_post=_blogpost)
        return blogpost_like

        