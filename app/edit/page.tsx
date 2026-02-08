'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

// Types & Schemas
import { Block } from '../components/PageRenderer';
import { schemaMap } from '../components/editor/schemas/schema'; 
import { Template } from '../components/templates/types';
import { defaultTemplates } from '../components/templates/defaults';

// Components
import EditorSidebar from '../components/editor/EditorSidebar';
import EditorToolbar from '../components/editor/EditorToolbar';
import EditorCanvas from '../components/editor/EditorCanvas';
import ResetModal from '../components/editor/ResetModal';
import TemplateSelector from '../components/templates/TemplateSelector';

// Tipe data fleksibel untuk editor internal
type EditorPropValue = string | number | boolean;
type EditorProps = Record<string, EditorPropValue>;

function EditorPageContent() {
    const searchParams = useSearchParams();
    const templateId = searchParams.get('templateId');

    // --- 1. STATE INITIALIZATION (Lazy Loading untuk cegah Cascading Render) ---
    const [blocks, setBlocks] = useState<Block[]>(() => {
        if (templateId) {
            const template = defaultTemplates.find(t => t.id === templateId);
            if (template) return template.blocks.map(b => ({ ...b }));
        }
        return [
            { id: 'hero', type: 'hero', props: { heading: 'Start with a Template', subheading: 'Click "Change Template" above.', align: 'center' } },
        ];
    });

    const [openId, setOpenId] = useState<string | null>('hero');
    const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    const [zoom, setZoom] = useState(1);
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    const [resetModal, setResetModal] = useState<{ isOpen: boolean; blockId: string | null }>({
        isOpen: false,
        blockId: null
    });

    // --- 2. HANDLERS (Memakai useCallback untuk stabilitas performa) ---

    const handleUpdateProps = useCallback((id: string, newProps: EditorProps) => {
        setBlocks((prev) =>
            prev.map((b) => (
                b.id === id 
                ? { ...b, props: { ...b.props, ...newProps } as unknown as Record<string, string> } 
                : b
            ))
        );
    }, []);

    const toggleVisibility = useCallback((id: string) => {
        setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, hidden: !b.hidden } : b)));
    }, []);

    const handleLoadTemplate = useCallback((template: Template) => {
        setBlocks(template.blocks.map(block => ({ ...block })));
        setShowTemplateSelector(false);
    }, []);

    // FUNGSI YANG TADI HILANG: confirmReset
    const confirmReset = useCallback(() => {
        const id = resetModal.blockId;
        if (!id) return;

        const block = blocks.find((b) => b.id === id);
        if (block) {
            const schema = schemaMap[block.type];
            const defaultProps: EditorProps = {};

            // Ambil default value dari schema eksternal
            Object.entries(schema).forEach(([key, field]) => {
                defaultProps[key] = field.defaultValue;
            });

            handleUpdateProps(id, defaultProps);
        }
        setResetModal({ isOpen: false, blockId: null });
    }, [resetModal.blockId, blocks, handleUpdateProps]);

    // --- 3. EFFECTS ---

    // Sinkronisasi LocalStorage
    useEffect(() => {
        localStorage.setItem('preview_blocks', JSON.stringify(blocks));
    }, [blocks]);

    // Bersihkan URL tanpa trigger re-render blocks
    useEffect(() => {
        if (templateId) {
            window.history.replaceState(null, '', '/editor');
        }
    }, [templateId]);

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* SIDEBAR */}
            <EditorSidebar
                blocks={blocks}
                openId={openId}
                setOpenId={setOpenId}
                toggleVisibility={toggleVisibility}
                triggerReset={(id) => setResetModal({ isOpen: true, blockId: id })}
                handleUpdateProps={handleUpdateProps}
                schemaMap={schemaMap}
            />

            {/* MAIN AREA */}
            <main className="flex-1 flex flex-col bg-[#f3f4f6]">
                <EditorToolbar
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    zoom={zoom}
                    setZoom={setZoom}
                    handleOpenLivePreview={() => window.open('/preview', '_blank')}
                    onOpenTemplateSelector={() => setShowTemplateSelector(true)}
                />

                <EditorCanvas 
                    blocks={blocks} 
                    viewMode={viewMode} 
                    zoom={zoom} 
                    schemaMap={schemaMap} 
                />
            </main>

            {/* MODALS */}
            <ResetModal
                isOpen={resetModal.isOpen}
                onClose={() => setResetModal({ isOpen: false, blockId: null })}
                onConfirm={confirmReset}
            />

            <TemplateSelector
                isOpen={showTemplateSelector}
                onClose={() => setShowTemplateSelector(false)}
                onSelect={handleLoadTemplate}
            />
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Editor...</div>}>
            <EditorPageContent />
        </Suspense>
    );
}