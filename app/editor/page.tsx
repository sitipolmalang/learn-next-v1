'use client';

import { useState, useEffect } from 'react';
import { 
    ChevronDown, ChevronUp, Eye, RotateCcw, 
    Monitor, Tablet, Smartphone, Maximize, Search,
    ExternalLink,
    Plus, Minus // Icon tambahan untuk zoom
} from 'lucide-react'; 
import PageRenderer, { Block, BlockType } from '../components/PageRendered';
import PropsEditor from '../components/editor/PropsEditor';

import { heroSchema } from '../components/editor/schemas/hero.schema';
import { cardSchema } from '../components/editor/schemas/card.schema';
import { buttonSchema } from '../components/editor/schemas/button.schema';
import { titleSchema } from '../components/editor/schemas/title.schema';
import { Field } from '../components/editor/PropsEditor';

const schemaMap: Record<BlockType, Record<string, Field>> = {
    hero: heroSchema,
    card: cardSchema,
    button: buttonSchema,
    title: titleSchema,
};

export default function EditorPage() {
    const [blocks, setBlocks] = useState<Block[]>([
        { id: 'hero', type: 'hero', props: { heading: 'Hero Title', subheading: 'Hero subtitle text', align: 'center' } },
        { id: 'card', type: 'card', props: { title: 'Card Title', description: 'Card description', align: 'left' } },
        { id: 'button', type: 'button', props: { label: 'Click Me', color: '#3b82f6', textColor: '#ffffff' } },
        { id: 'title', type: 'title', props: { text: 'Booking Section', level: 'h1', color: '#000000', align: 'left' } },
    ]);

    const [openId, setOpenId] = useState<string | null>('hero');
    const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    // STATE BARU: Untuk mengontrol tingkat zoom (1 = 100%)
    const [zoom, setZoom] = useState(1); // Default 85% agar pas di layar saat awal

    // FIX: Tipe data untuk menghindari 'any'
    const handleUpdateProps = (id: string, newProps: Record<string, string>) => {
        setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, props: newProps } : b)));
    };

    // Helper untuk menentukan lebar canvas preview
    const getViewWidth = () => {
        if (viewMode === 'mobile') return 'w-[375px]';
        if (viewMode === 'tablet') return 'w-[768px]';
        return 'w-[1100px]'; // Kita set lebar desktop tetap agar zoom terasa gunanya
    };

    // FUNGSI BARU: Simpan data dan buka tab baru
    const handleOpenLivePreview = () => {
        // Simpan state saat ini ke localStorage
        localStorage.setItem('preview_blocks', JSON.stringify(blocks));
        // Buka rute /preview di tab baru
        window.open('/preview', '_blank');
    };

    useEffect(() => {
        localStorage.setItem('preview_blocks', JSON.stringify(blocks));
    }, [blocks]);

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* --- SIDEBAR --- */}
            <aside className="w-87.5 border-r flex flex-col bg-white z-20">
                <div className="p-4 mb-2">
                    <h1 className="font-bold text-gray-900 text-center">Page Editor</h1>
                    <p className="text-xs text-gray-500 text-center">Customize your sections</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30">
                    {blocks.map((block) => (
                        <div key={block.id} className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                            <div 
                                onClick={() => setOpenId(openId === block.id ? null : block.id)}
                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {openId === block.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    <span className="font-bold text-sm text-gray-700 uppercase tracking-tight">{block.type} Section</span>
                                </div>
                                <div className="flex gap-2 text-gray-400">
                                    <Eye size={16} className="hover:text-blue-500" />
                                    <RotateCcw size={16} className="hover:text-gray-600" />
                                </div>
                            </div>
                            
                            {openId === block.id && (
                                <div className="p-4 border-t border-gray-100 bg-white">
                                    <PropsEditor
                                        schema={schemaMap[block.type]}
                                        value={block.props as Record<string, string>}
                                        onChange={(newProps) => handleUpdateProps(block.id, newProps)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    
                    <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 text-sm font-medium hover:bg-white hover:border-gray-300 transition-all">
                        + Add New Section
                    </button>
                </div>
            </aside>

            {/* --- MAIN AREA --- */}
            <main className="flex-1 flex flex-col bg-[#f3f4f6]">
                
                {/* TOOLBAR ATAS */}
                <div className="h-16 bg-white flex items-center justify-between px-6 shadow-sm z-10">
                    {/* Sisi Kiri: Kosong/Logo */}
                    <div className="w-1/4">
                        <button 
                            onClick={handleOpenLivePreview}
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs font-bold hover:bg-blue-100 transition-colors"
                            title="Live Preview"
                        >
                            <ExternalLink size={14} />
                            LIVE PREVIEW
                        </button>

                    </div>

                    {/* Tengah: Device Switcher */}
                    <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                        <button 
                            onClick={() => { setViewMode('mobile'); setZoom(1); }}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                            title="Mobile View"
                        >
                            <Smartphone size={18} />
                        </button>
                        <button 
                            onClick={() => { setViewMode('tablet'); setZoom(1); }}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'tablet' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                            title="Tablet View"
                        >
                            <Tablet size={18} />
                        </button>
                        <button 
                            onClick={() => { setViewMode('desktop'); setZoom(1); }}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                            title="Desktop View"
                        >
                            <Monitor size={18} />
                        </button>
                    </div>

                    {/* Kanan: Zoom Controls (Sesuai gambar ke-3) */}
                    <div className="w-1/4 flex justify-end items-center gap-2">
                        <div className="flex items-center bg-gray-50 border rounded-lg p-1">
                            <button 
                                onClick={() => setZoom(prev => Math.max(0.2, prev - 0.1))}
                                className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-gray-500"
                            >
                                <Minus size={14} />
                            </button>
                            
                            <span className="text-[11px] font-bold w-12 text-center text-gray-600">
                                {Math.round(zoom * 100)}%
                            </span>

                            <button 
                                onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
                                className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-gray-500"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => setZoom(1)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Reset to 100%"
                        >
                            <Maximize size={18} />
                        </button>
                    </div>
                </div>

                {/* CANVAS AREA */}
                <div className="flex-1 overflow-auto p-12 bg-gray-200/50 flex justify-center items-start">
                    {/* Wrapper untuk Scale agar tidak merusak layout flex */}
                    <div 
                        style={{ 
                            transform: `scale(${zoom})`, 
                            transformOrigin: 'top center',
                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
                        }}
                        className={`${getViewWidth()} bg-white shadow-2xl min-h-[80vh] relative rounded-lg ring-1 ring-black/5 mb-20`}
                    >
                        {/* Browser Header Decoration */}
                        <div className="h-10 bg-white border-b flex items-center justify-between px-4 rounded-t-lg">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/40" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-400/40" />
                                <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/40" />
                            </div>
                            <div className="bg-gray-100 px-8 py-1 rounded text-[10px] text-gray-400 font-medium">
                                preview-{viewMode}.local
                            </div>
                            <div className="w-10"></div>
                        </div>

                        {/* RENDER KONTEN */}
                        <div className="p-0">
                             <PageRenderer blocks={blocks} schemaMap={schemaMap} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}