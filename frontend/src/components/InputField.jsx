import React from 'react';

const InputField = ({
    label,
    name,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    error = '',
    className = '',
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {
                label && 
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            }

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
            />

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
