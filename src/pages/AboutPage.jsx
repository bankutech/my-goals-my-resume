import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Users, Shield } from 'lucide-react';

export default function AboutPage() {
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
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black tracking-tight mb-6">About Us</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">We're on a mission to ensure no great candidate gets rejected by a bot.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm">
            <Target size={32} className="text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Our Mission</h3>
            <p className="text-slate-500">To democratize the hiring process by providing everyone with elite, ATS-optimized tools.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm">
            <Users size={32} className="text-indigo-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Our Community</h3>
            <p className="text-slate-500">Over 10,000 professionals have used our platform to land jobs at top tech companies.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm">
            <Shield size={32} className="text-emerald-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Our Promise</h3>
            <p className="text-slate-500">Zero hidden paywalls, zero dark patterns. Just pure, professional resume building.</p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-12 rounded-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to join them?</h2>
          <Link to="/" className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full mt-4 hover:scale-105 transition-transform">
            Start Building Now
          </Link>
        </div>
      </main>
    </div>
  );
}
