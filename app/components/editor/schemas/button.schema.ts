import { Field } from '../types/editor';

// button.schema.ts
export const buttonSchema: Record<string, Field> = {
    label: {
        type: 'text',
        label: 'Button Text',
        defaultValue: 'Click Me', // Ganti 'default' jadi 'defaultValue'
    },
    color: {
        type: 'color',
        label: 'Background Color',
        defaultValue: '#3b82f6',
    },
    href: {
        type: 'text',
        label: 'Link',
        defaultValue: 'https://google.com',
    },
    textColor: {
        type: 'select',
        label: 'Text Color',
        defaultValue: '#ffffff',
        options: [
            { value: '#ffffff', label: 'White' },
            { value: '#000000', label: 'Black' },
        ],
    },
} as const; // Gunakan 'as const' untuk membuat schema bersifat readonly