import { useMemo, useState } from 'react';
import { ExternalLink, Maximize, Minus, Monitor, Plus, Smartphone, Tablet, LayoutTemplate, Upload, X } from 'lucide-react';

interface EditorToolbarProps {
    pageId: string;
    pageName: string;
    subdomain: string;
    viewMode: 'mobile' | 'tablet' | 'desktop';
    setViewMode: (mode: 'mobile' | 'tablet' | 'desktop') => void;
    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    handleOpenLivePreview: () => void;
    onOpenTemplateSelector: () => void;
}

export default function EditorToolbar({
    pageId,
    pageName,
    subdomain,
    viewMode,
    setViewMode,
    zoom,
    setZoom,
    handleOpenLivePreview,
    onOpenTemplateSelector
}: EditorToolbarProps) {
    const [isPublishOpen, setIsPublishOpen] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const sanitizedSubdomain = useMemo(
        () => subdomain.trim().toLowerCase(),
        [subdomain]
    );

    const publishUrl = sanitizedSubdomain
        ? `http://${sanitizedSubdomain}.localhost:3000`
        : '';

    const handlePublish = async () => {
        if (!publishUrl) {
            window.alert('Subdomain belum tersedia untuk halaman ini.');
            return;
        }

        setIsPublishing(true);

        try {
            const response = await fetch(`/api/pages/${pageId}/publish`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Publish gagal');
            }

            window.open(publishUrl, '_blank', 'noopener,noreferrer');
            setIsPublishOpen(false);
        } catch {
            window.alert('Publish gagal. Coba ulang beberapa saat lagi.');
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <>
            <div className="bg-white px-3 py-2 shadow-sm z-10 border-b border-gray-100 lg:h-16 lg:px-6 lg:py-0 lg:flex lg:items-center lg:justify-between">
                {/* Sisi Kiri: Preview, Template, Publish */}
                <div className="w-full flex items-center gap-2 flex-wrap lg:w-1/3">
                    <span className="hidden 2xl:inline-block text-xs font-semibold text-gray-500">
                        {pageName}
                    </span>
                    <button
                        onClick={handleOpenLivePreview}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-md text-[11px] sm:text-xs font-bold hover:bg-blue-100 transition-colors border border-blue-100"
                        title="Live Preview"
                    >
                        <ExternalLink size={14} />
                        <span>PREVIEW</span>
                    </button>

                    <button
                        onClick={onOpenTemplateSelector}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 text-gray-600 rounded-md text-[11px] sm:text-xs font-bold hover:bg-gray-100 transition-colors border border-gray-200"
                        title="Change Template"
                    >
                        <LayoutTemplate size={14} />
                        <span>TEMPLATE</span>
                    </button>

                    <button
                        onClick={() => setIsPublishOpen(true)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-md text-[11px] sm:text-xs font-bold hover:bg-emerald-100 transition-colors border border-emerald-100"
                        title="Publish Website"
                    >
                        <Upload size={14} />
                        <span>PUBLISH</span>
                    </button>
                </div>

                {/* Tengah: Device Switcher */}
                <div className="mt-2 lg:mt-0 w-full lg:w-auto flex items-center justify-center bg-gray-100 p-1 rounded-lg">
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
                <div className="mt-2 lg:mt-0 w-full lg:w-1/3 flex justify-center lg:justify-end items-center gap-2">
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

            {isPublishOpen && (
                <div className="fixed inset-0 z-20 bg-black/40 flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-100">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <h2 className="text-base font-semibold text-gray-900">
                                Publish Website
                            </h2>
                            <button
                                onClick={() => setIsPublishOpen(false)}
                                className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="px-5 py-4 space-y-3">
                            <label className="text-sm text-gray-700 font-medium block">
                                Subdomain halaman
                            </label>
                            <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
                                <div className="flex-1 px-3 py-2.5 text-sm text-gray-800 bg-white">
                                    {sanitizedSubdomain}
                                </div>
                                <span className="px-3 py-2.5 text-sm text-gray-500 bg-gray-50 border-l border-gray-200">
                                    .localhost:3000
                                </span>
                            </div>

                            <p className="text-xs text-gray-500">
                                URL publish: {publishUrl || 'http://subdomain.localhost:3000'}
                            </p>
                        </div>

                        <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-2">
                            <button
                                onClick={() => setIsPublishOpen(false)}
                                className="px-3 py-2 text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handlePublish}
                                disabled={!publishUrl || isPublishing}
                                className="px-3 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed"
                            >
                                {isPublishing ? 'Publishing...' : 'Publish'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
