import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { demoEvaluation, demoTestCases, demoExams, demoUser } from '../../data/demoData';
import { CheckCircle, XCircle, Download, ArrowLeft, RotateCcw, AlertTriangle, Zap, Code2, Clock } from 'lucide-react';

const ResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = demoExams.find(e => e.id === parseInt(id)) || demoExams[0];

  const percentage = (demoEvaluation.score / demoEvaluation.total) * 100;
  const isPass = percentage >= 40;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-[fadeIn_0.5s_ease-out]">
      
      {/* Header Summary */}
      <div className="glass-card p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[100px] ${isPass ? 'bg-green-500/20' : 'bg-red-500/20'}`}></div>
        
        <div className="z-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-white mb-2">Examination Result</h1>
          <p className="text-textSecondary text-lg">{exam.title}</p>
          <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="bg-card px-4 py-2 rounded-lg border border-border">
              <span className="text-textSecondary text-sm block">Student</span>
              <span className="text-white font-medium">{demoUser.name} ({demoUser.student_id})</span>
            </div>
            <div className="bg-card px-4 py-2 rounded-lg border border-border">
              <span className="text-textSecondary text-sm block">Submission Time</span>
              <span className="text-white font-medium">Just now</span>
            </div>
          </div>
        </div>

        <div className="z-10 flex flex-col items-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" className="stroke-card" strokeWidth="12" fill="none" />
              <circle cx="64" cy="64" r="56" className={isPass ? 'stroke-accent' : 'stroke-red-500'} strokeWidth="12" fill="none" strokeDasharray="351.858" strokeDashoffset={351.858 - (351.858 * percentage) / 100} style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-bold text-white">{percentage}%</span>
            </div>
          </div>
          <div className={`mt-4 px-6 py-1.5 rounded-full font-bold text-lg border ${isPass ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
            {isPass ? 'PASS' : 'FAIL'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Test Cases */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code2 className="text-primary" /> Test Case Results
          </h2>
          <div className="space-y-3">
            {demoTestCases.map((tc, index) => {
              const res = demoEvaluation.testResults.find(r => r.id === tc.id);
              return (
                <div key={tc.id} className="bg-card/50 border border-border p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {res?.passed ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                    <div>
                      <span className="text-white font-medium">Test Case {index + 1} {tc.hidden && '(Hidden)'}</span>
                      <p className="text-textSecondary text-xs">Marks: {res?.passed ? tc.marks : 0} / {tc.marks}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${res?.passed ? 'text-green-400' : 'text-red-400'}`}>
                    {res?.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Feedback */}
        <div className="glass-card p-6 border-l-4 border-l-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px]"></div>
          
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
            <Zap className="text-secondary" fill="currentColor" /> AI Feedback
          </h2>
          
          <div className="relative z-10 space-y-6">
            <p className="text-white/90 leading-relaxed bg-white/5 p-4 rounded-lg">
              {demoEvaluation.feedback.text}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/80 p-3 rounded-lg border border-border">
                <span className="text-textSecondary text-xs flex items-center gap-1 mb-1"><Clock size={12}/> Time Complexity</span>
                <span className="text-white font-mono font-bold">{demoEvaluation.feedback.timeComplexity}</span>
              </div>
              <div className="bg-card/80 p-3 rounded-lg border border-border">
                <span className="text-textSecondary text-xs flex items-center gap-1 mb-1"><Code2 size={12}/> Space Complexity</span>
                <span className="text-white font-mono font-bold">{demoEvaluation.feedback.spaceComplexity}</span>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={18} /> Suggestions for Improvement
              </h3>
              <ul className="space-y-2">
                {demoEvaluation.feedback.suggestions.map((sug, i) => (
                  <li key={i} className="flex items-start gap-2 text-textSecondary text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-end pt-4">
        <button onClick={() => navigate('/dashboard')} className="btn-secondary flex items-center gap-2">
          <ArrowLeft size={18} /> Dashboard
        </button>
        <button className="btn-secondary flex items-center gap-2">
          <Download size={18} /> Download Result
        </button>
        <button onClick={() => navigate('/dashboard')} className="btn-primary flex items-center gap-2">
          <RotateCcw size={18} /> Take Another Exam
        </button>
      </div>

    </div>
  );
};

export default ResultPage;
