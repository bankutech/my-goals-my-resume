import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import LivePreview from '../components/Preview/LivePreview';

export default function PublicResume() {
  const { public_id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const previewRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: data?.title || 'Resume',
  });

  useEffect(() => {
    fetch(`/api/public/resumes/${public_id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [public_id]);

  if (loading) {
    return <div className="min-h-screen bg-[#F4F4F2] flex items-center justify-center text-gray-500">Loading resume...</div>;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#F4F4F2] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md">This resume may have been deleted or the link is incorrect.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#4A6FA5] text-white font-medium rounded-lg hover:bg-[#325280] transition">Create Your Own Resume</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAEAEA] flex flex-col">
      <header className="bg-white/90 backdrop-blur border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight text-gray-900">ResumeForge</span>
        </div>
        <button 
          onClick={() => handlePrint()}
          className="flex items-center px-4 py-2 bg-[#4A6FA5] text-white text-sm font-medium rounded hover:bg-[#325280] transition shadow-sm"
        >
          <Download size={16} className="mr-2" /> Download PDF
        </button>
      </header>
      
      <main className="flex-1 py-12 px-4 flex justify-center">
        <div className="shadow-2xl">
          <LivePreview ref={previewRef} data={data} />
        </div>
      </main>
    </div>
  );
}
