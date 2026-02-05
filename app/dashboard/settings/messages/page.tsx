'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import { useCustomerFlowStore } from '@/store/useCustomerFlowStore';
import { StepWelcomeBack } from '@/components/visitor/StepWelcomeBack';
import { StepFinalSuccess } from '@/components/visitor/StepFinalSuccess';
import { motion } from 'framer-motion';

export default function MessageSettingsPage() {
    const store = useCustomerFlowStore();
    const [activeTab, setActiveTab] = useState<'welcome' | 'success' | 'rewards'>('welcome');

    // Local state for preview updates before saving
    const [settings, setSettings] = useState({
        welcomeMessage: store.customWelcomeMessage || '',
        successMessage: store.customSuccessMessage || '',
        rewardMessage: store.customRewardMessage || '',
        rewardEnabled: store.hasRewardSetup,
        rewardVisitThreshold: store.rewardVisitThreshold,
        logoUrl: store.logoUrl || ''
    });

    const handleSave = () => {
        store.updateCustomSettings(settings);
        // You might want to add a toast notification here
        alert('Settings saved successfully!');
    };

    return (
        <DashboardSidebar>
            <div className="p-8 max-w-6xl mx-auto">
                <PageHeader
                    title="Message Settings"
                    description="Customize your automated messages, rewards, and visitor experience."
                />

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    {/* Settings Panel */}
                    <div className="w-full lg:w-1/2 space-y-6">

                        {/* Tabs */}
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            <button
                                onClick={() => setActiveTab('welcome')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'welcome' ? 'bg-white shadow text-primary' : 'text-text-secondary hover:bg-gray-200/50'}`}
                            >
                                Welcome Back
                            </button>
                            <button
                                onClick={() => setActiveTab('success')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'success' ? 'bg-white shadow text-primary' : 'text-text-secondary hover:bg-gray-200/50'}`}
                            >
                                Final Success
                            </button>
                            <button
                                onClick={() => setActiveTab('rewards')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'rewards' ? 'bg-white shadow text-primary' : 'text-text-secondary hover:bg-gray-200/50'}`}
                            >
                                Rewards
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            {activeTab === 'welcome' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                            <span className="material-icons-round">waving_hand</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-main">Returning Customer Message</h3>
                                            <p className="text-xs text-text-secondary">Displayed when a customer taps again.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-1">Message Content</label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm resize-none"
                                            placeholder="Welcome back! Good to see you again."
                                            value={settings.welcomeMessage}
                                            onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                                        />
                                        <p className="text-[10px] text-text-secondary italic">Tip: Keep it short and friendly.</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'success' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="size-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                            <span className="material-icons-round">check_circle</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-main">Final Success Message</h3>
                                            <p className="text-xs text-text-secondary">Displayed after a successful check-in/signup.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-1">Message Content</label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm resize-none"
                                            placeholder="You are all set! Thanks for visiting."
                                            value={settings.successMessage}
                                            onChange={(e) => setSettings({ ...settings, successMessage: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'rewards' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                                                <span className="material-icons-round">emoji_events</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-text-main">Loyalty Rewards</h3>
                                                <p className="text-xs text-text-secondary">Reward frequent visitors.</p>
                                            </div>
                                        </div>

                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.rewardEnabled}
                                                onChange={(e) => setSettings({ ...settings, rewardEnabled: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>

                                    <div className={`space-y-4 transition-all ${!settings.rewardEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-1">Visit Threshold</label>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="20"
                                                    step="1"
                                                    value={settings.rewardVisitThreshold}
                                                    onChange={(e) => setSettings({ ...settings, rewardVisitThreshold: parseInt(e.target.value) })}
                                                    className="w-full accent-primary"
                                                />
                                                <span className="font-bold text-text-main w-8">{settings.rewardVisitThreshold}</span>
                                            </div>
                                            <p className="text-[10px] text-text-secondary">Number of visits required to trigger a reward.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-1">Reward Message</label>
                                            <textarea
                                                rows={3}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm resize-none"
                                                placeholder="Congratulations! You've earned a reward."
                                                value={settings.rewardMessage}
                                                onChange={(e) => setSettings({ ...settings, rewardMessage: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <button
                                    onClick={handleSave}
                                    className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="w-full lg:w-1/2">
                        <div className="sticky top-8">
                            <div className="bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl border-4 border-gray-800 max-w-[360px] mx-auto aspect-[9/19] relative overflow-hidden">
                                {/* Phone Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-50"></div>

                                {/* Screen Content */}
                                <div className="bg-white w-full h-full rounded-[2rem] overflow-hidden relative flex flex-col">

                                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/5 to-transparent z-10 pointer-events-none"></div>

                                    <div className="flex-1 overflow-y-auto pt-12 pb-8 px-4 bg-gray-50">
                                        <div className="scale-[0.85] origin-top h-full">
                                            {activeTab === 'welcome' && (
                                                <StepWelcomeBack
                                                    storeName={store.storeName}
                                                    logoUrl={store.logoUrl}
                                                    customWelcomeMessage={settings.welcomeMessage}
                                                    visitCount={settings.rewardVisitThreshold - 1} // Show just before reward for demo
                                                    userData={{ name: 'John Doe', email: 'john@example.com' }}
                                                    rewardVisitThreshold={settings.rewardVisitThreshold}
                                                    hasRewardSetup={settings.rewardEnabled}
                                                    redemptionStatus="none"
                                                    onRedeem={() => { }}
                                                    onContinue={() => { }}
                                                    onClear={() => { }}
                                                />
                                            )}
                                            {activeTab === 'success' && (
                                                <StepFinalSuccess
                                                    finalSuccessMessage={settings.successMessage || "You are all set! Thanks for visiting."}
                                                    onFinish={() => { }}
                                                />
                                            )}
                                            {activeTab === 'rewards' && (
                                                <StepWelcomeBack
                                                    storeName={store.storeName}
                                                    logoUrl={store.logoUrl}
                                                    customWelcomeMessage={settings.welcomeMessage}
                                                    visitCount={settings.rewardVisitThreshold} // Show reward state
                                                    userData={{ name: 'John Doe', email: 'john@example.com' }}
                                                    rewardVisitThreshold={settings.rewardVisitThreshold}
                                                    hasRewardSetup={settings.rewardEnabled}
                                                    redemptionStatus="none"
                                                    onRedeem={() => { }}
                                                    onContinue={() => { }}
                                                    onClear={() => { }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Fake Home Bar */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full"></div>
                                </div>
                            </div>
                            <p className="text-center text-xs font-bold text-text-secondary mt-6 uppercase tracking-widest">Live Preview</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardSidebar>
    );
}
