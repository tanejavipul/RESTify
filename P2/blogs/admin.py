from django.contrib import admin

# Register your models here.
from blogs.models import BlogLikes, BlogPost

admin.site.register(BlogPost)
admin.site.register(BlogLikes)
