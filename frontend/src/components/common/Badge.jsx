import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Badge = ({ children, variant = 'info', className }) => {
    const variants = {
        success: "bg-emerald-100 text-emerald-700",
        warning: "bg-amber-100 text-amber-700",
        error: "bg-red-100 text-red-700",
        info: "bg-blue-100 text-blue-700",
        neutral: "bg-gray-100 text-text-muted",
        primary: "bg-indigo-100 text-indigo-700"
    };

    return (
        <span className={twMerge(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
};

export default Badge;
