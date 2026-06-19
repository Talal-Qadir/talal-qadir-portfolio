from django.db import models
from django.utils import timezone

class PersonalInfo(models.Model):
    name = models.CharField(max_length=100, default="Muhammad Talal Qadir")
    title = models.CharField(max_length=200, default="Django Backend Developer")
    bio = models.TextField(blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    email = models.EmailField(default="qadirmuhammadtalal@gmail.com")
    phone = models.CharField(max_length=20, default="+92-3361303071")
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    image2 = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Experience(models.Model):
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    order = models.IntegerField(default=0)
    

    class Meta:
        ordering = ['order', '-start_date']

    def __str__(self):
        return f"{self.position} at {self.company}"

class Responsibility(models.Model):
    experience = models.ForeignKey(Experience, related_name='responsibilities', on_delete=models.CASCADE)
    text = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.text[:50]

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.CharField(max_length=500, help_text="Comma separated technologies")
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    order = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    def get_tech_list(self):
        return [tech.strip() for tech in self.tech_stack.split(',') if tech.strip()]

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('language', 'Languages'),
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('apps', 'App Development'),
        ('cloud', 'Cloud'),
        ('tools', 'Tools'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    icon_class = models.CharField(max_length=100, blank=True, help_text="Font Awesome class")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['category', 'order']

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"

class Education(models.Model):
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.degree} at {self.institution}"

class Language(models.Model):
    name = models.CharField(max_length=100)
    proficiency = models.CharField(max_length=50, default="Fluent")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} ({self.proficiency})"

class Interest(models.Model):
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name
    
    

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"