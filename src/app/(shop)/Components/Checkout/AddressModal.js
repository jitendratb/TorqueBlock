"use client";

import React, { useState, useEffect } from 'react';
import Model from '@/components/organisms/CustomModel';
import { Input } from '@/components/atoms/input';
import CustomDropdown from '@/components/atoms/CustomDropdown';
import Checkbox from '@/components/atoms/Checkbox';
import useAddressStore from '@/stores/addressStore';
import { useToast } from '@/context/ToastContext';
import { CgSpinner } from 'react-icons/cg';

export default function AddressModal({ isOpen, address, onClose }) {
    const { addAddress, updateAddress } = useAddressStore();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', addressType: 'home', addressLine1: '', addressLine2: '', landmark: '', city: '', state: '', country: 'India', pincode: '', isDefault: false });

    useEffect(() => {
        if (address) {
            setFormData({
                fullName: address.fullName || '',
                phone: address.phone || '',
                email: address.email || '',
                addressType: address.addressType || 'home',
                addressLine1: address.addressLine1 || '',
                addressLine2: address.addressLine2 || '',
                landmark: address.landmark || '',
                city: address.city || '',
                state: address.state || '',
                country: address.country || 'India',
                pincode: address.pincode || '',
                isDefault: address.isDefault || false
            });
        } else {
            setFormData({
                fullName: '',
                phone: '',
                email: '',
                addressType: 'home',
                addressLine1: '',
                addressLine2: '',
                landmark: '',
                city: '',
                state: '',
                country: 'India',
                pincode: '',
                isDefault: false
            });
        }
    }, [address, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.phone || !formData.addressLine1 || !formData.city || !formData.state || !formData.pincode) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (formData.phone.length !== 10) {
            toast.error("Please enter a valid 10-digit phone number.");
            return;
        }

        if (formData.pincode.length !== 6) {
            toast.error("Please enter a valid 6-digit pincode.");
            return;
        }

        setIsLoading(true);
        try {
            let res;
            if (address) {
                res = await updateAddress({ addressId: address._id, ...formData });
            } else {
                res = await addAddress(formData);
            }

            if (res.success) {
                toast.success(address ? "Address updated successfully!" : "Address added successfully!");
                onClose();
            } else {
                toast.error(res.message || "Something went wrong.");
            }
        } catch (err) {
            toast.error("Failed to save address.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Model
            isOpen={isOpen}
            onClose={onClose}
            title={address ? 'Edit Address' : 'Add Address'}
            subtitle={address ? 'Update your shipping details' : 'Enter a new shipping address'}
            themeGlow="orange"
            size="lg"
            closeOnBackdropClick={!isLoading}
            showCloseButton={!isLoading}
        >
            <form onSubmit={handleSubmit} className="max-h-[300px] lg:max-h-[400px] space-y-4 overflow-y-auto px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        type="text"
                        name="fullName"
                        label="Full Name *"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        variant="glass"
                    />
                    <Input
                        type="tel"
                        name="phone"
                        label="Mobile Number *"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        pattern="[0-9]{10}"
                        variant="glass"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        type="email"
                        name="email"
                        label="Email Address"
                        placeholder="e.g. example@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        variant="glass"
                    />
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-200">
                            Address Type *
                        </label>
                        <CustomDropdown
                            options={[
                                { label: "Home (All-day delivery)", value: "home" },
                                { label: "Work (10 AM - 5 PM)", value: "work" }
                            ]}
                            value={formData.addressType}
                            onChange={(item) => setFormData(prev => ({ ...prev, addressType: item.value }))}
                            searchable={false}
                            disabled={isLoading}
                            variant="glass"
                            buttonClassName="h-11"
                        />
                    </div>
                </div>

                <Input
                    type="text"
                    name="addressLine1"
                    label="Address Line 1 (Flat, House no., Building, Apartment) *"
                    placeholder="Enter street details"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    variant="glass"
                />

                <Input
                    type="text"
                    name="addressLine2"
                    label="Address Line 2 (Area, Colony, Street, Sector)"
                    placeholder="Enter area details"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    disabled={isLoading}
                    variant="glass"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        type="text"
                        name="landmark"
                        label="Landmark"
                        placeholder="e.g. Near Metro Station"
                        value={formData.landmark}
                        onChange={handleChange}
                        disabled={isLoading}
                        variant="glass"
                    />
                    <Input
                        type="text"
                        name="pincode"
                        label="Pincode *"
                        placeholder="6-digit PIN"
                        value={formData.pincode}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        pattern="[0-9]{6}"
                        variant="glass"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        type="text"
                        name="city"
                        label="City *"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        variant="glass"
                    />
                    <Input
                        type="text"
                        name="state"
                        label="State *"
                        placeholder="Enter state"
                        value={formData.state}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        variant="glass"
                    />
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                    <Checkbox
                        id="isDefault"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <label htmlFor="isDefault" className="text-xs font-bold md:uppercase md:tracking-wider text-gray-300 select-none cursor-pointer">
                        Set as Default Shipping Address
                    </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/5 justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="md:px-8 px-4 py-3.5 rounded-xl text-xs font-black md:uppercase md:tracking-widest bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.2)] disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <CgSpinner className="animate-spin text-sm" />
                                Saving...
                            </>
                        ) : (
                            address ? 'Update Address' : 'Add Address'
                        )}
                    </button>
                </div>
            </form>
        </Model>
    );
}
