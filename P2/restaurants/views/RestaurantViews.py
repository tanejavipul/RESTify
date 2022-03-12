# Create your views here.
from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView, ListAPIView, RetrieveUpdateAPIView, RetrieveDestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.response import Response
from django.db.models import Count
from rest_framework import filters


from restaurants.serializer.RestaurantSerializer import RestaurantSerializer, EditRestaurantSerializer, RestaurantLikeSerializer, SearchSerializer
from restaurants.models import Restaurant


class AddRestaurantView(CreateAPIView):
    queryset = Restaurant.objects.all()
    permission_classes =  [IsAuthenticated]
    serializer_class = RestaurantSerializer

class EditRestaurantView(UpdateAPIView): 
    queryset = Restaurant.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = EditRestaurantSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["restaurant_id"] = self.kwargs['restaurant_id']
        # context["query_params"] = self.request.query_params
        return context

class GetRestaurantView(RetrieveAPIView):
    queryset = (Restaurant.objects
                        .annotate(num_likes=Count('likes', distinct=True)) 
                        .annotate(num_follows=Count('followers', distinct=True)) 
                        .annotate(num_comments=Count('comments', distinct=True)) 
                    )
                    #.annotate(num_comments=Count('blogs', distinct=True)) TODO: add later
    permission_classes = [AllowAny]
    serializer_class = RestaurantSerializer

    def get_object(self):
        return get_object_or_404(self.queryset, id=self.kwargs['restaurant_id'])

class AddRestaurantLikeView(CreateAPIView): #GET, POST, DELETE
    queryset = Restaurant.objects.all()
    permission_classes =  [IsAuthenticated]
    serializer_class = RestaurantLikeSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["restaurant_id"] = self.kwargs['restaurant_id']
        # context["query_params"] = self.request.query_params
        return context
    
class RestaurantLikeView(RetrieveDestroyAPIView):
    queryset = Restaurant.objects.all()
    permission_classes =  [IsAuthenticated]
    serializer_class = RestaurantLikeSerializer

    def get_object(self):
        user_likes = (self.request.user).likes.all()
        _restaurant = get_object_or_404(Restaurant, id=self.kwargs['restaurant_id'])
        restaurant_like = get_object_or_404(user_likes, restaurant=_restaurant)
        return restaurant_like

#name, foods, addresses
class GetRestaurantListView(ListAPIView):
    permission_classes =  [AllowAny]
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.annotate(num_likes=Count('likes')).order_by('-num_likes') #does not show other num_values because they are not annotated
    search_fields = ['name', 'address', 'menuitem__name']  #TODO: test menu item search
    filter_backends = (filters.SearchFilter,)



        

