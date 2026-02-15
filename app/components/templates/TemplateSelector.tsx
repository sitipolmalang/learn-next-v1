import { X, LayoutTemplate } from 'lucide-react';
import { Template } from './types';
import { defaultTemplates } from './defaults';

interface TemplateSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (template: Template) => void;
}

export default function TemplateSelector({ isOpen, onClose, onSelect }: TemplateSelectorProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <LayoutTemplate className="text-blue-600" />
                            Choose a Template
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Start with a pre-designed layout or build from scratch.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Empty Template Option */}
                        <div
                            onClick={() => onSelect({ id: 'blank', name: 'Blank Canvas', description: 'Start from scratch', category: 'custom', thumbnail: 'bg-white', blocks: [] })}
                            className="group cursor-pointer bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:shadow-lg transition-all p-6 flex flex-col items-center justify-center min-h-50"
                        >
                            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <PlusIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-900">Blank Canvas</h3>
                            <p className="text-xs text-gray-500 mt-1 text-center">Start with an empty page</p>
                        </div>

                        {defaultTemplates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => onSelect(template)}
                                className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-500/50 transition-all transform hover:-translate-y-1"
                            >
                                {/* Thumbnail Preview */}
                                <div className={`h-40 ${template.thumbnail} flex items-center justify-center relative overflow-hidden`}>

                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                                    {/* Simple visual representation of blocks */}
                                    <div className="w-3/4 h-3/4 bg-white shadow-sm rounded p-2 opacity-50 scale-90 group-hover:scale-100 transition-transform">
                                        <div className="h-2 w-1/2 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-2 w-full bg-gray-100 rounded mb-1"></div>
                                        <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                                        {template.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {template.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    )
}
