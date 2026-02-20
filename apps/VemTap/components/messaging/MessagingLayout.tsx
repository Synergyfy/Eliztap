'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageChannel, useMessagingStore } from '@/lib/store/useMessagingStore';
import { MessageSquare, Phone, Mail, LayoutDashboard, Wallet, CreditCard, Plus, Smartphone } from 'lucide-react';
import TopUpModal from './TopUpModal';

interface MessagingLayoutProps {
    children: React.ReactNode;
}

export default function MessagingLayout({ children }: MessagingLayoutProps) {
    const pathname = usePathname();
    const { wallets } = useMessagingStore();

    // Detect current channel from pathname
    const getCurrentChannel = (): MessageChannel | 'Global' => {
        if (pathname.includes('/whatsapp')) return 'WhatsApp';
        if (pathname.includes('/sms')) return 'SMS';
        if (pathname.includes('/email')) return 'Email';
        return 'Global';
    };

    const currentChannel = getCurrentChannel();

    const tabs: { name: string; href: string; icon: any; exact: boolean; channel?: MessageChannel | 'Global' }[] = [
        { name: 'Overview', href: '/dashboard/messaging', icon: LayoutDashboard, exact: true, channel: 'Global' },
        { name: 'WhatsApp', href: '/dashboard/messaging/whatsapp', icon: MessageSquare, exact: false, channel: 'WhatsApp' },
        { name: 'SMS', href: '/dashboard/messaging/sms', icon: Phone, exact: false, channel: 'SMS' },
        { name: 'Email', href: '/dashboard/messaging/email', icon: Mail, exact: false, channel: 'Email' },
    ];

    const isActive = (tab: typeof tabs[0]) => {
        if (tab.exact) return pathname === tab.href;
        return pathname.startsWith(tab.href);
    };

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Header / Stats Bar */}
            <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-text-main">Messaging Center</h1>
                    <p className="text-text-secondary text-sm">Manage all your communication channels in one place</p>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/messaging/compose"
                        className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 text-sm"
                    >
                        <Plus size={18} />
                        Compose Message
                    </Link>


                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-200 px-8 flex gap-8">
                {tabs.map((tab) => {
                    const active = isActive(tab);
                    const Icon = tab.icon;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`
                                flex items-center gap-2 py-4 border-b-2 transition-all text-sm font-bold
                                ${active
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-secondary hover:text-text-main hover:border-gray-300'}
                            `}
                        >
                            <Icon size={18} />
                            {tab.name}
                        </Link>
                    )
                })}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 relative">
                <div className="h-full w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </div>


        </div>
    );
}
