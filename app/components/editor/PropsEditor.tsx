'use client';

export type FieldSchema = {
    readonly type: 'text' | 'color' | 'select';
    readonly label: string;
    readonly defaultValue?: string;
    readonly options?: readonly {
        readonly value: string;
        readonly label: string;
    }[];
};

interface PropsEditorProps {
    schema: Readonly<Record<string, FieldSchema>>;
    value: Record<string, string>;
    onChange: (value: Record<string, string>) => void;
}

export default function PropsEditor({
    schema,
    value,
    onChange,
}: PropsEditorProps) {

    const handleReset = () => {
        const defaults: Record<string, string> = {};
        Object.entries(schema).forEach(([key, field]) => {
            defaults[key] = field.defaultValue ?? '';
        });
        onChange(defaults);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">Settings</h3>
                <button
                    onClick={handleReset}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                    Reset to Default
                </button>
            </div>

            {Object.entries(schema).map(([key, field]) => {
                const fieldValue = value[key] ?? field.defaultValue ?? '';

                if (field.type === 'select' && !field.options?.length) {
                    console.warn(`Select field "${key}" has no options`);
                }

                return (
                    <div key={key}>
                        <label
                            htmlFor={`input-${key}`}
                            className="block text-sm font-medium mb-1"
                        >
                            {field.label}
                        </label>

                        {field.type === 'select' ? (
                            <select
                                id={`input-${key}`}
                                name={key}
                                value={fieldValue}
                                className="w-full border rounded p-2 bg-white"
                                onChange={(e) =>
                                    onChange({
                                        ...value,
                                        [key]: e.target.value,
                                    })
                                }
                            >
                                {field.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                id={`input-${key}`}
                                name={key}
                                type={field.type}
                                value={fieldValue}
                                className={`w-full border rounded p-2 ${field.type === 'color' ? 'h-10' : ''
                                    }`}
                                onChange={(e) =>
                                    onChange({
                                        ...value,
                                        [key]: e.target.value,
                                    })
                                }
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
