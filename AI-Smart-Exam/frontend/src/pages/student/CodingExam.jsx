import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { demoExams, demoQuestion } from '../../data/demoData';
import { Play, Send, RotateCcw, Clock, CheckCircle } from 'lucide-react';

const CodingExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = demoExams.find(e => e.id === parseInt(id));
  
  const [timeLeft, setTimeLeft] = useState(exam ? exam.duration * 60 : 1800);
  const [code, setCode] = useState('# Write your Python code here\n\ndef factorial(n):\n    # Your logic here\n    pass\n\nif __name__ == "__main__":\n    n = int(input())\n    print(factorial(n))');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setOutput({
        type: 'success',
        input: '5',
        output: '120',
        expected: '120',
        time: '0.04s',
        memory: '12 MB'
      });
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigate(`/result/${id}`);
    }, 2500); // simulate evaluation animation delay
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!exam) return <div className="p-8 text-white">Exam not found.</div>;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      {/* Top Bar */}
      <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
        <h1 className="text-xl font-bold text-white">{exam.title}</h1>
        
        <div className={`flex items-center space-x-2 px-4 py-1.5 rounded-full font-bold text-lg
          ${timeLeft < 60 ? 'bg-red-500/20 text-red-500 animate-pulse' : 
            timeLeft < 300 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-primary/20 text-primary'}`}>
          <Clock size={20} />
          <span>{formatTime(timeLeft)}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-background border border-border text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
          </select>
          <button onClick={handleRun} disabled={isRunning || isSubmitting} className="btn-secondary py-1.5 flex items-center space-x-2">
            <Play size={16} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
          <button onClick={handleSubmit} disabled={isSubmitting} className="btn-primary py-1.5 flex items-center space-x-2">
            <Send size={16} />
            <span>Submit</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        
        {/* Left Panel: Question */}
        <div className="w-full lg:w-[40%] flex flex-col border-r border-border bg-[#0b0f19]">
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <h2 className="text-2xl font-bold text-white mb-2">Question 1: {demoQuestion.title}</h2>
            <div className="mb-6 flex gap-2">
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded font-medium">Medium</span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded font-medium">{demoQuestion.marks} Marks</span>
            </div>
            
            <div className="prose prose-invert max-w-none text-textSecondary space-y-6">
              <div>
                <p>{demoQuestion.description}</p>
              </div>
              
              <div>
                <h3 className="text-white font-semibold">Input Format</h3>
                <p>{demoQuestion.inputFormat}</p>
              </div>
              
              <div>
                <h3 className="text-white font-semibold">Output Format</h3>
                <p>{demoQuestion.outputFormat}</p>
              </div>
              
              <div>
                <h3 className="text-white font-semibold">Constraints</h3>
                <div className="bg-card/50 p-3 rounded-lg border border-border inline-block font-mono text-sm text-primary">
                  {demoQuestion.constraints}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-semibold">Example</h3>
                <div className="bg-card/50 p-4 rounded-lg border border-border mt-2 space-y-4 font-mono text-sm">
                  <div>
                    <span className="text-textSecondary block mb-1">Input:</span>
                    <div className="text-white">{demoQuestion.example.input}</div>
                  </div>
                  <div>
                    <span className="text-textSecondary block mb-1">Output:</span>
                    <div className="text-white">{demoQuestion.example.output}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Editor & Output */}
        <div className="w-full lg:w-[60%] flex flex-col min-h-0 bg-[#1e1e1e]">
          {isSubmitting ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-background/90 z-50">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6"></div>
              <h2 className="text-2xl font-bold text-white mb-2">AI Evaluating Your Code...</h2>
              <div className="space-y-2 text-textSecondary text-center animate-pulse">
                <p>✓ Code received</p>
                <p>✓ Syntax checked</p>
                <p>✓ Test cases executing</p>
                <p>Analyzing performance...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  defaultLanguage="python"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(val) => setCode(val)}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 15,
                    fontFamily: 'JetBrains Mono, monospace',
                    padding: { top: 16 },
                  }}
                />
              </div>

              {/* Console Output */}
              <div className="h-64 shrink-0 bg-[#0B0F19] border-t border-border flex flex-col">
                <div className="px-4 py-2 border-b border-border bg-card flex justify-between items-center text-sm font-medium">
                  <span className="text-white">Console Output</span>
                  <button onClick={() => setOutput(null)} className="text-textSecondary hover:text-white flex items-center gap-1">
                    <RotateCcw size={14} /> Clear
                  </button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
                  {!output && !isRunning && (
                    <div className="text-textSecondary text-center mt-10">Run your code to see the output here.</div>
                  )}
                  {isRunning && (
                    <div className="text-primary flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      Running code in isolated environment...
                    </div>
                  )}
                  {output && (
                    <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                      <div className="flex justify-between items-center bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg text-green-400">
                        <span className="font-bold flex items-center gap-2"><CheckCircle size={16}/> Accepted</span>
                        <div className="flex gap-4 text-xs">
                          <span>Time: {output.time}</span>
                          <span>Memory: {output.memory}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card p-3 rounded-lg border border-border">
                          <span className="text-textSecondary text-xs block mb-1">Input</span>
                          <div className="text-white">{output.input}</div>
                        </div>
                        <div className="bg-card p-3 rounded-lg border border-border">
                          <span className="text-textSecondary text-xs block mb-1">Your Output</span>
                          <div className="text-white">{output.output}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default CodingExam;
