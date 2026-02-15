import { heroSchema } from './schemas/hero.schema';
import { cardSchema } from './schemas/card.schema';
import { buttonSchema } from './schemas/button.schema';
import { titleSchema } from './schemas/title.schema';
import { imageSchema } from './schemas/image.schema';
import { featureGridSchema } from './schemas/featureGrid.schema';
import { testimonialGridSchema } from './schemas/testimonialGrid.schema';
import { footerSchema } from './schemas/footer.schema';

export const schemaMap = {
    hero: heroSchema,
    card: cardSchema,
    button: buttonSchema,
    title: titleSchema,
    image: imageSchema,
    featureGrid: featureGridSchema,
    testimonialGrid: testimonialGridSchema,
    footer: footerSchema,
};

