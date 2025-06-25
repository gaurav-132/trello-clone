import React from 'react';

const SelectField = ({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = 'Select an option',
    error = '',
    className = '',
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
            >
                <option value="" disabled>{placeholder}</option>
                {
                    options.map((opt, idx) => (
                        <option key={idx} value={opt.value}>{opt.label}</option>
                    ))
                }
            </select>

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default SelectField;
