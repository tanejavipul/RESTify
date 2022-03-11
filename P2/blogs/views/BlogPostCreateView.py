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

    def post(self, request, *args, **kwargs):

        if request.user.is_authenticated:
            print(request.user.id)
            try:
                rest_id = Restaurant.objects.get(owner_id=request.user.id).id
                print(rest_id)
            except:
                return Response({'Error': "Not an owner of a restaurant"}, status=status.HTTP_401_UNAUTHORIZED)

            title = request.POST.get('title')
            description = request.POST.get('description')
            primary_photo = request.POST.get('primary_photo')
            photo_1 = request.POST.get('photo_1')
            photo_2 = request.POST.get('photo_2')
            photo_3 = request.POST.get('photo_3')

            print(description)

            try:
                new_post = BlogPost.objects.create(
                    user_id=request.user.id,
                    restaurant_id=rest_id,
                    title=title,
                    description=description,
                    primary_photo=primary_photo,
                    photo_1=photo_1,
                    photo_2=photo_2,
                    photo_3=photo_3
                )
            except IntegrityError as e:
                return Response(request, e)

            response = {'id': new_post.id, 'title': title, 'description': description,
                        'primary_photo': primary_photo, 'photo_1': photo_1, 'photo_2': photo_2,
                        'photo_3': photo_3}
            return Response(response, status=status.HTTP_200_OK)

        return Response({'Error': "User not Authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
