from django.contrib import admin
from .models import (
    PersonalInfo, Experience, Responsibility, Project, 
    Skill, Education, Language, Interest
)

@admin.register(PersonalInfo)
class PersonalInfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'updated_at']
    fieldsets = (
        ('Personal Details', {
            'fields': ('name', 'title', 'bio', 'summary', 'profile_image', 'image2', 'resume_file')
        }),
        ('Contact Info', {
            'fields': ('email', 'phone', 'linkedin', 'github')
        }),
    )

class ResponsibilityInline(admin.TabularInline):
    model = Responsibility
    extra = 1
    ordering = ['order']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['position', 'company', 'location', 'start_date', 'is_current']
    list_filter = ['is_current', 'company']
    search_fields = ['position', 'company', 'description']
    inlines = [ResponsibilityInline]
    ordering = ['order']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'tech_stack', 'is_featured', 'order']
    list_filter = ['is_featured']
    search_fields = ['title', 'description', 'tech_stack']
    ordering = ['order']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'order']
    list_filter = ['category']
    search_fields = ['name']
    ordering = ['category', 'order']

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['institution', 'degree', 'field_of_study', 'start_date', 'end_date']
    search_fields = ['institution', 'degree', 'field_of_study']

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ['name', 'proficiency', 'order']

@admin.register(Interest)
class InterestAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    
from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    readonly_fields = ('name', 'email', 'message', 'created_at')