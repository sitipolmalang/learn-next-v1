'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

type DeletePageButtonProps = {
    pageId: string;
    pageName: string;
    action: (formData: FormData) => void | Promise<void>;
    compact?: boolean;
};

export default function DeletePageButton({ pageId, pageName, action, compact = false }: DeletePageButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

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

            {isOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[1px]">
                    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
                        <h3 className="text-base font-semibold text-slate-900">Hapus halaman?</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Halaman <span className="font-semibold">{pageName}</span> akan dihapus permanen.
                        </p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                            >
                                Batal
                            </button>
                            <form action={action}>
                                <input type="hidden" name="pageId" value={pageId} />
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                                >
                                    <Trash2 size={14} />
                                    Ya, Hapus
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
