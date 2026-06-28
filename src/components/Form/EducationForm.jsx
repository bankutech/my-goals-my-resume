import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, item, updateItem, removeItem }) => {
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
        aria-label="Remove Education"
        title="Remove"
      >
        <Trash2 size={16} />
      </button>

      <div className="grid grid-cols-2 gap-4 pl-6">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">School / University</label>
          <input 
            type="text" 
            value={item.school || ''} 
            onChange={(e) => updateItem(id, 'school', e.target.value)}
            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Degree / Major</label>
          <input 
            type="text" 
            value={item.degree || ''} 
            onChange={(e) => updateItem(id, 'degree', e.target.value)}
            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Location</label>
          <input 
            type="text" 
            value={item.location || ''} 
            onChange={(e) => updateItem(id, 'location', e.target.value)}
            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition"
          />
        </div>
        <div className="col-span-2 sm:col-span-1 flex gap-2">
          <div className="w-1/2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Start Date</label>
            <input 
              type="text" 
              value={item.start_date || ''} 
              onChange={(e) => updateItem(id, 'start_date', e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">End Date</label>
            <input 
              type="text" 
              value={item.end_date || ''} 
              onChange={(e) => updateItem(id, 'end_date', e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EducationForm({ data, setResumeData }) {
  const items = data?.education || [];
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addItem = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...(prev.education || []), { id: uuidv4(), school: '', degree: '', location: '', start_date: '', end_date: '' }]
    }));
  };

  const updateItem = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const removeItem = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.education.findIndex((item) => item.id === active.id);
        const newIndex = prev.education.findIndex((item) => item.id === over.id);
        return {
          ...prev,
          education: arrayMove(prev.education, oldIndex, newIndex),
        };
      });
    }
  };

  return (
    <div className="animate-in fade-in duration-300 pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Education</h3>
          <p className="text-xs text-gray-500">Add your academic background.</p>
        </div>
        <button onClick={addItem} className="flex items-center px-3 py-1.5 bg-[#4A6FA5]/10 text-[#4A6FA5] text-sm font-medium rounded hover:bg-[#4A6FA5]/20 transition">
          <Plus size={16} className="mr-1" /> Add Education
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(e => e.id)} strategy={verticalListSortingStrategy}>
          {items.map(item => (
            <SortableItem key={item.id} id={item.id} item={item} updateItem={updateItem} removeItem={removeItem} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
