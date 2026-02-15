import PageRenderer, { Block } from '../PageRenderer';
import { BlockType, Field } from './types/editor';

interface EditorCanvasProps {
    blocks: Block[];
    viewMode: 'mobile' | 'tablet' | 'desktop';
    zoom: number;
    schemaMap: Record<BlockType, Record<string, Field>>;
    isFullscreen?: boolean;
}

export default function EditorCanvas({
    blocks,
    viewMode,
    zoom,
    schemaMap,
    isFullscreen = false,
}: EditorCanvasProps) {
    // Helper untuk menentukan lebar canvas preview
    const getViewWidth = () => {
        if (viewMode === 'mobile') return 'w-[375px]';
        if (viewMode === 'tablet') return 'w-[768px]';
        return 'w-[900px]'; // Kita set lebar desktop tetap agar zoom terasa gunanya
    };

    return (
        <div className={`flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y bg-gray-200/50 flex justify-center items-start ${isFullscreen ? 'p-0' : 'p-4 sm:p-8 lg:p-12'}`}>
            {/* Wrapper untuk Scale agar tidak merusak layout flex */}
            <div
                style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className={`${isFullscreen ? 'w-full min-h-[100dvh] rounded-none shadow-none ring-0 mb-0' : `${getViewWidth()} min-h-[80vh] relative rounded-lg ring-1 ring-black/5 mb-20 shadow-2xl`} bg-white`}
            >
                {/* Browser Header Decoration */}
                {!isFullscreen && (
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
                )}

                {/* RENDER KONTEN */}
                <div className="p-0">
                    <PageRenderer blocks={blocks} schemaMap={schemaMap} />
                </div>
            </div>
        </div>
    );
}
