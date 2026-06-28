import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import PublicResume from './pages/PublicResume';
import LandingPage from './pages/LandingPage';
import TemplatesPage from './pages/TemplatesPage';
import ATSGuidePage from './pages/ATSGuidePage';
import ResumeTipsPage from './pages/ResumeTipsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="font-inter text-[#222222] min-h-screen bg-[#F4F4F2]">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor/:id" element={<Editor />} />
        <Route path="/r/:public_id" element={<PublicResume />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/ats-guide" element={<ATSGuidePage />} />
        <Route path="/tips" element={<ResumeTipsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}
