# Generated by Django 5.0.6 on 2024-06-28 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Organization', '0002_alter_organization_members_alter_organization_owner'),
        ('Tasks', '0002_alter_task_user'),
        ('Users', '0002_user'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CustomUser',
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, related_name='customuser_set', to='auth.group'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, related_name='customuser_set', to='auth.permission'),
        ),
    ]
