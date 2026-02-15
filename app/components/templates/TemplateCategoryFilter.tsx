import { TemplateCategory, TEMPLATE_CATEGORIES } from './types';

interface TemplateCategoryFilterProps {
  activeCategory: TemplateCategory;
  onChange: (category: TemplateCategory) => void;
}

export function TemplateCategoryFilter({
  activeCategory,
  onChange,
}: TemplateCategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {TEMPLATE_CATEGORIES.map(cat => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
            transition-all
            ${
              activeCategory === cat.key
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border hover:bg-slate-50'
            }
          `}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
