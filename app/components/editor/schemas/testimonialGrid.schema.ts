import { Field } from '../types/editor';

export const testimonialGridSchema: Record<string, Field> = {
    title: { type: 'text', label: 'Section Title', defaultValue: 'What our customers say' },
    backgroundColor: { type: 'color', label: 'Background', defaultValue: '#f9fafb' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: '#1f2937' },

    // Testimonial 1
    t1Name: { type: 'text', label: 'Person 1 Name', defaultValue: 'John Doe' },
    t1Role: { type: 'text', label: 'Person 1 Role', defaultValue: 'Food Critic' },
    t1Quote: { type: 'text', label: 'Person 1 Quote', defaultValue: 'The taste is absolutely authentic!' },

    // Testimonial 2
    t2Name: { type: 'text', label: 'Person 2 Name', defaultValue: 'Jane Smith' },
    t2Role: { type: 'text', label: 'Person 2 Role', defaultValue: 'Business Owner' },
    t2Quote: { type: 'text', label: 'Person 2 Quote', defaultValue: 'Dimsum Joss helped my business grow.' },

    // Testimonial 3
    t3Name: { type: 'text', label: 'Person 3 Name', defaultValue: 'Mike Johnson' },
    t3Role: { type: 'text', label: 'Person 3 Role', defaultValue: 'Student' },
    t3Quote: { type: 'text', label: 'Person 3 Quote', defaultValue: 'Cheap price but premium taste.' },
};
