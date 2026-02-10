'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPricingPlans } from '@/lib/api/pricing';
import { useAuthStore, SubscriptionPlan } from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SubscriptionCheckout from '@/components/dashboard/SubscriptionCheckout';

export default function Pricing() {
    const router = useRouter();
    const { user, subscribe, isAuthenticated } = useAuthStore();
    const [checkoutPlan, setCheckoutPlan] = useState<any>(null);

    const { data: plans = [], isLoading } = useQuery({
        queryKey: ['subscription-plans'],
        queryFn: fetchPricingPlans
    });

    const handleSubscription = async (plan: any) => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        // Direct subscribe for Free plan, checkout modal for paid ones
        if (plan.id === 'free') {
            const res = await subscribe('free');
            if (res.success) toast.success('Switched to Free plan!');
            else toast.error(res.error || 'Failed to update plan');
        } else {
            setCheckoutPlan(plan);
        }
    };

    if (isLoading) return (
        <div className="py-24 bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <section id="pricing" className="py-24 bg-gray-50 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-text-main">Smart plans for every scale</h2>
                    <p className="text-lg text-text-secondary font-medium">Clear pricing with no hidden fees. All plans include secure NFC technology.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.filter(p => p.id !== 'white-label' && p.id !== 'enterprise').map((plan, index) => {
                        const highlight = plan.isPopular;
                        const tagLabel = highlight ? "Best Value" : null;
                        const isCurrentPlan = user?.planId === plan.id;

                        return (
                            <div
                                key={index}
                                className={`
                                    relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-500
                                    ${highlight
                                        ? 'bg-primary shadow-2xl shadow-primary/30 transform lg:scale-105 z-10 text-white'
                                        : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl'
                                    }
                                `}
                            >
                                {tagLabel && (
                                    <div className="absolute top-6 right-6 bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                        {tagLabel}
                                    </div>
                                )}
                                <h3 className={`text-xl font-bold mb-2 font-display ${highlight ? 'text-white' : 'text-text-main'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm mb-8 font-medium ${highlight ? 'text-white/80' : 'text-gray-400'}`}>
                                    {plan.description}
                                </p>
                                <div className={`flex items-baseline mb-8 ${highlight ? 'text-white' : ''}`}>
                                    <span className={`text-4xl font-bold ${!highlight ? 'text-text-main' : ''}`}>{plan.price}</span>
                                    {plan.period && <span className={`ml-2 font-bold text-sm ${highlight ? 'opacity-70' : 'text-gray-400'}`}>{plan.period}</span>}
                                </div>
                                <ul className={`space-y-4 mb-10 flex-1 ${highlight ? 'text-white' : ''}`}>
                                    {plan.features.map((item, i) => (
                                        <li key={i} className="flex items-center text-sm font-semibold gap-3">
                                            <CheckCircle2 size={18} className={highlight ? 'text-green-400' : 'text-primary'} />
                                            {highlight ? item : <span className="text-text-secondary">{item}</span>}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => isCurrentPlan ? null : handleSubscription(plan)}
                                    disabled={isCurrentPlan}
                                    className={`
                                        w-full py-4 rounded-2xl font-bold text-center transition-all cursor-pointer shadow-lg
                                        ${isCurrentPlan
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                            : highlight
                                                ? 'bg-white text-primary hover:bg-blue-50'
                                                : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                                        }
                                    `}
                                >
                                    {isCurrentPlan ? 'Current Plan' : plan.id === 'free' ? 'Get Started' : 'Subscribe'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Custom Software / White Label Section */}
                {plans.find(p => p.id === 'white-label') && (
                    <div className="mt-16 relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-gray-900 border border-gray-800 p-8 md:p-12 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-32 -translate-y-32 blur-3xl"></div>

                            <div className="flex-1 space-y-6 text-center lg:text-left z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                    <span className="animate-pulse">●</span> Software Solution
                                </div>
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
                                    {plans.find(p => p.id === 'white-label')?.name}
                                </h3>
                                <p className="text-lg text-gray-400 max-w-2xl font-medium">
                                    {plans.find(p => p.id === 'white-label')?.description}
                                    Partner with us to launch your own brand.
                                </p>
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                                    {plans.find(p => p.id === 'white-label')?.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm font-bold text-white/70">
                                            <CheckCircle2 size={16} className="text-primary" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col items-center lg:items-end gap-6 z-10">
                                <div className="text-center lg:text-right">
                                    <span className="block text-4xl font-bold text-white font-display">
                                        {plans.find(p => p.id === 'white-label')?.price}
                                    </span>
                                    {plans.find(p => p.id === 'white-label')?.period && (
                                        <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">
                                            {plans.find(p => p.id === 'white-label')?.period}
                                        </span>
                                    )}
                                </div>
                                <Link
                                    href="/solutions/white-label"
                                    className="px-12 py-5 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all shadow-xl shadow-primary/25 text-sm uppercase tracking-widest flex items-center gap-3 whitespace-nowrap"
                                >
                                    {plans.find(p => p.id === 'white-label')?.buttonText || 'Explore Solution'}
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Enterprise Section */}
                {plans.find(p => p.id === 'enterprise') && (
                    <div className="mt-8 bg-gray-50 border border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-8 rounded-[2rem]">
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-xl font-bold text-text-main mb-2">Need a custom build?</h4>
                            <p className="text-text-secondary font-medium">For large-scale hardware deployments and specialized infrastructure needs.</p>
                        </div>
                        <Link
                            href="/support"
                            className="px-8 py-4 border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all rounded-xl uppercase tracking-widest text-xs"
                        >
                            Contact Sales
                        </Link>
                    </div>
                )}

                {checkoutPlan && (
                    <SubscriptionCheckout
                        isOpen={!!checkoutPlan}
                        onClose={() => setCheckoutPlan(null)}
                        plan={checkoutPlan}
                    />
                )}
            </div>
        </section>
    );
}
