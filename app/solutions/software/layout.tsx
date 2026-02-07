import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Software Platform | CRM, Analytics & Messaging Hub',
    description: 'The operating system for your physical venue. Automate loyalty, capture visitor data, and engage customers via WhatsApp & SMS automatically.',
};

export default function SoftwareLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
