from django.db import models
from submissions.models import Submission

class AIFeedback(models.Model):
    submission = models.OneToOneField(Submission, on_delete=models.CASCADE)
    feedback = models.TextField()
    time_complexity = models.CharField(max_length=50)
    space_complexity = models.CharField(max_length=50)
    suggestions = models.TextField() # Can store JSON or newline separated text
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"AI Feedback for Sub: {self.submission.id}"
