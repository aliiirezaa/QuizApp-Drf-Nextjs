# Generated by Django 4.1.7 on 2023-03-02 14:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('category', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('number_of_questions', models.IntegerField()),
                ('require_to_pass', models.IntegerField()),
                ('time', models.IntegerField()),
                ('difficulty', models.CharField(choices=[('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')], max_length=10)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='category.category')),
            ],
            options={
                'verbose_name': 'quiz',
                'verbose_name_plural': 'quiz Module',
            },
        ),
    ]
