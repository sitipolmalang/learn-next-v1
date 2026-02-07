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
    backgroundColor: {
        type: 'color',
        label: 'Background Color',
        defaultValue: '#ffffff',
    },
    textColor: {
        type: 'color',
        label: 'Text Color',
        defaultValue: '#1f2937',
    },
    padding: {
        type: 'select',
        label: 'Padding Size',
        defaultValue: 'lg',
        options: [
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
            { value: 'xl', label: 'Extra Large' },
        ],
    },
};
