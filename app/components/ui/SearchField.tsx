import type { ChangeEventHandler } from 'react';
import { Search } from 'lucide-react';

type SearchFieldProps = {
    name?: string;
    value?: string;
    defaultValue?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
};

export default function SearchField({
    name,
    value,
    defaultValue,
    onChange,
    placeholder = 'Cari...',
}: SearchFieldProps) {
    return (
        <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
                type="text"
                name={name}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
        </div>
    );
}
