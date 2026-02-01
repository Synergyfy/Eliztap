'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';

export default function LoyaltyOverviewPage() {
    const loyaltyStats = [
        { label: 'Active Members', value: '1,284', icon: 'loyalty', color: 'blue', trend: { value: '+8%', isUp: true } },
        { label: 'Points Issued', value: '45.2k', icon: 'monetization_on', color: 'green', trend: { value: '+12%', isUp: true } },
        { label: 'Redemptions', value: '312', icon: 'redeem', color: 'purple', trend: { value: '+5%', isUp: true } },
        { label: 'Avg. Points/User', value: '352', icon: 'stars', color: 'yellow', trend: { value: '+15%', isUp: true } },
    ];

    interface Member {
        id: string;
        name: string;
        points: number;
        visits: number;
        level: string;
    }

    const topMembers: Member[] = [
        { id: '1', name: 'Bisi Adebowale', points: 1250, visits: 24, level: 'Platinum' },
        { id: '2', name: 'Alex Johnson', points: 840, visits: 12, level: 'Gold' },
        { id: '3', name: 'Sarah Williams', points: 720, visits: 15, level: 'Gold' },
        { id: '4', name: 'David Okafor', points: 410, visits: 8, level: 'Silver' },
    ];

    const columns: import('@/components/dashboard/DataTable').Column<Member>[] = [
        {
            header: 'Member',
            accessor: (item: Member) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {item.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <span className="font-bold text-text-main">{item.name}</span>
                </div>
            )
        },
        { header: 'Total Points', accessor: (item: Member) => <span className="font-bold">{item.points}</span> },
        { header: 'Visit Count', accessor: 'visits' },
        {
            header: 'Tier Level',
            accessor: (item: Member) => (
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${item.level === 'Platinum' ? 'bg-indigo-100 text-indigo-700' :
                    item.level === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-slate-700'
                    }`}>
                    {item.level}
                </span>
            )
        },
    ];

    return (
        <DashboardSidebar>
            <div className="p-8">
                <PageHeader
                    title="Loyalty Program"
                    description="Monitor customer rewards and engagement metrics"
                    actions={
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm shadow-sm">
                                <span className="material-icons-round text-lg">settings</span>
                                Rules
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20">
                                <span className="material-icons-round text-lg">add</span>
                                New Reward
                            </button>
                        </div>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {loyaltyStats.map((stat, index) => (
                        <StatsCard key={index} {...stat as any} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <ChartCard title="Redemption Trends" subtitle="Daily reward usage over time">
                            <div className="h-64 flex items-end justify-between px-4 pb-4">
                                {[12, 18, 25, 40, 30, 45, 60, 55, 30, 25, 40, 50, 45, 80, 55, 40, 35, 60, 75, 90, 85, 100, 95, 80, 70, 60, 50, 40, 30, 20].map((v, i) => (
                                    <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-all group relative cursor-pointer" style={{ height: `${v}%` }}>
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                            {Math.floor(v * 0.5)} redeems
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ChartCard>
                    </div>

                    <ChartCard title="Tier Distribution" subtitle="Customer base segment breakdown">
                        <div className="h-full flex flex-col justify-center space-y-6">
                            {[
                                { name: 'Platinum', count: '156', p: '12%', color: 'bg-indigo-500' },
                                { name: 'Gold', count: '412', p: '32%', color: 'bg-yellow-500' },
                                { name: 'Silver', count: '716', p: '56%', color: 'bg-slate-400' },
                            ].map((tier, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-text-main">{tier.name}</span>
                                        <span className="text-text-secondary">{tier.count} ({tier.p})</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${tier.color} rounded-full`} style={{ width: tier.p }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ChartCard>
                </div>

                <DataTable
                    columns={columns}
                    data={topMembers}
                    onRowClick={(item) => console.log('Member clicked:', item)}
                />
            </div>
        </DashboardSidebar>
    );
}
