import React from 'react';

const TextAreaField = ({
    label,
    name,
    placeholder = '',
    value,
    onChange,
    rows = 4,
    error = '',
    className = '',
}) => {
    return (
        <div className={`mb-4 ${className}`}>
        {label && (
            <label
                className="block text-sm font-medium text-gray-700 mb-1"
            >
            {label}
            </label>
        )}

        <textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
            }`}
        ></textarea>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default TextAreaField;
