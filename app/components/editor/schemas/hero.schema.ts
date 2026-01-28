export const heroSchema = {
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
} as const;
