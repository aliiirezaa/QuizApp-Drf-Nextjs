from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status 
from .serializers import QuizSerializer 
from .models import Quiz

# Create your views here.

@api_view(['GET'])
def quiz_data(request, *args, **kwargs):
    quizes = Quiz.objects.filter(topic__active=True)
    serializer = QuizSerializer(quizes, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)

