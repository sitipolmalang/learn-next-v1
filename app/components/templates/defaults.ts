import { Template } from './types';

export const defaultTemplates: Template[] = [
    {
        id: 'portfolio',
        name: 'Portfolio',
        description: 'Showcase your work with a clean and professional portfolio layout.',
        thumbnail: 'bg-blue-100', // Placeholder color
        blocks: [
            { id: 'hero', type: 'hero', props: { heading: 'My Creative Portfolio', subheading: 'Designing experiences that matter.', align: 'center' } },
            { id: 'title-projects', type: 'title', props: { text: 'Featured Projects', level: 'h2', align: 'center', color: '#1f2937' } },
            { id: 'card-1', type: 'card', props: { title: 'Project Alpha', description: 'A mobile app for productivity.', align: 'left' } },
            { id: 'card-2', type: 'card', props: { title: 'Project Beta', description: 'Web platform for e-commerce.', align: 'left' } },
            { id: 'title-contact', type: 'title', props: { text: 'Get In Touch', level: 'h3', align: 'center', color: '#1f2937' } },
            { id: 'btn-contact', type: 'button', props: { label: 'Email Me', color: '#3b82f6', textColor: '#ffffff' } },
        ]
    },
    {
        id: 'landing',
        name: 'Landing Page',
        description: 'A high-converting landing page for your product or service.',
        thumbnail: 'bg-green-100',
        blocks: [
            { id: 'hero', type: 'hero', props: { heading: 'The Ultimate Solution', subheading: 'Boost your productivity by 200% today.', align: 'center' } },
            { id: 'btn-cta', type: 'button', props: { label: 'Get Started Free', color: '#10b981', textColor: '#ffffff' } },
            { id: 'image-hero', type: 'image', props: { src: 'https://placehold.co/800x400', alt: 'Product Demo', align: 'center' } },
            { id: 'title-features', type: 'title', props: { text: 'Why Choose Us?', level: 'h2', align: 'center', color: '#1f2937' } },
            { id: 'card-feat-1', type: 'card', props: { title: 'Fast Performance', description: 'Lightning fast load times.', align: 'center' } },
            { id: 'card-feat-2', type: 'card', props: { title: 'Secure', description: 'Bank-grade security standards.', align: 'center' } },
            { id: 'card-feat-3', type: 'card', props: { title: '24/7 Support', description: 'We are here when you need us.', align: 'center' } },
        ]
    },
    {
        id: 'business',
        name: 'Business',
        description: 'Professional layout for corporate or small business websites.',
        thumbnail: 'bg-gray-100',
        blocks: [
            { id: 'hero', type: 'hero', props: { heading: 'Acme Corp', subheading: 'Building the future of industry.', align: 'left' } },
            { id: 'title-services', type: 'title', props: { text: 'Our Services', level: 'h2', align: 'left', color: '#1f2937' } },
            { id: 'card-service-1', type: 'card', props: { title: 'Consulting', description: 'Expert advice for your business strategy.', align: 'left' } },
            { id: 'card-service-2', type: 'card', props: { title: 'Development', description: 'Custom software solutions.', align: 'left' } },
            { id: 'image-team', type: 'image', props: { src: 'https://placehold.co/800x400', alt: 'Our Team', align: 'center' } },
            { id: 'title-contact', type: 'title', props: { text: 'Contact Us', level: 'h2', align: 'left', color: '#1f2937' } },
            { id: 'btn-contact', type: 'button', props: { label: 'Schedule a Call', color: '#3b82f6', textColor: '#ffffff' } },
        ]
    }
];
