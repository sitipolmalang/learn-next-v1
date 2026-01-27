interface ButtonProps {
    label: string;
    href?: string;
    color?: string;
}

function normalizeUrl(url?: string) {
    if (!url) return '#';

    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    return `https://${url}`;
}

export default function ButtonOne({
    label,
    href,
    color = '#3b82f6',
}: ButtonProps) {
    const urlHref = normalizeUrl(href);

    return (
        <a
            href={urlHref}
            target="_blank"
            className="px-4 py-2 rounded-lg text-white font-semibold inline-block"
            style={{ backgroundColor: color }}
        >
            {label}
        </a>
    );
}
