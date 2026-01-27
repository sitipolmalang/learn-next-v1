'use client';

import { useState } from 'react';
import PropsEditor from '../components/editor/PropsEditor';
import ButtonOne from '../components/ui/ButtonOne';
import { buttonSchema } from '../components/editor/schemas/button.schema';


type ButtonProps = {
    label: string;
    color: string;
    href: string;
};

export default function EditorPage() {
    const [buttonProps, setButtonProps] = useState<ButtonProps>({
        label: 'Click Me',
        color: '#3b82f6',
        href: 'google.com',
    });

    return (
        <div className="flex h-screen">
            <aside className="w-1/3 p-6 border-r bg-gray-50 text-gray-700">
                <h2 className="text-lg font-bold mb-4">Button Props</h2>

                <PropsEditor
                    schema={buttonSchema}
                    value={buttonProps}
                    onChange={(newValue) =>
                        setButtonProps(newValue as ButtonProps)
                    }
                />
            </aside>

            <main className="flex-1 flex items-center justify-center bg-white">
                <ButtonOne {...buttonProps} />
            </main>
        </div>
    );
}
