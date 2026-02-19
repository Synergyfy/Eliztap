import React from 'react';

interface EmptyStateProps {
    icon: string;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
        icon?: string;
    };
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <span className="material-icons-round text-4xl text-gray-300">{icon}</span>
            </div>
            <h3 className="text-xl font-display font-bold text-text-main mb-2">{title}</h3>
            <p className="text-text-secondary font-medium max-w-sm mx-auto mb-8">
                {description}
            </p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all text-sm"
                >
                    {action.icon && <span className="material-icons-round text-lg">{action.icon}</span>}
                    {action.label}
                </button>
            )}
        </div>
    );
}
