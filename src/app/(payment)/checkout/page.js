import React from 'react';
import CheckoutClient from '@/app/(shop)/Components/Checkout/CheckoutClient';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export const metadata = {
    title: 'Checkout | TorqueBlock',
    description: 'Complete your purchase of premium, high-performance motorcycle tyres on TorqueBlock with encrypted 256-bit security.',
};

export default function CheckoutPage() {
    return (
        <main className="relative overflow-hidden pb-4">
            <Breadcrumb items={[{ label: 'Checkout', href: '/checkout' }]} />
            <CheckoutClient />
        </main>
    );
}