from django.db import models
from quiz.models import Quiz
# Create your models here.

class Question(models.Model):
    text = models.CharField(max_length=200)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'question'
        verbose_name_plural = 'questions Module'

    def __str__(self):
        return f'que: {self.text} difficulty: {self.quiz.difficulty}'
    
    def get_answers(self):
        return self.answer_set.all() 

class Answer(models.Model):
    text = models.CharField(max_length=200)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    correct = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'answer'
        verbose_name_plural = 'answers Module'

    def __str__(self):
        return f'que: {self.question.text} ans {self.text}'
