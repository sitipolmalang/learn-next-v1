// types/editor.ts
export type BlockType = 'hero' | 'card' | 'button' | 'title';

export interface Block {
    id: string;
    type: BlockType;
    props: Record<string, unknown>; // Menggunakan unknown lebih aman dari any
    hidden?: boolean;
}

export type Field = {
    type: 'text' | 'color' | 'select' | 'number' | 'toggle-group'; 
    label: string;
    defaultValue: string;
    options?: { value: string; label: string; icon?: React.ReactNode }[]; 
};

export type Schema = Record<string, Field>;
export type SchemaMap = Record<BlockType, Schema>;