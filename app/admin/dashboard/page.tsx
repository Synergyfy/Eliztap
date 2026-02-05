'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Notification from '@/components/ui/Notification';
import { notify } from '@/lib/notify'; // Import for demonstration
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
    const router = useRouter(); // Initialize router
    // ... (stats and recentBusinesses same as before)
    const platformStats = [
        {
            label: 'Total Businesses',
            value: '1,247',
            change: '+18.2%',
            trend: 'up',
            icon: 'store',
            color: 'blue'
        },
        {
            label: 'Active Users',
            value: '3,892',
            change: '+24.5%',
            trend: 'up',
            icon: 'people',
            color: 'green'
        },
        {
            label: 'Total Devices',
            value: '4,521',
            change: '+12.3%',
            trend: 'up',
            icon: 'nfc',
            color: 'purple'
        },
        {
            label: 'Monthly Revenue',
            value: '₦2.4M',
            change: '+32.1%',
            trend: 'up',
            icon: 'payments',
            color: 'yellow'
        },
    ];

    const recentBusinesses = [
        { name: 'Green Terrace Cafe', owner: 'John Smith', plan: 'Premium', status: 'active', joined: '2 days ago' },
        { name: 'Tech Hub Lagos', owner: 'Sarah Johnson', plan: 'Enterprise', status: 'active', joined: '3 days ago' },
        { name: 'Fashion Boutique', owner: 'Mike Williams', plan: 'Basic', status: 'pending', joined: '5 days ago' },
        { name: 'Fitness Center', owner: 'Emily Davis', plan: 'Premium', status: 'active', joined: '1 week ago' },
        { name: 'Restaurant 360', owner: 'David Brown', plan: 'Basic', status: 'suspended', joined: '2 weeks ago' },
    ];

    const systemAlerts = [
        { type: 'warning', message: '3 businesses pending approval', time: '10 mins ago', id: 1 },
        { type: 'error', message: '12 devices offline for >24 hours', time: '1 hour ago', id: 2 },
        { type: 'info', message: '5 support tickets unresolved', time: '2 hours ago', id: 3 },
    ];

    const handleQuickAction = (action: string) => {
        switch (action) {
            case 'Add Business':
                router.push('/admin/businesses/new');
                break;
            case 'Create User':
                router.push('/admin/users/new');
                break;
            case 'Register Device':
                router.push('/admin/devices/new');
                break;
            case 'Export Reports':
                notify.success('Report export started. Check your email shortly.');
                break;
            case 'System Settings':
                router.push('/admin/settings');
                break;
            default:
                notify.info(`${action} initiated...`);
        }
    };

    const handleViewBusiness = (businessName: string) => {
        notify.success(`Opening details for ${businessName}`);
        router.push(`/admin/businesses`); // Redirect to list for now as we don't have IDs
    };

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-text-main mb-2">Admin Dashboard</h1>
                    <p className="text-text-secondary font-medium">Platform overview and system management</p>
                </div>

                {/* System Alerts - Using Notification Component */}
                <div className="mb-8 space-y-3">
                    {systemAlerts.map((alert) => (
                        <Notification
                            key={alert.id}
                            type={alert.type as 'warning' | 'error' | 'info'}
                            message={`${alert.message} (${alert.time})`}
                            onClose={() => notify.success('Alert dismissed')}
                        />
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {platformStats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'green' ? 'bg-green-50' :
                                    stat.color === 'yellow' ? 'bg-yellow-50' :
                                        stat.color === 'purple' ? 'bg-purple-50' :
                                            'bg-primary/10'
                                    }`}>
                                    <span className={`material-icons-round text-xl ${stat.color === 'green' ? 'text-green-600' :
                                        stat.color === 'yellow' ? 'text-yellow-600' :
                                            stat.color === 'purple' ? 'text-purple-600' :
                                                'text-primary'
                                        }`}>{stat.icon}</span>
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
                    {/* Recent Businesses */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-display font-bold text-text-main mb-1">Recent Businesses</h2>
                                <p className="text-sm text-text-secondary">Latest registrations</p>
                            </div>
                            <button className="px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                View All
                            </button>
                        </div>

                        <div className="space-y-3">
                            {recentBusinesses.map((business, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="material-icons-round text-primary text-sm">store</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-text-main">{business.name}</p>
                                            <p className="text-xs text-text-secondary">{business.owner} • {business.joined}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-text-secondary px-3 py-1 bg-white rounded-full">
                                            {business.plan}
                                        </span>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${business.status === 'active' ? 'bg-green-50 text-green-600' :
                                            business.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                                                'bg-red-50 text-red-600'
                                            }`}>
                                            {business.status}
                                        </span>
                                        <button
                                            onClick={() => handleViewBusiness(business.name)}
                                            className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-primary transition-colors"
                                            title="Manage Business"
                                        >
                                            <span className="material-icons-round">more_vert</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-display font-bold text-text-main mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button
                                onClick={() => handleQuickAction('Add Business')}
                                className="w-full flex items-center gap-3 p-4 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors"
                            >
                                <span className="material-icons-round">add_business</span>
                                <span className="font-bold text-sm">Add Business</span>
                            </button>
                            <button
                                onClick={() => handleQuickAction('Create User')}
                                className="w-full flex items-center gap-3 p-4 bg-gray-50 text-text-main rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <span className="material-icons-round">person_add</span>
                                <span className="font-bold text-sm">Create User</span>
                            </button>
                            <button
                                onClick={() => handleQuickAction('Register Device')}
                                className="w-full flex items-center gap-3 p-4 bg-gray-50 text-text-main rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <span className="material-icons-round">nfc</span>
                                <span className="font-bold text-sm">Register Device</span>
                            </button>
                            <button
                                onClick={() => handleQuickAction('Export Reports')}
                                className="w-full flex items-center gap-3 p-4 bg-gray-50 text-text-main rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <span className="material-icons-round">file_download</span>
                                <span className="font-bold text-sm">Export Reports</span>
                            </button>
                            <button
                                onClick={() => handleQuickAction('System Settings')}
                                className="w-full flex items-center gap-3 p-4 bg-gray-50 text-text-main rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <span className="material-icons-round">settings</span>
                                <span className="font-bold text-sm">System Settings</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSidebar>
    );
}
