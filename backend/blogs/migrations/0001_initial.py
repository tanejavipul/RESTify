# Generated by Django 4.0.3 on 2022-04-18 03:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restaurants', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('primary_photo', models.ImageField(blank=True, default='Restaurants/Logo/restaurant-logo.png', null=True, upload_to='Blogs/Post/')),
                ('photo_1', models.ImageField(blank=True, null=True, upload_to='Blogs/Post/')),
                ('photo_2', models.ImageField(blank=True, null=True, upload_to='Blogs/Post/')),
                ('photo_3', models.ImageField(blank=True, null=True, upload_to='Blogs/Post/')),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('restaurant', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='blogpost', to='restaurants.restaurant')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='blogpost', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BlogLike',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('blog_post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bloglikes', to='blogs.blogpost')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='blogLikes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]