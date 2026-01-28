'use client';

import { useState } from 'react';
import PropsEditor from '../components/editor/PropsEditor';
import ButtonOne, { ButtonProps } from '../components/ui/ButtonOne';
import { buttonSchema } from '../components/editor/schemas/button.schema';

export default function EditorPage() {
    const [buttonProps, setButtonProps] = useState<Partial<ButtonProps>>({
        label: 'Click Me',
        color: '#3b82f6',
        href: 'https://google.com',
        textColor: '#ffffff',
    });

    return (
        <div className="flex h-screen">
            <aside className="w-1/3 p-6 border-r bg-gray-50 text-gray-700 overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Button Props</h2>

                <PropsEditor
                    schema={buttonSchema}
                    value={buttonProps}
                    onChange={setButtonProps}
                />
            </aside>

            <main className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="p-10 bg-white rounded-xl shadow-sm">
                    <ButtonOne
                        {...buttonProps}
                        label={buttonProps.label ?? 'Click Me'}
                    />
                </div>
            </main>
        </div>
    );
}
