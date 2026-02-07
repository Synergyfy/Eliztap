'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MarketplacePage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [priceRange, setPriceRange] = useState([0, 500000]); // Naira
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<any>(null);

    // Mock Data based on the user's request
    const products = [
        {
            id: 'acs-acr1552u',
            name: 'ACS ACR1552U USB-C NFC Reader IV',
            brand: 'ACS',
            rating: 4.9,
            price: 124999,
            originalPrice: 149000,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6J_11qPV0OmQwFJoKJtTMpD_qjs1SsBP9UsQg0ecJWY2IONWb79e03v7EMbPHEBzTJtdwTiWa4uHBlwQpbnU0EI9XkmDEOrQF_F57RfXBMpzCz3WITiymIK5fKWEIyOxSSyurDKwi32cxVO-m90-snIAYuoCD8Yr181lIcfNaCRwZr0bXXLyxdrvlnrxIO6jof5lw-BXhuVlPaRUFxFKCg5okpbY0Vrtjw1r2KKRGWGcmaZz_OUHZQ7qJnz8J7LCbuEvtvZWaxQWL",
            desc: 'Dual-interface Smart Card Reader with CCID Support',
            tag: 'In Stock',
            tagColor: 'bg-emerald-500',
            action: 'cart'
        },
        {
            id: 'omnikey-5422',
            name: 'OMNIKEY 5422 Dual Interface Reader',
            brand: 'HID Global',
            rating: 4.8,
            price: 189000,
            originalPrice: null,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA13i7tJ7UvtV5AeSpw3wOHaYE8eOSOAHsJtyf9B8QtVXaQpAPS3C7Teyqjev3z6_-2UBAUUsl9_wQrPFQB4dsL21qcM803GIIhce48iGdAgKXjYlhpJBNo1PKjrd-FnkGqZzA9IKKpAIcee1B396E-WCSuonb2_wSUSBjZpX_9OT6hB2FsxRZYweRceLiA9MfmDMM0f3rXJHKAq-TzdbZ2XPvvKlIxen5gbQNQZlFxGq791xkCofDQmiLKdWXKTXx5bV39FHTL2Zxu",
            desc: 'Contactless 13.56 MHz and Contact Smart Card',
            tag: 'Bulk Choice',
            tagColor: 'bg-blue-500',
            action: 'quote'
        },
        {
            id: 'sdk-bundle',
            name: 'Universal NFC Developer SDK',
            brand: 'EntryConnect',
            rating: 5.0,
            price: 499000,
            originalPrice: null,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9fUTe24WCXHHYE4D4j0PVwg79HTdwdPmXG64DA9YOPJgE3IueN-3HHmLPcpgz0mA8Zv-HKS9rL6Wkpp0FRhDePtzWdJ8_vVpFbqT8grR6SyWyuQJlAYEZMHdIjcJAkZASE4iH8WHSJS0bqM0mvzNzPuctGZfYF0QsdbMOcQ6NuiCqpWrfcnaU-XlodX_ZGJcMfXXdD-uW2yjKMdzwsrPxqDjvTp8eIYbZWNSV2IIKpeWykSDBLl3dNFlzK8D46MQVO4EpHHXmsIsE",
            desc: 'Python, C++, Java & WebHID API wrappers',
            tag: 'Software',
            tagColor: 'bg-indigo-500',
            action: 'download'
        },
        {
            id: 'ntag215-pack',
            name: 'NTAG215 PVC Smart Cards (Pack of 100)',
            brand: 'NXP',
            rating: 4.7,
            price: 85500,
            originalPrice: null,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjOLHjEImnuX2LOtQ9_35UJ5iBVDjYgoAdUkfVCIOKlzLzNbR8jzZuXMqBzr2zm7bTB60FByuzS4DfbPxOdC-XETnsg_xSz6HydW21C7a49GAGuikH8vL51ldD0GCCYAAAWeyYjrsST43T02ixab1YBLQ0SN7FPkmwUSZjyJwz5rbAfLT4RqccxCFX1gzrKZ55WEV-TfuHqVMMxN3TpGlj_Q1xdnQblfVWikTCC9YahMk0rdT2xgoAgGPqhqumczAzvpmU-SttVIU1",
            desc: '504 Bytes Memory, Compatible with Amiibo',
            tag: 'Multipack',
            tagColor: 'bg-amber-500',
            action: 'cart'
        }
    ];

    const openQuoteModal = (product: any) => {
        setSelectedQuoteProduct(product);
        setIsQuoteModalOpen(true);
    };

    const handleQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsQuoteModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200 font-sans relative">

            {/* Quote Form Modal */}
            {isQuoteModalOpen && selectedQuoteProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsQuoteModalOpen(false)}></div>
                    <div className="relative w-full max-w-2xl asymmetric-frame glass-morphism shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 md:p-12">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-3xl font-display font-bold blue-text-gradient">Request a Bulk Quote</h2>
                                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Professional enterprise pricing for large volume hardware orders.</p>
                                </div>
                                <button onClick={() => setIsQuoteModalOpen(false)} className="p-2 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-full transition-colors">
                                    <span className="material-icons-outlined text-slate-500">close</span>
                                </button>
                            </div>
                            <form className="space-y-6" onSubmit={handleQuoteSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-full">
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Selected Product</label>
                                        <div className="w-full px-4 py-3 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-medium cursor-not-allowed">
                                            {selectedQuoteProduct.name}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Estimated Quantity</label>
                                        <input className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-400" placeholder="e.g. 500+" type="number" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Timeline</label>
                                        <select className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all">
                                            <option value="">Select urgency</option>
                                            <option value="immediate">Immediate</option>
                                            <option value="1-3-months">1-3 Months</option>
                                            <option value="researching">Just Researching</option>
                                        </select>
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Additional Requirements</label>
                                        <textarea className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none placeholder:text-slate-400" placeholder="Mention any specific customization, shipping needs, or technical requirements..." rows={4}></textarea>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <span className="material-icons-outlined text-sm">verified_user</span>
                                        <span>Direct manufacturer pricing guaranteed</span>
                                    </div>
                                    <button className="px-8 py-3 bg-primary hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]" type="submit">
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {isSuccessModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsSuccessModalOpen(false)}></div>
                    <div className="relative w-full max-w-xl asymmetric-frame glass-morphism shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 md:p-12 text-center">
                            <button onClick={() => setIsSuccessModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-full transition-colors">
                                <span className="material-icons-outlined text-slate-500">close</span>
                            </button>
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 mb-8 relative flex items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 border-4 border-emerald-500/20">
                                    <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                                        <path className="animate-check" d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                                <h2 className="text-4xl font-display font-bold blue-text-gradient mb-4">Quote Request Sent!</h2>
                                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-md mx-auto mb-6">
                                    Thank you for your interest. A specialist from our hardware team will reach out with your custom pricing within 24 hours.
                                </p>
                                <div className="inline-flex items-center px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mb-10">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Request ID: #EC-99214</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
                                    <button onClick={() => setIsSuccessModalOpen(false)} className="w-full sm:flex-1 px-8 py-3.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]">
                                        Back to Marketplace
                                    </button>
                                    <button className="w-full sm:flex-1 px-8 py-3.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                        View Quote Status
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Header for Marketplace */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                            <span className="material-icons-outlined">nfc</span>
                        </div>
                        <span className="font-display text-xl font-bold tracking-tight">EntryConnect</span>
                    </div>
                    <div className="flex-1 max-w-2xl relative hidden md:block">
                        <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 transition-all outline-none" placeholder="Search NFC Readers, Tags, SDKs..." type="text" />
                    </div>
                    <nav className="flex items-center gap-6">
                        <Link href="/solutions" className="text-sm font-medium hover:text-primary transition-colors hidden lg:block">Solutions</Link>
                        <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors hidden lg:block">Documentation</Link>
                        <Link href="/cart" className="p-2 relative hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-icons-outlined text-slate-600 dark:text-slate-400">shopping_cart</span>
                            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-[10px] text-white rounded-full flex items-center justify-center font-bold">3</span>
                        </Link>
                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 hidden lg:block"></div>
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                            <img alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr-fLkrQlQ9bDPuSYITKd2hKD5eJgRBDCEULJxDswMwxtukmrIcrh3O2AuEGwi6MbIS6y81L1L9Wn_yySwTKtIwTIA5pNNg-HiHqlUgfoQpCaPLXYl58vOul4ZMcZ4jgnj-PV4zueqHgXA9rd-myuENkljifAvQvIKG6fQB2aif-DqaNCZjvHy69dUjwB5vSB3vvT7YMYYTYoy9Wto-fHSjERC8pEGsNJCvmVGJoWHv9-O7V69ZswvnUW9AzqB57IOcFtCdYvvuF3x" />
                        </div>
                    </nav>
                </div>
            </header>

            {/* Sub-nav Category Strip */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40">
                <div className="max-w-[1440px] mx-auto px-6 h-12 flex items-center gap-8 overflow-x-auto no-scrollbar">
                    <button className="flex items-center gap-2 text-sm font-semibold text-primary border-b-2 border-primary h-full px-1">
                        <span className="material-icons-outlined text-sm">grid_view</span> All Products
                    </button>
                    {['NFC Readers', 'Smart Cards', 'NFC Tags & Labels', 'Development Kits', 'Mobile NFC'].map((cat) => (
                        <a key={cat} href="#" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary whitespace-nowrap transition-colors">{cat}</a>
                    ))}
                    <div className="ml-auto flex items-center gap-4 hidden md:flex">
                        <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Wholesale Support</span>
                        <a className="text-sm font-semibold text-primary" href="#">Sell on EntryConnect</a>
                    </div>
                </div>
            </div>

            <main className="max-w-[1440px] mx-auto px-6 py-8 flex gap-8">
                {/* Sidebar Filters */}
                <aside className="w-64 shrink-0 hidden md:block">
                    <div className="sticky top-32 space-y-8">
                        <div>
                            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="material-icons-outlined text-slate-400">filter_list</span> Filter
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Hardware Type</label>
                                    <div className="space-y-2">
                                        {['NFC Readers', 'USB Encoders', 'NFC/RFID Tags'].map((type, i) => (
                                            <label key={i} className="flex items-center gap-2 cursor-pointer group">
                                                <input defaultChecked={i === 0} className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Price Range (₦)</label>
                                    <div className="flex items-center gap-2">
                                        <input className="w-full text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 outline-none" placeholder="Min" type="number" />
                                        <span className="text-slate-400">-</span>
                                        <input className="w-full text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 outline-none" placeholder="Max" type="number" />
                                    </div>
                                    <div className="mt-4">
                                        <input className="w-full accent-primary" type="range" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Connection Interface</label>
                                    <div className="space-y-2">
                                        {['USB-A', 'USB-C', 'Bluetooth / Wireless', 'Serial / RS232'].map((type, i) => (
                                            <label key={i} className="flex items-center gap-2 cursor-pointer group">
                                                <input className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Brands</label>
                                    <div className="space-y-2">
                                        {['ACS', 'HID Global', 'Identiv', 'Socket Mobile', 'EntryConnect Generic'].map((brand, i) => (
                                            <label key={i} className="flex items-center gap-2 cursor-pointer group">
                                                <input className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-8 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <nav className="flex text-xs text-slate-400 mb-2 gap-1">
                                <Link href="#" className="hover:text-primary">Marketplace</Link>
                                <span>/</span>
                                <span className="text-slate-600 dark:text-slate-300">NFC Hardware</span>
                            </nav>
                            <h1 className="text-2xl font-display font-bold">Hardware Results <span className="text-slate-400 font-normal text-lg ml-2">({products.length} items)</span></h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-500 whitespace-nowrap">Sort by:</span>
                            <select className="text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-primary focus:ring-1 cursor-pointer">
                                <option>Most Popular</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest Arrivals</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                            USB Readers <button className="material-icons-outlined text-xs hover:text-primary-hover">close</button>
                        </span>
                        <button className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors">Clear All</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
                                <div className="relative aspect-square bg-slate-50 dark:bg-slate-800 p-8 flex items-center justify-center overflow-hidden">
                                    {/* Product Image Link */}
                                    <Link href={`/solutions/hardware/marketplace/product/${product.id}`} className="block w-full h-full">
                                        <img
                                            alt={product.name}
                                            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            src={product.image}
                                        />
                                    </Link>
                                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                                        <span className={`${product.tagColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}>{product.tag}</span>
                                    </div>
                                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 dark:bg-slate-700/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary z-10">
                                        <span className="material-icons-outlined text-lg">favorite_border</span>
                                    </button>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.brand}</span>
                                        <div className="flex items-center text-amber-400">
                                            <span className="material-icons-outlined text-xs">star</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">{product.rating}</span>
                                        </div>
                                    </div>
                                    <Link href={`/solutions/hardware/marketplace/product/${product.id}`} className="font-display font-semibold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors line-clamp-2 cursor-pointer">
                                        {product.name}
                                    </Link>
                                    <p className="text-xs text-slate-400 mb-4">{product.desc}</p>
                                    <div className="mt-auto flex items-end justify-between">
                                        <div>
                                            <span className="text-2xl font-display font-bold">₦{product.price.toLocaleString()}</span>
                                            {product.originalPrice && (
                                                <span className="block text-[10px] text-slate-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
                                            )}
                                        </div>
                                        {/* Action Button: Cart, Quote, or Download */}
                                        {product.action === 'quote' ? (
                                            <button
                                                onClick={() => openQuoteModal(product)}
                                                className="px-4 h-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-bold"
                                            >
                                                Get Quote
                                            </button>
                                        ) : product.action === 'download' ? (
                                            <button className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                                <span className="material-icons-outlined">file_download</span>
                                            </button>
                                        ) : (
                                            <button className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                                <span className="material-icons-outlined">shopping_cart</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-2">
                        <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-icons-outlined text-sm">chevron_left</span>
                        </button>
                        <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white font-bold text-sm">1</button>
                        <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium text-sm">2</button>
                        <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium text-sm text-slate-400">...</button>
                        <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-icons-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 py-12">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                    <span className="material-icons-outlined text-sm">nfc</span>
                                </div>
                                <span className="font-display text-lg font-bold">EntryConnect</span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                Leading global marketplace for professional NFC hardware, smart cards, and enterprise access solutions.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-sm">Shop</h4>
                            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">All Collections</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Featured Devices</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Enterprise Sales</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Discounts</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-sm">Support</h4>
                            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">Shipping & Delivery</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Returns Policy</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Hardware Warranty</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-sm">Resources</h4>
                            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">API Documentation</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">SDK Downloads</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Affiliate Program</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-400">© 2024 EntryConnect Marketplace. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a className="text-xs text-slate-400 hover:text-primary" href="#">Privacy Policy</a>
                            <a className="text-xs text-slate-400 hover:text-primary" href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
