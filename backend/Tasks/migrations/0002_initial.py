# Generated by Django 5.0.6 on 2024-07-05 09:32

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("Tasks", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="task",
            name="users",
            field=models.ManyToManyField(
                related_name="tasks", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
