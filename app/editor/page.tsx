'use client';

import { useState } from 'react';
import PropsEditor from '../components/editor/PropsEditor';
import Preview from '../components/editor/Preview';

export default function EditorPage() {
    const [buttonProps, setButtonProps] = useState({
        label: 'Click Me',
        color: '#3b82f6',
        href: '#',
    });

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-1/3 p-6 border-r bg-gray-50 text-gray-800">
                <h2 className="text-lg font-bold mb-4">Button Props</h2>
                <PropsEditor
                    {...buttonProps}
                    onChange={(newProps) =>
                        setButtonProps(prev => ({ ...prev, ...newProps }))
                    }
                />
            </aside>

            {/* Preview */}
            <main className="flex-1 bg-white">
                <Preview {...buttonProps} />
            </main>
        </div>
    );
}
