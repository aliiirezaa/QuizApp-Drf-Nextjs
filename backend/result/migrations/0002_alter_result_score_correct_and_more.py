# Generated by Django 4.1.7 on 2023-03-03 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('result', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='result',
            name='score_correct',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='result',
            name='score_incorrect',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='result',
            name='score_null',
            field=models.FloatField(),
        ),
    ]
