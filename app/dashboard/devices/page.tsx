'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DevicesPage() {
    const devices = [
        { id: 1, name: 'Main Entrance', code: 'NFC-001', status: 'active', scans: 1247, lastActive: '2 mins ago', location: 'Front Door' },
        { id: 2, name: 'Table 5', code: 'NFC-002', status: 'active', scans: 892, lastActive: '15 mins ago', location: 'Dining Area' },
        { id: 3, name: 'Checkout Counter', code: 'NFC-003', status: 'inactive', scans: 2341, lastActive: '2 days ago', location: 'Cashier' },
        { id: 4, name: 'VIP Lounge', code: 'NFC-004', status: 'active', scans: 456, lastActive: '1 hour ago', location: 'Lounge' },
    ];

    const stats = [
        { label: 'Total Devices', value: '12', icon: 'nfc', color: 'blue' },
        { label: 'Active Now', value: '9', icon: 'check_circle', color: 'green' },
        { label: 'Total Scans Today', value: '247', icon: 'touch_app', color: 'purple' },
        { label: 'Offline', value: '3', icon: 'error', color: 'red' },
    ];

    return (
        <DashboardSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">NFC Devices</h1>
                        <p className="text-text-secondary font-medium">Manage and monitor your tap devices</p>
                    </div>
                    <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-2">
                        <span className="material-icons-round">add</span>
                        Add Device
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'green' ? 'bg-green-50' :
                                        stat.color === 'red' ? 'bg-red-50' :
                                            stat.color === 'purple' ? 'bg-purple-50' :
                                                'bg-primary/10'
                                    }`}>
                                    <span className={`material-icons-round text-xl ${stat.color === 'green' ? 'text-green-600' :
                                            stat.color === 'red' ? 'text-red-600' :
                                                stat.color === 'purple' ? 'text-purple-600' :
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

                {/* Devices Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {devices.map((device) => (
                        <div key={device.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <span className="material-icons-round text-primary text-xl">nfc</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-main">{device.name}</h3>
                                        <p className="text-xs text-text-secondary font-medium">{device.code}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${device.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {device.status === 'active' ? '● Online' : '● Offline'}
                                </span>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-secondary font-medium">Location</span>
                                    <span className="text-sm font-bold text-text-main">{device.location}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-secondary font-medium">Total Scans</span>
                                    <span className="text-sm font-bold text-text-main">{device.scans.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-secondary font-medium">Last Active</span>
                                    <span className="text-sm font-bold text-text-main">{device.lastActive}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-gray-100">
                                <button className="flex-1 py-2 px-4 bg-gray-50 text-text-main font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm">
                                    Configure
                                </button>
                                <button className="flex-1 py-2 px-4 bg-primary/5 text-primary font-bold rounded-lg hover:bg-primary/10 transition-colors text-sm">
                                    View Stats
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Add New Device Card */}
                    <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[280px]">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
                            <span className="material-icons-round text-primary text-3xl">add</span>
                        </div>
                        <h3 className="font-bold text-text-main mb-2">Add New Device</h3>
                        <p className="text-sm text-text-secondary text-center">Register a new NFC tag to start capturing visitors</p>
                    </div>
                </div>
            </div>
        </DashboardSidebar>
    );
}
