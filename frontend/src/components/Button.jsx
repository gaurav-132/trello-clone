import React from 'react';

const Button = ({
    type = 'button',
    children,
    onClick,
    disabled = false,
    variant = 'primary',
    className = '',
}) => {
    const baseStyles =
        'px-8  py-1 rounded-md font-medium text-sm cursor-pointer transition-all duration-200 focus:outline-none';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
