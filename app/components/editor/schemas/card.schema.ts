import { Field } from '../PropsEditor';

export const cardSchema: Record<string, Field> = {
    title: {
        type: 'text',
        label: 'Title',
        defaultValue: 'Card Title',
    },
    description: {
        type: 'text',
        label: 'Description',
        defaultValue: 'This is a card description',
    },
    backgroundColor: {
        type: 'color',
        label: 'Background',
        defaultValue: '#ffffff',
    },
    align: {
        type: 'select',
        label: 'Alignment',
        defaultValue: 'left',
        options: [
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
        ],
    },
} as const;
