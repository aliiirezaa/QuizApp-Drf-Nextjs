from rest_framework import serializers 
from .models import Quiz 


class QuizSerializer(serializers.ModelSerializer):

    topic = serializers.SerializerMethodField()

    class Meta:

        model=Quiz 
        fields=['id', 'title', 'number_of_questions', 'require_to_pass', 'time', 'difficulty', 'topic']

    def get_topic(self, obj):
        return obj.topic.title 
    
