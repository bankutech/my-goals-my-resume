import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Download, LayoutTemplate, History, Sparkles, Check } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

// Placeholder imports for components we will build
import PersonalInfoForm from '../components/Form/PersonalInfoForm';
import ExperienceForm from '../components/Form/ExperienceForm';
import EducationForm from '../components/Form/EducationForm';
import ProjectsForm from '../components/Form/ProjectsForm';
import SkillsForm from '../components/Form/SkillsForm';
import CertificationsForm from '../components/Form/CertificationsForm';

import LivePreview from '../components/Preview/LivePreview';
import ResumeAnalytics from '../components/Analytics/ResumeAnalytics';
import VersionHistory from '../components/VersionHistory';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('Personal');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const previewRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: resumeData?.title || 'Resume',
  });

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch(`/api/resumes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setResumeData(data);
      } catch (err) {
        console.error(err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, navigate]);

  const saveResume = async () => {
    setSaving(true);
    try {
      await fetch(`/api/resumes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
      });
      // Optionally show a success toast here
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading editor...</div>;
  }

  const updateField = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const tabs = ['Personal', 'Experience', 'Education', 'Projects', 'Skills', 'Certifications'];

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#F4F4F2]">
      {/* LEFT PANEL: Editor */}
      <div className="w-full lg:w-[45%] flex-1 lg:h-full flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 bg-white shadow-xl z-10 relative">
        
        {/* Header */}
        <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition">
              <ArrowLeft size={18} />
            </button>
            <input 
              type="text" 
              value={resumeData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="text-lg font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-48"
              placeholder="Resume Title"
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowHistory(true)}
              className="flex items-center px-3 py-2 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-md transition text-sm font-medium"
            >
              <History size={16} className="mr-1.5" /> History
            </button>
            <button 
              onClick={saveResume}
              disabled={saving}
              className="flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition disabled:opacity-70"
            >
              {saving ? <Check size={16} className="mr-2" /> : <Save size={16} className="mr-2" />}
              {saving ? 'Saved' : 'Save'}
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-gray-100 overflow-x-auto whitespace-nowrap hide-scrollbar flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${activeTab === tab ? 'text-[#4A6FA5] border-[#4A6FA5] bg-[#4A6FA5]/5' : 'text-gray-500 border-transparent hover:text-gray-900 hover:bg-gray-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {activeTab === 'Personal' && <PersonalInfoForm data={resumeData} updateField={updateField} />}
          {activeTab === 'Experience' && <ExperienceForm data={resumeData} setResumeData={setResumeData} />}
          {activeTab === 'Education' && <EducationForm data={resumeData} setResumeData={setResumeData} />}
          {activeTab === 'Projects' && <ProjectsForm data={resumeData} setResumeData={setResumeData} />}
          {activeTab === 'Skills' && <SkillsForm data={resumeData} setResumeData={setResumeData} />}
          {activeTab === 'Certifications' && <CertificationsForm data={resumeData} setResumeData={setResumeData} />}
        </div>
      </div>

      {/* RIGHT PANEL: Live Preview */}
      <div className="w-full lg:w-[55%] flex-1 lg:h-full flex flex-col bg-[#EAEAEA] relative overflow-hidden">
        {/* Top bar for preview controls */}
        <div className="h-14 bg-white/80 backdrop-blur border-b border-gray-200 flex items-center justify-between px-6 absolute top-0 left-0 right-0 z-20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <LayoutTemplate size={16} className="text-gray-500" />
              <select 
                value={resumeData.template}
                onChange={(e) => updateField('template', e.target.value)}
                className="text-sm font-medium bg-transparent border-none focus:ring-0 text-gray-700 cursor-pointer outline-none"
              >
                <option value="ClassicATS">Classic ATS</option>
                <option value="ModernExecutive">Modern Executive</option>
                <option value="Minimal">Minimal</option>
                <option value="Developer">Developer</option>
                <option value="Campus">Campus Placement</option>
                <option value="Professional">Professional (New)</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAnalytics(true)}
              className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 shadow-sm transition"
            >
              <Sparkles size={14} className="mr-1.5 text-indigo-500" />
              ATS Score
            </button>
            <button onClick={() => handlePrint()} className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-[#4A6FA5] rounded hover:bg-[#325280] shadow-sm transition">
              <Download size={14} className="mr-1.5" />
              Export PDF
            </button>
          </div>
        </div>

        {/* The Preview Document */}
        <div className="flex-1 overflow-auto pt-20 pb-12 px-4 hide-scrollbar">
          <div className="shadow-2xl w-fit mx-auto">
            <LivePreview ref={previewRef} data={resumeData} />
          </div>
        </div>
      </div>

      {showAnalytics && <ResumeAnalytics data={resumeData} onClose={() => setShowAnalytics(false)} />}
      
      {showHistory && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setShowHistory(false)}></div>
          <VersionHistory 
            resumeId={id} 
            onClose={() => setShowHistory(false)} 
            onRestore={(data) => {
              setResumeData(data);
              // Save it immediately so the backend recognizes it as the latest
              fetch(`/api/resumes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
            }} 
          />
        </>
      )}
    </div>
  );
}
