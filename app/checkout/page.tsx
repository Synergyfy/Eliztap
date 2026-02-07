'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
    const [step, setStep] = useState('shipping'); // shipping, payment, confirm

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100">
            {/* Minimal Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg text-white">
                            <span className="material-icons-outlined text-sm">nfc</span>
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight">EntryConnect</span>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <span className="material-icons-outlined text-lg text-slate-400">lock</span>
                        Secure Checkout
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Form Steps */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Progress Indicator */}
                        <div className="flex items-center justify-between mb-8">
                            <div className={`flex flex-col items-center gap-2 ${step === 'shipping' ? 'text-primary' : 'text-slate-400'}`}>
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${step === 'shipping' ? 'border-primary bg-primary/10' : 'border-slate-300'}`}>1</div>
                                <span className="text-xs font-semibold uppercase tracking-wider">Shipping</span>
                            </div>
                            <div className="flex-1 h-0.5 bg-slate-200 mx-4"></div>
                            <div className={`flex flex-col items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-slate-400'}`}>
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${step === 'payment' ? 'border-primary bg-primary/10' : 'border-slate-300'}`}>2</div>
                                <span className="text-xs font-semibold uppercase tracking-wider">Payment</span>
                            </div>
                            <div className="flex-1 h-0.5 bg-slate-200 mx-4"></div>
                            <div className={`flex flex-col items-center gap-2 ${step === 'confirm' ? 'text-primary' : 'text-slate-400'}`}>
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${step === 'confirm' ? 'border-primary bg-primary/10' : 'border-slate-300'}`}>3</div>
                                <span className="text-xs font-semibold uppercase tracking-wider">Confirm</span>
                            </div>
                        </div>

                        {/* Shipping Form */}
                        {step === 'shipping' && (
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-icons-outlined text-primary">local_shipping</span>
                                    Shipping Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                                        <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:bg-slate-900" placeholder="John Doe" type="text" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                                        <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:bg-slate-900" placeholder="john@company.com" type="email" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Street Address</label>
                                        <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:bg-slate-900" placeholder="123 Business Way, Suit 400" type="text" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">City</label>
                                        <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:bg-slate-900" placeholder="Lagos" type="text" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">State / Province</label>
                                        <select className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:bg-slate-900 text-slate-500">
                                            <option>Lagos State</option>
                                            <option>Abuja FCT</option>
                                            <option>Rivers State</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 flex items-center gap-3 mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 text-sm">
                                        <span className="material-icons-outlined">info</span>
                                        International shipping takes 5-7 business days via DHL Express.
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={() => setStep('payment')} className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                                        Continue to Payment
                                        <span className="material-icons-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Payment Form */}
                        {step === 'payment' && (
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-right-8 duration-500">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-icons-outlined text-primary">credit_card</span>
                                    Payment Method
                                </h2>
                                <div className="space-y-4 mb-8">
                                    <div className="border border-primary bg-primary/5 p-4 rounded-xl flex items-center justify-between cursor-pointer ring-1 ring-primary transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full border-4 border-primary bg-white"></div>
                                            <span className="font-semibold text-slate-900 dark:text-white">Credit / Debit Card</span>
                                        </div>
                                        <div className="flex gap-2 opacity-70">
                                            <span className="material-icons-outlined text-slate-500">payment</span>
                                        </div>
                                    </div>
                                    <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                            <span className="font-semibold text-slate-700 dark:text-slate-300">Bank Transfer</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Card Number</label>
                                        <div className="relative">
                                            <input className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:bg-slate-900 font-mono" placeholder="0000 0000 0000 0000" type="text" />
                                            <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">credit_card</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Expiry Date</label>
                                            <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:bg-slate-900 font-mono" placeholder="MM / YY" type="text" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">CVC / CWW</label>
                                            <div className="relative">
                                                <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:bg-slate-900 font-mono" placeholder="123" type="text" />
                                                <span className="material-icons-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm cursor-help">help_outline</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center text-xs text-slate-400 mt-4">
                                        <span className="material-icons-outlined text-xs align-middle mr-1">lock</span>
                                        Payments are processed securely by Paystack/Flutterwave. We do not store your full card details.
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-between items-center">
                                    <button onClick={() => setStep('shipping')} className="text-slate-500 font-medium hover:text-slate-700 transition-colors flex items-center gap-1">
                                        <span className="material-icons-outlined text-sm">arrow_back</span>
                                        Back to Shipping
                                    </button>
                                    <button onClick={() => setStep('confirm')} className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                                        Review Order
                                        <span className="material-icons-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Confirmation Mockup */}
                        {step === 'confirm' && (
                            <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center animate-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="material-icons-outlined text-5xl">check_circle</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
                                <p className="text-slate-500 max-w-md mx-auto mb-8">Thank you for your purchase. We have sent a confirmation email to <strong>john@company.com</strong> with your tracking number.</p>
                                <div className="flex justify-center gap-4">
                                    <Link href="/dashboard" className="px-6 py-3 border border-slate-200 rounded-lg text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                                        Go to Dashboard
                                    </Link>
                                    <Link href="/solutions/hardware/marketplace" className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
                            <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                                <h3 className="font-bold text-lg">Order Summary</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Mock Cart Items for Checkout Display */}
                                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {[
                                        { name: 'ACS ACR1252U USB NFC Reader III', price: 78500, qty: 2, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDeoGIbe96WBYeBtXjfjKNGuMBnUKo8owrQjFCfRXn5sOY75-fKbRoAFwhnf-MmV3PkVeVDquiiZuY6hSC2RaIht4m9kVtAKVIw7mXHuG_ghUTYpvFpGST06tdjc6vjFGqvXt715ctcwE0ENV9Dio7DjJ3dENX67OM18BDAb5Y4dwga1fACWSxnXhWVyHU3E3grs8eXgG85LZvQgxuvPfrSvFw0JevUzmXXCQ7Sn0O0xJ632mfEaX42KztUAwJL-bATOO1oTXo-Csw" },
                                        { name: 'NTAG215 PVC Cards - White', price: 14500, qty: 5, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjOLHjEImnuX2LOtQ9_35UJ5iBVDjYgoAdUkfVCIOKlzLzNbR8jzZuXMqBzr2zm7bTB60FByuzS4DfbPxOdC-XETnsg_xSz6HydW21C7a49GAGuikH8vL51ldD0GCCYAAAWeyYjrsST43T02ixab1YBLQ0SN7FPkmwUSZjyJwz5rbAfLT4RqccxCFX1gzrKZ55WEV-TfuHqVMMxN3TpGlj_Q1xdnQblfVWikTCC9YahMk0rdT2xgoAgGPqhqumczAzvpmU-SttVIU1" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-16 h-16 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center p-1.5">
                                                <img src={item.img} alt={item.name} className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold text-slate-800 dark:text-white line-clamp-2">{item.name}</h4>
                                                <div className="flex justify-between items-center mt-1">
                                                    <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">₦{(item.price * item.qty).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
                                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                        <span>Subtotal</span>
                                        <span>₦229,500</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                        <span>Shipping</span>
                                        <span>₦2,500</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                        <span>Tax (7.5%)</span>
                                        <span>₦17,212</span>
                                    </div>
                                    <div className="flex justify-between items-center text-lg font-bold text-slate-900 dark:text-white pt-2">
                                        <span>Total to Pay</span>
                                        <span className="text-primary">₦249,212</span>
                                    </div>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400">
                                    <span className="material-icons-outlined text-slate-400 mt-0.5">verified</span>
                                    <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
