'use client';

export type FieldSchema = {
    type: 'text' | 'color';
    label: string;
};



interface PropsEditorProps {
    schema: Record<string, FieldSchema>;
    value: Record<string, string>;
    onChange: (value: Record<string, string>) => void;
}

export default function PropsEditor({
    schema,
    value,
    onChange,
}: PropsEditorProps) {
    return (
        <div className="space-y-4">
            {Object.entries(schema).map(([key, field]) => (
                <div key={key}>
                    <label className="block text-sm font-medium mb-1">
                        {field.label}
                    </label>

                    <input
                        type={field.type}
                        value={value[key]}
                        className="w-full border rounded p-2"
                        onChange={(e) =>
                            onChange({
                                ...value,
                                [key]: e.target.value,
                            })
                        }
                    />
                </div>
            ))}
        </div>
    );
}
