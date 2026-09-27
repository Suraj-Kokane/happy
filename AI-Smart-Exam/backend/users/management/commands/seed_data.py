from django.core.management.base import BaseCommand
from users.models import User
from exams.models import Exam
from questions.models import Question, TestCase

class Command(BaseCommand):
    help = 'Seeds the database with initial demo data'

    def handle(self, *args, **kwargs):
        # Ensure an admin exists before creating exams
        admin = User.objects.filter(role='admin').first()
        if not admin:
            self.stdout.write(self.style.WARNING('No admin user found. Please create an admin user first. Skipping exam creation.'))
            return

        # Create Exam
        if not Exam.objects.filter(title='Python Programming Practical').exists():
            admin = User.objects.get(username='admin')
            exam = Exam.objects.create(
                title='Python Programming Practical',
                subject='Computer Science',
                description='This exam tests basic Python programming skills.',
                duration=30,
                total_marks=10,
                difficulty='Medium',
                status='published',
                created_by=admin
            )

            # Create Question
            question = Question.objects.create(
                exam=exam,
                title='Factorial of a Number',
                description='Write a Python program to calculate the factorial of a given number.',
                input_format='An integer n.',
                output_format='Print the factorial of n.',
                constraints='0 <= n <= 20',
                marks=10,
                difficulty='Medium'
            )

            # Create TestCases
            TestCase.objects.create(question=question, input_data='5', expected_output='120', marks=3, is_hidden=False)
            TestCase.objects.create(question=question, input_data='4', expected_output='24', marks=3, is_hidden=False)
            TestCase.objects.create(question=question, input_data='3', expected_output='6', marks=4, is_hidden=True)

            self.stdout.write(self.style.SUCCESS('Exam, Question and TestCases created.'))

        self.stdout.write(self.style.SUCCESS('Seed data generation complete!'))
