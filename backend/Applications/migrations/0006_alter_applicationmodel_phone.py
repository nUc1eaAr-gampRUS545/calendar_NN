# Generated by Django 5.0.6 on 2024-07-24 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Applications', '0005_rename_tell_applicationmodel_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicationmodel',
            name='phone',
            field=models.CharField(max_length=11, unique=True),
        ),
    ]
