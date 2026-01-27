interface ButtonProps {
    label: string;
    href?: string;
    color?: string;
}

export default function ButtonOne({
    label,
    href,
    color = '#3b82f6',
}: ButtonProps) {
    return (
        <a
            href={href}
            target="_blank"
            className="px-4 py-2 rounded-lg text-white font-semibold inline-block"
            style={{ backgroundColor: color }}
        >
            {label}
        </a>
    );
}
