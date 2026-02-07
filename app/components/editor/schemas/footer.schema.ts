import { Field } from '../types/editor';

export const footerSchema: Record<string, Field> = {
    companyName: { type: 'text', label: 'Company Name', defaultValue: 'Dimsum Joss' },
    description: { type: 'text', label: 'Description', defaultValue: 'Premium dimsum for everyone.' },
    address: { type: 'text', label: 'Address', defaultValue: 'Jakarta, Indonesia' },
    phone: { type: 'text', label: 'Phone', defaultValue: '+62 812 3456 7890' },
    email: { type: 'text', label: 'Email', defaultValue: 'hello@example.com' },
    copyright: { type: 'text', label: 'Copyright', defaultValue: '© 2024 All Rights Reserved' },
    backgroundColor: { type: 'color', label: 'Background', defaultValue: '#1f2937' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: '#ffffff' },
};
