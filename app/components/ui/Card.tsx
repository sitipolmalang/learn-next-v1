type CardProps = {
    title?: string;
    description?: string;
    backgroundColor?: string;
};

export default function Card({
    title = 'Card Title',
    description = 'This is a card description',
    backgroundColor = '#ffffff',
}: CardProps) {
    return (
        <div
            className="w-72 p-6 rounded-xl shadow-sm border"
            style={{ backgroundColor }}
        >
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
}
