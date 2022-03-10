# Create your views here.
from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView, ListAPIView, RetrieveUpdateAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken


from restaurants.serializer import RestaurantSerializer, EditRestaurantSerializer, RestaurantLikeSerializer
from restaurants.models import Restaurant



class AddRestaurantView(CreateAPIView):
    queryset = Restaurant.objects.all()
    permission_classes =  [IsAuthenticated]
    serializer_class = RestaurantSerializer

class EditRestaurantView(RetrieveUpdateAPIView): 
    queryset = Restaurant.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = EditRestaurantSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["restaurant_id"] = self.kwargs['restaurant_id']
        # context["query_params"] = self.request.query_params
        return context

    def get_object(self):
        return get_object_or_404(Restaurant, id=self.kwargs['restaurant_id'])

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
# class GetRestaurantsView(ListAPIView):
#     queryset = 

