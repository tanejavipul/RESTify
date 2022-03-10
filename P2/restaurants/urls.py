"""RESTify URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from restaurants.views.FollowView import FollowUnfollowView
from restaurants.views.RestaurantUpdateView import RestaurantUpdateBlogMenuView, RestaurantUpdateView, \
    RestaurantUpdateAllView
from restaurants.views import AddRestaurantView, EditRestaurantView, AddRestaurantLikeView, RestaurantLikeView, GetRestaurantsView
from rest_framework_simplejwt.views import TokenObtainPairView



app_name = 'restaurants'

urlpatterns = [

    # Follow
    path('follow/<int:rest_id>/', FollowUnfollowView.as_view(), name='followRest'),

    # Restaurant Update
    path('update/all/', RestaurantUpdateAllView.as_view(), name='updateAll'),
    path('update/<int:rest_id>/', RestaurantUpdateView.as_view(), name='update'),
    path('update/blog/<int:rest_id>/', RestaurantUpdateBlogMenuView.as_view(), {'blogOrMenu': 'blog'}, name='updateBlog'),
    path('update/menu/<int:rest_id>/', RestaurantUpdateBlogMenuView.as_view(), {'blogOrMenu': 'menu'}, name='updateMenu'),

    # Owner Update
    # path('owner/update/', FollowUnfollowView.as_view(), name='followRest'),
    # path('owner/update/follows/', FollowUnfollowView.as_view(), name='followRest'),
    # path('owner/update/likes/rest/', FollowUnfollowView.as_view(), name='followRest'),
    # path('owner/update/likes/blog/', FollowUnfollowView.as_view(), name='followRest'),
    # path('owner/update/comments/', FollowUnfollowView.as_view(), name='followRest'),

    # path('unfollow/<int:rest_id>/', FollowUnfollowView.as_view(), name='unfollowRest'),

    
    path('add/', AddRestaurantView.as_view(), name='addRestaurant'),
    path('<restaurant_id>/edit/', EditRestaurantView.as_view(), name='editRestaurant'),
    path('<restaurant_id>/like/add/', AddRestaurantLikeView.as_view(), name='addRestaurantLike'),
    path('<restaurant_id>/like/', RestaurantLikeView.as_view(), name='viewRestaurantLike'),
    path('search/', GetRestaurantsView.as_view(), name='getRestaurants')
]
