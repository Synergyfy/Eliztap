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

                {/* Swipable Pricing Cards - Single Line */}
                <div className="relative -mx-4 sm:mx-0 mb-8">
                    <div className="overflow-x-auto scrollbar-hide px-4 sm:px-0">
                        <div className="flex gap-6 pb-4 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                            {plans.filter(plan => plan.id !== 'white-label').map((plan, index) => {
                                const highlight = plan.isPopular;
                                const tagLabel = highlight ? "Best Value" : null;
                                const isCurrentPlan = user?.planId === plan.id;

                                return (
                                    <div
                                        key={index}
                                        className={`
                                            relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 w-80 sm:w-auto
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
                    </div>
                    {/* Scroll Indicator for Mobile */}
                    <div className="flex justify-center gap-2 mt-4 sm:hidden">
                        {plans.filter(p => p.id !== 'white-label').map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-gray-300"></div>
                        ))}
                    </div>
                </div>

                {/* White Label Plan - Separate Row */}
                {plans.filter(plan => plan.id === 'white-label').map((plan, index) => {
                    const isCurrentPlan = user?.planId === plan.id;
                    return (
                        <div key={index} className="max-w-4xl mx-auto">
                            <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-10 rounded-[2.5rem] bg-linear-to-br from-gray-900 to-gray-800 text-white shadow-2xl border border-gray-700">
                                <div className="flex-1">
                                    <div className="inline-block px-3 py-1 bg-white/10 text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-4">
                                        Enterprise
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2 font-display">
                                        {plan.name}
                                    </h3>
                                    <p className="text-sm mb-6 font-medium text-white/80">
                                        {plan.description}
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.slice(0, 4).map((item, i) => (
                                            <li key={i} className="flex items-center text-sm font-semibold gap-3">
                                                <CheckCircle2 size={16} className="text-green-400" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col items-center md:items-end gap-4">
                                    <div className="text-center md:text-right">
                                        <span className="text-4xl md:text-5xl font-bold block">{plan.price}</span>
                                        {plan.period && <span className="text-sm font-bold opacity-70">{plan.period}</span>}
                                    </div>
                                    <button
                                        onClick={() => isCurrentPlan ? null : handleSubscription(plan)}
                                        disabled={isCurrentPlan}
                                        className={`
                                            px-8 py-4 rounded-2xl font-bold text-center transition-all shadow-lg whitespace-nowrap
                                            ${isCurrentPlan
                                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed shadow-none'
                                                : 'bg-white text-gray-900 hover:bg-gray-100'
                                            }
                                        `}
                                    >
                                        {isCurrentPlan ? 'Current Plan' : 'Contact Sales'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

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
