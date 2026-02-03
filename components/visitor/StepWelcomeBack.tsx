import React from 'react';
import { motion } from 'framer-motion';
import { presets } from './presets';
import { VisitorHeader } from './VisitorHeader';

interface StepWelcomeBackProps {
    storeName: string;
    logoUrl?: string | null;
    customWelcomeMessage?: string | null;
    userData: any;
    visitCount: number;
    rewardVisitThreshold: number;
    hasRewardSetup: boolean;
    redemptionStatus: 'none' | 'pending' | 'approved' | 'declined';
    onRedeem: () => void;
    onContinue: () => void;
    onClear: () => void;
}

export const StepWelcomeBack: React.FC<StepWelcomeBackProps> = ({
    storeName,
    logoUrl,
    customWelcomeMessage,
    userData,
    visitCount,
    rewardVisitThreshold,
    hasRewardSetup,
    redemptionStatus,
    onRedeem,
    onContinue,
    onClear
}) => {
    return (
        <motion.div
            key="welcome-back"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={presets.card}
        >
            <VisitorHeader logoUrl={logoUrl} storeName={storeName} tag="Returning Guest" />

            <div className="mb-10 text-left">
                <span className={presets.tag}>Welcome back</span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                    Hi, <span className="text-primary">{userData?.name?.split(' ')[0] || 'there'}!</span>
                </h1>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                    {customWelcomeMessage || `It's great to see you again at ${storeName}.`}
                </p>
            </div>

            {hasRewardSetup && (
                <div className="mb-10 p-6 rounded-2xl bg-gray-50/50 border border-gray-100 text-left relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Loyalty Progress</p>
                                <p className="text-lg font-black text-slate-900 tracking-tight">
                                    {visitCount} of {rewardVisitThreshold} Visits
                                </p>
                            </div>
                            <div className="size-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-xl">redeem</span>
                            </div>
                        </div>

                        <div className="h-2 w-full bg-gray-200/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((visitCount / rewardVisitThreshold) * 100, 100)}%` }}
                                className="h-full bg-primary"
                            />
                        </div>

                        <p className="mt-4 text-[11px] text-gray-400 font-medium">
                            {visitCount >= rewardVisitThreshold
                                ? "You've earned a reward! Tap continue to claim."
                                : `Just ${rewardVisitThreshold - visitCount} more visits to unlock your next reward.`}
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 size-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                </div>
            )}

            <div className="space-y-4">
                {visitCount >= rewardVisitThreshold && redemptionStatus === 'none' ? (
                    <button
                        onClick={onRedeem}
                        className="w-full h-14 rounded-2xl bg-emerald-500 text-white font-bold uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">redeem</span>
                        Redeem My Reward
                    </button>
                ) : (
                    <button
                        onClick={onContinue}
                        disabled={redemptionStatus === 'pending'}
                        className={`w-full h-14 rounded-2xl ${redemptionStatus === 'pending' ? 'bg-gray-100 text-gray-400' : 'bg-primary text-white shadow-primary/20'} font-bold uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2`}
                    >
                        {redemptionStatus === 'approved' ? (
                            <>
                                <span className="material-symbols-outlined text-sm text-white">check_circle</span>
                                Claim Approved Reward
                            </>
                        ) : redemptionStatus === 'pending' ? (
                            <>
                                <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                                Pending Staff Approval...
                            </>
                        ) : (
                            'Continue to Experience'
                        )}
                    </button>
                )}

                <button
                    onClick={onClear}
                    disabled={redemptionStatus === 'pending'}
                    className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors py-2 block w-full disabled:opacity-50"
                >
                    Not you? Clear Profile
                </button>
            </div>
        </motion.div>
    );
};
