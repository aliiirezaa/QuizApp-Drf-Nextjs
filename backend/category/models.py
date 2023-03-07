from django.db import models

# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=200)
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name='category'
        verbose_name_plural='categories Module'
    
    def __str__(self):
        return self.title