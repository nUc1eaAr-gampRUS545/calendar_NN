# Generated by Django 5.0.6 on 2024-06-28 22:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tasks', '0001_initial'),
        ('Users', '0002_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='Users.user'),
        ),
    ]
