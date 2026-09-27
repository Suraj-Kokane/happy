import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { demoExams } from '../../data/demoData';
import { Clock, BookOpen, Target, AlertTriangle } from 'lucide-react';

const ExamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  
  const exam = demoExams.find(e => e.id === parseInt(id));

  if (!exam) return <div className="text-white p-8">Exam not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
        
        <h1 className="text-3xl font-bold text-white mb-2">{exam.title}</h1>
        <p className="text-textSecondary text-lg mb-8">{exam.subject}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-y border-border py-6">
          <div className="text-center">
            <Clock className="mx-auto text-primary mb-2" size={28} />
            <p className="text-textSecondary text-sm mb-1">Duration</p>
            <p className="text-white font-bold text-lg">{exam.duration} Minutes</p>
          </div>
          <div className="text-center">
            <BookOpen className="mx-auto text-secondary mb-2" size={28} />
            <p className="text-textSecondary text-sm mb-1">Questions</p>
            <p className="text-white font-bold text-lg">{exam.questionsCount}</p>
          </div>
          <div className="text-center">
            <Target className="mx-auto text-accent mb-2" size={28} />
            <p className="text-textSecondary text-sm mb-1">Max Marks</p>
            <p className="text-white font-bold text-lg">{exam.totalMarks}</p>
          </div>
          <div className="text-center">
            <AlertTriangle className="mx-auto text-yellow-400 mb-2" size={28} />
            <p className="text-textSecondary text-sm mb-1">Difficulty</p>
            <p className="text-white font-bold text-lg">{exam.difficulty}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Instructions</h3>
            <ul className="space-y-3 text-textSecondary list-disc pl-5">
              <li>Allowed Languages: Python, Java, C, C++</li>
              <li>Read the problem statement carefully before writing the code.</li>
              <li>Your code will be evaluated against hidden test cases.</li>
              <li>Do not refresh or close the browser window during the exam.</li>
              <li>The exam will auto-submit when the timer reaches 00:00.</li>
            </ul>
          </div>
          
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-start space-x-3">
            <input 
              type="checkbox" 
              id="agree" 
              className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-800 focus:ring-primary text-primary"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agree" className="text-white font-medium select-none cursor-pointer">
              I have read and understood the instructions. I am ready to begin the exam.
            </label>
          </div>
          
          <div className="flex justify-end gap-4 mt-8">
            <button onClick={() => navigate(-1)} className="btn-secondary">
              Cancel
            </button>
            <button 
              onClick={() => navigate(`/coding-exam/${exam.id}`)}
              disabled={!agreed}
              className="btn-primary px-8"
            >
              Start Examination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetails;
