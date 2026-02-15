'use client';

import { useState } from 'react';

type DeleteUserButtonProps = {
    userId: string;
    userEmail: string;
    action: (formData: FormData) => void | Promise<void>;
    disabled?: boolean;
};

export default function DeleteUserButton({
    userId,
    userEmail,
    action,
    disabled = false,
}: DeleteUserButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (disabled) {
        return (
            <button
                type="button"
                disabled
                className="rounded-md bg-gray-200 px-2.5 py-1.5 text-xs font-semibold text-gray-500 cursor-not-allowed"
            >
                Delete
            </button>
        );
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="rounded-md bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
            >
                Delete
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
                        <h3 className="text-base font-semibold text-gray-900">Hapus user?</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            User <span className="font-semibold">{userEmail}</span> akan dihapus bersama data terkait.
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
                                <input type="hidden" name="userId" value={userId} />
                                <button
                                    type="submit"
                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                                >
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
