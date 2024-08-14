# Generated by Django 5.0.7 on 2024-08-13 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Places', '0002_alter_placemodel_room_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='placemodel',
            name='frame',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='placemodel',
            name='name',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='placemodel',
            name='quantity',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='placemodel',
            name='type_of_place',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='placemodel',
            name='zone',
            field=models.CharField(max_length=144, null=True),
        ),
    ]
