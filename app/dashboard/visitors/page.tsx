'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function VisitorsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const visitors = [
        { id: 1, name: 'John Doe', phone: '+234 801 234 5678', email: 'john@example.com', visits: 5, lastVisit: '2 hours ago', status: 'returning', totalSpent: '₦45,000' },
        { id: 2, name: 'Jane Smith', phone: '+234 802 345 6789', email: 'jane@example.com', visits: 1, lastVisit: '1 day ago', status: 'new', totalSpent: '₦12,000' },
        { id: 3, name: 'Mike Johnson', phone: '+234 803 456 7890', email: 'mike@example.com', visits: 12, lastVisit: '3 hours ago', status: 'vip', totalSpent: '₦128,000' },
        { id: 4, name: 'Sarah Williams', phone: '+234 804 567 8901', email: 'sarah@example.com', visits: 3, lastVisit: '5 hours ago', status: 'returning', totalSpent: '₦28,000' },
        { id: 5, name: 'David Brown', phone: '+234 805 678 9012', email: 'david@example.com', visits: 1, lastVisit: '1 day ago', status: 'new', totalSpent: '₦8,500' },
        { id: 6, name: 'Emily Davis', phone: '+234 806 789 0123', email: 'emily@example.com', visits: 8, lastVisit: '6 hours ago', status: 'returning', totalSpent: '₦67,000' },
    ];

    const stats = [
        { label: 'Total Visitors', value: '2,847', icon: 'group', color: 'blue' },
        { label: 'New This Month', value: '512', icon: 'person_add', color: 'green' },
        { label: 'Returning', value: '1,234', icon: 'repeat', color: 'purple' },
        { label: 'VIP Customers', value: '89', icon: 'star', color: 'yellow' },
    ];

    return (
        <DashboardSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-text-main mb-2">Visitors Overview</h1>
                    <p className="text-text-secondary font-medium">Manage and track all your customer visits</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <span className="material-icons-round text-primary text-xl">{stat.icon}</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">{stat.label}</p>
                                    <p className="text-2xl font-display font-bold text-text-main">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search by name, phone, or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Status</option>
                                <option value="new">New</option>
                                <option value="returning">Returning</option>
                                <option value="vip">VIP</option>
                            </select>
                            <button className="h-12 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">
                                <span className="material-icons-round text-lg">file_download</span>
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Visitors Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">
                                        <input type="checkbox" className="rounded accent-primary" />
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Visitor</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Contact</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Visits</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Last Visit</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Total Spent</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visitors.map((visitor) => (
                                    <tr key={visitor.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <input type="checkbox" className="rounded accent-primary" />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <span className="material-icons-round text-primary text-sm">person</span>
                                                </div>
                                                <span className="font-bold text-sm text-text-main">{visitor.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm">
                                                <p className="font-medium text-text-main">{visitor.phone}</p>
                                                <p className="text-text-secondary text-xs">{visitor.email}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-bold text-sm text-text-main">{visitor.visits}</span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-text-secondary font-medium">{visitor.lastVisit}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${visitor.status === 'new' ? 'bg-green-50 text-green-600' :
                                                    visitor.status === 'vip' ? 'bg-yellow-50 text-yellow-600' :
                                                        'bg-blue-50 text-blue-600'
                                                }`}>
                                                {visitor.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-bold text-sm text-text-main">{visitor.totalSpent}</td>
                                        <td className="py-4 px-6">
                                            <button className="p-2 text-text-secondary hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors">
                                                <span className="material-icons-round text-lg">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                        <p className="text-sm text-text-secondary font-medium">Showing 1-6 of 2,847 visitors</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-text-secondary hover:bg-gray-50 transition-colors">
                                Previous
                            </button>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-hover transition-colors">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardSidebar>
    );
}
