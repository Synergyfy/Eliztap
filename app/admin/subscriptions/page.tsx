'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminSubscriptionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPlan, setFilterPlan] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const subscriptions = [
        { id: 1, business: 'Tech Hub Lagos', plan: 'Enterprise', amount: '₦50,000/mo', status: 'active', nextBilling: '2024-03-01', method: 'Card ending 4242' },
        { id: 2, business: 'Green Terrace Cafe', plan: 'Premium', amount: '₦15,000/mo', status: 'active', nextBilling: '2024-02-15', method: 'Bank Transfer' },
        { id: 3, business: 'Fashion Boutique', plan: 'Basic', amount: '₦5,000/mo', status: 'past_due', nextBilling: '2024-02-01', method: 'Card ending 1234' },
        { id: 4, business: 'Fitness Center', plan: 'Premium', amount: '₦15,000/mo', status: 'active', nextBilling: '2024-02-20', method: 'Card ending 8888' },
        { id: 5, business: 'Restaurant 360', plan: 'Basic', amount: '₦5,000/mo', status: 'canceled', nextBilling: '-', method: 'N/A' },
        { id: 6, business: 'Beauty Spa', plan: 'Free', amount: '₦0/mo', status: 'active', nextBilling: 'N/A', method: 'N/A' },
    ];

    const stats = [
        { label: 'Monthly Revenue', value: '₦4.2M', icon: 'payments', color: 'green' },
        { label: 'Active Subscribers', value: '845', icon: 'check_circle', color: 'blue' },
        { label: 'Past Due', value: '12', icon: 'warning', color: 'red' },
        { label: 'Churn Rate', value: '1.2%', icon: 'trending_down', color: 'orange' },
    ];

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">Financial & Subscriptions</h1>
                        <p className="text-text-secondary font-medium">Monitor revenue and manage business plans</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'green' ? 'bg-green-50' :
                                    stat.color === 'orange' ? 'bg-orange-50' :
                                        stat.color === 'red' ? 'bg-red-50' :
                                            'bg-blue-50'
                                    }`}>
                                    <span className={`material-icons-round text-xl ${stat.color === 'green' ? 'text-green-600' :
                                        stat.color === 'orange' ? 'text-orange-600' :
                                            stat.color === 'red' ? 'text-red-600' :
                                                'text-blue-600'
                                        }`}>{stat.icon}</span>
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
                                placeholder="Search by business name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterPlan}
                                onChange={(e) => setFilterPlan(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Plans</option>
                                <option value="enterprise">Enterprise</option>
                                <option value="premium">Premium</option>
                                <option value="basic">Basic</option>
                                <option value="free">Free</option>
                            </select>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="canceled">Canceled</option>
                                <option value="past_due">Past Due</option>
                            </select>
                            <button className="h-12 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">
                                <span className="material-icons-round text-lg">file_download</span>
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Subscriptions Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Business</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Plan</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Amount</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Next Billing</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Payment Method</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.map((sub) => (
                                    <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-sm text-text-main">{sub.business}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${sub.plan === 'Enterprise' ? 'bg-purple-50 text-purple-600' :
                                                sub.plan === 'Premium' ? 'bg-blue-50 text-blue-600' :
                                                    sub.plan === 'Basic' ? 'bg-green-50 text-green-600' :
                                                        'bg-gray-50 text-gray-600'
                                                }`}>
                                                {sub.plan}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-bold text-sm text-text-main">{sub.amount}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${sub.status === 'active' ? 'bg-green-50 text-green-600' :
                                                sub.status === 'past_due' ? 'bg-red-50 text-red-600' :
                                                    'bg-gray-100 text-gray-500'
                                                }`}>
                                                {sub.status === 'past_due' ? 'PAST DUE' : sub.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-text-secondary font-medium">{sub.nextBilling}</td>
                                        <td className="py-4 px-6 text-sm text-text-secondary font-medium">{sub.method}</td>
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
                </div>
            </div>
        </AdminSidebar>
    );
}
