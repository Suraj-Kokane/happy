from django.db import models
from users.models import User
from exams.models import Exam

class Result(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    total_marks = models.IntegerField()
    obtained_marks = models.IntegerField()
    percentage = models.FloatField()
    status = models.CharField(max_length=20) # PASS, FAIL
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.exam.title} - {self.status}"
