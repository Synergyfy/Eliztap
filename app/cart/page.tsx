'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'ACS ACR1252U USB NFC Reader III',
            price: 78500,
            quantity: 2,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDeoGIbe96WBYeBtXjfjKNGuMBnUKo8owrQjFCfRXn5sOY75-fKbRoAFwhnf-MmV3PkVeVDquiiZuY6hSC2RaIht4m9kVtAKVIw7mXHuG_ghUTYpvFpGST06tdjc6vjFGqvXt715ctcwE0ENV9Dio7DjJ3dENX67OM18BDAb5Y4dwga1fACWSxnXhWVyHU3E3grs8eXgG85LZvQgxuvPfrSvFw0JevUzmXXCQ7Sn0O0xJ632mfEaX42KztUAwJL-bATOO1oTXo-Csw"
        },
        {
            id: 2,
            name: 'NTAG215 PVC Cards - White',
            price: 14500,
            quantity: 5,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjOLHjEImnuX2LOtQ9_35UJ5iBVDjYgoAdUkfVCIOKlzLzNbR8jzZuXMqBzr2zm7bTB60FByuzS4DfbPxOdC-XETnsg_xSz6HydW21C7a49GAGuikH8vL51ldD0GCCYAAAWeyYjrsST43T02ixab1YBLQ0SN7FPkmwUSZjyJwz5rbAfLT4RqccxCFX1gzrKZ55WEV-TfuHqVMMxN3TpGlj_Q1xdnQblfVWikTCC9YahMk0rdT2xgoAgGPqhqumczAzvpmU-SttVIU1"
        }
    ]);

    const updateQuantity = (id: number, change: number) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 2500;
    const tax = subtotal * 0.075; // 7.5% VAT
    const total = subtotal + shipping + tax;

    return (
        <div className="flex min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-icons-outlined text-sm">nfc</span>
                        </div>
                        <span className="font-display text-lg font-bold tracking-tight">EntryConnect</span>
                    </div>
                    <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">JD</div>
                            <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">John Doe</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">Merchant Account</p>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Store Management</p>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                        <span className="material-icons-outlined text-slate-400 group-hover:text-primary">dashboard</span>
                        Dashboard
                    </Link>
                    <Link href="/solutions/hardware/marketplace" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                        <span className="material-icons-outlined text-slate-400 group-hover:text-primary">storefront</span>
                        Hardware Store
                    </Link>
                    <Link href="/cart" className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-primary/5 text-primary rounded-lg transition-colors">
                        <span className="material-icons-outlined">shopping_cart</span>
                        My Cart
                        <span className="ml-auto bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cartItems.length}</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                        <span className="material-icons-outlined text-slate-400 group-hover:text-primary">request_quote</span>
                        Quotes
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                        <span className="material-icons-outlined text-slate-400 group-hover:text-primary">local_shipping</span>
                        Orders
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button className="flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors w-full px-3 py-2">
                        <span className="material-icons-outlined">logout</span>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1 rounded text-white">
                            <span className="material-icons-outlined text-sm">nfc</span>
                        </div>
                        <span className="font-bold text-lg">EntryConnect</span>
                    </div>
                    <button className="p-2 text-slate-500">
                        <span className="material-icons-outlined">menu</span>
                    </button>
                </header>

                <div className="max-w-5xl mx-auto px-6 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Shopping Cart</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">Review your hardware selection before checkout.</p>
                        </div>
                        <Link href="/solutions/hardware/marketplace" className="text-sm font-medium text-primary hover:text-primary-hover flex items-center gap-1">
                            <span className="material-icons-outlined text-sm">arrow_back</span>
                            Continue Shopping
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-6">
                            {/* Cart Items List */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                <div className="p-6 space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 sm:gap-6 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0 first:pt-0">
                                            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                                                <img alt={item.name} className="max-w-full max-h-full object-contain" src={item.image} />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">{item.name}</h3>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">Unit Price: ₦{item.price.toLocaleString()}</p>
                                                    </div>
                                                    <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                                        <span className="material-icons-outlined">close</span>
                                                    </button>
                                                </div>
                                                <div className="flex justify-between items-end mt-4">
                                                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg h-9 bg-slate-50 dark:bg-slate-800">
                                                        <button onClick={() => updateQuantity(item.id, -1)} className="px-3 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-lg text-slate-500">-</button>
                                                        <span className="px-2 text-sm font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)} className="px-3 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-lg text-slate-500">+</button>
                                                    </div>
                                                    <p className="font-bold text-lg text-slate-900 dark:text-white">₦{(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {cartItems.length === 0 && (
                                        <div className="text-center py-12">
                                            <span className="material-icons-outlined text-4xl text-slate-300 mb-4">shopping_cart_off</span>
                                            <p className="text-slate-500 font-medium">Your cart is empty.</p>
                                            <Link href="/solutions/hardware/marketplace" className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-bold">
                                                Start Shopping
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Upsell / Related */}
                            <div>
                                <h3 className="font-bold text-lg mb-4">Customers also bought</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
                                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                            <span className="material-icons-outlined text-slate-400">cable</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm group-hover:text-primary transition-colors">USB Extension Cable</h4>
                                            <p className="text-xs text-slate-500">2 Meters • High Speed</p>
                                            <div className="flex items-center justify-between mt-1 w-full gap-4">
                                                <span className="font-bold text-sm">₦3,500</span>
                                                <button className="text-primary text-xs font-bold hover:underline">+ Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
                                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                            <span className="material-icons-outlined text-slate-400">cleaning_services</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm group-hover:text-primary transition-colors">Cleaning Kit</h4>
                                            <p className="text-xs text-slate-500">For Card Readers</p>
                                            <div className="flex items-center justify-between mt-1 w-full gap-4">
                                                <span className="font-bold text-sm">₦5,000</span>
                                                <button className="text-primary text-xs font-bold hover:underline">+ Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="col-span-12 lg:col-span-4 lg:col-start-9 md:col-start-1">
                            <div className="sticky top-8">
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none">
                                    <h3 className="font-display font-bold text-xl mb-6">Order Summary</h3>
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                            <span>Subtotal</span>
                                            <span className="font-medium text-slate-900 dark:text-white">₦{subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                            <span>Shipping</span>
                                            <span className="font-medium text-slate-900 dark:text-white">₦{shipping.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                            <span>Tax (7.5%)</span>
                                            <span className="font-medium text-slate-900 dark:text-white">₦{tax.toLocaleString()}</span>
                                        </div>
                                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                            <span className="font-bold text-lg text-slate-900 dark:text-white">Total</span>
                                            <div className="text-right">
                                                <span className="block font-bold text-2xl text-primary">₦{total.toLocaleString()}</span>
                                                <span className="text-[10px] text-slate-400">NGN Currency</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/checkout" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-95">
                                        Proceed to Checkout
                                        <span className="material-icons-outlined text-sm">arrow_forward</span>
                                    </Link>
                                    <div className="mt-6 flex items-center justify-center gap-4 text-slate-400 grayscale opacity-60">
                                        {/* Payment provider icons placeholders */}
                                        <span className="material-icons-outlined">credit_card</span>
                                        <span className="material-icons-outlined">account_balance</span>
                                        <span className="material-icons-outlined">lock</span>
                                    </div>
                                    <p className="mt-4 text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                                        <span className="material-icons-outlined text-xs">verified_user</span>
                                        Secure Encrypted Checkout
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
