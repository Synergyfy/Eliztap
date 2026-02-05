'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const users = [
        { id: 1, name: 'Daniel Admin', email: 'daniel@entryconnect.com', role: 'Admin', status: 'active', lastLogin: '2 mins ago', joined: '2023-11-01' },
        { id: 2, name: 'John Smith', email: 'john@greenterrace.com', role: 'Business Owner', status: 'active', lastLogin: '1 hour ago', joined: '2024-01-15' },
        { id: 3, name: 'Sarah Johnson', email: 'sarah@techhub.ng', role: 'Business Owner', status: 'active', lastLogin: '3 hours ago', joined: '2024-01-10' },
        { id: 4, name: 'Mike Williams', email: 'mike@fashion.com', role: 'Business Owner', status: 'pending', lastLogin: '1 day ago', joined: '2024-02-01' },
        { id: 5, name: 'Emily Davis', email: 'emily@fitness.ng', role: 'Staff', status: 'active', lastLogin: '5 mins ago', joined: '2024-01-20' },
        { id: 6, name: 'David Brown', email: 'david@restaurant360.com', role: 'Business Owner', status: 'suspended', lastLogin: '2 weeks ago', joined: '2023-12-05' },
        { id: 7, name: 'Lisa Anderson', email: 'lisa@beautyspa.ng', role: 'Business Owner', status: 'active', lastLogin: '10 mins ago', joined: '2024-01-28' },
        { id: 8, name: 'Tom Wilson', email: 'tom@customer.com', role: 'Customer', status: 'active', lastLogin: 'Just now', joined: '2024-02-02' },
    ];

    const stats = [
        { label: 'Total Users', value: '3,452', icon: 'people', color: 'blue' },
        { label: 'Business Owners', value: '1,247', icon: 'store', color: 'purple' },
        { label: 'Customers', value: '2,150', icon: 'person', color: 'green' },
        { label: 'Staff Members', value: '55', icon: 'badge', color: 'orange' },
    ];

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">User Management</h1>
                        <p className="text-text-secondary font-medium">Manage and monitor all platform users</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-2"
                    >
                        <span className="material-icons-round">add</span>
                        Add User
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'green' ? 'bg-green-50' :
                                    stat.color === 'purple' ? 'bg-purple-50' :
                                        stat.color === 'orange' ? 'bg-orange-50' :
                                            'bg-blue-50'
                                    }`}>
                                    <span className={`material-icons-round text-xl ${stat.color === 'green' ? 'text-green-600' :
                                        stat.color === 'purple' ? 'text-purple-600' :
                                            stat.color === 'orange' ? 'text-orange-600' :
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
                                placeholder="Search by name, email, or role..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="business_owner">Business Owner</option>
                                <option value="staff">Staff</option>
                                <option value="customer">Customer</option>
                            </select>
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
                            <button className="h-12 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">
                                <span className="material-icons-round text-lg">file_download</span>
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">
                                        <input type="checkbox" className="rounded accent-primary" />
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">User</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Role</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Last Login</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Joined</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <input type="checkbox" className="rounded accent-primary" />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <span className="material-icons-round text-primary text-sm">person</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-text-main">{user.name}</p>
                                                    <p className="text-text-secondary text-xs">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${user.role === 'Admin' ? 'bg-red-50 text-red-600' :
                                                user.role === 'Business Owner' ? 'bg-purple-50 text-purple-600' :
                                                    user.role === 'Staff' ? 'bg-orange-50 text-orange-600' :
                                                        'bg-green-50 text-green-600'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${user.status === 'active' ? 'bg-green-50 text-green-600' :
                                                user.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                                                    'bg-red-50 text-red-600'
                                                }`}>
                                                {user.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-text-main font-medium">{user.lastLogin}</td>
                                        <td className="py-4 px-6 text-sm text-text-secondary font-medium">{user.joined}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsAddModalOpen(true);
                                                    }}
                                                    className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                                    title="Edit User"
                                                >
                                                    <span className="material-icons-round text-lg">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => alert(`Password reset link sent to ${user.email}`)}
                                                    className="p-2 text-text-secondary hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Reset Password"
                                                >
                                                    <span className="material-icons-round text-lg">lock_reset</span>
                                                </button>
                                                <button
                                                    onClick={() => confirm(`Disable account for ${user.name}?`) && alert('Account Disabled')}
                                                    className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Disable Account"
                                                >
                                                    <span className="material-icons-round text-lg">no_accounts</span>
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
                        <p className="text-sm text-text-secondary font-medium">Showing 1-8 of 3,452 users</p>
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

            {/* Add/Edit User Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setIsAddModalOpen(false); setSelectedUser(null); }}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-display font-bold text-text-main">
                                    {selectedUser ? 'Edit User' : 'Create New User'}
                                </h2>
                                <p className="text-sm text-text-secondary mt-1">
                                    {selectedUser ? 'Modify user permissions and details' : 'Manually onboard a new user to the platform'}
                                </p>
                            </div>
                            <button onClick={() => { setIsAddModalOpen(false); setSelectedUser(null); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <span className="material-icons-round text-gray-400">close</span>
                            </button>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); setSelectedUser(null); alert('User created/updated!'); }} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Full Name</label>
                                <input
                                    defaultValue={selectedUser?.name}
                                    required
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                                    placeholder="e.g. John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
                                <input
                                    defaultValue={selectedUser?.email}
                                    type="email"
                                    required
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Role</label>
                                    <select
                                        defaultValue={selectedUser?.role}
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Business Owner">Business Owner</option>
                                        <option value="Staff">Staff</option>
                                        <option value="Customer">Customer</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Status</label>
                                    <select
                                        defaultValue={selectedUser?.status}
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                                    >
                                        <option value="active">Active</option>
                                        <option value="pending">Pending</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setIsAddModalOpen(false); setSelectedUser(null); }}
                                    className="flex-1 h-14 bg-gray-50 text-text-secondary font-bold rounded-xl hover:bg-gray-100 transition-all text-sm active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-3 h-14 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95"
                                >
                                    <span className="material-icons-round">{selectedUser ? 'save' : 'person_add'}</span>
                                    {selectedUser ? 'Update User' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminSidebar>
    );
}
