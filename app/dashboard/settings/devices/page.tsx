'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';

export default function DeviceSettingsPage() {
    return (
        <DashboardSidebar>
            <div className="p-8 max-w-4xl mx-auto">
                <PageHeader
                    title="Device Settings"
                    description="Configure default behaviors for your NFC tap points"
                    actions={
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20">
                            Save Configuration
                        </button>
                    }
                />

                <div className="space-y-8">
                    {/* Interaction Rules */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-display font-bold text-text-main">Tap Behavior</h3>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-text-main text-sm">One-Tap Sign-in</h4>
                                    <p className="text-xs text-text-secondary mt-1">Automatically check-in returning users without form submission</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-text-main text-sm">Cooldown Period</h4>
                                    <p className="text-xs text-text-secondary mt-1">Seconds to wait before allowing another tap from the same device</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="number" defaultValue={60} className="w-20 h-10 bg-gray-50 border border-gray-100 rounded-lg px-3 text-sm font-bold text-center outline-none focus:bg-white focus:ring-2 focus:ring-primary/20" />
                                    <span className="text-xs font-bold text-text-secondary">Sec</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Default UI */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-display font-bold text-text-main">Welcome Screen Defaults</h3>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Landing Page Title</label>
                                <input type="text" defaultValue="Welcome to Green Terrace!" className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Primary Button Text</label>
                                <input type="text" defaultValue="Join Our Loyalty Program" className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardSidebar>
    );
}
