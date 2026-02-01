type CardProps = {
    title?: string;
    description?: string;
    backgroundColor?: string;
    // 1. Tambahkan tipe alignment (opsional)
    align?: 'left' | 'center' | 'right'; 
};

export default function Card({
    title = 'Card Title',
    description = 'This is a card description',
    backgroundColor = '#ffffff',
    align = 'left', // 2. Berikan nilai default
}: CardProps) {
    
    // 3. Mapping alignment ke utility class Tailwind
    const alignmentMap = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    return (
        <div
            // 4. Masukkan class alignment ke dalam container
            className={`w-72 p-6 rounded-xl shadow-sm border ${alignmentMap[align]}`}
            style={{ backgroundColor }}
        >
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
}