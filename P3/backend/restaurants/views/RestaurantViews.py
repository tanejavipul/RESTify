# Create your views here.
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView, ListAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Count
from rest_framework import filters
from restaurants.serializer.RestaurantSerializer import RestaurantSerializer, EditRestaurantSerializer, GetRestaurantSerializer, RestaurantLikeSerializer, RestaurantLikeGetSerializer
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
    
    def check_permissions(self, request):
        user = request.user
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['restaurant_id'])
        # not owner of the restaurant that owns the restaurant
        if user != restaurant.owner:
            self.permission_denied(self.request)
    
    def get_object(self):
        return get_object_or_404(self.queryset, id=self.kwargs['restaurant_id'])

class GetRestaurantView(RetrieveAPIView):
    queryset = (Restaurant.objects
                        .annotate(num_likes=Count('likes', distinct=True)) 
                        .annotate(num_follows=Count('followers', distinct=True)) 
                        .annotate(num_comments=Count('comments', distinct=True)) 
                        .annotate(num_blogs=Count('blogpost', distinct=True))
                    )
                    
    permission_classes = [AllowAny]
    serializer_class = GetRestaurantSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["restaurant_id"] = self.kwargs['restaurant_id']
        # context["query_params"] = self.request.query_params
        return context

    def get_object(self):
        return get_object_or_404(self.queryset, id=self.kwargs['restaurant_id'])

class AddRestaurantLikeView(CreateAPIView): #POST
    queryset = Restaurant.objects.all()
    permission_classes =  [IsAuthenticated]
    serializer_class = RestaurantLikeSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["restaurant_id"] = self.kwargs['restaurant_id']
        # context["query_params"] = self.request.query_params
        return context
    
class RestaurantLikeView(RetrieveDestroyAPIView): #GET, DELETE
    queryset = Restaurant.objects.all()
    permission_classes =  [IsAuthenticated]
    serializer_class = RestaurantLikeGetSerializer

    def get_object(self):
        user_likes = (self.request.user).likes.all()
        _restaurant = get_object_or_404(Restaurant, id=self.kwargs['restaurant_id'])
        restaurant_like = get_object_or_404(user_likes, restaurant=_restaurant)
        return restaurant_like

#name, foods, addresses
class GetRestaurantListView(ListAPIView):
    permission_classes =  [AllowAny]
    serializer_class = RestaurantSerializer
    #queryset = Restaurant.objects.annotate(num_likes=Count('likes')).order_by('-num_likes') #does not show other num_values because they are not annotated
    search_fields = ['name', 'address', 'menuitem__name']  #TODO: test menu item search
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        if not self.request.query_params.get("search"):
            return Restaurant.objects.none()
        if self.request.query_params.get("search") != "":
            return Restaurant.objects.annotate(num_likes=Count('likes')).order_by('-num_likes')
        



        

