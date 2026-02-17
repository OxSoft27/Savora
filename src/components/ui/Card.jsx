import React from 'react';
import clsx from 'clsx';

export const Card = ({ children, className, noPadding, ...props }) => {
    return (
        <div
            className={clsx(
                'card',
                noPadding && 'no-padding',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ title, description, action }) => (
    <div className="flex-between mb-4">
        <div>
            {title && <h3 className="text-lg">{title}</h3>}
            {description && <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>{description}</p>}
        </div>
        {action && <div>{action}</div>}
    </div>
);
