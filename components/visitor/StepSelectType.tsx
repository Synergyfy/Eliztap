import React from 'react';
import { motion } from 'framer-motion';
import { businessConfigs, BusinessType } from '@/store/useCustomerFlowStore';
import { presets } from './presets';

interface StepSelectTypeProps {
    onSelect: (type: BusinessType) => void;
}

export const StepSelectType: React.FC<StepSelectTypeProps> = ({ onSelect }) => {
    return (
        <motion.div
            key="select"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <div className="md:col-span-2 mb-4">
                <span className={presets.tag}>Simulated Environment</span>
                <h1 className={presets.title}>Select Industry</h1>
                <p className={presets.body}>Choose a business type to experience the tailored guest flow.</p>
            </div>
            {Object.entries(businessConfigs).map(([key, cfg]) => (
                <button
                    key={key}
                    onClick={() => onSelect(key as BusinessType)}
                    className="p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all text-left group"
                >
                    <div className="size-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                        <span className="material-symbols-outlined text-3xl">{cfg.icon}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{cfg.label}</h3>
                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed">{cfg.description}</p>
                </button>
            ))}
        </motion.div>
    );
};
