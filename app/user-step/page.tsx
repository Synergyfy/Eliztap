'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCustomerFlowStore, BusinessType } from '@/store/useCustomerFlowStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useMockDashboardStore } from '@/lib/store/mockDashboardStore';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';

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
        setBusinessType, userData, logoUrl, visitCount, rewardVisitThreshold,
        redemptionStatus, lastRedemptionId, requestRedemption, setRedemptionStatus, resetVisitCountAfterRedemption
    } = useCustomerFlowStore();

    const addRedemptionRequest = useMockDashboardStore(state => state.addRedemptionRequest);
    const redemptionRequests = useMockDashboardStore(state => state.redemptionRequests);

    const { user } = useAuthStore();
    const config = getBusinessConfig();

    // Live Sync Simulation: Listen for approvals/declines from the business dashboard
    useEffect(() => {
        if (redemptionStatus === 'pending' && lastRedemptionId) {
            const request = redemptionRequests.find(r => r.id === lastRedemptionId);
            if (request && request.status !== 'pending') {
                if (request.status === 'approved') {
                    setRedemptionStatus('approved');
                    resetVisitCountAfterRedemption(rewardVisitThreshold);
                    toast.success('Your reward has been approved! Claim it now.', { duration: 5000 });
                } else if (request.status === 'declined') {
                    setRedemptionStatus('declined');
                    toast.error('Redemption declined by staff.');
                }
            }
        }
    }, [redemptionRequests, redemptionStatus, lastRedemptionId, setRedemptionStatus, resetVisitCountAfterRedemption, rewardVisitThreshold]);

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
            link.download = `ElizTap_Reward_${storeName.replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 2000);
    };

    const handleRedeem = () => {
        if (!userData && !storedIdentity) {
            toast.error('Identity not found. Please re-identify.');
            return;
        }

        const name = userData?.name || storedIdentity?.name || 'Guest';
        const phone = userData?.phone || storedIdentity?.phone || '';

        // 1. Request in business dashboard
        addRedemptionRequest({
            visitorId: userData?.uniqueId || `V-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            visitorName: name,
            rewardTitle: customRewardMessage || "Free Reward"
        });

        // 2. Update customer state
        requestRedemption(customRewardMessage || "Free Reward");
        toast.success('Redemption request sent to staff!');
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
                        redemptionStatus={redemptionStatus}
                        onRedeem={handleRedeem}
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
