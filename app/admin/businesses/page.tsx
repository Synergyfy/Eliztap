'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminBusinessesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState<any>(null);

    const businesses = [
        { id: 1, name: 'Green Terrace Cafe', owner: 'John Smith', email: 'john@greenterrace.com', plan: 'Premium', devices: 5, visitors: 2847, status: 'active', joined: '2024-01-15' },
        { id: 2, name: 'Tech Hub Lagos', owner: 'Sarah Johnson', email: 'sarah@techhub.ng', plan: 'Enterprise', devices: 12, visitors: 8921, status: 'active', joined: '2024-01-10' },
        { id: 3, name: 'Fashion Boutique', owner: 'Mike Williams', email: 'mike@fashion.com', plan: 'Basic', devices: 2, visitors: 456, status: 'pending', joined: '2024-02-01' },
        { id: 4, name: 'Fitness Center', owner: 'Emily Davis', email: 'emily@fitness.ng', plan: 'Premium', devices: 8, visitors: 3421, status: 'active', joined: '2024-01-20' },
        { id: 5, name: 'Restaurant 360', owner: 'David Brown', email: 'david@restaurant360.com', plan: 'Basic', devices: 3, visitors: 1234, status: 'suspended', joined: '2023-12-05' },
        { id: 6, name: 'Beauty Spa', owner: 'Lisa Anderson', email: 'lisa@beautyspa.ng', plan: 'Free', devices: 1, visitors: 89, status: 'active', joined: '2024-01-28' },
    ];

    const stats = [
        { label: 'Total Businesses', value: '1,247', icon: 'store', color: 'blue' },
        { label: 'Active', value: '1,089', icon: 'check_circle', color: 'green' },
        { label: 'Pending Approval', value: '23', icon: 'pending', color: 'yellow' },
        { label: 'Suspended', value: '12', icon: 'block', color: 'red' },
    ];

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">Businesses Management</h1>
                        <p className="text-text-secondary font-medium">Manage all registered businesses on the platform</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-2"
                    >
                        <span className="material-icons-round">add</span>
                        Add Business
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'green' ? 'bg-green-50' :
                                    stat.color === 'yellow' ? 'bg-yellow-50' :
                                        stat.color === 'red' ? 'bg-red-50' :
                                            'bg-primary/10'
                                    }`}>
                                    <span className={`material-icons-round text-xl ${stat.color === 'green' ? 'text-green-600' :
                                        stat.color === 'yellow' ? 'text-yellow-600' :
                                            stat.color === 'red' ? 'text-red-600' :
                                                'text-primary'
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
                                placeholder="Search by business name, owner, or email..."
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
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="suspended">Suspended</option>
                            </select>
                            <select className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20">
                                <option value="all">All Plans</option>
                                <option value="free">Free</option>
                                <option value="basic">Basic</option>
                                <option value="premium">Premium</option>
                                <option value="enterprise">Enterprise</option>
                            </select>
                            <button className="h-12 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">
                                <span className="material-icons-round text-lg">file_download</span>
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Businesses Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">
                                        <input type="checkbox" className="rounded accent-primary" />
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Business</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Owner</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Plan</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Devices</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Visitors</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Joined</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {businesses.map((business) => (
                                    <tr key={business.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <input type="checkbox" className="rounded accent-primary" />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <span className="material-icons-round text-primary text-sm">store</span>
                                                </div>
                                                <span className="font-bold text-sm text-text-main">{business.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm">
                                                <p className="font-medium text-text-main">{business.owner}</p>
                                                <p className="text-text-secondary text-xs">{business.email}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${business.plan === 'Enterprise' ? 'bg-purple-50 text-purple-600' :
                                                business.plan === 'Premium' ? 'bg-blue-50 text-blue-600' :
                                                    business.plan === 'Basic' ? 'bg-green-50 text-green-600' :
                                                        'bg-gray-50 text-gray-600'
                                                }`}>
                                                {business.plan}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-bold text-sm text-text-main">{business.devices}</td>
                                        <td className="py-4 px-6 font-bold text-sm text-text-main">{business.visitors.toLocaleString()}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${business.status === 'active' ? 'bg-green-50 text-green-600' :
                                                business.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                                                    'bg-red-50 text-red-600'
                                                }`}>
                                                {business.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-text-secondary font-medium">{business.joined}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedBusiness(business);
                                                        setIsAddModalOpen(true);
                                                    }}
                                                    className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <span className="material-icons-round text-lg">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => alert(`Suspending ${business.name}...`)}
                                                    className="p-2 text-text-secondary hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all"
                                                    title="Suspend"
                                                >
                                                    <span className="material-icons-round text-lg">block</span>
                                                </button>
                                                <button
                                                    onClick={() => confirm(`Are you sure you want to delete ${business.name}?`) && alert('Deleted')}
                                                    className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <span className="material-icons-round text-lg">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                        <p className="text-sm text-text-secondary font-medium">Showing 1-6 of 1,247 businesses</p>
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

            {/* Add/Edit Business Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setIsAddModalOpen(false); setSelectedBusiness(null); }}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-display font-bold text-text-main">
                                    {selectedBusiness ? 'Edit Business' : 'Register New Business'}
                                </h2>
                                <p className="text-sm text-text-secondary mt-1">
                                    {selectedBusiness ? 'Update business credentials and status' : 'Onboard a new business to the platform'}
                                </p>
                            </div>
                            <button onClick={() => { setIsAddModalOpen(false); setSelectedBusiness(null); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <span className="material-icons-round text-gray-400">close</span>
                            </button>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); setSelectedBusiness(null); alert('Success!'); }} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Name</label>
                                    <input
                                        defaultValue={selectedBusiness?.name}
                                        required
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                                        placeholder="e.g. Skyline Lounge"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Plan</label>
                                    <select
                                        defaultValue={selectedBusiness?.plan}
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                                    >
                                        <option value="Free">Free</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Premium">Premium</option>
                                        <option value="Enterprise">Enterprise</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Owner Full Name</label>
                                <input
                                    defaultValue={selectedBusiness?.owner}
                                    required
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                                    placeholder="e.g. Jane Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
                                <input
                                    defaultValue={selectedBusiness?.email}
                                    type="email"
                                    required
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                                    placeholder="owner@business.com"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setIsAddModalOpen(false); setSelectedBusiness(null); }}
                                    className="flex-1 h-14 bg-gray-50 text-text-secondary font-bold rounded-xl hover:bg-gray-100 transition-all text-sm active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-3 h-14 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95"
                                >
                                    <span className="material-icons-round">{selectedBusiness ? 'save' : 'add'}</span>
                                    {selectedBusiness ? 'Update Business' : 'Register Business'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminSidebar>
    );
}
