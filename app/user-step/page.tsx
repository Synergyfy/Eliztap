'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCustomerFlowStore, BusinessType } from '@/store/useCustomerFlowStore';
import { useAuthStore } from '@/store/useAuthStore';
import { jwtDecode } from 'jwt-decode';

// Modular Components
import { VisitorLayout } from '@/components/visitor/VisitorLayout';
import { StepSelectType } from '@/components/visitor/StepSelectType';
import { StepScanning } from '@/components/visitor/StepScanning';
import { StepIdentifying } from '@/components/visitor/StepIdentifying';
import { StepForm } from '@/components/visitor/StepForm';
import { StepWelcomeBack } from '@/components/visitor/StepWelcomeBack';
import { StepOutcome } from '@/components/visitor/StepOutcome';
import { StepFinalSuccess } from '@/components/visitor/StepFinalSuccess';

export default function UserStepPage() {
    const {
        currentStep, setStep, storeName, setUserData, resetFlow,
        getBusinessConfig, customWelcomeMessage, customSuccessMessage,
        customPrivacyMessage, customRewardMessage, hasRewardSetup,
        setBusinessType, userData, logoUrl, visitCount, rewardVisitThreshold
    } = useCustomerFlowStore();

    const { user } = useAuthStore();
    const config = getBusinessConfig();

    const [isDownloading, setIsDownloading] = useState(false);
    const [isSyncingReal, setIsSyncingReal] = useState(false);
    const [isDeviceSynced, setIsDeviceSynced] = useState(false);

    // Form Initialization (Device-First)
    const storedIdentity = useMemo(() => {
        if (typeof window === 'undefined') return null;
        const saved = localStorage.getItem('google_identity');
        return saved ? JSON.parse(saved) : null;
    }, []);

    useEffect(() => {
        if (storedIdentity || user || userData) {
            setIsDeviceSynced(!!storedIdentity || !!userData);
        }
    }, [storedIdentity, user, userData]);

    // Google Identity SDK Integration
    const handleCredentialResponse = (response: any) => {
        try {
            setIsSyncingReal(true);
            const decoded: any = jwtDecode(response.credential);

            const identity = {
                name: decoded.name,
                email: decoded.email,
                phone: ''
            };
            localStorage.setItem('google_identity', JSON.stringify(identity));
            setIsDeviceSynced(true);
            setUserData(identity);

            setTimeout(() => {
                setIsSyncingReal(false);
                setStep('FORM');
            }, 800);
        } catch (error) {
            console.error("Google Sync Error:", error);
            setStep('FORM');
        }
    };

    // Device-First Transition Logic
    useEffect(() => {
        if (currentStep === 'SCANNING') {
            const timer = setTimeout(() => setStep('IDENTIFYING'), 800);
            return () => clearTimeout(timer);
        }

        if (currentStep === 'IDENTIFYING') {
            if ((window as any).google && (window as any).google.accounts.id) {
                (window as any).google.accounts.id.prompt();
            }

            const syncTimeout = setTimeout(() => {
                if (storedIdentity || userData) {
                    setStep('WELCOME_BACK');
                } else {
                    setStep('FORM');
                }
            }, 2000);

            return () => clearTimeout(syncTimeout);
        }
    }, [currentStep, setStep, storedIdentity, userData]);

    const onFormSubmit = (data: any) => {
        localStorage.setItem('google_identity', JSON.stringify(data));
        setUserData(data);
        setStep('OUTCOME');
    };

    const handleDownloadReward = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            setStep('FINAL_SUCCESS');
            const link = document.createElement('a');
            link.href = '#';
            link.download = `LaTap_Reward_${storeName.replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 2000);
    };

    return (
        <VisitorLayout
            onReset={resetFlow}
            onCredentialResponse={handleCredentialResponse}
        >
            <AnimatePresence mode="wait">
                {currentStep === 'SELECT_TYPE' && (
                    <StepSelectType
                        onSelect={(type) => {
                            setBusinessType(type);
                            setStep('SCANNING');
                        }}
                    />
                )}

                {currentStep === 'SCANNING' && (
                    <StepScanning storeName={storeName} />
                )}

                {currentStep === 'IDENTIFYING' && (
                    <StepIdentifying />
                )}

                {currentStep === 'FORM' && (
                    <StepForm
                        storeName={storeName}
                        logoUrl={logoUrl}
                        customWelcomeMessage={customWelcomeMessage}
                        customPrivacyMessage={customPrivacyMessage}
                        initialData={userData || storedIdentity || user}
                        isSyncingReal={isSyncingReal}
                        isDeviceSynced={isDeviceSynced}
                        onBack={() => setStep('SELECT_TYPE')}
                        onSubmit={onFormSubmit}
                    />
                )}

                {currentStep === 'WELCOME_BACK' && (
                    <StepWelcomeBack
                        storeName={storeName}
                        logoUrl={logoUrl}
                        customWelcomeMessage={customWelcomeMessage}
                        userData={userData || storedIdentity}
                        visitCount={visitCount}
                        rewardVisitThreshold={rewardVisitThreshold}
                        hasRewardSetup={hasRewardSetup}
                        onContinue={() => setStep('OUTCOME')}
                        onClear={() => {
                            localStorage.removeItem('google_identity');
                            resetFlow();
                        }}
                    />
                )}

                {currentStep === 'OUTCOME' && (
                    <StepOutcome
                        config={config}
                        customSuccessMessage={customSuccessMessage}
                        customRewardMessage={customRewardMessage}
                        hasRewardSetup={hasRewardSetup}
                        isDownloading={isDownloading}
                        onDownload={handleDownloadReward}
                        onFinish={() => setStep('FINAL_SUCCESS')}
                        onRestart={resetFlow}
                    />
                )}

                {currentStep === 'FINAL_SUCCESS' && (
                    <StepFinalSuccess
                        finalSuccessMessage={customSuccessMessage || config.finalSuccessMessage}
                        onFinish={resetFlow}
                    />
                )}
            </AnimatePresence>
        </VisitorLayout>
    );
}
