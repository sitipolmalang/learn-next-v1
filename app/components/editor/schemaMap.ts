import { buttonSchema } from './schemas/button.schema';
import { cardSchema } from './schemas/card.schema';
import { heroSchema } from './schemas/hero.schema';

export const schemaMap = {
    button: buttonSchema,
    card: cardSchema,
    hero: heroSchema,
};

export type ComponentType = keyof typeof schemaMap;
