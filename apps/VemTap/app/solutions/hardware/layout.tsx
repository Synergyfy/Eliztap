import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hardware Solutions | Enterprise NFC Readers & Tags',
    description: 'Industrial-grade NFC hardware for high-frequency environments. Durable, waterproof, and designed for 100% successful customer identification.',
};

export default function HardwareLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
