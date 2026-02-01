'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';

export default function NewCampaignPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        type: 'WhatsApp',
        audience: 'all',
        message: '',
        schedule: 'now'
    });

    const steps = [
        { number: 1, title: 'Details' },
        { number: 2, title: 'Audience' },
        { number: 3, title: 'Message' },
        { number: 4, title: 'Schedule' }
    ];

    return (
        <DashboardSidebar>
            <div className="p-8 max-w-4xl mx-auto">
                <PageHeader
                    title="Create New Campaign"
                    description="Configure your message and target audience"
                />

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-0"></div>
                    {steps.map((s) => (
                        <div key={s.number} className="relative z-10 flex flex-col items-center">
                            <div className={`size-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 ${step >= s.number ? 'bg-primary text-white border-primary' : 'bg-white text-text-secondary border-gray-200'
                                }`}>
                                {step > s.number ? <span className="material-icons-round text-lg">check</span> : s.number}
                            </div>
                            <span className={`absolute -bottom-7 text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${step >= s.number ? 'text-primary' : 'text-text-secondary'
                                }`}>
                                {s.title}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-8">
                        {step === 1 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-display font-bold text-text-main">Campaign Details</h3>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Campaign Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Weekend Coffee Special"
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Channel</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['WhatsApp', 'SMS', 'Email'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setFormData({ ...formData, type })}
                                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${formData.type === type ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-gray-200'
                                                    }`}
                                            >
                                                <span className="material-icons-round text-2xl text-text-secondary">
                                                    {type === 'WhatsApp' ? 'chat' : type === 'SMS' ? 'textsms' : 'email'}
                                                </span>
                                                <span className="text-xs font-bold text-text-main">{type}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-display font-bold text-text-main">Compose Message</h3>
                                    <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                                        <span className="material-icons-round text-sm">description</span>
                                        Use Template
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Message Body</label>
                                        <span className="text-[10px] font-bold text-text-secondary">{formData.message.length}/160</span>
                                    </div>
                                    <textarea
                                        rows={6}
                                        placeholder="Type your message here... Use {name} for personalization."
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-2">Variables</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['{name}', '{business}', '{date}', '{points}'].map((v) => (
                                            <button key={v} className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-primary hover:border-primary transition-colors">
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step !== 1 && step !== 3 && (
                            <div className="py-12 flex flex-col items-center justify-center text-center">
                                <span className="material-icons-round text-5xl text-gray-200 mb-4">construction</span>
                                <h3 className="text-lg font-bold text-text-main">Step {step} Implementation</h3>
                                <p className="text-sm text-text-secondary">This part of the form is coming soon in the next update.</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 px-8 py-5 flex items-center justify-between border-t border-gray-100">
                        <button
                            disabled={step === 1}
                            onClick={() => setStep(step - 1)}
                            className="px-6 py-2.5 bg-white border border-gray-200 text-text-secondary font-bold rounded-xl hover:bg-gray-100 transition-all text-sm disabled:opacity-0"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => step < 4 ? setStep(step + 1) : console.log('Finalize')}
                            className="px-8 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20"
                        >
                            {step === 4 ? 'Launch Campaign' : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </DashboardSidebar>
    );
}
