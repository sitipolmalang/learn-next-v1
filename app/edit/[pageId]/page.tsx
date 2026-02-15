'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import type { Block } from '@/app/components/editor/types/editor';
import { schemaMap } from '@/app/components/editor/schemas/schema';
import type { Template } from '@/app/components/templates/types';
import EditorSidebar from '@/app/components/editor/EditorSidebar';
import EditorToolbar from '@/app/components/editor/EditorToolbar';
import EditorCanvas from '@/app/components/editor/EditorCanvas';
import ResetModal from '@/app/components/editor/ResetModal';
import TemplateSelector from '@/app/components/templates/TemplateSelector';

type EditorPropValue = string | number | boolean;
type EditorProps = Record<string, EditorPropValue>;

type PageResponse = {
    page: {
        id: string;
        name: string;
        subdomain: string;
        blocks: Block[];
    };
};

const INITIAL_BLOCKS: Block[] = [
    { id: 'hero', type: 'hero', props: { heading: 'Loading...', subheading: '', align: 'center' } },
];

export default function EditByPageId() {
    const params = useParams<{ pageId: string }>();
    const router = useRouter();
    const pageId = params.pageId;

    const [pageName, setPageName] = useState('Halaman');
    const [subdomain, setSubdomain] = useState('');
    const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
    const [isLoaded, setIsLoaded] = useState(false);
    const [openId, setOpenId] = useState<string | null>('hero');
    const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    const [zoom, setZoom] = useState(1);
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    const [resetModal, setResetModal] = useState<{ isOpen: boolean; blockId: string | null }>({
        isOpen: false,
        blockId: null,
    });

    const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isInitialSyncRef = useRef(true);

    useEffect(() => {
        const loadPage = async () => {
            const response = await fetch(`/api/pages/${pageId}`);

            if (response.status === 401) {
                router.replace('/login');
                return;
            }

            if (!response.ok) {
                router.replace('/dashboard');
                return;
            }

            const data = (await response.json()) as PageResponse;
            setPageName(data.page.name);
            setSubdomain(data.page.subdomain);
            setBlocks(data.page.blocks);
            setIsLoaded(true);
        };

        void loadPage();
    }, [pageId, router]);

    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(`preview_blocks_${pageId}`, JSON.stringify(blocks));

        if (isInitialSyncRef.current) {
            isInitialSyncRef.current = false;
            return;
        }

        if (saveTimerRef.current) {
            clearTimeout(saveTimerRef.current);
        }

        saveTimerRef.current = setTimeout(() => {
            void fetch(`/api/pages/${pageId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blocks }),
            });
        }, 500);

        return () => {
            if (saveTimerRef.current) {
                clearTimeout(saveTimerRef.current);
            }
        };
    }, [blocks, isLoaded, pageId]);

    const handleUpdateProps = useCallback((id: string, newProps: EditorProps) => {
        setBlocks((prev) =>
            prev.map((block) =>
                block.id === id
                    ? { ...block, props: { ...block.props, ...newProps } }
                    : block
            )
        );
    }, []);

    const toggleVisibility = useCallback((id: string) => {
        setBlocks((prev) => prev.map((block) => (block.id === id ? { ...block, hidden: !block.hidden } : block)));
    }, []);

    const handleLoadTemplate = useCallback((template: Template) => {
        setBlocks(template.blocks.map((block) => ({ ...block })));
        setShowTemplateSelector(false);
    }, []);

    const confirmReset = useCallback(() => {
        const id = resetModal.blockId;
        if (!id) return;

        const block = blocks.find((item) => item.id === id);
        if (!block) return;

        const schema = schemaMap[block.type];
        const defaultProps: EditorProps = {};
        Object.entries(schema).forEach(([key, field]) => {
            defaultProps[key] = field.defaultValue;
        });

        handleUpdateProps(id, defaultProps);
        setResetModal({ isOpen: false, blockId: null });
    }, [blocks, handleUpdateProps, resetModal.blockId]);

    if (!isLoaded) {
        return <div className="flex h-screen items-center justify-center">Loading editor...</div>;
    }

    return (
        <div className="flex h-screen flex-col lg:flex-row bg-white overflow-hidden">
            <EditorSidebar
                blocks={blocks}
                openId={openId}
                setOpenId={setOpenId}
                toggleVisibility={toggleVisibility}
                triggerReset={(id) => setResetModal({ isOpen: true, blockId: id })}
                handleUpdateProps={handleUpdateProps}
                schemaMap={schemaMap}
            />

            <main className="flex-1 flex flex-col bg-[#f3f4f6]">
                <div className="border-b border-gray-200 bg-gradient-to-r from-white to-blue-50 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm hover:bg-blue-50"
                    >
                        <ArrowLeft size={14} />
                        Kembali ke Dashboard
                    </Link>
                    <p className="hidden sm:block text-xs font-medium text-gray-500 truncate max-w-[220px]">
                        Sedang edit: {pageName}
                    </p>
                </div>
                <EditorToolbar
                    pageId={pageId}
                    pageName={pageName}
                    subdomain={subdomain}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    zoom={zoom}
                    setZoom={setZoom}
                    handleOpenLivePreview={() => window.open(`http://${subdomain}.localhost:3000`, '_blank')}
                    onOpenTemplateSelector={() => setShowTemplateSelector(true)}
                />

                <EditorCanvas blocks={blocks} viewMode={viewMode} zoom={zoom} schemaMap={schemaMap} />
            </main>

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
