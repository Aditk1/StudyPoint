import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    icon: Icon,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary",
        secondary: "bg-white text-text-main border border-border hover:bg-gray-50 focus:ring-gray-200",
        outline: "border-2 border-primary text-primary hover:bg-primary-light focus:ring-primary",
        ghost: "text-text-muted hover:text-text-main hover:bg-gray-100",
        danger: "bg-error text-white hover:bg-red-600 focus:ring-error",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        icon: "p-2",
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {Icon && <Icon size={size === 'sm' ? 16 : 20} />}
            {children}
        </button>
    );
};

export default Button;
