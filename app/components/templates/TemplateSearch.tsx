interface TemplateSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TemplateSearch({ value, onChange }: TemplateSearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Cari template, industri..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-sm focus:ring-2 focus:ring-blue-500"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="7" cy="7" r="5" />
        <line x1="11" y1="11" x2="15" y2="15" />
      </svg>
    </div>
  );
}
