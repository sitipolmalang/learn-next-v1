'use client';

import { useMemo, useState } from 'react';
import { defaultTemplates } from '@/app/components/templates/defaults';

type CreatePageFormProps = {
    initialTemplateId?: string;
    action: (formData: FormData) => void | Promise<void>;
};

function toSlug(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export default function CreatePageForm({ initialTemplateId, action }: CreatePageFormProps) {
    const resolvedDefaultTemplateId = useMemo(() => {
        if (!initialTemplateId) return defaultTemplates[0]?.id ?? '';
        const found = defaultTemplates.find((template) => template.id === initialTemplateId);
        return found?.id ?? defaultTemplates[0]?.id ?? '';
    }, [initialTemplateId]);

    const [name, setName] = useState('');
    const [subdomain, setSubdomain] = useState('');
    const [templateId, setTemplateId] = useState(resolvedDefaultTemplateId);

    return (
        <form action={action} className="mt-5 space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Nama halaman</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={name}
                        onChange={(event) => {
                            const value = event.target.value;
                            setName(value);
                            if (!subdomain) {
                                setSubdomain(toSlug(value));
                            }
                        }}
                        placeholder="Contoh: Landing Product A"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Subdomain</label>
                    <div className="flex overflow-hidden rounded-lg border border-gray-300">
                        <input
                            type="text"
                            name="subdomain"
                            required
                            minLength={3}
                            maxLength={63}
                            value={subdomain}
                            onChange={(event) => setSubdomain(toSlug(event.target.value))}
                            placeholder="contoh: product-a"
                            className="w-full px-3 py-2 text-sm outline-none"
                        />
                        <span className="bg-gray-50 px-3 py-2 text-xs text-gray-500 border-l border-gray-200">
                            .localhost:3000
                        </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Hanya huruf kecil, angka, dan tanda `-`.</p>
                </div>
            </div>

            <div>
                <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Pilih template</label>
                    <a
                        href="/templates"
                        className="text-xs font-semibold text-blue-700 hover:text-blue-900"
                    >
                        Lihat semua template
                    </a>
                </div>
                <input type="hidden" name="templateId" value={templateId} />
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {defaultTemplates.map((template) => {
                        const selected = templateId === template.id;
                        return (
                            <button
                                key={template.id}
                                type="button"
                                onClick={() => setTemplateId(template.id)}
                                className={`rounded-xl border text-left transition ${
                                    selected
                                        ? 'border-blue-600 ring-2 ring-blue-100'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className={`h-24 rounded-t-xl ${template.thumbnail} p-3`}>
                                    <div className="h-2 w-2/3 rounded bg-white/80" />
                                    <div className="mt-2 space-y-1">
                                        <div className="h-1.5 w-full rounded bg-white/70" />
                                        <div className="h-1.5 w-5/6 rounded bg-white/70" />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p className="text-sm font-semibold text-gray-900">{template.name}</p>
                                    <p className="mt-1 text-xs text-gray-600 line-clamp-2">{template.description}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center justify-end">
                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    Create dan Edit
                </button>
            </div>
        </form>
    );
}
