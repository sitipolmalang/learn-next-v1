
interface ButtonProps {
    label: string;
    href?: string;
    color?: string;
    textColor?: string;
}

export default function ButtonOne({
    label,
    href,
    textColor = '#ffffff',
    color = '#3b82f6',
}: ButtonProps) {
    return (
        <a
            href={href}
            target="_blank"
            className="px-4 py-2 rounded-lg font-semibold inline-block` "
            style={{ backgroundColor: color, color: textColor }}
        >
            {label}
        </a>
    );
}
