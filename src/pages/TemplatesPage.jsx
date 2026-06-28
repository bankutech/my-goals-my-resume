import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutTemplate } from 'lucide-react';

export default function TemplatesPage() {
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
        <h1 className="text-5xl font-black tracking-tight mb-6">Resume Templates</h1>
        <p className="text-xl text-slate-500 mb-16 max-w-2xl">Professionally designed templates that guarantee perfect ATS compatibility without sacrificing aesthetics.</p>

        <div className="grid sm:grid-cols-2 gap-10">
          {[
            { name: "Classic ATS", desc: "The gold standard for corporate roles. Clean, traditional, and 100% machine readable." },
            { name: "Modern Executive", desc: "A bolder approach with strong typography. Perfect for leadership and management positions." },
            { name: "Minimal", desc: "Stripped back and elegant. Lets your achievements speak for themselves." },
            { name: "Developer", role: "Frontend Dev", desc: "A code-editor inspired aesthetic strictly designed for software engineers." },
            { name: "Campus Placement", desc: "Dense, table-based layout optimized for university placements and rigorous technical screening." }
          ].map((tpl, i) => (
            <div key={i} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <LayoutTemplate size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-3">{tpl.name}</h2>
              <p className="text-slate-500 leading-relaxed">{tpl.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
