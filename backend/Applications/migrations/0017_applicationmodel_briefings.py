# Generated by Django 5.0.7 on 2024-08-19 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Applications', '0016_applicationmodel_contractor_supervisor_approval_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicationmodel',
            name='briefings',
            field=models.JSONField(default=list),
        ),
    ]
