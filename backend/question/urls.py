from django.urls import path 
from .views import quiz_view, corrent_answer
urlpatterns = [
    path('quiz/<id>/', quiz_view, name="quiz_view"),
    path('quiz/correct/answer/', corrent_answer, name="corrent_answer"),
]