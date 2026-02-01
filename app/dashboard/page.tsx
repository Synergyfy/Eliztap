'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardPage() {
    const stats = [
        {
            label: 'Total Visitors',
            value: '2,847',
            change: '+12.5%',
            trend: 'up',
            icon: 'group',
            color: 'blue'
        },
        {
            label: 'New Visitors',
            value: '512',
            change: '+36.8%',
            trend: 'up',
            icon: 'person_add',
            color: 'green'
        },
        {
            label: 'Repeat Visitors',
            value: '1,234',
            change: '+8.2%',
            trend: 'up',
            icon: 'repeat',
            color: 'purple'
        },
        {
            label: 'Today\'s Visits',
            value: '89',
            change: '-2.4%',
            trend: 'down',
            icon: 'today',
            color: 'orange'
        },
    ];

    const recentVisitors = [
        { name: 'John Doe', phone: '+234 801 234 5678', time: '2 mins ago', status: 'new' },
        { name: 'Jane Smith', phone: '+234 802 345 6789', time: '15 mins ago', status: 'returning' },
        { name: 'Mike Johnson', phone: '+234 803 456 7890', time: '1 hour ago', status: 'new' },
        { name: 'Sarah Williams', phone: '+234 804 567 8901', time: '2 hours ago', status: 'returning' },
        { name: 'David Brown', phone: '+234 805 678 9012', time: '3 hours ago', status: 'new' },
    ];

    const activityData = [
        { hour: '9 AM', visits: 12 },
        { hour: '10 AM', visits: 24 },
        { hour: '11 AM', visits: 35 },
        { hour: '12 PM', visits: 48 },
        { hour: '1 PM', visits: 42 },
        { hour: '2 PM', visits: 38 },
        { hour: '3 PM', visits: 45 },
        { hour: '4 PM', visits: 52 },
    ];

    const maxVisits = Math.max(...activityData.map(d => d.visits));

    return (
        <DashboardSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-text-main mb-2">Dashboard Overview</h1>
                    <p className="text-text-secondary font-medium">Welcome back! Here's what's happening with your business today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center`}>
                                    <span className="material-icons-round text-primary text-xl">{stat.icon}</span>
                                </div>
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                    }`}>
                                    <span className="material-icons-round text-xs">
                                        {stat.trend === 'up' ? 'trending_up' : 'trending_down'}
                                    </span>
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">{stat.label}</p>
                            <p className="text-3xl font-display font-bold text-text-main">{stat.value}</p>
                            <p className="text-xs text-text-secondary mt-2">vs last month</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Visitor Activity Chart */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-display font-bold text-text-main mb-1">Visitor Activity</h2>
                                <p className="text-sm text-text-secondary">Today's hourly breakdown</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-text-secondary hover:text-text-main hover:bg-gray-50 rounded-lg transition-colors">
                                <span>This Week</span>
                                <span className="material-icons-round text-sm">expand_more</span>
                            </button>
                        </div>

                        {/* Simple Bar Chart */}
                        <div className="flex items-end justify-between gap-3 h-64">
                            {activityData.map((data, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                                        <div
                                            className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all hover:bg-primary-hover cursor-pointer"
                                            style={{ height: `${(data.visits / maxVisits) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-text-main">{data.visits}</p>
                                        <p className="text-[10px] text-text-secondary">{data.hour}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-display font-bold text-text-main mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full flex items-center gap-3 p-4 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors">
                                <span className="material-icons-round">campaign</span>
                                <span className="font-bold text-sm">New Campaign</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-4 bg-gray-50 text-text-main rounded-xl hover:bg-gray-100 transition-colors">
                                <span className="material-icons-round">nfc</span>
                                <span className="font-bold text-sm">Add Device</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-4 bg-gray-50 text-text-main rounded-xl hover:bg-gray-100 transition-colors">
                                <span className="material-icons-round">file_download</span>
                                <span className="font-bold text-sm">Export Data</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-4 bg-gray-50 text-text-main rounded-xl hover:bg-gray-100 transition-colors">
                                <span className="material-icons-round">loyalty</span>
                                <span className="font-bold text-sm">Create Reward</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Visitors */}
                <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-display font-bold text-text-main mb-1">Recent Visitors</h2>
                            <p className="text-sm text-text-secondary">Latest customer check-ins</p>
                        </div>
                        <button className="px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-text-secondary">Name</th>
                                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-text-secondary">Phone</th>
                                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-text-secondary">Time</th>
                                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentVisitors.map((visitor, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <span className="material-icons-round text-primary text-sm">person</span>
                                                </div>
                                                <span className="font-bold text-sm text-text-main">{visitor.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-text-secondary font-medium">{visitor.phone}</td>
                                        <td className="py-4 px-4 text-sm text-text-secondary font-medium">{visitor.time}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${visitor.status === 'new'
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                {visitor.status === 'new' ? 'New' : 'Returning'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardSidebar>
    );
}
