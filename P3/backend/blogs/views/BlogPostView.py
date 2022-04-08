from rest_framework.generics import RetrieveAPIView, get_object_or_404
from blogs.models import BlogLike, BlogPost
from blogs.serializers.BlogPostSerializer import BlogPostSerializer
from django.db.models import Count


class BlogPostView(RetrieveAPIView):
    serializer_class = BlogPostSerializer

    queryset = (BlogPost.objects.annotate(num_likes=Count('bloglikes', distinct=True)))

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["blogpost_id"] = self.kwargs['blogpost_id']
        return context

    def get_object(self):
        return get_object_or_404(self.queryset, id=self.kwargs['blogpost_id'])
