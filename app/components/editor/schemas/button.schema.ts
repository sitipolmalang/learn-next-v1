export const buttonSchema = {
    label: {
        type: 'text',
        label: 'Button Text',
        default: 'Click Me',
    },
    color: {
        type: 'color',
        label: 'Background Color',
        default: '#3b82f6',
    },
    href: {
        type: 'text',
        label: 'Link',
        default: '/',
    },
} as const;
