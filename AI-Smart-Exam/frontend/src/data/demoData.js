export const demoUser = {
  id: 1,
  name: 'Anand Bankar',
  student_id: 'STU001',
  department: 'Computer Engineering',
  year: 3,
  role: 'student'
};

export const demoStats = {
  totalExams: 5,
  completed: 3,
  averageScore: 82,
  rank: 7,
};

export const demoExams = [
  {
    id: 1,
    title: 'Python Programming Practical',
    subject: 'Computer Science',
    duration: 30, // minutes
    questionsCount: 1,
    totalMarks: 10,
    difficulty: 'Medium',
    status: 'Available'
  },
  {
    id: 2,
    title: 'Data Structures with C++',
    subject: 'Computer Science',
    duration: 60,
    questionsCount: 3,
    totalMarks: 30,
    difficulty: 'Hard',
    status: 'Available'
  }
];

export const demoQuestion = {
  id: 1,
  title: 'Factorial of a Number',
  description: 'Write a Python program to calculate the factorial of a given number.',
  inputFormat: 'An integer n.',
  outputFormat: 'Print the factorial of n.',
  constraints: '0 <= n <= 20',
  example: {
    input: '5',
    output: '120'
  }
};

export const demoTestCases = [
  { id: 1, input: '5', expected: '120', marks: 3 },
  { id: 2, input: '4', expected: '24', marks: 3 },
  { id: 3, input: '3', expected: '6', marks: 4, hidden: true }
];

export const demoEvaluation = {
  score: 8,
  total: 10,
  time: '0.04 seconds',
  memory: '12 MB',
  status: 'Accepted',
  testResults: [
    { id: 1, passed: true },
    { id: 2, passed: true },
    { id: 3, passed: false } // partial
  ],
  feedback: {
    text: 'Your solution correctly implements factorial calculation and passes most test cases.',
    suggestions: [
      'Handle invalid or negative input.',
      'Test additional edge cases.',
      'Improve input validation.',
      'Review failed test cases.'
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  }
};

export const demoPerformanceData = [
  { name: 'Exam 1', score: 75 },
  { name: 'Exam 2', score: 85 },
  { name: 'Exam 3', score: 80 }
];
