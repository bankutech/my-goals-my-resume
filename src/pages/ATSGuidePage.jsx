import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ATSGuidePage() {
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

      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black tracking-tight mb-6">The Ultimate ATS Guide</h1>
        <p className="text-xl text-slate-500 mb-16">Understand how Applicant Tracking Systems work and why 75% of resumes are rejected by bots.</p>

        <article className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">What is an ATS?</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            An Applicant Tracking System (ATS) is software used by employers to scan, sort, and rank job applications. Before a human recruiter ever sees your resume, the ATS parses the text and scores it based on keywords, skills, and experience.
          </p>

          <h2 className="text-2xl font-bold mb-4">Why Resumes Fail the ATS</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Many modern resume builders prioritize complex designs over semantic structure. If an ATS cannot correctly parse the text, your experience is completely lost.
          </p>
          <ul className="space-y-3 mb-10 text-slate-600">
            <li className="flex gap-3"><span className="text-red-500 font-bold">X</span> <strong>Complex Tables:</strong> Columns and nested tables break text extraction.</li>
            <li className="flex gap-3"><span className="text-red-500 font-bold">X</span> <strong>Graphics & Charts:</strong> Skill progress bars cannot be read by bots.</li>
            <li className="flex gap-3"><span className="text-red-500 font-bold">X</span> <strong>Unusual Headers:</strong> Using "About Me" instead of "Professional Summary" confuses the parser.</li>
          </ul>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">How MyGoalsMyResuME Solves This</h2>
            <ul className="space-y-4 text-blue-800">
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-blue-600" /> Semantic HTML to perfectly structured PDFs.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-blue-600" /> Industry-standard section headers.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-blue-600" /> Zero unparseable graphics or complex layouts.</li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  );
}
