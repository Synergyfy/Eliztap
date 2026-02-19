import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Get Started | Create Your Merchant Account',
    description: 'Join the 2,000+ businesses digitizing their physical customer experience. Start your free enterprise trial today.',
};

export default function GetStartedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
