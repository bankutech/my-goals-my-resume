import React, { useState, useEffect } from 'react';
import { History, X, Clock, RefreshCcw } from 'lucide-react';
import { format } from 'date-fns';

export default function VersionHistory({ resumeId, onClose, onRestore }) {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const res = await fetch(`http://localhost:3114/api/resumes/${resumeId}/versions`);
        const data = await res.json();
        setVersions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVersions();
  }, [resumeId]);

  const handleRestore = async (versionId) => {
    if (!confirm('Are you sure you want to restore this version? Your current unsaved changes will be lost.')) return;
    try {
      const res = await fetch(`http://localhost:3114/api/resumes/${resumeId}/versions/${versionId}/restore`, {
        method: 'POST'
      });
      const data = await res.json();
      onRestore(data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col animate-in slide-in-from-right-full duration-300">
      <header className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="font-bold text-gray-900 flex items-center">
          <History size={18} className="mr-2 text-gray-500" />
          Version History
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition p-1">
          <X size={18} />
        </button>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
        <p className="text-xs text-gray-500 mb-6">A snapshot is created every time you click "Save".</p>
        
        {loading ? (
          <div className="text-center text-gray-400 text-sm py-10">Loading history...</div>
        ) : versions.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-10">No previous versions found.</div>
        ) : (
          <div className="space-y-4">
            {versions.map((v, i) => (
              <div key={v.id} className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm relative group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Clock size={14} className="text-[#4A6FA5]" />
                    {v.created_at ? format(new Date(v.created_at), 'MMM d, yyyy h:mm a') : 'Unknown Date'}
                  </div>
                </div>
                {i === 0 && <span className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-[#4A6FA5] text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">LATEST</span>}
                
                <button 
                  onClick={() => handleRestore(v.id)}
                  className="mt-3 w-full py-1.5 flex items-center justify-center text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded hover:bg-[#4A6FA5] hover:text-white hover:border-[#4A6FA5] transition"
                >
                  <RefreshCcw size={12} className="mr-1.5" /> Restore This Version
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
