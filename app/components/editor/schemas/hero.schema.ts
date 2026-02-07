import { Field } from '../types/editor';

export const heroSchema: Record<string, Field> = {
    heading: {
        type: 'text',
        label: 'Heading',
        defaultValue: 'Hero Title',
    },
    subheading: {
        type: 'text',
        label: 'Subheading',
        defaultValue: 'Hero subtitle text',
    },
    align: {
        type: 'select',
        label: 'Alignment',
        defaultValue: 'center',
        options: [
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
        ],
    },
};
