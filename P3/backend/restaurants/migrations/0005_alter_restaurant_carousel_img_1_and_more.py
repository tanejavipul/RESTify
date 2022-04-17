# Generated by Django 4.0.3 on 2022-04-17 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0004_ownernotification_type_ownernotification_type_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='carousel_img_1',
            field=models.ImageField(blank=True, default='Restaurants/Carousel/image.png', null=True, upload_to='Restaurants/Carousel/'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='carousel_img_2',
            field=models.ImageField(blank=True, default='Restaurants/Carousel/image.png', null=True, upload_to='Restaurants/Carousel/'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='carousel_img_3',
            field=models.ImageField(blank=True, default='Restaurants/Carousel/image.png', null=True, upload_to='Restaurants/Carousel/'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='cover_img',
            field=models.ImageField(blank=True, default='Restaurants/Cover/image.png', null=True, upload_to='Restaurants/Cover/'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='image_1',
            field=models.ImageField(blank=True, null=True, upload_to='Restaurants/Image/'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='image_2',
            field=models.ImageField(blank=True, null=True, upload_to='Restaurants/Image/'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='image_3',
            field=models.ImageField(blank=True, null=True, upload_to='Restaurants/Image/'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='image_4',
            field=models.ImageField(blank=True, null=True, upload_to='Restaurants/Image/'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='logo',
            field=models.ImageField(default='Restaurants/Logo/logo.png', upload_to='Restaurants/Logo/'),
        ),
    ]
