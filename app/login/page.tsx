'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AuthSidePanel from '@/components/auth/AuthSidePanel';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            // Get user to determine redirect
            const user = useAuthStore.getState().user;
            if (user?.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/dashboard');
            }
        } else {
            setError(result.error || 'Login failed');
        }

        setIsLoading(false);
    };

    const fillDemoCredentials = (type: 'business' | 'admin') => {
        if (type === 'business') {
            setFormData({
                email: 'business@latap.com',
                password: 'business123',
                rememberMe: false
            });
        } else {
            setFormData({
                email: 'admin@latap.com',
                password: 'admin123',
                rememberMe: false
            });
        }
    };

    return (
        <div className="h-screen bg-white flex overflow-hidden font-sans">
            {/* Left Side: Login Form */}
            <div className="w-full lg:w-[60%] flex flex-col overflow-y-auto">
                <div className="p-8 md:p-16 lg:p-24">
                    <Link href="/" className="flex items-center gap-2 mb-24">
                        <span className="material-icons-round text-primary text-2xl">nfc</span>
                        <span className="font-display font-semibold text-xl tracking-tight text-text-main">LaTap</span>
                    </Link>

                    <div className="max-w-md w-full mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div>
                                <h1 className="text-3xl font-display font-bold text-text-main mb-3 leading-tight tracking-tight">Welcome back</h1>
                                <p className="text-sm text-text-secondary font-medium leading-relaxed">Login to manage your business and check your customer data.</p>
                            </div>

                            {/* Demo Credentials */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <p className="text-xs font-bold text-blue-900 mb-3 uppercase tracking-wider flex items-center gap-2">
                                    <span className="material-icons-round text-sm">info</span>
                                    Demo Accounts - Click to Login
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            setFormData({
                                                email: 'business@latap.com',
                                                password: 'business123',
                                                rememberMe: false
                                            });
                                            setError('');
                                            setIsLoading(true);
                                            const result = await login('business@latap.com', 'business123');
                                            if (result.success) {
                                                router.push('/dashboard');
                                            } else {
                                                setError(result.error || 'Login failed');
                                            }
                                            setIsLoading(false);
                                        }}
                                        disabled={isLoading}
                                        className="flex-1 px-3 py-3 bg-white border border-blue-200 rounded-lg text-xs font-bold text-blue-700 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <span className="material-icons-round text-base">store</span>
                                        <span>Business Owner</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            setFormData({
                                                email: 'admin@latap.com',
                                                password: 'admin123',
                                                rememberMe: false
                                            });
                                            setError('');
                                            setIsLoading(true);
                                            const result = await login('admin@latap.com', 'admin123');
                                            if (result.success) {
                                                router.push('/admin/dashboard');
                                            } else {
                                                setError(result.error || 'Login failed');
                                            }
                                            setIsLoading(false);
                                        }}
                                        disabled={isLoading}
                                        className="flex-1 px-3 py-3 bg-white border border-blue-200 rounded-lg text-xs font-bold text-blue-700 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <span className="material-icons-round text-base">admin_panel_settings</span>
                                        <span>Admin</span>
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                                        <span className="material-icons-round text-red-600">error</span>
                                        <p className="text-sm font-medium text-red-900">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Email</label>
                                    <div className="relative">
                                        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">mail</span>
                                        <input
                                            type="email"
                                            placeholder="name@company.com"
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Password</label>
                                        <Link href="/forgot-password" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot password?</Link>
                                    </div>
                                    <div className="relative">
                                        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">lock</span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-12 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                        >
                                            <span className="material-icons-round text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="size-4 accent-primary rounded"
                                        checked={formData.rememberMe}
                                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                    />
                                    <label htmlFor="remember" className="text-[11px] font-medium text-text-secondary">Keep me signed in for 30 days</label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2 text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="material-icons-round animate-spin">refresh</span>
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <span className="material-icons-round text-lg">login</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        <p className="text-[10px] text-center lg:text-left text-text-secondary font-bold uppercase tracking-widest mt-12">
                            New to LaTap? <Link href="/get-started" className="text-primary hover:underline">Create an account</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side: Shared Mockup Image */}
            <div className="hidden lg:block lg:w-[40%] relative overflow-hidden h-screen">
                <AuthSidePanel
                    features={[
                        {
                            title: "Monitor your business in real-time.",
                            description: "Track customer visits, peak hours, and loyalty growth instantly from your dashboard.",
                            icon: "analytics"
                        },
                        {
                            title: "Connect with every tap.",
                            description: "Turn anonymous footfall into loyal customers with our seamless NFC technology.",
                            icon: "nfc"
                        }
                    ]}
                />
            </div>
        </div>
    );
}
