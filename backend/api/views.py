from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import (
    PersonalInfo, Experience, Project, Skill, 
    Education, Language, Interest
)
from .serializers import (
    PersonalInfoSerializer, ExperienceSerializer, ProjectSerializer,
    SkillSerializer, EducationSerializer, LanguageSerializer, InterestSerializer
)

class PersonalInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PersonalInfo.objects.all()
    serializer_class = PersonalInfoSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if queryset.exists():
            serializer = self.get_serializer(queryset.first())
            return Response(serializer.data)
        return Response({})

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class LanguageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class InterestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer

@api_view(['GET'])
def portfolio_summary(request):
    personal_info = PersonalInfo.objects.first()
    experiences = Experience.objects.all()
    projects = Project.objects.all()
    skills = Skill.objects.all()
    education = Education.objects.all()
    languages = Language.objects.all()
    interests = Interest.objects.all()
    
    return Response({
        'personal_info': PersonalInfoSerializer(personal_info).data if personal_info else None,
        'experiences': ExperienceSerializer(experiences, many=True).data,
        'projects': ProjectSerializer(projects, many=True).data,
        'skills': SkillSerializer(skills, many=True).data,
        'education': EducationSerializer(education, many=True).data,
        'languages': LanguageSerializer(languages, many=True).data,
        'interests': InterestSerializer(interests, many=True).data,
    })
    
    
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ContactMessage

@api_view(['POST'])
def contact_form(request):
    name = request.data.get('name')
    email = request.data.get('email')
    message = request.data.get('message')

    ContactMessage.objects.create(
        name=name,
        email=email,
        message=message
    )

    return Response({"success": True, "message": "Saved successfully"})