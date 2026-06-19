from django.urls import path, include
from django.urls import path
from .views import contact_form

from rest_framework.routers import DefaultRouter
from .views import (
    PersonalInfoViewSet, ExperienceViewSet, ProjectViewSet,
    SkillViewSet, EducationViewSet, LanguageViewSet, InterestViewSet,
    portfolio_summary
)

router = DefaultRouter()
router.register(r'personal-info', PersonalInfoViewSet, basename='personal-info')
router.register(r'experiences', ExperienceViewSet, basename='experiences')
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'skills', SkillViewSet, basename='skills')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'languages', LanguageViewSet, basename='languages')
router.register(r'interests', InterestViewSet, basename='interests')

urlpatterns = [
    path('', include(router.urls)),
    path('portfolio-summary/', portfolio_summary, name='portfolio-summary'),
    path('contact/', contact_form),

]