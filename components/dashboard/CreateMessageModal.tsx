'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { X, Plus, Send, Calendar, Clock, Edit } from 'lucide-react';
import { Campaign } from '@/lib/store/mockDashboardStore';
import Modal from '@/components/ui/Modal';

interface CreateMessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    isLoading: boolean;
    initialData?: Campaign | null;
}

export default function CreateMessageModal({ isOpen, onClose, onSubmit, isLoading, initialData }: CreateMessageModalProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialData ? {
            name: initialData.name,
            type: initialData.type,
            audience: initialData.audience,
            status: initialData.status,
        } : {
            type: 'WhatsApp',
            audience: 'All Customers',
            status: 'Active',
        }
    });

    const handleFormSubmit = (data: any) => {
        onSubmit(data);
        reset();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? 'Edit Message' : 'Create Message'}
            description={initialData ? 'Update your message details' : 'Reach your customers with targeted messaging'}
            size="lg"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message Name</label>
                    <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="e.g. Weekend Flash Sale"
                        className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1 ml-1 font-bold">{errors.name.message as string}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Channel</label>
                        <select
                            {...register('type')}
                            className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm appearance-none cursor-pointer"
                        >
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="SMS">SMS</option>
                            <option value="Email">Email</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Status</label>
                        <select
                            {...register('status')}
                            className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm appearance-none cursor-pointer"
                        >
                            <option value="Active">Send Now (Active)</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Draft">Draft</option>
                            <option value="Recurring">Recurring</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Target Audience</label>
                    <select
                        {...register('audience')}
                        className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm appearance-none cursor-pointer"
                    >
                        <option value="All Customers">All Customers</option>
                        <option value="New Customers">New Customers Only</option>
                        <option value="Frequent Visitors">Frequent Visitors (3+ visits)</option>
                        <option value="Inactive Customers">Inactive (30+ days)</option>
                        <option value="VIP Members">VIP Members Only</option>
                    </select>
                </div>

                <div className="pt-4 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 h-14 bg-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all text-sm active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-3 h-14 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                {initialData ? <Edit size={20} /> : <Plus size={20} />}
                                {initialData ? 'Update Message' : 'Create Message'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
