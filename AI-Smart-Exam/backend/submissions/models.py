from django.db import models
from users.models import User
from questions.models import Question, TestCase

class Submission(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    code = models.TextField()
    language = models.CharField(max_length=20)
    status = models.CharField(max_length=20, default='Pending') # Pending, Evaluating, Completed
    score = models.IntegerField(null=True, blank=True)
    execution_time = models.FloatField(null=True, blank=True)
    memory_used = models.FloatField(null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.question.title}"

class TestCaseResult(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE, related_name='test_results')
    test_case = models.ForeignKey(TestCase, on_delete=models.CASCADE)
    status = models.CharField(max_length=20) # Passed, Failed
    obtained_marks = models.IntegerField(default=0)
    actual_output = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.submission.id} - TC {self.test_case.id}"
