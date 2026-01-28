export const cardSchema = {
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
} as const;
