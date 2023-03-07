from django.db import models
from django.contrib.auth import get_user_model 
from quiz.models import Quiz
# Create your models here.
User = get_user_model()


class Result(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score_correct = models.FloatField()
    score_incorrect = models.FloatField()
    score_null = models.FloatField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "result"
        verbose_name_plural = "result Module"