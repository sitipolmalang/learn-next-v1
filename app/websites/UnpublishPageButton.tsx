'use client';

import { useState } from 'react';

type UnpublishPageButtonProps = {
    pageId: string;
    pageName: string;
    action: (formData: FormData) => void | Promise<void>;
};

export default function UnpublishPageButton({
    pageId,
    pageName,
    action,
}: UnpublishPageButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
            >
                Unpublish
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
                        <h3 className="text-base font-semibold text-gray-900">Jadikan Draft?</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Website <span className="font-semibold">{pageName}</span> akan di-unpublish dan
                            statusnya kembali menjadi draft.
                        </p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <form action={action}>
                                <input type="hidden" name="pageId" value={pageId} />
                                <button
                                    type="submit"
                                    className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700"
                                >
                                    Ya, Unpublish
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
