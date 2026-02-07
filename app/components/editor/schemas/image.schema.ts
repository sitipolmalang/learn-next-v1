import { Field } from '../types/editor';

export const imageSchema: Record<string, Field> = {
    src: {
        type: 'text',
        label: 'Image URL',
        defaultValue: 'https://placehold.co/600x400'
    },
    alt: {
        type: 'text',
        label: 'Alt Text',
        defaultValue: 'Image description'
    },
    caption: {
        type: 'text',
        label: 'Caption',
        defaultValue: ''
    },
    align: {
        type: 'select',
        label: 'Alignment',
        defaultValue: 'center',
        options: [
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' }
        ]
    }
};
