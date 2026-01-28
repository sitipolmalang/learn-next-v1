'use client';

import { useState } from 'react';
import PropsEditor from '../components/editor/PropsEditor';
import { schemaMap, ComponentType } from '../components/editor/schemaMap';
import { rendererMap } from '../components/editor/renderedMap';

export default function EditorPage() {
    const [type, setType] = useState<ComponentType>('button');
    const [props, setProps] = useState<Record<string, string>>({});

    const schema = schemaMap[type];
    const Component = rendererMap[type];

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-1/3 p-6 border-r space-y-4">
                <select
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value as ComponentType);
                        setProps({});
                    }}
                    className="w-full border p-2 rounded"
                >
                    <option value="button">Button</option>
                    <option value="card">Card</option>
                    <option value="hero">Hero</option>
                </select>

                <PropsEditor
                    schema={schema}
                    value={props}
                    onChange={setProps}
                />
            </aside>

            {/* Preview */}
            <main className="flex-1 flex items-center justify-center bg-gray-100">
                <Component {...props} />
            </main>
        </div>
    );
}
