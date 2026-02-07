'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('specs');

    // In a real app, fetch data based on params.id
    // Mock Data
    const product = {
        id: 'acs-acr1552u',
        name: 'ACS ACR1552U NFC USB Reader',
        sku: 'ACS-1552U-G1',
        inStock: true,
        price: 78500, // per unit for 1-10
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDDeoGIbe96WBYeBtXjfjKNGuMBnUKo8owrQjFCfRXn5sOY75-fKbRoAFwhnf-MmV3PkVeVDquiiZuY6hSC2RaIht4m9kVtAKVIw7mXHuG_ghUTYpvFpGST06tdjc6vjFGqvXt715ctcwE0ENV9Dio7DjJ3dENX67OM18BDAb5Y4dwga1fACWSxnXhWVyHU3E3grs8eXgG85LZvQgxuvPfrSvFw0JevUzmXXCQ7Sn0O0xJ632mfEaX42KztUAwJL-bATOO1oTXo-Csw",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuClhb2SNUDTfTv_zqsIT6XNhSrFl_P1wPF0EmYibzGxElOj4IgBYOUkJWFGq-F-0dyckxS6st9qGO5rZqykoVDHudTBFrThBQPEiqC7aB8Y2GSNZgUxlXk4lkp1w8-m2P9LaQUK9zfVzvsY-XX4Z90lhhB-PvdYihC-Cuqp1oAzenNBOuFX6Fyvv19QZNuEC0zUNbqVANsmiYXiiSnxbDZB5UmHnIO5I7HlC7CXfBoMvtQTvy4a75KJWL5_2Q-5vvo9UEjZijj6WAoB",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDLq0oL8TeUy14bdgcWDQ6hThA_wxvKcrGnCrIZhGwRH0hHyjUOFsx8FCYIYcwwDduc-P3Lb2JDj6O-WvGuIynJltqFgDnvQt6mOp_CnzsRlTy5eCw9iWqA-FZ0uj5K06GJ8-57615mEGq_l9NmKvsvWYSvgXGcdmG68SEObxbP4LmQRbhGkKyDDpqu6QFhvPBEQmBE6nvrxHGXNSLYRSwh1Zwe8V_ft_CSl_GmMDAlwUwt9dhJQoPN8b-P_CwlBGTl17VP9MECHr5U",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDdB2rQ9j86VQqP-WApDQLRBt94FUGSaJgk8XIZFsDyLoXjqaHg2Ykh4Qt0Q67XQHF74WRN27Ns69IiKxzL6NnNeKgdpFqUDciXY6Q9YjLsm2kIGDZoWNS_JGCr-QiFXAkXHAbtGLvXhPdNEDm5SyIUxNpn_kN6D8MdmI3TEBegFcbNr5qUyqBJnlG4GDyYvDFjG-EIaIru5MwelRsZ6QiyKpTCm1TBHi3zswKvaL22J3BA4jG99yd1SEBxE4Q0okjHBaf1hWLVxEyr"
        ]
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Simple Header Reused */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary p-1.5 rounded-lg text-white">
                                <span className="material-icons-outlined block">nfc</span>
                            </div>
                            <Link href="/solutions/hardware/marketplace" className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">EntryConnect</Link>
                        </div>
                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                    <span className="material-icons-outlined text-sm">search</span>
                                </span>
                                <input className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md leading-5 bg-slate-50 dark:bg-slate-800 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm" placeholder="Search hardware, SDKs..." type="text" />
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <Link href="/cart" className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                                <span className="material-icons-outlined">shopping_cart</span>
                            </Link>
                            <Link href="#" className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                                <span className="material-icons-outlined">person_outline</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <nav className="flex mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <Link href="/solutions/hardware/marketplace" className="hover:text-primary">Hardware</Link>
                    <span className="mx-2 material-icons-outlined text-xs self-center">chevron_right</span>
                    <a href="#" className="hover:text-primary">NFC Readers</a>
                    <span className="mx-2 material-icons-outlined text-xs self-center">chevron_right</span>
                    <span className="text-slate-900 dark:text-slate-100">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-4">
                        <div className="aspect-square bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center p-12">
                            <img alt={product.name} className="max-w-full h-auto rounded-lg" src={product.images[0]} />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, i) => (
                                <button key={i} className={`aspect-square rounded-xl border-2 ${i === 0 ? 'border-primary' : 'border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100'} overflow-hidden bg-white dark:bg-slate-800 transition-opacity`}>
                                    <img alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" src={img} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-4">
                                In Stock
                            </span>
                            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{product.name}</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">SKU: {product.sku}</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Tiered Pricing</h3>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold">Quantity</th>
                                            <th className="px-6 py-3 font-semibold text-right">Unit Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                        <tr>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">1 - 10 Units</td>
                                            <td className="px-6 py-4 font-bold text-right text-slate-900 dark:text-white">₦78,500</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">11 - 100 Units</td>
                                            <td className="px-6 py-4 font-bold text-right text-slate-900 dark:text-white">₦65,000</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">101 - 500 Units</td>
                                            <td className="px-6 py-4 font-bold text-right text-slate-900 dark:text-white">₦58,200</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">500+ Units</td>
                                            <td className="px-6 py-4 font-bold text-right text-primary">Request Quote</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg h-12 bg-white dark:bg-slate-800">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-l-lg">-</button>
                                    <input className="w-12 text-center bg-transparent border-none focus:ring-0 text-sm font-semibold" type="number" readOnly value={quantity} />
                                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-r-lg">+</button>
                                </div>
                                <button className="flex-1 bg-primary hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2">
                                    <span className="material-icons-outlined">shopping_cart</span>
                                    Add to Cart
                                </button>
                            </div>
                            <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all">
                                Request Bulk Quote
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined text-sm">local_shipping</span>
                                Ships in 24-48 Hours
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined text-sm">verified</span>
                                Genuine Product
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <div className="border-b border-slate-200 dark:border-slate-800 mb-8">
                            <nav className="flex space-x-8">
                                <button
                                    onClick={() => setActiveTab('specs')}
                                    className={`px-1 py-4 text-sm font-semibold flex items-center gap-2 border-b-2 ${activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                    Specifications
                                </button>
                                <button
                                    onClick={() => setActiveTab('downloads')}
                                    className={`px-1 py-4 text-sm font-medium flex items-center gap-2 border-b-2 ${activeTab === 'downloads' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                    Downloads <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-[10px]">3</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`px-1 py-4 text-sm font-medium flex items-center gap-2 border-b-2 ${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                    Details
                                </button>
                            </nav>
                        </div>

                        {activeTab === 'specs' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Technical Specifications</h3>
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 w-1/3">Interface</td>
                                                <td className="px-6 py-4 text-slate-900 dark:text-slate-100">USB 2.0 Full Speed (Type A)</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">Operating Distance</td>
                                                <td className="px-6 py-4 text-slate-900 dark:text-slate-100">Up to 50 mm (depending on tag type)</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">Supported Standards</td>
                                                <td className="px-6 py-4 text-slate-900 dark:text-slate-100">ISO 14443 Type A & B, MIFARE, FeliCa</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">Supply Current</td>
                                                <td className="px-6 py-4 text-slate-900 dark:text-slate-100">Max. 200 mA</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">Operating Temperature</td>
                                                <td className="px-6 py-4 text-slate-900 dark:text-slate-100">0°C to 50°C</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">Dimensions</td>
                                                <td className="px-6 py-4 text-slate-900 dark:text-slate-100">98.0 mm (L) x 65.0 mm (W) x 12.8 mm (H)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'downloads' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">SDKs & Documentation</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600">
                                                <span className="material-icons-outlined">code</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold group-hover:text-primary transition-colors">ACR1552U Software Development Kit (SDK)</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">v2.4.1 • 12.4 MB • Updated 2 days ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-slate-400">421 Downloads</span>
                                            <span className="material-icons-outlined text-slate-400 group-hover:text-primary">download</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg text-orange-600">
                                                <span className="material-icons-outlined">description</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold group-hover:text-primary transition-colors">Technical Datasheet (PDF)</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">EN • 1.2 MB</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-slate-400">1.2k Downloads</span>
                                            <span className="material-icons-outlined text-slate-400 group-hover:text-primary">download</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-bold mb-6">Compatible Hardware</h3>
                            <div className="space-y-6">
                                <Link href="#" className="flex gap-4 group">
                                    <div className="w-20 h-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                                        <img alt="Related Product 1" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFA9s9Tbunfthwh8s5dLQOpsSAdh7CcafBOC26kUC_NJVZdvsPkB99VPiorKSRRQcGS1-6J5BWV2ik_6yy3GcDu8fv7wycSBkk8sq_qG5_tyiuWF1Vt2d6Hc9Lf3Cy5bNi5fjy3ZKq0PoshTKmczH5xcpBiQREet2I6RGJpybS7oGo0PprZTzDwHJxCyjNRizVubJ5Wf_mRiHxYum1h-VfO2EnJByLcnUoBcP8NEE9csQXCLdd6H2G17CQF3Rn-MaRQqxgi8ed8pcm" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">NFC Key Fob - NTAG213</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">13.56MHz • 10-Pack</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">₦14,990</p>
                                    </div>
                                </Link>
                                <Link href="#" className="flex gap-4 group">
                                    <div className="w-20 h-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                                        <img alt="Related Product 2" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3UdvcS8EkPziPrLac3RoEP_8pf3vrxQ4yL9DSqcB7uEG36zFaLD7KG2hp2Tuqy-oVY76GMDHpo8X5o6YZXvCBaTI81Lu0lB0jl3Fm_tqchSu2AO5NKcfMD81qjG6foZ7GJ7EF3cK9lbg6Ufga5jzoUTV4blIkNnoRXK5-IKL3LtKEEWBEz9EvqSr_ctKMprcrwJ6iC4d8uHQbLWcHZk_6LghSsBW1T2JKxb40LtDXSuP-1wJOJAFi7G_NgEHhpL5NAYVrAinRIOIc" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">USB-C to USB-A Adapter</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">High Speed • Aluminum</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">₦8,500</p>
                                    </div>
                                </Link>
                            </div>
                            <button className="w-full mt-8 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                View All Compatibility
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-primary to-orange-700 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/20">
                            <span className="material-icons-outlined text-3xl mb-4">support_agent</span>
                            <h3 className="text-lg font-bold mb-2">Need a custom solution?</h3>
                            <p className="text-sm text-orange-100 mb-6">Our hardware specialists can help you integrate NFC technology into your existing systems.</p>
                            <button className="bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm w-full hover:bg-orange-50 transition-colors">
                                Book a Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-primary p-1.5 rounded-lg text-white">
                                    <span className="material-icons-outlined block">nfc</span>
                                </div>
                                <span className="text-xl font-bold tracking-tight">EntryConnect</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mb-6">
                                The leading marketplace for secure access hardware, NFC readers, and enterprise connectivity solutions.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Shop</h4>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">All Collections</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">NFC Readers</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">New Arrivals</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Support</h4>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Shipping & Returns</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Company</h4>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">About EntryConnect</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
