'use client';

import { useState } from 'react';
import PageRenderer from '../components/PageRendered';
import PropsEditor from '../components/editor/PropsEditor';

import { heroSchema } from '../components/editor/schemas/hero.schema';
import { cardSchema } from '../components/editor/schemas/card.schema';
import { buttonSchema } from '../components/editor/schemas/button.schema';
import { Block, BlockType } from '../components/PageRendered';
import { Field } from '../components/editor/PropsEditor';


const schemaMap: Record<BlockType, Record<string, Field>> = {
    hero: heroSchema,
    card: cardSchema,
    button: buttonSchema,
};


export default function EditorPage() {
    const [blocks, setBlocks] = useState<Block[]>([
        {
            id: 'hero',
            type: 'hero',
            props: {
                heading: 'Hero Title',
                subheading: 'Hero subtitle text',
                align: 'center',
            },
        },
        {
            id: 'card',
            type: 'card',
            props: {
                title: 'Card Title',
                description: 'Card description',
            },
        },
        {
            id: 'button',
            type: 'button',
            props: {
                label: 'Click Me',
                href: 'https://google.com',
                color: '#3b82f6',
                textColor: '#ffffff',
            },
        },
    ]);


    const [activeId, setActiveId] = useState('hero');
    const activeBlock = blocks.find(b => b.id === activeId)!;

    return (
        <div className="flex h-screen">
            {/* ASIDE */}
            <aside className="w-1/3 border-r p-6 space-y-4">
                {blocks.map((b) => (
                    <button
                        key={b.id}
                        onClick={() => setActiveId(b.id)}
                        className={`block w-full text-left px-3 py-2 rounded
                            ${activeId === b.id
                                ? 'bg-blue-100'
                                : 'hover:bg-gray-100'}`}
                    >
                        {b.type.toUpperCase()}
                    </button>
                ))}

                <PropsEditor
                    schema={schemaMap[activeBlock.type]}
                    value={activeBlock.props}
                    onChange={(newProps) =>
                        setBlocks(blocks.map(b =>
                            b.id === activeId
                                ? { ...b, props: newProps }
                                : b
                        ))
                    }
                />
            </aside>

            {/* PREVIEW */}
            <main className="flex-1 p-10 bg-gray-100">
                <PageRenderer
                    blocks={blocks}
                    schemaMap={schemaMap}
                />

            </main>
        </div>
    );
}
