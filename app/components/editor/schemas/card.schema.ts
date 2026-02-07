import { Field } from '../types/editor';

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
    shadow: {
        type: 'select',
        label: 'Shadow',
        defaultValue: 'md',
        options: [
            { value: 'none', label: 'None' },
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
            { value: 'xl', label: 'Extra Large' },
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
            { value: 'xl', label: 'Extra Large' },
            { value: 'full', label: 'Full' },
        ],
    },
    hoverEffect: {
        type: 'select', // Using select as boolean toggle for now (or convert to toggle-group if supported)
        label: 'Hover Effect',
        defaultValue: 'true',
        options: [
            { value: 'true', label: 'On' },
            { value: 'false', label: 'Off' },
        ],
    },
} as const;
