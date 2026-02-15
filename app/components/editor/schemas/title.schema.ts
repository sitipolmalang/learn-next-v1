import { Field } from '../types/editor';

export const titleSchema: Record<string, Field> = {
    text: {
        type: 'text',
        label: 'Text',
        defaultValue: 'Default Title',
    },
    level: {
        type: 'select',
        label: 'Level',
        defaultValue: 'h1',
        options: [
            { value: 'h1', label: 'H1' },
            { value: 'h2', label: 'H2' },
            { value: 'h3', label: 'H3' },
        ],
    },
    color: {
        type: 'color',
        label: 'Color',
        defaultValue: '#000000',
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
};