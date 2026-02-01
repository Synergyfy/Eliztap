import React from 'react';

interface ChartCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
}

export default function ChartCard({ title, subtitle, children, actions }: ChartCardProps) {
    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-display font-bold text-text-main mb-1">{title}</h3>
                    {subtitle && (
                        <p className="text-sm text-text-secondary font-medium">{subtitle}</p>
                    )}
                </div>
                {actions && (
                    <div className="flex items-center gap-2">
                        {actions}
                    </div>
                )}
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
