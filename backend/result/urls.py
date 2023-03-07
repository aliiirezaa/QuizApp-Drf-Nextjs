from django.urls import path 
from .views import quiz_process_view
urlpatterns = [
    path('result/<id>/', quiz_process_view, name="quiz_process_view"),

]