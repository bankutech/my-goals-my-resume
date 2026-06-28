import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! Since this is a demo, your message wasn't actually sent. But we appreciate the thought!");
  };

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

      <main className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black tracking-tight mb-6">Contact Support</h1>
        <p className="text-xl text-slate-500 mb-12">Have a question or found a bug? Let us know below.</p>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
              <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
              <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input type="email" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
            <textarea required rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-y"></textarea>
          </div>

          <button type="submit" className="w-full py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
            <Send size={18} /> Send Message
          </button>
        </form>
      </main>
    </div>
  );
}
