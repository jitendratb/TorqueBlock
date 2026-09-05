"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Model from '@/components/organisms/CustomModel';
import { Input } from '@/components/atoms/input';
import CustomDropdown from '@/components/atoms/CustomDropdown';
import Autocomplete from '@/components/atoms/AutoComplete';
import Checkbox from '@/components/atoms/Checkbox';
import Switch from '@/components/atoms/Switch';
import useAddressStore from '@/stores/addressStore';
import { useToast } from '@/context/ToastContext';
import { CgSpinner } from 'react-icons/cg';
import { IoReceiptOutline } from 'react-icons/io5';
import LocationService from '@/services/locationService';

export default function AddressModal({ isOpen, address, onClose }) {
    const { addAddress, updateAddress } = useAddressStore();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isPincodeLookup, setIsPincodeLookup] = useState(false);
    const [citySearch, setCitySearch] = useState('');
    const pincodeLookupTimer = useRef(null);
    const [formErrors, setFormErrors] = useState({});

    const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', gst: '', addressType: 'home', addressLine1: '', addressLine2: '', landmark: '', city: '', state: '', country: 'India', pincode: '', isDefault: false, billingSameAsShipping: true, billingName: '', billingPhone: '', billingEmail: '', billingGst: '', billingAddressType: 'home', billingAddressLine1: '', billingAddressLine2: '', billingLandmark: '', billingCity: '', billingState: '', billingPincode: '' });

    useEffect(() => {
        if (address) {
            setFormData({
                fullName: address.fullName || '',
                phone: address.phone || '',
                email: address.email || '',
                gst: address.gst || '',
                addressType: address.addressType || 'home',
                addressLine1: address.addressLine1 || '',
                addressLine2: address.addressLine2 || '',
                landmark: address.landmark || '',
                city: address.city || '',
                state: address.state || '',
                country: address.country || 'India',
                pincode: address.pincode || '',
                isDefault: address.isDefault || false,
                billingSameAsShipping: address.billingSameAsShipping !== undefined ? address.billingSameAsShipping : true,
                billingName: address.billingName || '',
                billingPhone: address.billingPhone || '',
                billingEmail: address.billingEmail || '',
                billingGst: address.billingGst || '',
                billingAddressType: address.billingAddressType || 'home',
                billingAddressLine1: address.billingAddressLine1 || '',
                billingAddressLine2: address.billingAddressLine2 || '',
                billingLandmark: address.billingLandmark || '',
                billingCity: address.billingCity || '',
                billingState: address.billingState || '',
                billingPincode: address.billingPincode || ''
            });
        } else {
            setFormData({
                fullName: '',
                phone: '',
                email: '',
                gst: '',
                addressType: 'home',
                addressLine1: '',
                addressLine2: '',
                landmark: '',
                city: '',
                state: '',
                country: 'India',
                pincode: '',
                isDefault: false,
                billingSameAsShipping: true,
                billingName: '',
                billingPhone: '',
                billingEmail: '',
                billingGst: '',
                billingAddressType: 'home',
                billingAddressLine1: '',
                billingAddressLine2: '',
                billingLandmark: '',
                billingCity: '',
                billingState: '',
                billingPincode: ''
            });
        }
    }, [address, isOpen]);

    const handlePincodeChange = useCallback((e) => {
        const { name, value } = e.target;
        const fieldName = name || 'pincode';
        // Only allow digits
        const digits = value.replace(/\D/g, '').slice(0, 6);
        setFormData(prev => ({ ...prev, [fieldName]: digits }));
        setFormErrors(prev => ({ ...prev, [fieldName]: undefined }));

        if (pincodeLookupTimer.current) clearTimeout(pincodeLookupTimer.current);

        if (digits.length === 6) {
            pincodeLookupTimer.current = setTimeout(async () => {
                setIsPincodeLookup(true);
                const result = await LocationService.fetchByPincode(digits);
                setIsPincodeLookup(false);
                if (result) {
                    const cityField = fieldName === 'billingPincode' ? 'billingCity' : 'city';
                    const stateField = fieldName === 'billingPincode' ? 'billingState' : 'state';
                    setFormData(prev => ({
                        ...prev,
                        [cityField]: result.city || prev[cityField],
                        [stateField]: result.state || prev[stateField],
                    }));
                    setFormErrors(prev => ({
                        ...prev,
                        [cityField]: undefined,
                        [stateField]: undefined
                    }));
                    toast.success(`Auto-filled: ${result.city}, ${result.state}`);
                }
            }, 600);
        }
    }, [toast]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let processedValue = value;
        if (name === 'phone' || name === 'billingPhone') {
            processedValue = value.replace(/\D/g, '').slice(0, 10);
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : processedValue
        }));
        setFormErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleCityChange = useCallback(async (e) => {
        const city = e.target.value;
        const fieldId = e.target.id || 'city';
        setFormData(prev => ({ ...prev, [fieldId]: city }));
        setFormErrors(prev => ({ ...prev, [fieldId]: undefined }));

        const pincodeField = fieldId === 'billingCity' ? formData.billingPincode : formData.pincode;
        if (!pincodeField && city && city.length > 2) {
            const result = await LocationService.fetchPincodeByCity(city);
            if (result?.pincode) {
                const pField = fieldId === 'billingCity' ? 'billingPincode' : 'pincode';
                setFormData(prev => ({ ...prev, [pField]: result.pincode }));
                setFormErrors(prev => ({ ...prev, [pField]: undefined }));
            }
        }
    }, [formData.pincode, formData.billingPincode]);

    const handleStateChange = useCallback((e) => {
        const state = e.target.value;
        const fieldId = e.target.id || 'state';
        const cityField = fieldId === 'billingState' ? 'billingCity' : 'city';
        setFormData(prev => ({ ...prev, [fieldId]: state, [cityField]: '' }));
        setFormErrors(prev => ({ ...prev, [fieldId]: undefined, [cityField]: undefined }));
        setCitySearch('');
    }, []);

    const cityOptions = LocationService.getCities(formData.state || null, citySearch);
    const stateOptions = LocationService.getStates();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {};

        if (!formData.fullName) errors.fullName = "Required";
        if (!formData.phone) errors.phone = "Required";
        else if (formData.phone.length !== 10) errors.phone = "Must be 10 digits";

        if (!formData.addressLine1) errors.addressLine1 = "Required";
        if (!formData.city) errors.city = "Required";
        if (!formData.state) errors.state = "Required";
        if (!formData.pincode) errors.pincode = "Required";
        else if (formData.pincode.length !== 6) errors.pincode = "Must be 6 digits";

        if (formData.gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gst)) {
            errors.gst = "Invalid GST number";
        }

        if (!formData.billingSameAsShipping) {
            if (!formData.billingName) errors.billingName = "Required";
            if (!formData.billingPhone) errors.billingPhone = "Required";
            else if (formData.billingPhone.length !== 10) errors.billingPhone = "Must be 10 digits";

            if (!formData.billingAddressLine1) errors.billingAddressLine1 = "Required";
            if (!formData.billingCity) errors.billingCity = "Required";
            if (!formData.billingState) errors.billingState = "Required";
            if (!formData.billingPincode) errors.billingPincode = "Required";
            else if (formData.billingPincode.length !== 6) errors.billingPincode = "Must be 6 digits";

            if (formData.billingGst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.billingGst)) {
                errors.billingGst = "Invalid GST number";
            }
        }

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            toast.error("Please fill in all required fields highlighted in red.");
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

                        variant="glass"
                        error={formErrors.fullName}
                    />
                    <Input
                        type="tel"
                        name="phone"
                        label="Mobile Number *"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}

                        pattern="[0-9]{10}"
                        variant="glass"
                        error={formErrors.phone}
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
                        <label className="text-[11px] md:text-xs font-bold tracking-widest text-gray-200">
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
                    name="gst"
                    label="GST Number (Optional)"
                    placeholder="Enter 15-digit GSTIN"
                    value={formData.gst}
                    onChange={handleChange}
                    disabled={isLoading}
                    variant="glass"
                    pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
                    title="Please enter a valid 15-digit GST number"
                    error={formErrors.gst}
                />

                <Input
                    type="text"
                    name="addressLine1"
                    label="Address Line 1 *"
                    placeholder="Enter street address"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    disabled={isLoading}

                    variant="glass"
                    error={formErrors.addressLine1}
                />

                <Input
                    type="text"
                    name="addressLine2"
                    label="Address Line 2"
                    placeholder="Enter area, colony, or sector"
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

                    <div className="flex flex-col gap-1.5">
                        <Input
                            type="text"
                            name="pincode"
                            label={`Pincode *${isPincodeLookup ? ' (Looking up...)' : ''}`}
                            placeholder="6-digit PIN"
                            value={formData.pincode}
                            onChange={handlePincodeChange}
                            disabled={isLoading}

                            pattern="[0-9]{6}"
                            variant="glass"
                            error={formErrors.pincode}
                        />
                        {isPincodeLookup && (
                            <span className="flex items-center gap-1 text-[8px] text-orange-400 font-medium">
                                <CgSpinner className="animate-spin" />
                                Auto-filling city & state…
                            </span>
                        )}
                    </div>
                </div>

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
                        error={formErrors.city}
                    />
                    <Autocomplete
                        id="state"
                        label="State *"
                        placeholder="Search state..."
                        options={stateOptions}
                        value={formData.state}
                        onChange={handleStateChange}
                        disabled={isLoading}
                        error={formErrors.state}
                    />
                </div>

                {!formData.billingSameAsShipping && (
                    <>
                        <div className="flex items-center gap-2">
                            <IoReceiptOutline className="text-orange-500 text-lg" />
                            <h3 className='font-semibold text-sm'>Billing Address (Optional)</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                type="text"
                                name="billingName"
                                label="Billing Name *"
                                placeholder="Enter name"
                                value={formData.billingName}
                                onChange={handleChange}
                                disabled={isLoading}

                                variant="glass"
                                error={formErrors.billingName}
                            />
                            <Input
                                type="text"
                                name="billingPhone"
                                label="Billing Phone *"
                                placeholder="Enter 10-digit number"
                                value={formData.billingPhone}
                                onChange={handleChange}
                                disabled={isLoading}

                                pattern="[0-9]{10}"
                                variant="glass"
                                error={formErrors.billingPhone}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                type="email"
                                name="billingEmail"
                                label="Billing Email Address (Optional)"
                                placeholder="e.g. example@torqueblock.com"
                                value={formData.billingEmail}
                                onChange={handleChange}
                                disabled={isLoading}

                                variant="glass"
                            />
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] md:text-xs font-bold tracking-widest text-gray-200">
                                    Billing Address Type *
                                </label>
                                <CustomDropdown
                                    options={[
                                        { label: "Home (All-day delivery)", value: "home" },
                                        { label: "Work (10 AM - 5 PM)", value: "work" }
                                    ]}
                                    value={formData.billingAddressType}
                                    onChange={(item) => setFormData(prev => ({ ...prev, billingAddressType: item.value }))}
                                    searchable={false}
                                    disabled={isLoading}
                                    buttonClassName="h-11"
                                />
                            </div>
                        </div>
                        <Input
                            type="text"
                            name="billingAddressLine1"
                            label="Billing Address Line 1 *"
                            placeholder="Enter street address"
                            value={formData.billingAddressLine1}
                            onChange={handleChange}
                            disabled={isLoading}

                            variant="glass"
                            error={formErrors.billingAddressLine1}
                        />
                        <Input
                            type="text"
                            name="billingAddressLine2"
                            label="Billing Address Line 2"
                            placeholder="Enter area, colony, or sector"
                            value={formData.billingAddressLine2}
                            onChange={handleChange}
                            disabled={isLoading}
                            variant="glass"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                type="text"
                                name="billingLandmark"
                                label="Billing Landmark"
                                placeholder="e.g. Near Metro Station"
                                value={formData.billingLandmark}
                                onChange={handleChange}
                                disabled={isLoading}
                                variant="glass"
                            />
                            <div className="flex flex-col gap-1.5">
                                <Input
                                    type="text"
                                    name="billingPincode"
                                    label={`Billing Pincode *${isPincodeLookup ? ' (Looking up...)' : ''}`}
                                    placeholder="6-digit PIN"
                                    value={formData.billingPincode}
                                    onChange={handlePincodeChange}
                                    disabled={isLoading}

                                    pattern="[0-9]{6}"
                                    variant="glass"
                                    error={formErrors.billingPincode}
                                />
                                {isPincodeLookup && (
                                    <span className="flex items-center gap-1 text-[8px] text-orange-400 font-medium">
                                        <CgSpinner className="animate-spin" />
                                        Auto-filling city & state…
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Autocomplete
                                id="billingCity"
                                label="Billing City *"
                                placeholder="Search city..."
                                options={cityOptions}
                                value={formData.billingCity}
                                onChange={handleCityChange}
                                onSearchChange={setCitySearch}
                                allowCustom
                                disabled={isLoading}
                                error={formErrors.billingCity}
                            />
                            <Autocomplete
                                id="billingState"
                                label="Billing State *"
                                placeholder="Search state..."
                                options={stateOptions}
                                value={formData.billingState}
                                onChange={handleStateChange}
                                disabled={isLoading}
                                error={formErrors.billingState}
                            />
                        </div>
                    </>
                )}

                <div className="flex justify-between items-center ">

                    <div className="flex items-center gap-2">

                        <Switch
                            id="billingSameAsShipping"
                            name="billingSameAsShipping"
                            checked={formData.billingSameAsShipping}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <label htmlFor="billingSameAsShipping" className="text-xs font-bold  md:tracking-wider text-gray-300 select-none cursor-pointer">
                            Billing Same as Shipping
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="isDefault"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <label htmlFor="isDefault" className="text-xs font-bold  md:tracking-wider text-gray-300 select-none cursor-pointer">
                            Set as Default Address
                        </label>
                    </div>
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

