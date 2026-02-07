import { Block } from '../PageRenderer';

export interface Template {
    id: string;
    name: string;
    description: string;
    category: 'Business' | 'Portfolio' | 'Blog' | 'E-commerce' | 'Landing Page';
    thumbnail: string; // URL or placeholder color
    blocks: Block[];
}
