CREATE DATABASE IF NOT EXISTS ai_smart_exam;
USE ai_smart_exam;

-- Tables will be managed by Django ORM migrations.
-- This file serves as documentation for the database schema.

CREATE TABLE users_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(128) NOT NULL,
    last_login DATETIME(6) NULL,
    is_superuser BOOLEAN NOT NULL,
    username VARCHAR(150) NOT NULL UNIQUE,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL,
    is_staff BOOLEAN NOT NULL,
    is_active BOOLEAN NOT NULL,
    date_joined DATETIME(6) NOT NULL,
    role VARCHAR(20) NOT NULL,
    student_id VARCHAR(50) NULL,
    department VARCHAR(100) NULL,
    year INT NULL,
    status VARCHAR(20) NOT NULL
);

CREATE TABLE exams_exam (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    description LONGTEXT NOT NULL,
    duration INT NOT NULL,
    total_marks INT NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at DATETIME(6) NOT NULL,
    created_by_id BIGINT NOT NULL,
    FOREIGN KEY (created_by_id) REFERENCES users_user(id)
);

CREATE TABLE questions_question (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description LONGTEXT NOT NULL,
    input_format LONGTEXT NOT NULL,
    output_format LONGTEXT NOT NULL,
    constraints LONGTEXT NOT NULL,
    marks INT NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    exam_id BIGINT NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exams_exam(id)
);

CREATE TABLE questions_testcase (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    input_data LONGTEXT NOT NULL,
    expected_output LONGTEXT NOT NULL,
    marks INT NOT NULL,
    is_hidden BOOLEAN NOT NULL,
    question_id BIGINT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions_question(id)
);

CREATE TABLE submissions_submission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code LONGTEXT NOT NULL,
    language VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    score INT NULL,
    execution_time DOUBLE NULL,
    memory_used DOUBLE NULL,
    submitted_at DATETIME(6) NOT NULL,
    question_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions_question(id),
    FOREIGN KEY (student_id) REFERENCES users_user(id)
);

CREATE TABLE submissions_testcaseresult (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(20) NOT NULL,
    obtained_marks INT NOT NULL,
    actual_output LONGTEXT NOT NULL,
    submission_id BIGINT NOT NULL,
    test_case_id BIGINT NOT NULL,
    FOREIGN KEY (submission_id) REFERENCES submissions_submission(id),
    FOREIGN KEY (test_case_id) REFERENCES questions_testcase(id)
);

CREATE TABLE results_result (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    total_marks INT NOT NULL,
    obtained_marks INT NOT NULL,
    percentage DOUBLE NOT NULL,
    status VARCHAR(20) NOT NULL,
    submitted_at DATETIME(6) NOT NULL,
    exam_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exams_exam(id),
    FOREIGN KEY (student_id) REFERENCES users_user(id)
);

CREATE TABLE ai_feedback_aifeedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    feedback LONGTEXT NOT NULL,
    time_complexity VARCHAR(50) NOT NULL,
    space_complexity VARCHAR(50) NOT NULL,
    suggestions LONGTEXT NOT NULL,
    created_at DATETIME(6) NOT NULL,
    submission_id BIGINT NOT NULL UNIQUE,
    FOREIGN KEY (submission_id) REFERENCES submissions_submission(id)
);
