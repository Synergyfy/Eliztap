'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { notify } from '@/lib/notify';

export default function CustomerLoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate customer login
        // In reality, this would use the same auth store or a specific customer auth endpoint
        // For mock purposes, we'll accept any credentials but prioritize the demo one
        await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay

        if (formData.email === 'customer@latap.com' && formData.password === 'customer123') {
            // We can hack the login store to set a customer user
            useAuthStore.setState({
                user: { id: 'cust_1', name: 'Daniel Customer', email: 'customer@latap.com', role: 'customer' },
                isAuthenticated: true
            });
            notify.success('Welcome back, Daniel!');
            router.push('/customer/dashboard');
        } else {
            notify.error('Invalid credentials. Try the demo account.');
        }

        setIsLoading(false);
    };

    const fillDemoCredentials = () => {
        setFormData({
            email: 'customer@latap.com',
            password: 'customer123',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white max-w-sm w-full rounded-3xl shadow-xl overflow-hidden"
            >
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="material-icons-round text-primary text-3xl">nfc</span>
                        </div>
                        <h1 className="text-2xl font-display font-bold text-text-main mb-1">Customer Portal</h1>
                        <p className="text-sm text-text-secondary">Track your visits and redeem rewards</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-text-secondary ml-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-text-secondary ml-1">Password</label>
                            <input
                                type="password"
                                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold text-text-secondary pt-2">
                            <button type="button" onClick={fillDemoCredentials} className="text-primary hover:underline">
                                Use Demo Account
                            </button>
                            <Link href="/forgot-password" className="hover:text-text-main">Forgot Password?</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2 mt-2"
                        >
                            {isLoading ? (
                                <span className="material-icons-round animate-spin text-lg">refresh</span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                    <p className="text-xs font-bold text-text-secondary">
                        Don't have an account? <Link href="/get-started" className="text-primary hover:underline">Get Started</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
