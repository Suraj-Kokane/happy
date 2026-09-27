from django.db import models
from exams.models import Exam

class Question(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')
    title = models.CharField(max_length=200)
    description = models.TextField()
    input_format = models.TextField()
    output_format = models.TextField()
    constraints = models.TextField()
    marks = models.IntegerField()
    difficulty = models.CharField(max_length=20, choices=[('Easy', 'Easy'), ('Medium', 'Medium'), ('Hard', 'Hard')])

    def __str__(self):
        return self.title

class TestCase(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='testcases')
    input_data = models.TextField()
    expected_output = models.TextField()
    marks = models.IntegerField()
    is_hidden = models.BooleanField(default=False)

    def __str__(self):
        return f"TestCase for {self.question.title}"
