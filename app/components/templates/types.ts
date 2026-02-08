import { Block } from '../editor/types/editor';

export interface Template {
    id: string;
    name: string;
    description: string;
    category: 'Business' | 'Portfolio' | 'Blog' | 'E-commerce' | 'Landing Page' | 'custom';
    thumbnail: string; // URL or placeholder color
    blocks: Block[];
}
