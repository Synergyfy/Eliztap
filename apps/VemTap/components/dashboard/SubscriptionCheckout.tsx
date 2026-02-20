'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { CreditCard, ShieldCheck, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { useAuthStore, SubscriptionPlan } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    plan: {
        id: string;
        name: string;
        price: string;
        period: string;
    };
    billingCycle: 'monthly' | 'quarterly' | 'yearly';
}

export default function SubscriptionCheckout({ isOpen, onClose, plan, billingCycle }: Props) {
    const { subscribe } = useAuthStore();
    const [isProcessing, setIsProcessing] = useState(false);

    const calculateBreakdown = () => {
        const basePrice = parseInt(plan.price.replace(/[^0-9]/g, ''));
        if (isNaN(basePrice)) return { monthly: plan.price, total: plan.price, breakdown: null };

        let discount = 1;
        let months = 1;
        if (billingCycle === 'yearly') { discount = 0.8; months = 12; }
        else if (billingCycle === 'quarterly') { discount = 0.9; months = 3; }

        const monthly = Math.floor(basePrice * discount);
        const total = monthly * months;

        return {
            monthly: `₦${monthly.toLocaleString()}`,
            total: `₦${total.toLocaleString()}`,
            breakdown: months > 1 ? `${monthly.toLocaleString()} x ${months} months` : null
        };
    };

    const { monthly, total, breakdown } = calculateBreakdown();

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        const res = await subscribe(plan.id as SubscriptionPlan);
        setIsProcessing(false);

        if (res.success) {
            toast.success(`Welcome to the ${plan.name} plan!`);
            onClose();
        } else {
            toast.error(res.error || 'Payment failed');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Complete Subscription"
            description={`Upgrade your business to the ${plan.name} plan.`}
        >
            <form onSubmit={handlePayment} className="space-y-6 py-4">
                {/* Plan Summary */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Selected Plan</p>
                        <h4 className="text-lg font-bold text-text-main">{plan.name}</h4>
                        <p className="text-xs text-text-secondary font-medium mt-1 uppercase tracking-widest">{billingCycle} Billing</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{total}</p>
                        {breakdown && (
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mt-0.5">
                                ({breakdown})
                            </p>
                        )}
                        <p className="text-xs text-text-secondary font-medium mt-0.5">{monthly} / mo equivalent</p>
                    </div>
                </div>

                {/* Card details */}
                <div className="space-y-4">
                    <div className="relative">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Card Details</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-12 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                required
                            />
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="MM/YY"
                            className="h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            required
                        />
                        <input
                            type="text"
                            placeholder="CVC"
                            className="h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-text-secondary uppercase tracking-widest py-2">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-green-500" />
                        Secure SSL
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Zap size={14} className="text-orange-500" />
                        Instant Access
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full h-14 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Processing...
                        </>
                    ) : (
                        <>
                            Pay & Activate Plan
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </Modal>
    );
}
