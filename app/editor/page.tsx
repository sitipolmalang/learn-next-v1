'use client';

import { useState } from 'react';
import PropsEditor from '../components/editor/PropsEditor';
import ButtonOne from '../components/ui/ButtonOne';
import { buttonSchema } from '../components/editor/schemas/button.schema';

// 1. Update tipe agar menyertakan textColor
type ButtonProps = {
    label: string;
    color: string;
    href: string;
    textColor: string; // Tambahkan ini
};

export default function EditorPage() {
    // 2. Inisialisasi state dengan textColor
    const [buttonProps, setButtonProps] = useState<ButtonProps>({
        label: 'Click Me',
        color: '#3b82f6',
        href: 'https://google.com',
        textColor: '#ffffff', // Default putih
    });

    return (
        <div className="flex h-screen">
            <aside className="w-1/3 p-6 border-r bg-gray-50 text-gray-700 overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Button Props</h2>
                <PropsEditor
                    schema={buttonSchema}
                    value={buttonProps}
                    onChange={(newValue) =>
                        setButtonProps(newValue as ButtonProps)
                    }
                />
            </aside>

            <main className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="p-10 bg-white rounded-xl shadow-sm">
                    {/* 3. Spread operator sekarang mengirimkan textColor ke ButtonOne */}
                    <ButtonOne {...buttonProps} />
                </div>
            </main>
        </div>
    );
}