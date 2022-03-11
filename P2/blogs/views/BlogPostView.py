from rest_framework import pagination
from rest_framework.generics import RetrieveAPIView, get_object_or_404
from rest_framework.response import Response

from blogs.models import BlogPost
from blogs.serializer import BlogPostSerializer


class BlogPostView(RetrieveAPIView):
    serializer_class = BlogPostSerializer

    def get_object(self):
        return get_object_or_404(BlogPost, id=self.kwargs['blogpost_id'])


class CustomPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50
    page_query_param = 'p'

    def get_paginated_response(self, data):
        response = Response(data)
        response['count'] = self.page.paginator.count
        response['next'] = self.get_next_link()
        response['previous'] = self.get_previous_link()
        return response
