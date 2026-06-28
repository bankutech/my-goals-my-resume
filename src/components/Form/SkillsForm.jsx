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
    <div ref={setNodeRef} style={style} className="relative bg-white p-4 border border-gray-200 rounded-xl shadow-sm mb-3 group flex items-center gap-3">
      <div {...attributes} {...listeners} className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition">
        <GripVertical size={18} />
      </div>
      
      <div className="flex-1 grid grid-cols-3 gap-3">
        <div className="col-span-1">
          <input type="text" placeholder="Category (e.g. Languages)" value={item.category || ''} onChange={(e) => updateItem(id, 'category', e.target.value)} className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition" />
        </div>
        <div className="col-span-2">
          <input type="text" placeholder="Items (e.g. JavaScript, Python, React)" value={item.items || ''} onChange={(e) => updateItem(id, 'items', e.target.value)} className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:bg-white focus:outline-none focus:border-[#4A6FA5] transition" />
        </div>
      </div>

      <button onClick={() => removeItem(id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1" aria-label="Remove Skill Category" title="Remove">
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default function SkillsForm({ data, setResumeData }) {
  const items = data?.skills || [];
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const addItem = () => {
    setResumeData(prev => ({ ...prev, skills: [...(prev.skills || []), { id: uuidv4(), category: '', items: '' }] }));
  };

  const updateItem = (id, field, value) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  };

  const removeItem = (id) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter(item => item.id !== id) }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.skills.findIndex((item) => item.id === active.id);
        const newIndex = prev.skills.findIndex((item) => item.id === over.id);
        return { ...prev, skills: arrayMove(prev.skills, oldIndex, newIndex) };
      });
    }
  };

  return (
    <div className="animate-in fade-in duration-300 pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Skills</h3>
          <p className="text-xs text-gray-500">Group your skills by category.</p>
        </div>
        <button onClick={addItem} className="flex items-center px-3 py-1.5 bg-[#4A6FA5]/10 text-[#4A6FA5] text-sm font-medium rounded hover:bg-[#4A6FA5]/20 transition">
          <Plus size={16} className="mr-1" /> Add Skill Category
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
