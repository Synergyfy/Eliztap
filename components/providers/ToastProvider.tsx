'use client';

import React from 'react';
import { Toaster, toast, ToastBar } from 'react-hot-toast';

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 5000,
                className: 'font-display',
                style: {
                    background: '#363636',
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    maxWidth: '400px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                },
                success: {
                    style: {
                        background: '#ffffff',
                        color: '#1f2937',
                        border: '1px solid #e5e7eb',
                    },
                    iconTheme: {
                        primary: '#22c55e',
                        secondary: '#ffffff',
                    },
                },
                error: {
                    style: {
                        background: '#ffffff',
                        color: '#1f2937',
                        border: '1px solid #e5e7eb',
                    },
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#ffffff',
                    },
                },
                loading: {
                    style: {
                        background: '#ffffff',
                        color: '#1f2937',
                        border: '1px solid #e5e7eb',
                    },
                },
            }}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <div className="flex items-center gap-3">
                            {icon}
                            <div className="text-sm font-medium">{message}</div>
                            {t.type !== 'loading' && (
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="ml-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <span className="material-icons-round text-sm">close</span>
                                </button>
                            )}
                        </div>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
}
