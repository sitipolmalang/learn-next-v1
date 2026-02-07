import { Block } from '../PageRenderer';

export interface Template {
    id: string;
    name: string;
    description: string;
    thumbnail: string; // URL or placeholder color
    blocks: Block[];
}
