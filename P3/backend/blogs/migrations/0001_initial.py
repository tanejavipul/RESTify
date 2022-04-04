# Generated by Django 4.0.3 on 2022-03-15 01:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('restaurants', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=100)),
                ('primary_photo', models.ImageField(blank=True, upload_to='Blogs/Post/')),
                ('photo_1', models.ImageField(blank=True, upload_to='Blogs/Post/')),
                ('photo_2', models.ImageField(blank=True, upload_to='Blogs/Post/')),
                ('photo_3', models.ImageField(blank=True, upload_to='Blogs/Post/')),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('restaurant', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='blogpost', to='restaurants.restaurant')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='blogpost', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BlogLikes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('blog_post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='blogpost', to='blogs.blogpost')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]