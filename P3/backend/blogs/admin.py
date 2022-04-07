from django.contrib import admin

# Register your models here.
from blogs.models import BlogLike, BlogPost

admin.site.register(BlogPost)
admin.site.register(BlogLike)
