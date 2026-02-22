import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, hover = false, onClick, ...props }) => {
    return (
        <div
            className={twMerge(
                "bg-surface rounded-xl border border-border p-6 transition-all duration-200",
                hover && "hover:shadow-md hover:border-primary/50 cursor-pointer group",
                className
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
