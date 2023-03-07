from rest_framework import serializers
from .models import Category 
from quiz.models import Quiz

class CategorySerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()
    class Meta:
        model=Category 
        fields = ['title', 'content']

    def get_content(self, obj):
        data = []
        quizes = Quiz.objects.filter(topic=obj)
        for quiz in quizes:
            content = {
                'id':quiz.id,
                'title':quiz.title,
                'number_of_questions':quiz.number_of_questions,
                'require_to_pass':quiz.require_to_pass,
                'time':quiz.time,
                'difficulty':quiz.difficulty,
            } 
            data.append(content)
        
        return data