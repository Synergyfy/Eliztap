'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';

export default function BusinessProfilePage() {
    return (
        <DashboardSidebar>
            <div className="p-8 max-w-4xl mx-auto">
                <PageHeader
                    title="Business Profile"
                    description="Update your business information and online presence"
                    actions={
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20">
                            Save Changes
                        </button>
                    }
                />

                <div className="space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-display font-bold text-text-main">Basic Information</h3>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-8">
                                <div className="relative group">
                                    <div className="size-24 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-dashed border-primary/20 group-hover:border-primary/40 transition-all">
                                        <span className="material-icons-round text-3xl text-primary/40 group-hover:text-primary/60">add_a_photo</span>
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 size-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-primary hover:scale-110 transition-all">
                                        <span className="material-icons-round text-sm">edit</span>
                                    </button>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Name</label>
                                        <input type="text" defaultValue="Green Terrace Cafe" className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Category</label>
                                        <select className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                                            <option>Restaurant & Cafe</option>
                                            <option>Retail Store</option>
                                            <option>Beauty & Health</option>
                                            <option>Others</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-display font-bold text-text-main">Contact Details</h3>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Official Email</label>
                                <input type="email" defaultValue="hello@greenterrace.com" className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Phone Number</label>
                                <input type="tel" defaultValue="+234 801 234 5678" className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                            </div>
                            <div className="col-span-1 md:col-span-2 space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Physical Address</label>
                                <textarea defaultValue="42 Admiralty Way, Lekki Phase 1, Lagos, Nigeria" rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardSidebar>
    );
}
