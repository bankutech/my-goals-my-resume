import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, exp, updateItem, removeItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="relative bg-white p-5 border border-gray-200 rounded-xl shadow-sm mb-4 group">
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition"
      >
        <GripVertical size={18} />
      </div>
      
      <button 
        onClick={() => removeItem(id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition bg-white rounded-full p-1 shadow-sm"
        title="Remove"
        aria-label="Remove Experience"
      >
        <Trash2 size={16} />
      </button>

      <div className="grid grid-cols-2 gap-4 pl-6">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Company</label>
          <input 
            type="text" 
            value={exp.company || ''} 
            onChange={(e) => updateItem(id, 'company', e.target.value)}
            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Job Title</label>
          <input 
            type="text" 
            value={exp.role || ''} 
            onChange={(e) => updateItem(id, 'role', e.target.value)}
            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Location</label>
          <input 
            type="text" 
            value={exp.location || ''} 
            onChange={(e) => updateItem(id, 'location', e.target.value)}
            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition"
          />
        </div>
        <div className="col-span-2 sm:col-span-1 flex gap-2">
          <div className="w-1/2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Start Date</label>
            <input 
              type="text" 
              value={exp.start_date || ''} 
              onChange={(e) => updateItem(id, 'start_date', e.target.value)}
              placeholder="MMM YYYY"
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">End Date</label>
            <input 
              type="text" 
              value={exp.end_date || ''} 
              onChange={(e) => updateItem(id, 'end_date', e.target.value)}
              placeholder="Present"
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Responsibilities & Achievements</label>
          <textarea 
            value={exp.details || ''} 
            onChange={(e) => updateItem(id, 'details', e.target.value)}
            rows={4}
            placeholder="• Spearheaded the development of..."
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition resize-y font-mono text-xs leading-relaxed"
          />
          <p className="text-[10px] text-gray-400 mt-1">Use a new line for each bullet point.</p>
        </div>
      </div>
    </div>
  );
};

export default function ExperienceForm({ data, setResumeData }) {
  const experiences = data?.experience || [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addItem = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...(prev.experience || []), { id: uuidv4(), company: '', role: '', location: '', start_date: '', end_date: '', details: '' }]
    }));
  };

  const updateItem = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const removeItem = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.experience.findIndex((item) => item.id === active.id);
        const newIndex = prev.experience.findIndex((item) => item.id === over.id);
        return {
          ...prev,
          experience: arrayMove(prev.experience, oldIndex, newIndex),
        };
      });
    }
  };

  return (
    <div className="animate-in fade-in duration-300 pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Work Experience</h3>
          <p className="text-xs text-gray-500">Add your relevant experience. Drag to reorder.</p>
        </div>
        <button 
          onClick={addItem}
          className="flex items-center px-3 py-1.5 bg-[#4A6FA5]/10 text-[#4A6FA5] text-sm font-medium rounded hover:bg-[#4A6FA5]/20 transition"
        >
          <Plus size={16} className="mr-1" /> Add Experience
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={experiences.map(e => e.id)} strategy={verticalListSortingStrategy}>
          {experiences.map(exp => (
            <SortableItem key={exp.id} id={exp.id} exp={exp} updateItem={updateItem} removeItem={removeItem} />
          ))}
        </SortableContext>
      </DndContext>
      
      {experiences.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
          Click "Add Experience" to start.
        </div>
      )}
    </div>
  );
}
