# Generated by Django 4.0.3 on 2022-03-10 22:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0006_rename_datetime_restaurantupdate_last_modified'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='RestaurantUpdate',
            new_name='RestaurantNotification',
        ),
    ]
