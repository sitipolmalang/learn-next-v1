import { Template } from './types';

export const defaultTemplates: Template[] = [
    {
        id: 'portfolio',
        name: 'Portfolio',
        description: 'Showcase your work with a clean and professional portfolio layout.',
        category: 'Portfolio',
        thumbnail: 'bg-blue-100', // Placeholder color
        blocks: [
            { id: 'hero', type: 'hero', props: { heading: 'My Creative Portfolio', subheading: 'Designing experiences that matter.', align: 'center', backgroundColor: '#eff6ff', textColor: '#1e3a8a', padding: 'xl' } },
            { id: 'title-projects', type: 'title', props: { text: 'Featured Projects', level: 'h2', align: 'center', color: '#1f2937' } },
            { id: 'card-1', type: 'card', props: { title: 'Project Alpha', description: 'A mobile app for productivity.', align: 'left', shadow: 'md', borderRadius: 'lg', hoverEffect: 'true' } },
            { id: 'card-2', type: 'card', props: { title: 'Project Beta', description: 'Web platform for e-commerce.', align: 'left', shadow: 'md', borderRadius: 'lg', hoverEffect: 'true' } },
            { id: 'title-contact', type: 'title', props: { text: 'Get In Touch', level: 'h3', align: 'center', color: '#1f2937' } },
            { id: 'btn-contact', type: 'button', props: { label: 'Email Me', color: '#3b82f6', textColor: '#ffffff', variant: 'solid', size: 'lg', borderRadius: 'full' } },
        ]
    },
    {
        id: 'landing',
        name: 'Landing Page',
        description: 'A high-converting landing page for your product or service.',
        category: 'Landing Page',
        thumbnail: 'bg-green-100',
        blocks: [
            { id: 'hero', type: 'hero', props: { heading: 'The Ultimate Solution', subheading: 'Boost your productivity by 200% today.', align: 'center', backgroundColor: '#ffffff', textColor: '#111827', padding: 'xl' } },
            { id: 'btn-cta', type: 'button', props: { label: 'Get Started Free', color: '#10b981', textColor: '#ffffff', variant: 'solid', size: 'lg', borderRadius: 'lg' } },
            { id: 'image-hero', type: 'image', props: { src: 'https://placehold.co/800x400', alt: 'Product Demo', align: 'center' } },
            { id: 'title-features', type: 'title', props: { text: 'Why Choose Us?', level: 'h2', align: 'center', color: '#1f2937' } },
            { id: 'card-feat-1', type: 'card', props: { title: 'Fast Performance', description: 'Lightning fast load times.', align: 'center', shadow: 'sm', borderRadius: 'md', hoverEffect: 'true' } },
            { id: 'card-feat-2', type: 'card', props: { title: 'Secure', description: 'Bank-grade security standards.', align: 'center', shadow: 'sm', borderRadius: 'md', hoverEffect: 'true' } },
            { id: 'card-feat-3', type: 'card', props: { title: '24/7 Support', description: 'We are here when you need us.', align: 'center', shadow: 'sm', borderRadius: 'md', hoverEffect: 'true' } },
        ]
    },
    {
        id: 'business',
        name: 'Business',
        description: 'Professional layout for corporate or small business websites.',
        category: 'Business',
        thumbnail: 'bg-gray-100',
        blocks: [
            { id: 'hero', type: 'hero', props: { heading: 'Acme Corp', subheading: 'Building the future of industry.', align: 'left', backgroundColor: '#1f2937', textColor: '#ffffff', padding: 'xl' } },
            { id: 'title-services', type: 'title', props: { text: 'Our Services', level: 'h2', align: 'left', color: '#1f2937' } },
            { id: 'card-service-1', type: 'card', props: { title: 'Consulting', description: 'Expert advice for your business strategy.', align: 'left', shadow: 'lg', borderRadius: 'none', hoverEffect: 'true' } },
            { id: 'card-service-2', type: 'card', props: { title: 'Development', description: 'Custom software solutions.', align: 'left', shadow: 'lg', borderRadius: 'none', hoverEffect: 'true' } },
            { id: 'image-team', type: 'image', props: { src: 'https://placehold.co/800x400', alt: 'Our Team', align: 'center' } },
            { id: 'title-contact', type: 'title', props: { text: 'Contact Us', level: 'h2', align: 'left', color: '#1f2937' } },
            { id: 'btn-contact', type: 'button', props: { label: 'Schedule a Call', color: '#3b82f6', textColor: '#ffffff', variant: 'outline', size: 'md', borderRadius: 'sm' } },
        ]
    },
    {
        id: 'dimsum-joss',
        name: 'Dimsum Joss',
        description: 'Authentic red and gold themed template perfect for food businesses.',
        category: 'Business',
        thumbnail: 'bg-red-100',
        blocks: [
            { id: 'hero', type: 'hero', props: { heading: 'Dimsum Paling Enak di Indonesia', subheading: 'Paling Laris, Enak, Murah, Halal dan no 1 di Indonesia.', align: 'center', backgroundColor: '#991b1b', textColor: '#ffffff', padding: 'xl', overlayOpacity: '30', backgroundImage: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=2070' } },
            { id: 'btn-cta', type: 'button', props: { label: 'Pesan Sekarang', color: '#ffffff', textColor: '#b91c1c', variant: 'solid', size: 'lg', borderRadius: 'full' } },
            { id: 'features', type: 'featureGrid', props: { title: 'Kenapa Dimsum Joss?', subtitle: 'Dedikasi Rasa Sejak Tahun 2015', backgroundColor: '#fff7ed', textColor: '#7c2d12', f1Title: 'Berpengalaman', f1Desc: 'Lebih dari 8 tahun melayani.', f1Icon: 'star', f2Title: 'Bahan Pilihan', f2Desc: 'Daging segar dan rempah terbaik.', f2Icon: 'box', f3Title: '100% Halal', f3Desc: 'Tersertifikasi Halal MUI & BPOM.', f3Icon: 'shield', f4Title: 'Komunitas', f4Desc: '1000+ mitra UMKM berkembang.', f4Icon: 'users' } },
            { id: 'gallery-title', type: 'title', props: { text: 'Menu Favorit', level: 'h2', align: 'center', color: '#991b1b' } },
            { id: 'image-menu-1', type: 'image', props: { src: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800', alt: 'Dimsum Platter', align: 'center' } },
            { id: 'testimonials', type: 'testimonialGrid', props: { title: 'Apa Kata Mereka?', backgroundColor: '#ffffff', textColor: '#1f2937', t1Name: 'Siska Amelia', t1Role: 'Ibu Rumah Tangga', t1Quote: 'Rasanya bikin nagih! Anak-anak suka banget.', t2Name: 'Hendra Setiawan', t2Role: 'Owner Cafe', t2Quote: 'Partner bisnis terbaik, supply lancar.', t3Name: 'Aditya', t3Role: 'Mahasiswa', t3Quote: 'Murah tapi rasanya premium banget.' } },
            { id: 'footer', type: 'footer', props: { companyName: 'Dimsum Joss', description: 'Menghadirkan kelezatan dimsum bintang lima dengan harga kaki lima.', styles: 'dark', backgroundColor: '#7f1d1d', textColor: '#ffffff' } },
        ]
    }
];
