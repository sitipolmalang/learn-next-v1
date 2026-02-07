'use client';

import { Field } from '../editor/types/editor';

interface PropsEditorProps {
    schema: Record<string, Field>;
    value: Record<string, string | number>;
    onChange: (v: Record<string, string | number>) => void;
}

export default function PropsEditor({ schema, value, onChange }: PropsEditorProps) {
    
    const updateField = (key: string, newValue: string | number) => {
        onChange({
            ...value,
            [key]: newValue,
        });
    };

    return (
        <div className="space-y-5">
            {Object.entries(schema).map(([key, field]) => (
                <div key={key} className="flex flex-col gap-1.5 group">
                    {/* Label dengan style subtle ala SaaS modern */}
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">
                            {field.label}
                        </label>
                    </div>

                    {field.type === 'select' ? (
                        <div className="relative">
                            <select
                                value={value[key] ?? field.defaultValue}
                                className="w-full h-9 text-sm border border-gray-200 rounded-lg px-2 bg-white hover:border-gray-300 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                onChange={(e) => updateField(key, e.target.value)}
                            >
                                {field.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            {/* Icon panah custom untuk select */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    ) : field.type === 'color' ? (
                        <div className="flex gap-2">
                            <div className="relative h-9 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                <input
                                    type="color"
                                    value={value[key] ?? field.defaultValue}
                                    className="absolute -inset-2 h-14 w-14 cursor-pointer"
                                    onChange={(e) => updateField(key, e.target.value)}
                                />
                            </div>
                            <input
                                type="text"
                                value={value[key] ?? field.defaultValue}
                                className="flex-1 h-9 text-[11px] font-mono border border-gray-200 rounded-lg px-3 bg-gray-50/50 uppercase focus:bg-white focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                                onChange={(e) => updateField(key, e.target.value)}
                            />
                        </div>
                    ) : (
                        <input
                            type={field.type}
                            value={value[key] ?? field.defaultValue}
                            className="w-full h-9 text-sm border border-gray-200 rounded-lg px-3 bg-white hover:border-gray-300 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                            onChange={(e) => updateField(key, e.target.value)}
                            placeholder={`Set ${field.label.toLowerCase()}...`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}