from rest_framework import serializers 
from .models import Question, Answer 


class CorrentAnswerSerializer(serializers.Serializer):
    question = serializers.CharField(max_length=200, required=True)
   

class QuestionSerializer(serializers.ModelSerializer):
    topic = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()
    options = serializers.SerializerMethodField()
    number_of_questions = serializers.SerializerMethodField()
    class Meta:
        model=Question 
        fields=['text', 'topic', 'time', 'number_of_questions', 'options']

    def get_topic(self, obj):
        return obj.quiz.topic.title
    
    def get_number_of_questions(self, obj):
        return obj.quiz.number_of_questions
    
    def get_time(self, obj):
        return obj.quiz.time
    
    def get_options(self, obj):
        data = []
        answers =  obj.get_answers()
        for ans in answers:
           data.append(ans.text)

        return data 


class AnswerSerializer(serializers.ModelSerializer):
    corrent_answer = serializers.CharField(source='text')
    class Meta:
        model=Answer 
        fields=['corrent_answer']
