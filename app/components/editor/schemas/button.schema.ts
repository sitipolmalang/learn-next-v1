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
            { value: '#1f2937', label: 'Gray 800' },
        ],
    },
    variant: {
        type: 'select',
        label: 'Style Variant',
        defaultValue: 'solid',
        options: [
            { value: 'solid', label: 'Solid' },
            { value: 'outline', label: 'Outline' },
            { value: 'ghost', label: 'Ghost' },
        ],
    },
    size: {
        type: 'select',
        label: 'Size',
        defaultValue: 'md',
        options: [
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
        ],
    },
    borderRadius: {
        type: 'select',
        label: 'Corner Radius',
        defaultValue: 'lg',
        options: [
            { value: 'none', label: 'None' },
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
            { value: 'full', label: 'Full' },
        ],
    },
} as const; // Gunakan 'as const' untuk membuat schema bersifat readonly