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
from restaurants.views.OwnerNotificationView import OwnerNotificationAddView, OwnerAllNotificationView
from restaurants.views.RestaurantNotificationView import RestaurantAddNotificationView, RestaurantNotificationView, \
    RestaurantAllNotificationView

app_name = 'restaurants'

urlpatterns = [

    # Follow
    path('follow/<int:rest_id>/', FollowUnfollowView.as_view(), name='followRest'),

    # Restaurant Update
    path('notification/all/', RestaurantAllNotificationView.as_view(), name='notificationAll'),
    path('notification/<int:rest_id>/', RestaurantNotificationView.as_view(), name='notificationRestaurant'),
    path('notification/blog/<int:rest_id>/', RestaurantAddNotificationView.as_view(), {'blogOrMenu': 'blog'}, name='notificationBlog'),
    path('notification/menu/<int:rest_id>/', RestaurantAddNotificationView.as_view(), {'blogOrMenu': 'menu'}, name='notificationMenu'),

    # Owner Update
    path('owner/update/', OwnerAllNotificationView.as_view(), {'Owner': 'blog'}, name='followRest'),
    path('owner/update/follow/', OwnerNotificationAddView.as_view(), name='followRest'),
    path('owner/update/like/rest/', OwnerNotificationAddView.as_view(), name='followRest'),
    path('owner/update/like/blog/', OwnerNotificationAddView.as_view(), name='followRest'),
    path('owner/update/comment/', OwnerNotificationAddView.as_view(), name='followRest'),
]
