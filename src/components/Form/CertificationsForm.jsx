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
    <div ref={setNodeRef} style={style} className="relative bg-white p-5 border border-gray-200 rounded-xl shadow-sm mb-4 group flex gap-3">
      <div {...attributes} {...listeners} className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition mt-2">
        <GripVertical size={18} />
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Certification Name</label>
          <input type="text" value={item.name || ''} onChange={(e) => updateItem(id, 'name', e.target.value)} className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Issuing Organization</label>
          <input type="text" value={item.issuer || ''} onChange={(e) => updateItem(id, 'issuer', e.target.value)} className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Date</label>
          <input type="text" value={item.date || ''} onChange={(e) => updateItem(id, 'date', e.target.value)} className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Credential Link</label>
          <input type="text" value={item.link || ''} onChange={(e) => updateItem(id, 'link', e.target.value)} className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition" />
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
          <textarea value={item.description || ''} onChange={(e) => updateItem(id, 'description', e.target.value)} rows="2" className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition resize-y"></textarea>
        </div>
      </div>

      <button onClick={() => removeItem(id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1 self-start" aria-label="Remove Certification" title="Remove">
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default function CertificationsForm({ data, setResumeData }) {
  const items = data?.certifications || [];
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const addItem = () => {
    setResumeData(prev => ({ ...prev, certifications: [...(prev.certifications || []), { id: uuidv4(), name: '', issuer: '', date: '', link: '' }] }));
  };

  const updateItem = (id, field, value) => {
    setResumeData(prev => ({ ...prev, certifications: prev.certifications.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  };

  const removeItem = (id) => {
    setResumeData(prev => ({ ...prev, certifications: prev.certifications.filter(item => item.id !== id) }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.certifications.findIndex((item) => item.id === active.id);
        const newIndex = prev.certifications.findIndex((item) => item.id === over.id);
        return { ...prev, certifications: arrayMove(prev.certifications, oldIndex, newIndex) };
      });
    }
  };

  return (
    <div className="animate-in fade-in duration-300 pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Certifications</h3>
          <p className="text-xs text-gray-500">List your professional credentials.</p>
        </div>
        <button onClick={addItem} className="flex items-center px-3 py-1.5 bg-[#4A6FA5]/10 text-[#4A6FA5] text-sm font-medium rounded hover:bg-[#4A6FA5]/20 transition">
          <Plus size={16} className="mr-1" /> Add Certification
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
