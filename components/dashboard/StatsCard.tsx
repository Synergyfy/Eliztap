import React from 'react';

interface StatsCardProps {
    label: string;
    value: string;
    icon: string;
    trend?: {
        value: string;
        isUp: boolean;
    };
    color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

export default function StatsCard({ label, value, icon, trend, color = 'blue' }: StatsCardProps) {
    const colorClasses = {
        blue: 'bg-primary/10 text-primary',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        red: 'bg-red-50 text-red-600',
    };

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
                    <span className="material-icons-round text-xl">{icon}</span>
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${trend.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                        <span className="material-icons-round text-xs">
                            {trend.isUp ? 'trending_up' : 'trending_down'}
                        </span>
                        {trend.value}
                    </div>
                )}
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">{label}</p>
            <p className="text-3xl font-display font-bold text-text-main">{value}</p>
        </div>
    );
}
