import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb } from 'lucide-react';

export default function ResumeTipsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter selection:bg-blue-500/30">
      <nav className="border-b border-slate-200/50 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold text-sm">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <span className="font-extrabold text-lg tracking-tight">MyGoalsMyResuME</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black tracking-tight mb-6">Expert Resume Tips</h1>
        <p className="text-xl text-slate-500 mb-16 max-w-2xl">Actionable advice to elevate your content and impress hiring managers.</p>

        <div className="space-y-12">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                <Lightbulb size={20} />
              </div>
              <h2 className="text-2xl font-bold">Use the XYZ Formula</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              Google recruiters recommend structuring your bullet points using the XYZ formula: 
              <strong> "Accomplished [X] as measured by [Y], by doing [Z]."</strong>
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-sm border border-slate-100">
              <span className="text-red-500 font-bold mr-2">Weak:</span> Increased server performance.<br/><br/>
              <span className="text-emerald-600 font-bold mr-2">Strong:</span> Reduced server response time by 40% (Y) improving user retention (X) by implementing Redis caching (Z).
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Lightbulb size={20} />
              </div>
              <h2 className="text-2xl font-bold">Tailor Keywords to the Job</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              Applicant Tracking Systems rank candidates based on keyword matches. If the job description asks for "React.js", don't just write "JavaScript". Mirror the exact phrasing used in the job description.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Lightbulb size={20} />
              </div>
              <h2 className="text-2xl font-bold">Keep it to One Page</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              Unless you have more than 10 years of highly relevant experience, force your resume onto a single page. Recruiters skim resumes in 6 seconds. Be ruthless about cutting older, irrelevant jobs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
