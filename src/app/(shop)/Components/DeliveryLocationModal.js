"use client";

import React, { useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { MdLocationOn } from "react-icons/md";
import Model from "@/components/organisms/CustomModel";
import { Input } from "@/components/atoms/input";
import { deliveryService } from "@/services/deliveryService";

export default function DeliveryLocationModal({ isOpen, onClose, onSelect }) {
    const inputRef = useRef(null);
    const [pincode, setPincode] = useState("");
    const [error, setError] = useState("");
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^[1-9]\d{5}$/.test(pincode)) {
            setError("Enter a valid 6-digit pincode");
            return;
        }

        setIsChecking(true);
        const location = await deliveryService.lookupPincode(pincode);
        setIsChecking(false);

        if (!location) {
            setError("We couldn't find this pincode");
            return;
        }
        onSelect(location);
        onClose();
    };

    return (
        <Model
            isOpen={isOpen}
            onClose={onClose}
            title="Delivery Location"
            subtitle="Enter your pincode to check the delivery date"
            size="sm"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                    ref={inputRef}
                    id="delivery-pincode"
                    variant="glass"
                    label="Pincode"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="e.g. 560001"
                    value={pincode}
                    error={error}
                    leftIcon={<MdLocationOn className="text-orange-400 text-base" aria-hidden="true" />}
                    onChange={(e) => {
                        setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
                        setError("");
                    }}
                />
                <button
                    type="submit"
                    disabled={isChecking}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-black uppercase tracking-widest text-xs bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60 disabled:cursor-wait transition-all duration-300 cursor-pointer"
                >
                    {isChecking && <CgSpinner className="animate-spin text-base" aria-hidden="true" />}
                    {isChecking ? "Checking" : "Check Delivery"}
                </button>
            </form>
        </Model>
    );
}
