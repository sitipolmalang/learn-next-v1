'use client';

import { Trash2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import ConfirmModal from '@/app/components/ui/ConfirmModal';

type DeletePageButtonProps = {
    pageId: string;
    pageName: string;
    action: (formData: FormData) => void | Promise<void>;
    compact?: boolean;
};

export default function DeletePageButton({ pageId, pageName, action, compact = false }: DeletePageButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleConfirmDelete = () => {
        const formData = new FormData();
        formData.set('pageId', pageId);

        setIsOpen(false);
        startTransition(async () => {
            await action(formData);
        });
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`inline-flex items-center rounded-lg border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 ${
                    compact ? 'gap-1 px-2 py-2' : 'gap-1.5 px-2.5 py-1.5'
                }`}
                title="Delete website"
            >
                <Trash2 size={13} />
                <span className={compact ? 'hidden sm:inline' : ''}>Delete</span>
            </button>

            <ConfirmModal
                open={isOpen}
                title="Hapus halaman?"
                message={
                    <>
                        Halaman <span className="font-semibold">{pageName}</span> akan dihapus permanen.
                    </>
                }
                confirmLabel="Ya, Hapus"
                confirmTone="danger"
                pending={isPending}
                onCancel={() => setIsOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}
