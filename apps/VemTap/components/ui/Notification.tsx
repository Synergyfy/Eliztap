'use client';

import React from 'react';

interface NotificationProps {
    title?: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    onClose?: () => void;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export default function Notification({
    title,
    message,
    type = 'info',
    onClose,
    action,
    className = ''
}: NotificationProps) {
    const styles = {
        success: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-800',
            icon: 'text-green-600',
            iconName: 'check_circle',
            button: 'bg-green-100 text-green-700 hover:bg-green-200'
        },
        error: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-800',
            icon: 'text-red-600',
            iconName: 'error',
            button: 'bg-red-100 text-red-700 hover:bg-red-200'
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-800',
            icon: 'text-yellow-600',
            iconName: 'warning',
            button: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
        },
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-800',
            icon: 'text-blue-600',
            iconName: 'info',
            button: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        },
    };

    const style = styles[type];

    return (
        <div className={`rounded-xl border p-4 flex items-start gap-3 ${style.bg} ${style.border} ${className}`}>
            <span className={`material-icons-round mt-0.5 ${style.icon}`}>
                {style.iconName}
            </span>
            <div className="flex-1 min-w-0">
                {title && (
                    <h3 className={`text-sm font-bold mb-1 ${style.text}`}>
                        {title}
                    </h3>
                )}
                <p className={`text-sm ${style.text} opacity-90 leading-relaxed`}>
                    {message}
                </p>
                {action && (
                    <button
                        onClick={action.onClick}
                        className={`mt-2 px-3 py-1.5 rounded text-xs font-bold transition-colors ${style.button}`}
                    >
                        {action.label}
                    </button>
                )}
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className={`p-1 rounded-full hover:bg-white/50 transition-colors ${style.text} opacity-60 hover:opacity-100`}
                >
                    <span className="material-icons-round text-sm">close</span>
                </button>
            )}
        </div>
    );
}
