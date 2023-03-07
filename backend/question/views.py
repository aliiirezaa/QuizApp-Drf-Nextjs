from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from rest_framework import status 
from .serializers import QuestionSerializer, AnswerSerializer, CorrentAnswerSerializer
from quiz.models import Quiz
from .models import Answer, Question

# Create your views here.

@api_view(['GET'])
def quiz_view(request, *args, **kwargs):
    id = kwargs.get('id')
    quiz = Quiz.objects.get(id=id)
    questions = quiz.get_questions()
    serializer = QuestionSerializer(questions, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def corrent_answer(request, *args, **kwargs):
    data = request.data 
   
    serializer = CorrentAnswerSerializer(data=data)
    if serializer.is_valid():
        qu = serializer.validated_data['question'] 
        try:
            answers = Answer.objects.filter(question__text=qu, correct=True)
            if answers.exists(): 
                answer = answers.first() 
                return Response(data=AnswerSerializer(answer).data, status=status.HTTP_200_OK)
            return Response( status=status.HTTP_404_NOT_FOUND)
    
        
        except Answer.DoesNotExist as e:
            return Response(data=e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

