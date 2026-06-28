import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, Copy, Trash2, Download, LayoutTemplate, Share2 } from 'lucide-react';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchResumes = async () => {
    try {
      const res = await fetch('/api/resumes');
      const data = await res.json();
      setResumes(data);
    } catch (err) {
      console.error('Failed to fetch resumes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchResumes();
  }, []);

  const createResume = async () => {
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Untitled Resume' })
      });
      const data = await res.json();
      navigate(`/editor/${data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteResume = async (id) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;
    try {
      await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
      fetchResumes();
    } catch (err) {
      console.error(err);
    }
  };

  const duplicateResume = async (resumeId) => {
    try {
      const res = await fetch(`/api/resumes/${resumeId}`);
      const fullResume = await res.json();
      
      const createRes = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: `${fullResume.title} (Copy)` })
      });
      const newResume = await createRes.json();
      
      await fetch(`/api/resumes/${newResume.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fullResume, title: `${fullResume.title} (Copy)` })
      });
      
      fetchResumes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Resumes</h1>
          <p className="text-gray-500 mt-1">Manage and optimize your professional profiles.</p>
        </div>
        <button
          onClick={createResume}
          className="flex items-center px-5 py-2.5 bg-[#4A6FA5] text-white font-medium rounded-lg shadow-sm hover:bg-[#325280] transition transform hover:scale-105 active:scale-95"
        >
          <Plus size={18} className="mr-2" />
          Create New Resume
        </button>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[280px] animate-pulse">
              <div className="h-40 bg-gray-100 rounded-lg mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-[#4A6FA5]/10 text-[#4A6FA5] rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={28} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No resumes yet</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">Create your first ATS-friendly resume to start applying for jobs.</p>
          <button
            onClick={createResume}
            className="inline-flex items-center px-5 py-2.5 bg-[#4A6FA5] text-white font-medium rounded-lg shadow-sm hover:bg-[#325280] transition"
          >
            <Plus size={18} className="mr-2" />
            Create Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map(resume => (
            <div key={resume.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden group transition-all duration-300 flex flex-col">
              {/* Preview Area */}
              <div className="h-[180px] bg-gray-50 border-b border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4A6FA5]/5 to-transparent"></div>
                <div className="w-24 h-32 bg-white shadow-sm border border-gray-200 rounded-sm p-2 flex flex-col gap-1 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-1.5 bg-gray-300 rounded-full mb-1"></div>
                  <div className="w-3/4 h-1 bg-gray-200 rounded-full"></div>
                  <div className="w-1/2 h-1 bg-gray-200 rounded-full"></div>
                  <div className="w-full h-1 bg-gray-200 rounded-full mt-2"></div>
                  <div className="w-full h-1 bg-gray-200 rounded-full"></div>
                  <div className="w-5/6 h-1 bg-gray-200 rounded-full"></div>
                </div>
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Link to={`/editor/${resume.id}`} className="px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-sm">
                    Edit Resume
                  </Link>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">{resume.title}</h3>
                
                <div className="mt-auto pt-4 space-y-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <LayoutTemplate size={14} className="mr-1.5 text-gray-400" />
                    <span>Template: <span className="font-medium text-gray-700">{resume.template || 'ClassicATS'}</span></span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Updated {resume.updated_at ? new Date(resume.updated_at).toLocaleDateString() : 'recently'}</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-gray-500">
                  <div className="flex gap-2">
                    <button onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/r/${resume.public_id}`);
                      alert('Public link copied to clipboard!');
                    }} className="p-1.5 hover:bg-gray-100 hover:text-[#4A6FA5] rounded-md transition" title="Copy Public Link">
                      <Share2 size={16} />
                    </button>
                    <button onClick={() => duplicateResume(resume.id)} className="p-1.5 hover:bg-gray-100 hover:text-gray-900 rounded-md transition" title="Duplicate">
                      <Copy size={16} />
                    </button>
                    <button onClick={() => deleteResume(resume.id)} className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-md transition" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <Link to={`/editor/${resume.id}?export=true`} className="flex items-center text-xs font-medium text-[#4A6FA5] hover:text-[#325280] p-1.5 hover:bg-blue-50 rounded-md transition">
                    <Download size={14} className="mr-1" /> PDF
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
