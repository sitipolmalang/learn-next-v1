import { BlockType } from "../../PageRenderer";
import { heroSchema } from "./hero.schema";
import { cardSchema } from "./card.schema";
import { Field } from "../types/editor";
import { buttonSchema } from "./button.schema";
import { titleSchema } from "./title.schema";
import { imageSchema } from "./image.schema";
import { featureGridSchema } from "./featureGrid.schema";
import { testimonialGridSchema } from "./testimonialGrid.schema";
import { footerSchema } from "./footer.schema";

export const schemaMap: Record<BlockType, Record<string, Field>> = {
    hero: heroSchema,
    card: cardSchema,
    button: buttonSchema,
    title: titleSchema,
    image: imageSchema,
    featureGrid: featureGridSchema,
    testimonialGrid: testimonialGridSchema,
    footer: footerSchema,
};