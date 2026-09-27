from django.db import models
from users.models import User

class Exam(models.fields.Field):
    pass # Re-declare below

class Exam(models.Model):
    title = models.CharField(max_length=200)
    subject = models.CharField(max_length=200)
    description = models.TextField()
    duration = models.IntegerField(help_text="Duration in minutes")
    total_marks = models.IntegerField()
    difficulty = models.CharField(max_length=20, choices=[('Easy', 'Easy'), ('Medium', 'Medium'), ('Hard', 'Hard')])
    status = models.CharField(max_length=20, choices=[('draft', 'Draft'), ('published', 'Published')])
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
