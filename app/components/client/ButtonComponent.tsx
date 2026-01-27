import React from 'react';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
}



export default function ButtonComponent({
    label,
    onClick,
    variant = 'primary',
}: ButtonProps) {
    const baseStyles = 'px-4 py-2 rounded font-semibold transition-colors rounded-lg m-2';
    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-300 text-black hover:bg-gray-400',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]}`}
        >
            {label}
        </button>
    );
}