'use client';

import React from 'react';
import { useProductFormStore } from '@/store/useProductFormStore';
import { Factory, QrCode, ArrowRight, Save } from 'lucide-react';

export default function StepDetails() {
    const { formData, updateFormData, nextStep } = useProductFormStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gray-100 h-full relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold font-display text-text-main mb-8">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-bold text-text-secondary mb-2" htmlFor="title">Product Title</label>
                                <input
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-text-main placeholder-gray-400"
                                    id="title"
                                    name="title"
                                    placeholder="e.g. GoToTags NFC Reader"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-bold text-text-secondary mb-2" htmlFor="manufacturer">Manufacturer</label>
                                <div className="relative">
                                    <Factory className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <select
                                        className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-text-main appearance-none cursor-pointer"
                                        id="manufacturer"
                                        name="manufacturer"
                                        value={formData.manufacturer}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select Manufacturer</option>
                                        <option value="entryconnect">EntryConnect</option>
                                        <option value="hid">HID Global</option>
                                        <option value="gototags">GoToTags</option>
                                        <option value="rfideas">rf IDEAS</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-bold text-text-secondary mb-2" htmlFor="sku">SKU</label>
                                <div className="relative">
                                    <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-text-main placeholder-gray-400 font-mono tracking-wide"
                                        id="sku"
                                        name="sku"
                                        placeholder="EC-XXX-00"
                                        type="text"
                                        value={formData.sku}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-bold text-text-secondary mb-2" htmlFor="description">Description</label>
                                <textarea
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-sans text-text-main placeholder-gray-400 resize-none"
                                    id="description"
                                    name="description"
                                    placeholder="Describe the product features, compatibility, and use cases..."
                                    rows={6}
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                                <p className="text-right text-xs text-gray-400 mt-2">{formData.description.length}/2000 characters</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-8">
                            <button className="text-text-secondary hover:text-text-main font-bold px-6 py-3 transition-colors flex items-center gap-2">
                                <Save size={18} />
                                Save Draft
                            </button>
                            <button
                                onClick={nextStep}
                                className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                            >
                                Next: Add Media
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Preview / Tips */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="bg-blue-50/50 p-8 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-2">Quick Tips</h3>
                    <ul className="space-y-3 text-sm text-blue-800/80">
                        <li className="flex gap-2">
                            <span className="mt-1 block size-1.5 rounded-full bg-blue-400 shrink-0" />
                            Use a recognizable product title that includes the key feature (e.g., "NFC").
                        </li>
                        <li className="flex gap-2">
                            <span className="mt-1 block size-1.5 rounded-full bg-blue-400 shrink-0" />
                            SKUs must be unique across your organization.
                        </li>
                        <li className="flex gap-2">
                            <span className="mt-1 block size-1.5 rounded-full bg-blue-400 shrink-0" />
                            Detailed descriptions improve search visibility.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
