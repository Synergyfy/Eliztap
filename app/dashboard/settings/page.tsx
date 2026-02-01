'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';

export default function SettingsPage() {
    const settingsCategories = [
        { title: 'Business Profile', desc: 'Manage your business information and layout', icon: 'store', href: '/dashboard/settings/profile' },
        { title: 'Notifications', desc: 'Configure how you receive alerts and reports', icon: 'notifications', href: '/dashboard/settings/notifications' },
        { title: 'Device Settings', desc: 'Configure NFC device defaults and behaviors', icon: 'nfc', href: '/dashboard/settings/devices' },
        { title: 'Team Management', desc: 'Invite staff and manage permissions', icon: 'people', href: '/dashboard/staff' },
        { title: 'Integrations', desc: 'Connect with POS and CRM tools', icon: 'extension', href: '/dashboard/settings/integrations' },
        { title: 'Data & Privacy', desc: 'Manage data retention and compliance', icon: 'security', href: '/dashboard/settings/privacy' },
    ];

    return (
        <DashboardSidebar>
            <div className="p-8">
                <PageHeader
                    title="Settings"
                    description="Configure and manage your LaTap account preferences"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {settingsCategories.map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-text-secondary mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                <span className="material-icons-round text-2xl">{item.icon}</span>
                            </div>
                            <h3 className="text-lg font-display font-bold text-text-main mb-1 tracking-tight">{item.title}</h3>
                            <p className="text-sm text-text-secondary font-medium leading-relaxed">{item.desc}</p>
                            <div className="mt-4 flex items-center text-primary text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                                Manage
                                <span className="material-icons-round text-sm">arrow_forward</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </DashboardSidebar>
    );
}
