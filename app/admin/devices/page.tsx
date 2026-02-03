'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminDevicesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');

    const devices = [
        { id: 'NFC-8392', type: 'Card', assignedTo: 'Green Terrace Cafe', lastActive: '2 mins ago', status: 'active', battery: 'Good' },
        { id: 'NFC-9281', type: 'Sticker', assignedTo: 'Tech Hub Lagos', lastActive: '5 hours ago', status: 'active', battery: 'Good' },
        { id: 'NFC-1928', type: 'Fob', assignedTo: 'Unassigned', lastActive: 'Never', status: 'inactive', battery: 'Full' },
        { id: 'NFC-7362', type: 'Card', assignedTo: 'Fashion Boutique', lastActive: '1 day ago', status: 'active', battery: 'Low' },
        { id: 'NFC-5512', type: 'Sticker', assignedTo: 'Restaurant 360', lastActive: '10 mins ago', status: 'active', battery: 'Good' },
        { id: 'NFC-4491', type: 'Card', assignedTo: 'Unassigned', lastActive: 'Never', status: 'inactive', battery: 'Full' },
    ];

    const stats = [
        { label: 'Total Devices', value: '1,500', icon: 'nfc', color: 'blue' },
        { label: 'Active Devices', value: '1,240', icon: 'check_circle', color: 'green' },
        { label: 'Unassigned', value: '260', icon: 'inventory_2', color: 'orange' },
        { label: 'Low Battery', value: '12', icon: 'battery_alert', color: 'red' },
    ];

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">Device Management</h1>
                        <p className="text-text-secondary font-medium">Control and provision NFC hardware devices</p>
                    </div>
                    <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-2">
                        <span className="material-icons-round">add</span>
                        Register Device
                    </button>
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
                                placeholder="Search by Device ID or assigned business..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Types</option>
                                <option value="card">NFC Card</option>
                                <option value="sticker">NFC Sticker</option>
                                <option value="fob">Key Fob</option>
                            </select>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <button className="h-12 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">
                                <span className="material-icons-round text-lg">file_download</span>
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Devices Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">
                                        <input type="checkbox" className="rounded accent-primary" />
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Device ID</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Type</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Assigned To</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Last Active</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map((device) => (
                                    <tr key={device.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <input type="checkbox" className="rounded accent-primary" />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <span className="material-icons-round text-gray-400">nfc</span>
                                                <span className="font-bold text-sm text-text-main font-mono">{device.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm font-medium text-text-secondary bg-gray-100 px-2 py-1 rounded">
                                                {device.type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            {device.assignedTo === 'Unassigned' ? (
                                                <span className="text-sm text-gray-400 font-medium italic">Unassigned</span>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="material-icons-round text-primary text-sm">store</span>
                                                    <span className="text-sm font-bold text-text-main">{device.assignedTo}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-text-secondary font-medium">{device.lastActive}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${device.status === 'active' ? 'bg-green-50 text-green-600' :
                                                'bg-gray-100 text-gray-500'
                                                }`}>
                                                {device.status.toUpperCase()}
                                            </span>
                                        </td>
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
                        <p className="text-sm text-text-secondary font-medium">Showing 1-6 of 1,500 devices</p>
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
