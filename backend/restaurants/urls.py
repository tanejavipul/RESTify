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

from restaurants.views.CommentView import AddCommentView, CommentView
from restaurants.views import NotificationSelector as NS
from restaurants.views.MenuView import DeleteMenuView, MenuView, EditMenuView, AddMenuView
from restaurants.views.FollowView import FollowUnfollowView
from restaurants.views.RestaurantViews import AddRestaurantView, EditRestaurantView, AddRestaurantLikeView, \
    RestaurantLikeView, GetRestaurantListView, GetRestaurantView, RestaurantIDView
from rest_framework_simplejwt.views import TokenObtainPairView

from restaurants.views.OwnerNotificationView import OwnerNotificationAddView, OwnerNotificationView
from restaurants.views.RestaurantNotificationView import RestaurantAddNotificationView, RestaurantNotificationView, \
    RestaurantAllNotificationView

from blogs.views.BlogPostHomeView import BlogPostRestaurantHomeView

app_name = 'restaurants'

urlpatterns = [

    # Follow (User Follows a Restaurant)
    path('follow/<int:rest_id>/', FollowUnfollowView.as_view(), name='followRest'),

    # Restaurant Notification (Notification the User get if they follow)
    path('notification/all/', RestaurantAllNotificationView.as_view(), name='notificationAll'),
    path('notification/<int:rest_id>/', RestaurantNotificationView.as_view(), name='notificationRestaurant'),
    path('notification/blog/<int:rest_id>/', RestaurantAddNotificationView.as_view(), {NS.REST_NOTI: NS.BLOG},
         name='notificationBlog'),
    path('notification/menu/<int:rest_id>/', RestaurantAddNotificationView.as_view(), {NS.REST_NOTI: NS.MENU},
         name='notificationMenu'),

    # Owner Notification (Notification the Restaurant Owner gets)
    path('owner/update/all/', OwnerNotificationView.as_view(), name='ownerNotifications'),

    path('owner/update/follow/<int:rest_id>/', OwnerNotificationAddView.as_view(), {NS.OWNER_NOTI: NS.FOLLOW},
         name='ownerNotifyFollow'),
    path('owner/update/like/rest/<int:rest_id>/', OwnerNotificationAddView.as_view(), {NS.OWNER_NOTI: NS.LIKE_REST},
         name='ownerNotifyRest'),
    path('owner/update/like/blog/<int:rest_id>/', OwnerNotificationAddView.as_view(), {NS.OWNER_NOTI: NS.LIKE_BLOG},
         name='ownerNotifyBlog'),
    path('owner/update/comment/<int:rest_id>/', OwnerNotificationAddView.as_view(), {NS.OWNER_NOTI: NS.COMMENT},
         name='ownerNotifyComment'),

    #Restaurant
    path('id/', RestaurantIDView.as_view(), name='RestaurantID'),

    path('add/', AddRestaurantView.as_view(), name='addRestaurant'),
    path('<int:restaurant_id>/edit/', EditRestaurantView.as_view(), name='editRestaurant'),
    path('search/', GetRestaurantListView.as_view(), name='getRestaurants'),
    path('<int:restaurant_id>/view/', GetRestaurantView.as_view(), name='viewRestaurant'),

    #Restaurant Likes
    path('<int:restaurant_id>/like/add/', AddRestaurantLikeView.as_view(), name='addRestaurantLike'),
    path('<int:restaurant_id>/like/', RestaurantLikeView.as_view(), name='viewRestaurantLike'), #is both GET and DELETE
    
    # Menu
    path('<int:restaurant_id>/menu/', MenuView.as_view(), name='viewMenu'),
    path('<int:menu_item_id>/editMenuItem/', EditMenuView.as_view(), name='editMenuItem'),
    path('addMenuItem/', AddMenuView.as_view(), name='addMenuItem'),
    path('<int:menu_item_id>/deleteMenuItem/', DeleteMenuView.as_view(), name='deleteMenuItem'),

    # Blogs
    path('<int:restaurant_id>/blogs/', BlogPostRestaurantHomeView.as_view(), name='restaurantBlogs'),

    # Comment
    path('<int:restaurant_id>/viewComments/', CommentView.as_view(), name='viewComment'),
    path('<int:restaurant_id>/addComment/', AddCommentView.as_view(), name='addComment'),

]
