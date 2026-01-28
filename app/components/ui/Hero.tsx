type HeroProps = {
    heading?: string;
    subheading?: string;
    align?: 'left' | 'center' | 'right';
};

export default function Hero({
    heading = 'Hero Title',
    subheading = 'Hero subtitle text',
    align = 'center',
}: HeroProps) {
    const alignClass =
        align === 'left'
            ? 'text-left items-start'
            : align === 'right'
            ? 'text-right items-end'
            : 'text-center items-center';

    return (
        <section className="w-full max-w-xl p-10 bg-white rounded-xl shadow-sm">
            <div className={`flex flex-col ${alignClass}`}>
                <h1 className="text-3xl font-bold mb-3">{heading}</h1>
                <p className="text-gray-600">{subheading}</p>
            </div>
        </section>
    );
}
