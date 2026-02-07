type HeroProps = {
    heading?: string;
    subheading?: string;
    align?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    textColor?: string;
    padding?: 'sm' | 'md' | 'lg' | 'xl';
};

export default function Hero({
    heading = 'Hero Title',
    subheading = 'Hero subtitle text',
    align = 'center',
    backgroundColor = '#ffffff',
    textColor = '#1f2937',
    padding = 'lg',
}: HeroProps) {
    const alignClass =
        align === 'left'
            ? 'text-left items-start'
            : align === 'right'
                ? 'text-right items-end'
                : 'text-center items-center';

    const paddingClass = {
        sm: 'py-8 px-4',
        md: 'py-12 px-6',
        lg: 'py-20 px-8',
        xl: 'py-32 px-10',
    };

    return (
        <section
            className={`w-full ${paddingClass[padding] || paddingClass.lg} transition-all duration-300`}
            style={{ backgroundColor, color: textColor }}
        >
            <div className={`max-w-4xl mx-auto flex flex-col ${alignClass}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                    {heading}
                </h1>
                <p className="text-lg md:text-xl opacity-90 max-w-2xl leading-relaxed">
                    {subheading}
                </p>
            </div>
        </section>
    );
}
