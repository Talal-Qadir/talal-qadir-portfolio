# Utility functions for the portfolio
from .models import PersonalInfo

def get_personal_info():
    """Get the personal info object, create if doesn't exist"""
    info, created = PersonalInfo.objects.get_or_create(
        id=1,
        defaults={
            'name': 'Muhammad Talal Qadir',
            'title': 'Django Backend Developer',
            'bio': 'Passionate full-stack developer with expertise in Django, React, and building scalable web applications.',
            'email': 'qadirmuhammadtalal@gmail.com',
            'phone': '+92-3361303071',
        }
    )
    return info