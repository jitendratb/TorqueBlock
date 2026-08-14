import React from 'react';
import CheckoutClient from '../Components/Checkout/CheckoutClient';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import { IoLockClosedOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

export const metadata = {
    title: 'Checkout | TorqueBlock',
    description: 'Complete your purchase of premium, high-performance motorcycle tyres on TorqueBlock with encrypted 256-bit security.',
};

export default function CheckoutPage() {
    return (
        <main className="relative overflow-hidden">
            <Breadcrumb items={[{ label: 'Checkout', href: '/checkout' }]} />
            <CheckoutClient />
        </main>
    );
}