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
    backgroundImage: {
        type: 'text',
        label: 'Background Image URL',
        defaultValue: '',
    },
    overlayOpacity: {
        type: 'select',
        label: 'Overlay Opacity (%)',
        defaultValue: '50',
        options: [
            { value: '0', label: '0%' },
            { value: '10', label: '10%' },
            { value: '30', label: '30%' },
            { value: '50', label: '50%' },
            { value: '70', label: '70%' },
            { value: '90', label: '90%' },
        ],
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
