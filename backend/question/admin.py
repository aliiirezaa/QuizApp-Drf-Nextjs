from django.contrib import admin
from .models import Question, Answer
# Register your models here.

class AnswerAdmin(admin.TabularInline):
    model = Answer

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerAdmin]


admin.site.register(Answer)