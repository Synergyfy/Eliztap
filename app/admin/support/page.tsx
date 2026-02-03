'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminSupportPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

    const tickets = [
        { id: 'TKT-2401', subject: 'NFC device not scanning correctly', business: 'Green Terrace Cafe', priority: 'High', status: 'Open', created: '2 hours ago', agent: 'Daniel' },
        { id: 'TKT-2398', subject: 'Billing inquiry for March', business: 'Tech Hub Lagos', priority: 'Medium', status: 'In Progress', created: '5 hours ago', agent: 'Sarah' },
        { id: 'TKT-2392', subject: 'How to update business logo?', business: 'Fashion Boutique', priority: 'Low', status: 'Closed', created: '1 day ago', agent: 'Mike' },
        { id: 'TKT-2385', subject: 'Login issues for staff account', business: 'Restaurant 360', priority: 'High', status: 'Open', created: '1 day ago', agent: 'Unassigned' },
        { id: 'TKT-2350', subject: 'Feature request: Custom rewards', business: 'Fitness Center', priority: 'Low', status: 'In Progress', created: '2 days ago', agent: 'Daniel' },
        { id: 'TKT-2342', subject: 'Device arrived damaged', business: 'Beauty Spa', priority: 'High', status: 'Closed', created: '3 days ago', agent: 'Sarah' },
    ];

    const stats = [
        { label: 'Open Tickets', value: '14', icon: 'mark_email_unread', color: 'red' },
        { label: 'In Progress', value: '8', icon: 'pending_actions', color: 'blue' },
        { label: 'Resolved Today', value: '25', icon: 'task_alt', color: 'green' },
        { label: 'Avg. Response', value: '1.5h', icon: 'timer', color: 'orange' },
    ];

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">Support Tickets</h1>
                        <p className="text-text-secondary font-medium">Manage inquiries and technical issues from businesses</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'green' ? 'bg-green-50' :
                                    stat.color === 'red' ? 'bg-red-50' :
                                        stat.color === 'orange' ? 'bg-orange-50' :
                                            'bg-blue-50'
                                    }`}>
                                    <span className={`material-icons-round text-xl ${stat.color === 'green' ? 'text-green-600' :
                                        stat.color === 'red' ? 'text-red-600' :
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
                                placeholder="Search by ticket ID, subject, or business..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Priorities</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Status</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">
                                        <input type="checkbox" className="rounded accent-primary" />
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Ticket ID</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Subject</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Business</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Priority</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Created</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Agent</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <input type="checkbox" className="rounded accent-primary" />
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-mono text-sm font-medium text-text-secondary">{ticket.id}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="font-bold text-sm text-text-main hover:text-primary cursor-pointer truncate max-w-xs">{ticket.subject}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm font-medium text-text-main">{ticket.business}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${ticket.priority === 'High' ? 'bg-red-50 text-red-600' :
                                                ticket.priority === 'Medium' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-gray-100 text-gray-500'
                                                }`}>
                                                {ticket.priority}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${ticket.status === 'Open' ? 'bg-green-50 text-green-600' :
                                                ticket.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                                                    'bg-gray-100 text-gray-500'
                                                }`}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-text-secondary font-medium">{ticket.created}</td>
                                        <td className="py-4 px-6 text-sm text-text-secondary font-medium">{ticket.agent}</td>
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
                        <p className="text-sm text-text-secondary font-medium">Showing 1-6 of 14 tickets</p>
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
        </AdminSidebar>
    );
}
