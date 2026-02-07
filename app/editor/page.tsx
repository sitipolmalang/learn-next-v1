'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Block, BlockType } from '../components/PageRenderer';

import { heroSchema } from '../components/editor/schemas/hero.schema';
import { cardSchema } from '../components/editor/schemas/card.schema';
import { buttonSchema } from '../components/editor/schemas/button.schema';
import { titleSchema } from '../components/editor/schemas/title.schema';
import { imageSchema } from '../components/editor/schemas/image.schema';
import { featureGridSchema } from '../components/editor/schemas/featureGrid.schema';
import { testimonialGridSchema } from '../components/editor/schemas/testimonialGrid.schema';
import { footerSchema } from '../components/editor/schemas/footer.schema';
import { Field } from '../components/editor/types/editor';

import EditorSidebar from '../components/editor/EditorSidebar';
import EditorToolbar from '../components/editor/EditorToolbar';
import EditorCanvas from '../components/editor/EditorCanvas';
import ResetModal from '../components/editor/ResetModal';

import TemplateSelector from '../components/templates/TemplateSelector';
import { Template } from '../components/templates/types';
import { defaultTemplates } from '../components/templates/defaults';

const schemaMap: Record<BlockType, Record<string, Field>> = {
    hero: heroSchema,
    card: cardSchema,
    button: buttonSchema,
    title: titleSchema,
    image: imageSchema,
    featureGrid: featureGridSchema,
    testimonialGrid: testimonialGridSchema,
    footer: footerSchema,
};

function EditorPageContent() {
    const [blocks, setBlocks] = useState<Block[]>([
        { id: 'hero', type: 'hero', props: { heading: 'Start with a Template', subheading: 'Click "Change Template" above to choose a layout.', align: 'center' } },
    ]);

    const [openId, setOpenId] = useState<string | null>('hero');
    const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    // STATE BARU: Untuk mengontrol tingkat zoom (1 = 100%)
    const [zoom, setZoom] = useState(1); // Default 85% agar pas di layar saat awal

    // FIX: Tipe data untuk menghindari 'any'
    const handleUpdateProps = (id: string, newProps: Record<string, string | number | boolean>) => {
        setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, props: newProps as Record<string, string> } : b)));
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

    // 1. Fungsi Toggle Sembunyikan/Tampilkan
    const toggleVisibility = (id: string) => {
        setBlocks(prev => prev.map(b =>
            b.id === id ? { ...b, hidden: !b.hidden } : b
        ));
    };

    // 2. Fungsi Reset ke Default Schema
    const resetBlock = (id: string) => {
        const block = blocks.find(b => b.id === id);
        if (!block) return;

        const schema = schemaMap[block.type];
        const defaultProps: Record<string, string | number | boolean> = {};

        // Ambil default value dari schema masing-masing field
        Object.entries(schema).forEach(([key, field]) => {
            defaultProps[key] = field.defaultValue;
        });

        handleUpdateProps(id, defaultProps);
    };

    const [resetModal, setResetModal] = useState<{ isOpen: boolean; blockId: string | null }>({
        isOpen: false,
        blockId: null
    });

    // Fungsi untuk memicu modal muncul
    const triggerReset = (id: string) => {
        setResetModal({ isOpen: true, blockId: id });
    };

    // Fungsi eksekusi reset (dipanggil dari dalam modal)
    const confirmReset = () => {
        if (resetModal.blockId) {
            resetBlock(resetModal.blockId);
            setResetModal({ isOpen: false, blockId: null });
        }
    };

    // 3. Template System State
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);

    // Logic untuk memuat template dari URL query param (misal: /editor?templateId=landing)
    const searchParams = useSearchParams();

    useEffect(() => {
        const templateId = searchParams.get('templateId');
        if (templateId) {
            const template = defaultTemplates.find(t => t.id === templateId);
            if (template) {
                // Load template blocks
                const newBlocks = template.blocks.map(block => ({
                    ...block,
                    props: { ...block.props }
                }));
                setBlocks(newBlocks);

                // Clear URL param without reload (cleaner URL)
                window.history.replaceState(null, '', '/editor');
            }
        }
    }, [searchParams]);

    const handleLoadTemplate = (template: Template) => {
        // Deep copy untuk menghindari mutasi reference
        const newBlocks = template.blocks.map(block => ({
            ...block,
            props: { ...block.props }
        }));

        setBlocks(newBlocks);
        setShowTemplateSelector(false);
    };

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* --- SIDEBAR --- */}
            <div className="flex">
                <EditorSidebar
                    blocks={blocks}
                    openId={openId}
                    setOpenId={setOpenId}
                    toggleVisibility={toggleVisibility}
                    triggerReset={triggerReset}
                    handleUpdateProps={handleUpdateProps}
                    schemaMap={schemaMap}
                />
            </div>

            {/* --- MAIN AREA --- */}
            <main className="flex-1 flex flex-col bg-[#f3f4f6]">

                {/* TOOLBAR ATAS */}
                <EditorToolbar
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    zoom={zoom}
                    setZoom={setZoom}
                    handleOpenLivePreview={handleOpenLivePreview}
                    onOpenTemplateSelector={() => setShowTemplateSelector(true)}
                />

                {/* CANVAS AREA */}
                <EditorCanvas
                    blocks={blocks}
                    viewMode={viewMode}
                    zoom={zoom}
                    schemaMap={schemaMap}
                />
            </main>

            {/* CUSTOM RESET MODAL */}
            <ResetModal
                isOpen={resetModal.isOpen}
                onClose={() => setResetModal({ isOpen: false, blockId: null })}
                onConfirm={confirmReset}
            />

            {/* TEMPLATE SELECTOR MODAL */}
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
        <Suspense fallback={<div>Loading Editor...</div>}>
            <EditorPageContent />
        </Suspense>
    );
}
