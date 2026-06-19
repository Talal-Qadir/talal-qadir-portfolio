from rest_framework import serializers
from .models import (
    PersonalInfo, Experience, Responsibility, Project, 
    Skill, Education, Language, Interest
)

class ResponsibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsibility
        fields = ['id', 'text', 'order']

class ExperienceSerializer(serializers.ModelSerializer):
    responsibilities = ResponsibilitySerializer(many=True, read_only=True)
    
    class Meta:
        model = Experience
        fields = ['id', 'company', 'location', 'position', 'start_date', 
                 'end_date', 'is_current', 'description', 'responsibilities', 'order']

class ProjectSerializer(serializers.ModelSerializer):
    tech_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'tech_stack', 'tech_list', 
                 'live_url', 'github_url', 'image', 'order', 'is_featured']
    
    def get_tech_list(self, obj):
        return obj.get_tech_list()

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'icon_class', 'order']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'institution', 'degree', 'field_of_study', 'location', 
                 'start_date', 'end_date', 'description', 'order']

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'name', 'proficiency', 'order']

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'name', 'order']

class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        fields = ['id', 'name', 'title', 'bio', 'summary', 'email', 'phone', 
                 'linkedin', 'github', 'profile_image', 'image2', 'resume_file', 'updated_at']