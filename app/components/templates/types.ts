import { Block } from '../editor/types/editor';

export type TemplateCategory =
    | 'all'
    | 'fnb'
    | 'real-estate'
    | 'services'
    | 'health'
    | 'education'
    | 'portfolio'
    | 'blog'
    | 'e-commerce'
    | 'landing-page'
    | 'custom'
    | 'business';

export interface Template {
    id: string;
    name: string;
    description: string;
    category: TemplateCategory;
    thumbnail: string;
    blocks: Block[];
}

export const TEMPLATE_CATEGORIES = [
    { key: 'all', label: 'Semua Template' },
    { key: 'fnb', label: 'F&B' },
    { key: 'real-estate', label: 'Real Estate' },
    { key: 'services', label: 'Jasa & Layanan' },
    { key: 'health', label: 'Kesehatan' },
    { key: 'education', label: 'Pendidikan' },
    { key: 'e-commerce', label: 'E-Commerce' },
    { key: 'landing-page', label: 'Landing Page' },
    { key: 'business', label: 'Bisnis' },
    { key: 'custom', label: 'Kustom' },
] as const;
