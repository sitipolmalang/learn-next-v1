'use client';

interface PropsEditorProps {
    label: string;
    color: string;
    href: string;
    onChange: (props: {
        label?: string;
        color?: string;
        href?: string;
    }) => void;
}

export default function PropsEditor({
    label,
    color,
    href,
    onChange,
}: PropsEditorProps) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Label</label>
                <input
                    className="w-full border rounded p-2"
                    value={label}
                    onChange={(e) => onChange({ label: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Color</label>
                <input
                    type="color"
                    className="w-full h-10"
                    value={color}
                    onChange={(e) => onChange({ color: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Link (href)</label>
                <input
                    className="w-full border rounded p-2"
                    value={href}
                    onChange={(e) => onChange({ href: e.target.value })}
                />
            </div>
        </div>
    );
}
