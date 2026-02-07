// app/preview/page.tsx
'use client';

import { useEffect, useState } from 'react';
import PageRenderer, { Block } from '../components/PageRenderer';
import { heroSchema } from '../components/editor/schemas/hero.schema';
import { cardSchema } from '../components/editor/schemas/card.schema';
import { buttonSchema } from '../components/editor/schemas/button.schema';
import { titleSchema } from '../components/editor/schemas/title.schema';

const schemaMap = {
    hero: heroSchema,
    card: cardSchema,
    button: buttonSchema,
    title: titleSchema,
};

export default function PreviewPage() {
    // 1. Inisialisasi dengan null atau array kosong
    const [blocks, setBlocks] = useState<Block[] | null>(null);

    useEffect(() => {
        // Fungsi untuk mengambil data
        const loadData = () => {
            const savedBlocks = localStorage.getItem('preview_blocks');
            if (savedBlocks) {
                try {
                    const parsed = JSON.parse(savedBlocks);
                    setBlocks(parsed);
                } catch (e) {
                    console.error("Gagal parse data preview", e);
                    setBlocks([]);
                }
            } else {
                setBlocks([]);
            }
        };

        // Load data saat pertama kali mount
        loadData();

        // 2. Listener untuk sinkronisasi antar tab (Real-time)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'preview_blocks') {
                loadData();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // 3. Tampilkan loading selama blocks masih null (proses sinkronisasi)
    // Ini mencegah render "setengah matang" yang memicu cascading renders
    if (blocks === null) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-pulse text-gray-400 font-medium">
                    Synchronizing Preview...
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <PageRenderer blocks={blocks} schemaMap={schemaMap} />
        </main>
    );
}