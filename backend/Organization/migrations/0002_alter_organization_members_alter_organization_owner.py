# Generated by Django 5.0.6 on 2024-06-28 22:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Organization', '0001_initial'),
        ('Users', '0002_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='members',
            field=models.ManyToManyField(related_name='organizations', to='Users.user'),
        ),
        migrations.AlterField(
            model_name='organization',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owned_organizations', to='Users.user'),
        ),
    ]
