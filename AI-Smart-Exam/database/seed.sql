USE ai_smart_exam;

-- Seed data for testing and demonstration

-- Users should be created manually via Django admin or shell

-- Exam
INSERT INTO exams_exam (title, subject, description, duration, total_marks, difficulty, status, created_at, created_by_id)
VALUES ('Python Programming Practical', 'Computer Science', 'This exam tests basic Python programming skills.', 30, 10, 'Medium', 'published', NOW(), 1);

-- Question
INSERT INTO questions_question (title, description, input_format, output_format, constraints, marks, difficulty, exam_id)
VALUES ('Factorial of a Number', 'Write a Python program to calculate the factorial of a given number.', 'An integer n.', 'Print the factorial of n.', '0 <= n <= 20', 10, 'Medium', 1);

-- Testcases
INSERT INTO questions_testcase (input_data, expected_output, marks, is_hidden, question_id)
VALUES ('5', '120', 3, 0, 1),
       ('4', '24', 3, 0, 1),
       ('3', '6', 4, 1, 1);
