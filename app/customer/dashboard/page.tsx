'use client';

import React from 'react';
import CustomerSidebar from '@/components/customer/CustomerSidebar';
import Link from 'next/link';

export default function CustomerDashboardPage() {
    const stats = [
        { label: 'Total Visits', value: '42', icon: 'history', color: 'blue' },
        { label: 'Reward Points', value: '1,250', icon: 'stars', color: 'purple' },
        { label: 'Saved', value: '₦15,000', icon: 'savings', color: 'green' },
    ];

    const recentVisits = [
        { place: 'Green Terrace Cafe', date: 'Today, 10:30 AM', points: '+50', icon: 'coffee' },
        { place: 'NextGen Tech Store', date: 'Yesterday, 4:15 PM', points: '+120', icon: 'devices' },
        { place: 'Fitness Center', date: 'Feb 1, 9:00 AM', points: '+30', icon: 'fitness_center' },
        { place: 'Green Terrace Cafe', date: 'Jan 28, 11:00 AM', points: '+50', icon: 'coffee' },
    ];

    return (
        <CustomerSidebar>
            <div className="max-w-5xl mx-auto space-y-8">

                {/* ID Card / Quick Scan */}
                <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl shadow-primary/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 -translate-y-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -translate-x-10 translate-y-10 blur-2xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-3 backdrop-blur-sm border border-white/10">Start Earning</span>
                            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Ready to check in?</h1>
                            <p className="text-blue-100 max-w-sm mb-6">Tap your phone at any participating location to collect points and redeem rewards instantly.</p>
                            <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                                <span className="material-icons-round">qr_code_scanner</span>
                                Show My ID
                            </button>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-lg transform rotate-3">
                            <span className="material-icons-round text-8xl text-text-main">qr_code_2</span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                    stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                        'bg-green-50 text-green-600'
                                }`}>
                                <span className="material-icons-round text-xl">{stat.icon}</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase text-text-secondary tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-display font-bold text-text-main">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Activity */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-display font-bold text-lg text-text-main">Recent Activity</h3>
                            <Link href="/customer/history" className="text-sm font-bold text-primary hover:underline">View All</Link>
                        </div>
                        <div className="space-y-4">
                            {recentVisits.map((visit, index) => (
                                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                                            <span className="material-icons-round text-lg">{visit.icon}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-text-main">{visit.place}</p>
                                            <p className="text-xs text-text-secondary">{visit.date}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-sm text-green-600 bg-green-50 px-2 py-1 rounded-lg">{visit.points} pts</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Featured Rewards */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-display font-bold text-lg text-text-main">Rewards For You</h3>
                            <Link href="/customer/rewards" className="text-sm font-bold text-primary hover:underline">View All</Link>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl border border-gray-100 flex gap-4 hover:border-primary/30 transition-colors">
                                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="material-icons-round text-2xl text-orange-500">local_cafe</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-sm text-text-main">Free Cappuccino</h4>
                                        <span className="text-xs font-bold text-purple-600">500 pts</span>
                                    </div>
                                    <p className="text-xs text-text-secondary mb-3 mt-1">Green Terrace Cafe</p>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-purple-500 h-full rounded-full w-3/4"></div>
                                    </div>
                                    <p className="text-[10px] text-text-secondary mt-1 text-right">350/500 points</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl border border-gray-100 flex gap-4 hover:border-primary/30 transition-colors">
                                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="material-icons-round text-2xl text-blue-500">fitness_center</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-sm text-text-main">1 Free Gym Session</h4>
                                        <span className="text-xs font-bold text-purple-600">1000 pts</span>
                                    </div>
                                    <p className="text-xs text-text-secondary mb-3 mt-1">Fitness Center</p>
                                    <button className="w-full py-1.5 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors">
                                        Redeem Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerSidebar>
    );
}
