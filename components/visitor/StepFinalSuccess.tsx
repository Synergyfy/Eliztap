import React from 'react';
import { motion } from 'framer-motion';
import { presets } from './presets';

interface StepFinalSuccessProps {
    finalSuccessMessage?: string | null;
    customSuccessTitle?: string | null;
    customSuccessButton?: string | null;
    customSuccessTag?: string | null;
    onFinish: () => void;
}

export const StepFinalSuccess: React.FC<StepFinalSuccessProps> = ({ finalSuccessMessage, customSuccessTitle, customSuccessButton, customSuccessTag, onFinish }) => {
    return (
        <motion.div key="final-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={presets.card + " text-center"}>
            <div className="size-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <span className="material-symbols-outlined text-white text-4xl">check_circle</span>
            </div>
            {customSuccessTag && <span className={presets.tag + " mb-2 inline-block"}>{customSuccessTag}</span>}
            <h1 className={presets.title}>{customSuccessTitle || "Successfully Linked!"}</h1>
            <p className={presets.body + " mt-4 mb-8"}>
                {finalSuccessMessage || "Your profile has been successfully updated."}
            </p>
            <button onClick={onFinish} className={presets.secondaryButton}>
                {customSuccessButton || "Finish Process"}
            </button>
        </motion.div>
    );
};
