from django.db import IntegrityError
from rest_framework import status
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from accounts.models import User
from blogs.models import BlogPost
from blogs.serializer import BlogPostSerializer
from restaurants.models import Restaurant


class BlogPostCreateView(CreateAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticated]
