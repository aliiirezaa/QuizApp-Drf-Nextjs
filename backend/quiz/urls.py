from django.urls import path 
from .views import quiz_data

urlpatterns = [
    path('quizes/', quiz_data, name="quizes"),

]