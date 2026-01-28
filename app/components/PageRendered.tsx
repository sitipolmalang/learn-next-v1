import { componentRegistry } from './registry';
import { validateProps } from './editor/validateProps';
import { Field } from './editor/PropsEditor';

type BlockType = 'hero' | 'card' | 'button';

type Block = {
    id: string;
    type: BlockType;
    props: Record<string, string>;
};

export default function PageRenderer({
    blocks,
    schemaMap,
}: {
    blocks: Block[];
    schemaMap: Record<BlockType, Record<string, Field>>;
}) {
    return (
        <div className="space-y-8">
            {blocks.map((block) => {
                const Component = componentRegistry[block.type];
                const schema = schemaMap[block.type];

                const safeProps = validateProps(schema, block.props);

                return (
                    <Component
                        key={block.id}
                        {...safeProps}
                    />
                );
            })}
        </div>
    );
}

export type { Block, BlockType };
