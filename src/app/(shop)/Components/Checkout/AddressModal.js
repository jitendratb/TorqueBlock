"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Model from '@/components/organisms/CustomModel';
import { Input } from '@/components/atoms/input';
import CustomDropdown from '@/components/atoms/CustomDropdown';
import Autocomplete from '@/components/atoms/AutoComplete';
import Checkbox from '@/components/atoms/Checkbox';
import useAddressStore from '@/stores/addressStore';
import { useToast } from '@/context/ToastContext';
import { CgSpinner } from 'react-icons/cg';
import LocationService from '@/services/locationService';

export default function AddressModal({ isOpen, address, onClose }) {
    const { addAddress, updateAddress } = useAddressStore();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isPincodeLookup, setIsPincodeLookup] = useState(false);
    const [citySearch, setCitySearch] = useState('');
    const pincodeLookupTimer = useRef(null);

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

    const handlePincodeChange = useCallback((e) => {
        const { value } = e.target;
        // Only allow digits
        const digits = value.replace(/\D/g, '').slice(0, 6);
        setFormData(prev => ({ ...prev, pincode: digits }));

        if (pincodeLookupTimer.current) clearTimeout(pincodeLookupTimer.current);

        if (digits.length === 6) {
            pincodeLookupTimer.current = setTimeout(async () => {
                setIsPincodeLookup(true);
                const result = await LocationService.fetchByPincode(digits);
                setIsPincodeLookup(false);
                if (result) {
                    setFormData(prev => ({
                        ...prev,
                        city: result.city || prev.city,
                        state: result.state || prev.state,
                    }));
                    toast.success(`Auto-filled: ${result.city}, ${result.state}`);
                }
            }, 600);
        }
    }, [toast]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCityChange = useCallback(async (e) => {
        const city = e.target.value;
        setFormData(prev => ({ ...prev, city }));

        if (!formData.pincode && city && city.length > 2) {
            const result = await LocationService.fetchPincodeByCity(city);
            if (result?.pincode) {
                setFormData(prev => ({ ...prev, pincode: result.pincode }));
            }
        }
    }, [formData.pincode]);

    const handleStateChange = useCallback((e) => {
        setFormData(prev => ({ ...prev, state: e.target.value, city: '' }));
        setCitySearch('');
    }, []);

    const cityOptions = LocationService.getCities(formData.state || null, citySearch);
    const stateOptions = LocationService.getStates();

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
            <form onSubmit={handleSubmit} className="max-h-[360px] lg:max-h-[420px] space-y-4 overflow-y-auto px-2">
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
                        <label className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-gray-200">
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

                    {/* Pincode — auto-fills city & state on 6-digit entry */}
                    <div className="flex flex-col gap-1.5">
                        <Input
                            type="text"
                            name="pincode"
                            label={`Pincode *${isPincodeLookup ? ' (Looking up...)' : ''}`}
                            placeholder="6-digit PIN"
                            value={formData.pincode}
                            onChange={handlePincodeChange}
                            disabled={isLoading}
                            required
                            pattern="[0-9]{6}"
                            variant="glass"
                        />
                        {isPincodeLookup && (
                            <span className="flex items-center gap-1 text-[10px] text-orange-400 font-medium">
                                <CgSpinner className="animate-spin" />
                                Auto-filling city & state…
                            </span>
                        )}
                    </div>
                </div>

                {/* City & State — smart Autocomplete powered by LocationService */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Autocomplete
                        id="city"
                        label="City *"
                        placeholder="Search city..."
                        options={cityOptions}
                        value={formData.city}
                        onChange={handleCityChange}
                        onSearchChange={setCitySearch}
                        allowCustom
                        disabled={isLoading}
                    />
                    <Autocomplete
                        id="state"
                        label="State *"
                        placeholder="Search state..."
                        options={stateOptions}
                        value={formData.state}
                        onChange={handleStateChange}
                        disabled={isLoading}
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
                        className="md:px-6 px-4 md:py-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="md:px-8 px-4 md:py-3.5 py-2.5 rounded-xl text-xs font-black md:uppercase md:tracking-widest bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.2)] disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-2"
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

