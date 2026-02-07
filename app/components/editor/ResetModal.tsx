import { RotateCcw } from 'lucide-react';

interface ResetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ResetModal({ isOpen, onClose, onConfirm }: ResetModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop (Latar belakang gelap blur) */}
            <div
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 mb-4">
                        <RotateCcw className="h-7 w-7 text-red-500" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900">Reset Section?</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        All changes will be lost and reset to the default settings.
                    </p>
                </div>

                <div className="flex border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-4 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors border-r border-gray-100"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-4 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                        Ya, Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
