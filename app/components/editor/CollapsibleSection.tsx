// components/editor/CollapsibleSection.tsx

import { ChevronDown, ChevronUp, Eye, RotateCcw } from 'lucide-react';

interface Props {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export default function CollapsibleSection({ title, children, isOpen, onToggle }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4 shadow-sm">
      {/* HEADER */}
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          <span className="font-bold text-gray-700">{title} Section</span>
        </div>
        
        {/* ACTION ICONS (Opsional, seperti di gambar) */}
        <div className="flex gap-3 text-gray-400">
          <button className="hover:text-blue-500"><Eye size={18} /></button>
          <button className="hover:text-red-500"><RotateCcw size={18} /></button>
        </div>
      </div>

      {/* CONTENT (EDITOR) */}
      {isOpen && (
        <div className="p-5 bg-white space-y-4 animate-in fade-in slide-in-from-top-1">
          {children}
        </div>
      )}
    </div>
  );
}