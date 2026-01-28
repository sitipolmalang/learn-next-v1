'use client';

export type Field = {
    type: 'text' | 'color' | 'select';
    label: string;
    defaultValue: string;
    options?: { value: string; label: string }[];
};

export default function PropsEditor({
    schema,
    value,
    onChange,
}: {
    schema: Record<string, Field>;
    value: Record<string, string>;
    onChange: (v: Record<string, string>) => void;
}) {

    const handleReset = () => {
        const defaults: Record<string, string> = {};
        Object.entries(schema).forEach(([key, field]) => {
            defaults[key] = field.defaultValue;
        });
        onChange(defaults);
    };

    return (
        <div className="space-y-4">
            {/* HEADER + RESET */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">Settings</h3>
                <button
                    onClick={handleReset}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                    Reset
                </button>
            </div>

            {Object.entries(schema).map(([key, field]) => (
                <div key={key}>
                    <label className="block text-sm font-medium mb-1">
                        {field.label}
                    </label>

                    {field.type === 'select' ? (
                        <select
                            value={value[key] ?? field.defaultValue}
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
                            type={field.type}
                            value={value[key] ?? field.defaultValue}
                            className={`w-full border rounded p-2 ${
                                field.type === 'color' ? 'h-10' : ''
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
            ))}
        </div>
    );
}
