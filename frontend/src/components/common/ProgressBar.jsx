import React from 'react';

const ProgressBar = ({ value, max = 100, color = 'bg-primary', height = 'h-2', className }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${height} ${className}`}>
            <div
                className={`h-full ${color} transition-all duration-500 ease-out`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};

export default ProgressBar;
