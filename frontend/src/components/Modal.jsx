import React, { useEffect } from 'react';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md', 
}) => {
    useEffect(() => {
        const handleEsc = (e) => {
        if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-xl',
        lg: 'max-w-3xl',
    };

    return (
        <div
            className="fixed  inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
        <div
            className={`bg-white rounded-lg w-full mx-4 shadow-lg animate-fadeIn ${sizeClasses[size]}`}
        >
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                    onClick={onClose}
                    className="cursor-pointer text-gray-500 hover:text-gray-900 text-xl"
                >
                    &times;
                </button>
            </div>

                <div className="p-4 max-h-[400px] overflow-y-scroll">{children}</div>
                {footer && 
                    <div 
                        className="p-4 text-right border-t"
                    >
                        {typeof footer === 'function' ? footer() : footer}
                    </div>
                }

            </div>
        </div>
    );
};

export default Modal;
