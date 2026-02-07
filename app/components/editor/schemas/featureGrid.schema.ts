import { Field } from '../types/editor';

export const featureGridSchema: Record<string, Field> = {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Our Features' },
    subtitle: { type: 'text', label: 'Section Subtitle', defaultValue: 'Why people choose us' },
    backgroundColor: { type: 'color', label: 'Background', defaultValue: '#ffffff' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: '#1f2937' },

    // Feature 1
    f1Title: { type: 'text', label: 'Feature 1 Title', defaultValue: 'Premium Quality' },
    f1Desc: { type: 'text', label: 'Feature 1 Desc', defaultValue: 'We use only the finest ingredients.' },
    f1Icon: {
        type: 'select',
        label: 'Feature 1 Icon',
        defaultValue: 'star',
        options: [
            { value: 'star', label: 'Star' },
            { value: 'shield', label: 'Shield' },
            { value: 'zap', label: 'Zap' },
            { value: 'users', label: 'Users' },
            { value: 'box', label: 'Box' },
            { value: 'truck', label: 'Truck' },
        ]
    },

    // Feature 2
    f2Title: { type: 'text', label: 'Feature 2 Title', defaultValue: 'Fast Delivery' },
    f2Desc: { type: 'text', label: 'Feature 2 Desc', defaultValue: 'Get your order in under 30 mins.' },
    f2Icon: {
        type: 'select',
        label: 'Feature 2 Icon',
        defaultValue: 'truck',
        options: [
            { value: 'star', label: 'Star' },
            { value: 'truck', label: 'Truck' },
            { value: 'zap', label: 'Zap' },
        ]
    },

    // Feature 3
    f3Title: { type: 'text', label: 'Feature 3 Title', defaultValue: 'Secure Packaging' },
    f3Desc: { type: 'text', label: 'Feature 3 Desc', defaultValue: 'Hygienic and sealed properly.' },
    f3Icon: {
        type: 'select',
        label: 'Feature 3 Icon',
        defaultValue: 'box',
        options: [
            { value: 'box', label: 'Box' },
            { value: 'shield', label: 'Shield' },
        ]
    },

    // Feature 4
    f4Title: { type: 'text', label: 'Feature 4 Title', defaultValue: 'Community' },
    f4Desc: { type: 'text', label: 'Feature 4 Desc', defaultValue: 'Join thousands of happy customers.' },
    f4Icon: {
        type: 'select',
        label: 'Feature 4 Icon',
        defaultValue: 'users',
        options: [
            { value: 'users', label: 'Users' },
            { value: 'star', label: 'Star' },
        ]
    },
};
