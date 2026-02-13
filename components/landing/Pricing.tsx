'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPricingPlans } from '@/lib/api/pricing';
import { useAuthStore } from '@/store/useAuthStore';
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

    const mainPlans = plans.filter(plan => plan.id !== 'white-label');
    const enterprisePlan = plans.find(plan => plan.id === 'white-label');

    return (
        <section id="pricing" className="py-20 bg-white overflow-hidden relative border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-text-main tracking-tight">Smart plans for every scale</h2>
                    <p className="text-base text-text-secondary font-medium">Clear pricing with no hidden fees. All plans include secure NFC technology.</p>
                </div>

                {/* Static Grid Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {mainPlans.map((plan, index) => {
                        const highlight = plan.isPopular;
                        const tagLabel = highlight ? "Best Value" : null;
                        const isCurrentPlan = user?.planId === plan.id;

                        return (
                            <div
                                key={index}
                                className={`
                                    relative flex flex-col p-6 rounded-2xl transition-all duration-300 
                                    ${highlight
                                        ? 'bg-primary shadow-xl shadow-primary/20 text-white scale-[1.02] md:scale-105 z-10'
                                        : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
                                    }
                                `}
                            >
                                {tagLabel && (
                                    <div className="absolute top-4 right-4 bg-white/20 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                                        {tagLabel}
                                    </div>
                                )}
                                <h3 className={`text-lg font-bold mb-1 font-display ${highlight ? 'text-white' : 'text-text-main'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-xs mb-6 font-medium leading-relaxed ${highlight ? 'text-white/80' : 'text-text-secondary'}`}>
                                    {plan.description}
                                </p>
                                <div className={`flex items-baseline mb-6 ${highlight ? 'text-white' : ''}`}>
                                    <span className={`text-3xl font-bold ${!highlight ? 'text-text-main' : ''}`}>{plan.price}</span>
                                    {plan.period && <span className={`ml-1.5 font-bold text-xs ${highlight ? 'opacity-70' : 'text-text-secondary'}`}>{plan.period}</span>}
                                </div>
                                <ul className={`space-y-3 mb-8 flex-1 ${highlight ? 'text-white' : ''}`}>
                                    {plan.features.map((item, i) => (
                                        <li key={i} className="flex items-start text-xs font-semibold gap-2.5 leading-tight">
                                            <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${highlight ? 'text-white' : 'text-primary'}`} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => isCurrentPlan ? null : handleSubscription(plan)}
                                    disabled={isCurrentPlan}
                                    className={`
                                        w-full py-3 rounded-xl text-sm font-bold text-center transition-all cursor-pointer shadow-md
                                        ${isCurrentPlan
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                            : highlight
                                                ? 'bg-white text-primary hover:bg-gray-50'
                                                : 'bg-primary text-white hover:bg-primary/90'
                                        }
                                    `}
                                >
                                    {isCurrentPlan ? 'Current Plan' : plan.id === 'free' ? 'Get Started' : 'Subscribe'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* White Label Plan - Separate Row */}
                {enterprisePlan && (() => {
                    const isCurrentPlan = user?.planId === enterprisePlan.id;
                    return (
                        <div className="max-w-5xl mx-auto">
                            <div className="relative flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 rounded-2xl bg-text-main text-white shadow-xl border border-white/5">
                                <div className="flex-1">
                                    <div className="inline-block px-2.5 py-1 bg-white/10 text-white text-[8px] font-black rounded-full uppercase tracking-widest mb-3">
                                        Enterprise
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-1 font-display tracking-tight text-white">
                                        {enterprisePlan.name}
                                    </h3>
                                    <p className="text-xs mb-6 font-medium text-white/70 max-w-xl">
                                        {enterprisePlan.description}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                                        {enterprisePlan.features.slice(0, 4).map((item, i) => (
                                            <li key={i} className="flex items-center text-xs font-semibold gap-2.5 list-none">
                                                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                                                <span className="text-white/90">{item}</span>
                                            </li>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center md:items-end gap-5 shrink-0">
                                    <div className="text-center md:text-right">
                                        <span className="text-3xl md:text-4xl font-bold block leading-none">{enterprisePlan.price}</span>
                                        {enterprisePlan.period && <span className="text-xs font-bold opacity-60 mt-1 block tracking-wider">{enterprisePlan.period}</span>}
                                    </div>
                                    <button
                                        onClick={() => isCurrentPlan ? null : handleSubscription(enterprisePlan)}
                                        disabled={isCurrentPlan}
                                        className={`
                                            px-8 py-3 rounded-xl text-sm font-bold text-center transition-all shadow-lg whitespace-nowrap
                                            ${isCurrentPlan
                                                ? 'bg-white/10 text-white/40 cursor-not-allowed shadow-none'
                                                : 'bg-primary text-white hover:scale-[1.02]'
                                            }
                                        `}
                                    >
                                        {isCurrentPlan ? 'Current Plan' : 'Contact Sales'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })()}

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
