# AI-Driven Smart Programming Practical Examination System

## Problem Statement
Traditional programming examinations are often evaluated manually, which is time-consuming and prone to human error. Additionally, static code checkers lack the ability to provide nuanced feedback regarding time and space complexities or suggest algorithmic improvements. There is a need for a modern, AI-driven evaluation system that can automatically execute code, verify it against test cases, and provide actionable feedback.

## Objectives
- Build a full-stack automated programming evaluation platform.
- Implement an isolated code execution environment.
- Integrate an AI feedback system to provide insights on code quality.
- Provide separate dashboards for students and administrators.
- Deliver an interactive, dynamic, and visually appealing user interface.

## Features
- **Role-based Access Control**: Separate login and dashboards for Students and Admins.
- **Exam Management**: Admins can create and manage exams and questions.
- **Advanced Code Editor**: Integrated Monaco Editor with multi-language support (Python, Java, C, C++).
- **Timer & Auto-submit**: Secure countdown timer that auto-submits on expiration.
- **Automated Evaluation**: Code is run against hidden and public test cases to generate a score.
- **AI Feedback**: Automated feedback on time/space complexity and optimization suggestions.
- **Performance Analytics**: Visualized student progress and subject accuracy using charts.

## Architecture
The system follows a client-server architecture:
- **Frontend**: React + Vite SPA, styled with Tailwind CSS, utilizing JWT for session management.
- **Backend**: Django REST Framework API, handling authentication, exam data, and code submission.
- **Database**: MySQL relational database for robust data storage.
- **Code Execution Service**: An abstracted service designed to run code in isolated environments (simulated for demo).
- **AI Feedback Service**: Interfaces with LLMs to evaluate code or uses rule-based fallbacks.

## Technology Stack
- **Frontend**: React, Vite, Tailwind CSS v3, React Router, Axios, Monaco Editor, Recharts, Lucide React.
- **Backend**: Python, Django, Django REST Framework, Simple JWT, django-cors-headers.
- **Database**: MySQL.

## Folder Structure
```text
AI-Smart-Exam/
├── frontend/          # React SPA
├── backend/           # Django Project
├── database/          # SQL Schemas and Seeds
├── .env.example       # Environment configuration
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- MySQL

### Environment Configuration
1. Copy `.env.example` to `.env` in the root folder.
2. Update the credentials in `.env`.

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
# Activate virtual environment
# Windows: .\venv\Scripts\Activate.ps1
# Unix: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data # (Ensure you have a seed script or load data manually)
python manage.py runserver
```

### Database Setup
To initialize the database schema manually, you can run:
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```
*(Alternatively, use Django migrations as described above)*

## Demo Credentials
**Student**
- ID: `STU001`
- Password: `1234`

**Admin**
- Username: `admin`
- Password: `admin123`

## API Documentation
- `POST /api/auth/login/`: Authenticate user and get JWT tokens.
- `GET /api/student/dashboard/`: Retrieve student metrics and available exams.
- `GET /api/exams/{id}/`: Retrieve exam details and questions.
- `POST /api/submissions/`: Submit code for evaluation.
- `POST /api/code/run/`: Run code in the execution environment.
- `GET /api/results/{id}/`: Fetch detailed exam results.

## Security Architecture
- Passwords hashed via Django's `make_password` (PBKDF2).
- Route protection using JWT (JSON Web Tokens).
- Code execution is designed for isolated containerization (e.g., Docker, gVisor) to prevent malicious scripts from accessing host resources.

## Future Scope
- Integration with Docker for true containerized code execution.
- Advanced plagiarsim detection.
- Support for more programming languages.
- Integration with real-time proctoring (webcam & screen recording).

## Troubleshooting
- **CORS Errors**: Ensure `CORS_ALLOWED_ORIGINS` in Django settings matches the frontend URL.
- **MySQL Connection**: Verify `DB_USER` and `DB_PASSWORD` in `.env` and ensure the MySQL server is running.
- **Missing Dependencies**: Re-run `npm install` in frontend or `pip install -r requirements.txt` in backend.

## Viva Questions & Answers
**Q1: Why did you choose React for the frontend?**
A1: React provides a component-based architecture, efficient DOM updates via Virtual DOM, and a rich ecosystem (like Recharts and Monaco Editor) which is perfect for building an interactive code evaluation dashboard.

**Q2: How does the code execution service work securely?**
A2: In a production environment, the abstracted code executor runs user code inside isolated, short-lived Docker containers with strict CPU, memory, and network limits to prevent malicious activities.

**Q3: How does the AI feedback system function?**
A3: The system passes the student's code, output, and test case results to an LLM API (like OpenAI or Gemini) to analyze time/space complexity and suggest improvements. If the API is unavailable, a rule-based fallback generates standard feedback based on test case pass rates.

**Q4: What is the purpose of JWT?**
A4: JWT (JSON Web Token) is used for stateless authentication. It securely transmits information between the client and server. Once the user logs in, the server returns a token which the client includes in the HTTP headers of subsequent requests.
