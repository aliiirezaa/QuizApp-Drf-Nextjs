from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status 
from .serializers import  CategorySerializer 
from .models import Category
# Create your views here.

@api_view(['GET'])
def category_view(request):
    topic = Category.objects.filter(active=True) 
    
    return Response(data=CategorySerializer(topic, many=True).data, status=status.HTTP_200_OK)

