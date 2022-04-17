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

from blogs.views.BlogPostEditView import BlogPostDeleteView, BlogPostEditView
from blogs.views.BlogPostCreateView import BlogPostCreateView
from blogs.views.BlogPostView import BlogPostView
from blogs.views.BlogPostLikesView import AddBlogPostLikeView, BlogPostLikeView
from blogs.views.BlogPostHomeView import BlogPostHomeView

app_name = 'blogs'

urlpatterns = [
    path('<int:blogpost_id>/', BlogPostView.as_view(), name='view-blog'),
    path('create/', BlogPostCreateView.as_view(), name='create-blog'),
    path('<int:blogpost_id>/edit/', BlogPostEditView.as_view(), name='edit-blog'),
    path('<int:blogpost_id>/delete/', BlogPostDeleteView.as_view(), name='delete-blog'),
    path('home/', BlogPostHomeView.as_view(), name='blogs-home'),

    #Blog Likes
    path('<int:blogpost_id>/like/add/', AddBlogPostLikeView.as_view(), name='addBlogPostLike'),
    path('<int:blogpost_id>/like/', BlogPostLikeView.as_view(), name='viewBlogPostLike'), #GET and DELETE
]
