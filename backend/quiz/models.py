from django.db import models
from category.models import Category
import random
# Create your models here.

class Quiz(models.Model):
    class QuizChioces(models.TextChoices):
        EASY = 'easy'
        MEDIUM ='medium'
        HARD = 'hard'
    title = models.CharField(max_length=200)
    topic = models.ForeignKey(Category, on_delete=models.CASCADE)
    number_of_questions = models.IntegerField()
    require_to_pass = models.IntegerField()
    time = models.IntegerField()
    difficulty = models.CharField(max_length=10, choices=QuizChioces.choices)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'quiz'
        verbose_name_plural = 'quiz Module'
    
    def get_questions(self):
        questions = list(self.question_set.all())
        random.shuffle(questions)
        return questions[:self.number_of_questions] 

    def __str__(self):
        return f'quiz {self.title} topic {self.difficulty}'