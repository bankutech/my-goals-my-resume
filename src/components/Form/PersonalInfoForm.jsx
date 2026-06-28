import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

const Input = ({ label, field, data, updateField, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>
    <input
      type={type}
      value={data[field] || ''}
      onChange={(e) => updateField(field, e.target.value)}
      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#4A6FA5] focus:ring-1 focus:ring-[#4A6FA5] transition"
    />
  </div>
);

const PhotoUpload = ({ data, updateField }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image is too large. Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('personal_photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updateField('personal_photo', '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="mb-4 col-span-2">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Profile Photo</label>
      <div className="flex items-center gap-4">
        {data.personal_photo ? (
          <div className="relative w-[50px] h-[60px] rounded-sm overflow-hidden border border-gray-300">
            <img src={data.personal_photo} alt="Profile" className="w-full h-full object-cover" />
            <button onClick={removePhoto} className="absolute top-0.5 right-0.5 bg-red-500 text-white p-0.5 rounded hover:bg-red-600 transition leading-none">
              <X size={10} />
            </button>
          </div>
        ) : (
          <div className="w-[50px] h-[60px] rounded-sm bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            <Upload size={16} />
          </div>
        )}
        <div>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" 
            id="photo-upload" 
          />
          <label htmlFor="photo-upload" className="cursor-pointer px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition inline-block">
            {data.personal_photo ? 'Change Photo' : 'Upload Photo'}
          </label>
          <p className="text-xs text-gray-500 mt-1">Recommended for Campus templates. Max 2MB.</p>
        </div>
      </div>
    </div>
  );
};

export default function PersonalInfoForm({ data, updateField }) {
  if (!data) return null;

  return (
    <div className="space-y-2 animate-in fade-in duration-300">
      <div className="grid grid-cols-2 gap-x-4">
        <PhotoUpload data={data} updateField={updateField} />
        
        <div className="col-span-2 sm:col-span-1">
          <Input label="Full Name" field="personal_name" data={data} updateField={updateField} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input label="Professional Title / Course" field="personal_title" data={data} updateField={updateField} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input label="Email Address" field="personal_email" type="email" data={data} updateField={updateField} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input label="Phone Number" field="personal_phone" data={data} updateField={updateField} />
        </div>
        <div className="col-span-2">
          <Input label="Location (City, State)" field="personal_location" data={data} updateField={updateField} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input label="LinkedIn URL" field="personal_linkedin" data={data} updateField={updateField} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input label="GitHub URL" field="personal_github" data={data} updateField={updateField} />
        </div>
      </div>

      <div className="mt-2">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Professional Summary</label>
        <textarea
          value={data.personal_summary || ''}
          onChange={(e) => updateField('personal_summary', e.target.value)}
          rows={5}
          placeholder="Briefly describe your professional background and key strengths..."
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#4A6FA5] focus:ring-1 focus:ring-[#4A6FA5] transition resize-y"
        />
      </div>
    </div>
  );
}
