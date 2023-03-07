from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status  
from .serializers import ResultSerializer
from .models import Result 
from quiz.models import Quiz
from question.models import Question, Answer
from django.contrib.auth import get_user_model
import math
# Create your views here. 
User = get_user_model() 

@api_view(['POST'])
def quiz_process_view(request, *args, **kwargs):
    id = kwargs['id']
    data = request.data 
   
   
      
    try: 
        questions = []
        quiz = Quiz.objects.get(id=id)
        for q in data.keys():
            question = Question.objects.get(text=q)
            questions.append(question) 
       
        score_correct = 0 
        score_incorrect = 0 
        score_null = 0 
        multiplier  = 100 / quiz.number_of_questions 
        for q in questions:
            user_selected = data[q.text]
           
            if user_selected != None:
                answers = Answer.objects.filter(question=q)
              
                for ans in answers:  
                    if user_selected == ans.text:
                        if ans.correct:
                            score_correct+=1 
                        else:
                            score_incorrect += 1 
            else:
                score_null += 1  
      
        score_correct_ = score_correct * multiplier
        score_null_ = score_null * multiplier 
        score_incorrect_ = 100 - math.fabs(score_correct_ - score_null_) 
        
        user = User.objects.get(username="admin")
        result = Result.objects.create(user=user, quiz=quiz, score_correct=score_correct_, score_incorrect=score_incorrect_, score_null=score_null_)
        return Response(data=ResultSerializer(result).data, status=status.HTTP_200_OK)        
    except Exception as e:
        
        return Response(data={'message':e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

