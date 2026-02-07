import { ExternalLink, Maximize, Minus, Monitor, Plus, Smartphone, Tablet } from 'lucide-react';

interface EditorToolbarProps {
    viewMode: 'mobile' | 'tablet' | 'desktop';
    setViewMode: (mode: 'mobile' | 'tablet' | 'desktop') => void;
    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    handleOpenLivePreview: () => void;
}

export default function EditorToolbar({
    viewMode,
    setViewMode,
    zoom,
    setZoom,
    handleOpenLivePreview
}: EditorToolbarProps) {
    return (
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
                    onClick={() => { setViewMode('desktop'); setZoom(0.85); }}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                    title="Desktop View"
                >
                    <Monitor size={18} />
                </button>
            </div>

            {/* Kanan: Zoom Controls */}
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
    );
}
