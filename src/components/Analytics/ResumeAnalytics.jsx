import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

// const ACTION_VERBS = ['achieved', 'improved', 'developed', 'managed', 'created', 'led', 'increased', 'reduced', 'spearheaded', 'architected', 'designed', 'delivered'];

export default function ResumeAnalytics({ data, onClose }) {
  const [score, setScore] = useState(0);
  const [missing, setMissing] = useState([]);
  const [good, setGood] = useState([]);
  const [jobDesc, setJobDesc] = useState('');
  const [matchScore, setMatchScore] = useState(null);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const analyzeResume = () => {
      let currentScore = 100;
      const missingItems = [];
      const goodItems = [];

      // Length check
      const allText = JSON.stringify(data).toLowerCase();
      if (allText.length < 500) {
        currentScore -= 15;
        missingItems.push({ title: 'Resume is too short', desc: 'Add more details to your experience and projects.' });
      } else {
        goodItems.push('Good resume length');
      }

      // Links check
      if (!data.personal_linkedin && !data.personal_github) {
        currentScore -= 10;
        missingItems.push({ title: 'Missing Professional Links', desc: 'Add your LinkedIn or GitHub profile.' });
      } else {
        goodItems.push('Includes professional links');
      }

      // Experience checks
      if (!data.experience || data.experience.length === 0) {
        currentScore -= 20;
        missingItems.push({ title: 'Missing Experience', desc: 'Add at least one professional experience.' });
      } else {
        let hasMetrics = false;
        let weakVerbs = 0;
        
        data.experience.forEach(exp => {
          if (exp.details) {
            // Check for numbers/percentages
            if (/\d+/.test(exp.details) || /%/.test(exp.details)) {
              hasMetrics = true;
            }
            
            // Check for weak verbs
            const text = exp.details.toLowerCase();
            if (text.includes('worked on') || text.includes('responsible for') || text.includes('helped with')) {
              weakVerbs++;
            }
          }
        });

        if (!hasMetrics) {
          currentScore -= 15;
          missingItems.push({ title: 'Missing Metrics in Experience', desc: 'Quantify your achievements with numbers or percentages (e.g., "Increased sales by 20%").' });
        } else {
          goodItems.push('Contains quantified achievements');
        }

        if (weakVerbs > 0) {
          currentScore -= 10;
          missingItems.push({ title: 'Weak Action Verbs Detected', desc: 'Replace "worked on" or "responsible for" with strong verbs like "developed", "led", or "achieved".' });
        } else {
          goodItems.push('Uses strong action verbs');
        }
      }

      // Certifications
      if (!data.certifications || data.certifications.length === 0) {
        currentScore -= 5;
        missingItems.push({ title: 'No Certifications', desc: 'Consider adding certifications to stand out.' });
      } else {
        goodItems.push('Includes certifications');
      }

      setScore(Math.max(0, currentScore));
      setMissing(missingItems);
      setGood(goodItems);
    };

    analyzeResume();
  }, [data]);

  const handleMatch = async () => {
    if (!jobDesc.trim()) return;
    setIsScanning(true);
    
    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: JSON.stringify(data), jobDescription: jobDesc })
      });
      const result = await res.json();
      setMatchScore(result.matchScore);
      setMissingKeywords(result.missingKeywords);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Sparkles size={20} className="mr-2 text-indigo-500" /> 
            Resume Intelligence
          </h2>
          <button onClick={onClose} className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition shadow-sm">
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-8">
          
          {/* Left Side: ATS Score */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">ATS Readiness Score</h3>
              <div className={`text-6xl font-black mb-2 ${score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                {score}
              </div>
              <p className="text-sm text-gray-500">Out of 100</p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <AlertCircle size={16} className="mr-2 text-red-500" /> 
                Needs Improvement
              </h4>
              <div className="space-y-3">
                {missing.map((item, idx) => (
                  <div key={idx} className="bg-red-50 p-3 rounded-lg border border-red-100">
                    <h5 className="font-semibold text-red-800 text-sm">{item.title}</h5>
                    <p className="text-xs text-red-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <CheckCircle2 size={16} className="mr-2 text-green-500" /> 
                Looking Good
              </h4>
              <ul className="space-y-2">
                {good.map((item, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <CheckCircle2 size={14} className="mr-2 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Job Match */}
          <div className="flex-1 bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 flex flex-col">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">Job Description Match</h3>
            <p className="text-sm text-indigo-700/80 mb-4">Paste the job description you are applying for to see how well your resume matches.</p>
            
            <textarea 
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste job description here..."
              className="w-full flex-1 min-h-[150px] p-3 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none mb-4"
            />
            
            <button 
              onClick={handleMatch}
              disabled={isScanning || !jobDesc.trim()}
              className="w-full py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition flex justify-center items-center"
            >
              {isScanning ? <><RefreshCw size={18} className="animate-spin mr-2" /> Scanning...</> : 'Analyze Match'}
            </button>

            {matchScore !== null && !isScanning && (
              <div className="mt-6 pt-6 border-t border-indigo-100 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-end justify-between mb-2">
                  <span className="font-bold text-indigo-900">Match Score</span>
                  <span className="text-2xl font-black text-indigo-600">{matchScore}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 shadow-inner border border-indigo-100 mb-6">
                  <div className="bg-indigo-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${matchScore}%` }}></div>
                </div>

                <h4 className="text-sm font-bold text-indigo-900 mb-2">Missing Keywords to Add:</h4>
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white text-xs font-semibold text-red-600 rounded-md border border-red-200 shadow-sm">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
