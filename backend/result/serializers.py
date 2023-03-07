from rest_framework import serializers 
from .models import Result 

class ResultSerializer(serializers.ModelSerializer):
    passed = serializers.SerializerMethodField()
    require_to_pass = serializers.SerializerMethodField()
    class Meta:
        model=Result 
        fields=['score_correct','score_incorrect','score_null', 'passed', 'require_to_pass']
    
    def get_passed(self, obj):
        require_to_pass = obj.quiz.require_to_pass 
        score_correct = obj.score_correct 
        if require_to_pass <= score_correct:
            return True 
        else:
            return False
    
    def get_require_to_pass(slef, obj):
        return obj.quiz.require_to_pass