import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, Sparkles, CheckCircle2, LayoutTemplate, 
  Target, Download, Wand2, ArrowRight, XCircle, FileWarning, Eye
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [loading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [atsScore, setAtsScore] = useState(40);
  const [aiStep, setAiStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Animate ATS Score on scroll
      if (window.scrollY > 1500 && atsScore < 98) {
        const interval = setInterval(() => {
          setAtsScore(prev => prev < 98 ? prev + 1 : 98);
        }, 30);
        return () => clearInterval(interval);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [atsScore]);

  // AI Assistant Animation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setAiStep(prev => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startBuilding = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-inter selection:bg-black selection:text-white">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">MyGoalsMyResuME</span>
          </div>
          <button 
            onClick={startBuilding}
            className="px-5 py-2 bg-black hover:bg-slate-800 text-white rounded-full text-sm font-medium transition-colors"
          >
            Start Building
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-slate-900 leading-[1.05] max-w-4xl">
          Build a Resume That Opens Doors.
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 mb-10 max-w-2xl font-medium leading-relaxed tracking-tight">
          Create professional, ATS-friendly resumes in minutes with intelligent guidance and beautiful templates designed to help you stand out.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={startBuilding}
            disabled={loading}
            className="px-8 py-4 bg-black hover:bg-slate-800 text-white rounded-full text-lg font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            {loading ? 'Preparing...' : 'Start Building'}
            {!loading && <ArrowRight size={18} />}
          </button>
          <Link to="/templates" className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 rounded-full text-lg font-semibold transition-colors">
            Explore Templates
          </Link>
        </div>

        {/* Hero Visual: Interactive Mockup */}
        <div className="mt-20 relative w-full max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent z-10 top-1/2"></div>
          <div className="relative z-0 bg-white border border-slate-200 rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-700">
            {/* Mock Resume UI */}
            <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-6">
              <div className="space-y-3">
                <div className="w-64 h-8 bg-slate-200 rounded-md"></div>
                <div className="w-40 h-4 bg-slate-100 rounded-md"></div>
              </div>
              <div className="space-y-2 text-right">
                <div className="w-32 h-3 bg-slate-100 rounded-md ml-auto"></div>
                <div className="w-48 h-3 bg-slate-100 rounded-md ml-auto"></div>
              </div>
            </div>
            <div className="space-y-8">
              {[1, 2].map(i => (
                <div key={i} className="space-y-4">
                  <div className="w-32 h-5 bg-slate-200 rounded-md"></div>
                  <div className="flex justify-between">
                    <div className="w-48 h-4 bg-slate-800 rounded-md"></div>
                    <div className="w-24 h-4 bg-slate-100 rounded-md"></div>
                  </div>
                  <div className="space-y-2 pl-4">
                    <div className="w-full h-3 bg-slate-100 rounded-md"></div>
                    <div className="w-11/12 h-3 bg-slate-100 rounded-md"></div>
                    <div className="w-full h-3 bg-slate-100 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Floating UI Chips */}
            <div className="absolute -right-6 top-1/4 bg-white border border-slate-200 p-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce shadow-blue-500/10">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">ATS Match</p>
                <p className="text-sm font-bold text-slate-900">98% Optimized</p>
              </div>
            </div>

            <div className="absolute -left-8 bottom-1/3 bg-white border border-slate-200 p-3 rounded-xl shadow-xl flex items-center gap-3 shadow-indigo-500/10 transition-transform hover:scale-105">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <Sparkles size={16} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">AI Suggestion</p>
                <p className="text-sm font-bold text-slate-900">Strong action verbs detected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BANNER */}
      <section className="py-12 border-y border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-24">
          <div className="text-center">
            <p className="text-3xl font-black text-slate-900 tracking-tighter">10,000+</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Resumes Created</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-slate-900 tracking-tighter">100%</p>
            <p className="text-sm text-slate-500 font-medium mt-1">ATS Friendly</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-slate-900 tracking-tighter">50+</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Industries Supported</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-slate-900 tracking-tighter">&lt; 1s</p>
            <p className="text-sm text-slate-500 font-medium mt-1">PDF Export Time</p>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Most Resumes Never Reach a Recruiter.</h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Applicant Tracking Systems (ATS) reject 75% of resumes before a human ever sees them due to poor formatting and weak content.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Bad Resume */}
          <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
            <div className="flex items-center gap-2 mb-6 text-red-600 font-bold">
              <XCircle size={20} />
              <h3>Traditional Resume</h3>
            </div>
            <ul className="space-y-4 mb-8 text-slate-600">
              <li className="flex items-start gap-2"><FileWarning size={18} className="text-red-400 mt-0.5 shrink-0" /> Complex tables breaking ATS parsers</li>
              <li className="flex items-start gap-2"><FileWarning size={18} className="text-red-400 mt-0.5 shrink-0" /> Missing industry keywords</li>
              <li className="flex items-start gap-2"><FileWarning size={18} className="text-red-400 mt-0.5 shrink-0" /> Weak, passive descriptions</li>
            </ul>
            <div className="h-64 bg-white border border-red-200 rounded-xl shadow-sm p-4 opacity-50 grayscale flex flex-col gap-3 overflow-hidden">
               <div className="w-1/2 h-6 bg-slate-300 rounded"></div>
               <div className="w-full h-12 bg-slate-200 rounded"></div>
               <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
               <div className="w-full h-24 bg-slate-200 rounded grid grid-cols-2 gap-2 p-2">
                 <div className="bg-slate-300 rounded"></div>
                 <div className="bg-slate-300 rounded"></div>
               </div>
            </div>
          </div>

          {/* Good Resume */}
          <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 relative">
            <div className="absolute -top-4 -right-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">The MyGoalsMyResuME Way</div>
            <div className="flex items-center gap-2 mb-6 text-blue-700 font-bold">
              <CheckCircle2 size={20} />
              <h3>MyGoalsMyResuME Resume</h3>
            </div>
            <ul className="space-y-4 mb-8 text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-blue-500 mt-0.5 shrink-0" /> Clean, semantic HTML structure</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-blue-500 mt-0.5 shrink-0" /> High ATS keyword match rate</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-blue-500 mt-0.5 shrink-0" /> Action-driven bullet points</li>
            </ul>
            <div className="h-64 bg-white border border-blue-200 rounded-xl shadow-md p-6 flex flex-col gap-4 overflow-hidden relative">
               <div className="w-1/3 h-6 bg-black rounded"></div>
               <div className="w-1/4 h-2 bg-slate-200 rounded mb-4"></div>
               <div className="w-1/4 h-4 bg-slate-800 rounded"></div>
               <div className="space-y-2">
                 <div className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div><div className="w-full h-2 bg-slate-200 rounded"></div></div>
                 <div className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div><div className="w-5/6 h-2 bg-slate-200 rounded"></div></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section className="py-32 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4">Everything Needed To Create A Strong Resume.</h2>
            <p className="text-xl text-slate-500 font-medium">Professional tools designed to get you hired faster.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wand2, title: "AI Resume Assistant", desc: "Generate stronger summaries and achievements instantly." },
              { icon: Target, title: "ATS Optimization", desc: "Improve visibility in applicant tracking systems." },
              { icon: LayoutTemplate, title: "Professional Templates", desc: "Modern, clean, recruiter-approved layouts." },
              { icon: Sparkles, title: "Smart Content Suggestions", desc: "Get targeted recommendations while writing." },
              { icon: Download, title: "One-Click PDF Export", desc: "Perfect formatting every time, with zero blank pages." },
              { icon: Eye, title: "Live Resume Preview", desc: "See your changes instantly as you type." }
            ].map((feat, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#FAFAFA] border border-slate-100 hover:border-slate-300 transition-colors group">
                <feat.icon size={28} className="text-slate-400 group-hover:text-black transition-colors mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{feat.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ATS SHOWCASE */}
      <section className="py-32 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6">Designed To Pass ATS Screening.</h2>
          <p className="text-xl text-slate-500 font-medium mb-8">Our engine continuously analyzes your resume against industry-standard ATS parsing rules, ensuring your application reaches human eyes.</p>
          <ul className="space-y-4 font-medium text-slate-700">
            <li className="flex items-center gap-3"><CheckCircle2 className="text-black" size={20} /> Keyword Matching</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-black" size={20} /> Missing Skills Detection</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-black" size={20} /> Strict Formatting Checks</li>
          </ul>
        </div>
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-full blur-3xl -z-10"></div>
          <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-2xl text-center">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Overall ATS Score</h4>
            <div className="text-8xl font-black tracking-tighter text-slate-900 mb-2">
              {atsScore}<span className="text-5xl text-slate-400">%</span>
            </div>
            <p className="text-emerald-600 font-bold flex items-center justify-center gap-2 mt-4">
              <CheckCircle2 size={18} /> Highly Optimized
            </p>
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4 text-left">
               <div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Impact</div>
                 <div className="text-lg font-bold text-slate-900">Excellent</div>
               </div>
               <div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Brevity</div>
                 <div className="text-lg font-bold text-slate-900">Optimal</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TEMPLATE SHOWCASE */}
      <section id="templates" className="py-32 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">Templates For Every Career Path.</h2>
            <p className="text-xl text-slate-400 font-medium">Switch layouts instantly without losing content.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Classic ATS", role: "Software Engineer" },
              { name: "Modern Exec", role: "Business Analyst" },
              { name: "Developer", role: "Frontend Dev" },
              { name: "Minimal", role: "Designer" },
              { name: "Campus", role: "Student" }
            ].map((tpl, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[1/1.4] bg-slate-800 rounded-xl border border-slate-700 mb-4 overflow-hidden relative flex flex-col p-4 group-hover:border-slate-500 transition-colors">
                   <div className="w-1/2 h-2 bg-slate-700 rounded mb-4"></div>
                   <div className="w-full h-1 bg-slate-700 rounded mb-1"></div>
                   <div className="w-full h-1 bg-slate-700 rounded mb-1"></div>
                   <div className="w-3/4 h-1 bg-slate-700 rounded mb-4"></div>
                   <div className="w-1/3 h-2 bg-slate-600 rounded mb-2"></div>
                   <div className="w-full h-1 bg-slate-700 rounded mb-1"></div>
                   <div className="w-full h-1 bg-slate-700 rounded mb-1"></div>
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                     <span className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full">Preview</span>
                   </div>
                </div>
                <h4 className="font-bold text-slate-200">{tpl.name}</h4>
                <p className="text-sm text-slate-500">{tpl.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AI WRITING ASSISTANT */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6">Write Better Content Faster.</h2>
        <p className="text-xl text-slate-500 font-medium mb-16">Never stare at a blank page again. Our AI instantly rewrites weak bullets into metric-driven achievements.</p>
        
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden text-left relative min-h-[160px]">
          <div className={`absolute inset-0 p-8 transition-all duration-700 ${aiStep === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest rounded-full mb-4">Before</span>
            <p className="text-2xl font-medium text-slate-400">"Worked on database."</p>
          </div>
          
          <div className={`absolute inset-0 p-8 transition-all duration-700 delay-150 ${aiStep === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest rounded-full mb-4 flex items-center w-max gap-1">
              <Sparkles size={12} /> AI Rewritten
            </span>
            <p className="text-2xl font-bold text-slate-900">"Optimized database queries, improving application performance and reducing response times by 40%."</p>
          </div>
        </div>
      </section>

      {/* 8. HOW IT WORKS */}
      <section className="py-32 bg-[#FAFAFA] border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-6 left-12 right-12 h-px bg-slate-200"></div>
            
            {[
              { step: 1, title: "Enter your information.", desc: "Drop in your history or start from scratch using our lightning-fast editor." },
              { step: 2, title: "Improve content.", desc: "Use intelligent suggestions to elevate your vocabulary and impact." },
              { step: 3, title: "Download PDF.", desc: "Export a beautifully formatted, recruiter-approved resume instantly." }
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-xl">
                  {s.step}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{s.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WHY RESUMEFORGE (Comparison) */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-16 text-center">Why Choose MyGoalsMyResuME?</h2>
        
        <div className="grid md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden">
          <div className="bg-white p-12">
            <h3 className="text-xl font-bold text-slate-400 mb-8">Traditional Builders</h3>
            <ul className="space-y-6 text-slate-500 font-medium">
              <li className="flex items-center gap-3"><XCircle size={20} className="text-slate-300" /> Generic, bloated templates</li>
              <li className="flex items-center gap-3"><XCircle size={20} className="text-slate-300" /> No ATS optimization</li>
              <li className="flex items-center gap-3"><XCircle size={20} className="text-slate-300" /> Paywalls before downloading</li>
              <li className="flex items-center gap-3"><XCircle size={20} className="text-slate-300" /> Limited writing guidance</li>
            </ul>
          </div>
          
          <div className="bg-slate-50 p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -z-10 opacity-50"></div>
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">MyGoalsMyResuME</h3>
            <ul className="space-y-6 text-slate-900 font-bold">
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-black" /> ATS-focused minimalism</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-black" /> Intelligent AI suggestions</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-black" /> 100% Free PDF exports</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-black" /> Modern, readable typography</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-40 bg-black text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
            Your Next Opportunity Starts With A Better Resume.
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 font-medium max-w-2xl mx-auto">
            Create a professional resume that stands out to recruiters and hiring managers.
          </p>
          <button 
            onClick={startBuilding}
            className="px-10 py-5 bg-white text-black hover:bg-slate-200 rounded-full text-xl font-bold transition-all shadow-2xl shadow-white/10 hover:scale-105 active:scale-95"
          >
            Build Your Resume
          </button>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="py-12 bg-[#FAFAFA] border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <FileText size={12} className="text-white" />
            </div>
            <span className="font-bold tracking-tight text-slate-900">MyGoalsMyResuME</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-500">
            <Link to="/templates" className="hover:text-black transition-colors">Templates</Link>
            <Link to="/ats-guide" className="hover:text-black transition-colors">ATS Guide</Link>
            <Link to="/tips" className="hover:text-black transition-colors">Resume Tips</Link>
            <Link to="/about" className="hover:text-black transition-colors">About</Link>
            <Link to="/contact" className="hover:text-black transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
