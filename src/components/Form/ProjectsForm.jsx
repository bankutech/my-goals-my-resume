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
      <div {...attributes} {...listeners} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition">
        <GripVertical size={18} />
      </div>
      
      <button onClick={() => removeItem(id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition bg-white rounded-full p-1 shadow-sm" aria-label="Remove Project" title="Remove">
        <Trash2 size={16} />
      </button>

      <div className="grid grid-cols-2 gap-4 pl-6">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Project Name</label>
          <input type="text" value={item.name || ''} onChange={(e) => updateItem(id, 'name', e.target.value)} className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Technologies Used</label>
          <input type="text" value={item.tech || ''} onChange={(e) => updateItem(id, 'tech', e.target.value)} className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Date / Duration</label>
          <input type="text" value={item.date || ''} onChange={(e) => updateItem(id, 'date', e.target.value)} className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition" />
        </div>
        <div className="col-span-2 sm:col-span-1 flex gap-2">
          <div className="w-1/2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Live Link</label>
            <input type="text" value={item.link || ''} onChange={(e) => updateItem(id, 'link', e.target.value)} className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition" />
          </div>
          <div className="w-1/2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">GitHub Link</label>
            <input type="text" value={item.github_link || ''} onChange={(e) => updateItem(id, 'github_link', e.target.value)} className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition" />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Description (bullet points)</label>
          <textarea value={item.details || ''} onChange={(e) => updateItem(id, 'details', e.target.value)} rows={3} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition resize-y font-mono text-xs leading-relaxed" />
        </div>
      </div>
    </div>
  );
};

export default function ProjectsForm({ data, setResumeData }) {
  const items = data?.projects || [];
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const addItem = () => {
    setResumeData(prev => ({ ...prev, projects: [...(prev.projects || []), { id: uuidv4(), name: '', tech: '', date: '', details: '', link: '', github_link: '' }] }));
  };

  const updateItem = (id, field, value) => {
    setResumeData(prev => ({ ...prev, projects: prev.projects.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  };

  const removeItem = (id) => {
    setResumeData(prev => ({ ...prev, projects: prev.projects.filter(item => item.id !== id) }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.projects.findIndex((item) => item.id === active.id);
        const newIndex = prev.projects.findIndex((item) => item.id === over.id);
        return { ...prev, projects: arrayMove(prev.projects, oldIndex, newIndex) };
      });
    }
  };

  return (
    <div className="animate-in fade-in duration-300 pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Projects</h3>
          <p className="text-xs text-gray-500">Showcase your best work.</p>
        </div>
        <button onClick={addItem} className="flex items-center px-3 py-1.5 bg-[#4A6FA5]/10 text-[#4A6FA5] text-sm font-medium rounded hover:bg-[#4A6FA5]/20 transition">
          <Plus size={16} className="mr-1" /> Add Project
        </button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(e => e.id)} strategy={verticalListSortingStrategy}>
          {items.map(item => <SortableItem key={item.id} id={item.id} item={item} updateItem={updateItem} removeItem={removeItem} />)}
        </SortableContext>
      </DndContext>
    </div>
  );
}
