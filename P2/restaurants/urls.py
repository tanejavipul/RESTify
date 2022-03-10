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
from restaurants.views.RestaurantUpdateView import RestaurantUpdateBlogMenuView, RestaurantUpdateView

app_name = 'restaurants'

urlpatterns = [

    # Follow
    path('follow/<int:rest_id>/', FollowUnfollowView.as_view(), name='followRest'),

    # Restaurant Update
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
]
