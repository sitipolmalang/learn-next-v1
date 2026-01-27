'use client';

// 1. Update Type agar mendukung 'select' dan 'options'
export type FieldSchema = {
    readonly type: 'text' | 'color' | 'select'; // Tambahkan readonly
    readonly label: string;
    readonly defaultValue: string;
    readonly options?: readonly { readonly value: string; readonly label: string }[];
};

interface PropsEditorProps {
    // Gunakan readonly Record agar cocok dengan 'as const'
    schema: Readonly<Record<string, FieldSchema>>;
    value: Record<string, string>;
    onChange: (value: Record<string, string>) => void;
}

export default function PropsEditor({
    schema,
    value,
    onChange,
}: PropsEditorProps) {

    // Fungsi untuk mengembalikan semua ke default
    const handleReset = () => {
        const defaults: Record<string, string> = {};
        Object.entries(schema).forEach(([key, field]) => {
            defaults[key] = field.defaultValue;
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
            {Object.entries(schema).map(([key, field]) => (
                <div key={key}>
                    <label
                        htmlFor={`input-${key}`} // 1. Tambahkan atribut htmlFor
                        className="block text-sm font-medium mb-1">
                        {field.label}
                    </label>

                    {/* 2. Kondisional: Jika tipe 'select', render tag <select> */}
                    {field.type === 'select' ? (
                        <select
                            id={`input-${key}`} // 2. Tambahkan ID yang unik
                            name={key}          // 3. Tambahkan Name agar autofill bekerja
                            value={value[key]}
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
                        /* 3. Jika bukan select, gunakan <input> biasa */
                        <input
                            id={`input-${key}`} // 2. Tambahkan ID yang unik
                            name={key}          // 3. Tambahkan Name
                            type={field.type}
                            value={value[key]}
                            // Tambahkan h-10 jika tipe color agar terlihat lebih bagus
                            className={`w-full border rounded p-2 ${field.type === 'color' ? 'h-10' : ''}`}
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