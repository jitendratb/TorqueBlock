"use client";

import React, { useEffect, useState } from 'react';
import useAddressStore from '@/stores/addressStore';
import useAuthStore from '@/stores/authStore';
import { useToast } from '@/context/ToastContext';
import { IoAddOutline, IoCheckmarkCircle, IoCheckmarkCircleOutline, IoLocationOutline, IoCallOutline } from 'react-icons/io5';
import { BiEdit, BiEditAlt, BiTrash } from 'react-icons/bi';

import { CgSpinner } from 'react-icons/cg';
import AddressSkeleton from './AddressSkeleton';
import DeleteAddressModal from './DeleteAddressModal';
import { FaTrash } from 'react-icons/fa';

export default function AddressSection({ selectedAddressId, onSelectAddress, setAddressModalOpen, setEditingAddress }) {
    const { addresses, fetchAddresses, deleteAddress, loading } = useAddressStore();
    const { isAuthenticated } = useAuthStore();
    const toast = useToast();
    const [deletingId, setDeletingId] = useState(null);
    const [addressToDelete, setAddressToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated && addresses.length === 0) {
            fetchAddresses();
        }
    }, [isAuthenticated, fetchAddresses, addresses.length]);

    useEffect(() => {
        if (!isAuthenticated && typeof window !== 'undefined') {
            window.location.href = '/';
        }
    }, [isAuthenticated]);

    const onRequestDelete = (e, address) => {
        e.stopPropagation();

        if (address.isDefault) {
            toast.error("Default address cannot be deleted. Please set another address as default first.");
            return;
        }

        setAddressToDelete(address);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteAddress = async () => {
        if (!addressToDelete) return;

        const addressId = addressToDelete._id;
        setDeletingId(addressId);
        try {
            const res = await deleteAddress(addressId);
            if (res?.success) {
                toast.success("Address deleted successfully.");
                if (selectedAddressId === addressId) {
                    const remaining = addresses.filter(a => a._id !== addressId);
                    onSelectAddress(remaining.length > 0 ? remaining[0]._id : null);
                }
                setIsDeleteModalOpen(false);
                setAddressToDelete(null);
            } else {
                toast.error(res?.message || "Failed to delete address.");
            }
        } catch (err) {
            toast.error("Failed to delete address.");
        } finally {
            setDeletingId(null);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <div className="p-4 rounded-xl bg-white/10 border border-white/5 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xs md:text-sm font-black md:uppercase md:tracking-wider text-white flex items-center gap-2">
                        <IoLocationOutline className="text-orange-500 text-lg" />
                        Delivery Address
                    </h2>
                    <button
                        onClick={() => {
                            setEditingAddress(null);
                            setAddressModalOpen(true);
                        }}
                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-400 border border-orange-500 hover:border-orange-500/50  hover:text-orange-300 transition-colors bg-orange-500/15 hover:bg-orange-500/10 px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                        <IoAddOutline className="text-sm" /> Add New Address
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {loading ? (
                        <>
                            <AddressSkeleton />
                            <AddressSkeleton />
                        </>
                    ) : addresses.length === 0 ? (
                        <div className="col-span-full py-8 text-center border border-dashed border-white/10 rounded-xl bg-white/5 flex flex-col items-center justify-center">
                            <IoLocationOutline className="text-3xl text-zinc-500 mb-2" />
                            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">No addresses found</p>
                            <p className="text-[10px] text-zinc-500 mt-1">Please add a new delivery address.</p>
                        </div>
                    ) : (
                        addresses.map((address) => {
                            const isSelected = selectedAddressId === address._id;
                            const pincodeVal = address.pincode || address.pinCode || '';
                            return (
                                <div
                                    key={address._id}
                                    onClick={() => onSelectAddress(address._id)}
                                    className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-300 group ${isSelected
                                            ? 'bg-orange-500/10 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            {isSelected ? (
                                                <IoCheckmarkCircle className="text-orange-500 text-xl shrink-0" />
                                            ) : (
                                                <IoCheckmarkCircleOutline className="text-zinc-500 text-xl shrink-0 group-hover:text-zinc-400 transition-colors" />
                                            )}
                                            <h3 className="text-xs font-black text-white uppercase tracking-wider truncate max-w-[140px]">{address.fullName}</h3>
                                            {address.isDefault && (
                                                <span className="text-[9px] bg-white/10 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Default</span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingAddress(address);
                                                    setAddressModalOpen(true);
                                                }}
                                                className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                                aria-label="Edit address"
                                                title="Edit Address"
                                            >
                                                <BiEdit className="text-base" />
                                            </button>
                                            <button
                                                type="button"
                                                disabled={deletingId === address._id || address.isDefault}
                                                onClick={(e) => onRequestDelete(e, address)}
                                                className={` rounded-md transition-colors ${address.isDefault
                                                        ? 'text-gray-300 cursor-not-allowed opacity-40'
                                                        : 'hover:text-orange-400 text-zinc-500'
                                                    }`}
                                                aria-label={address.isDefault ? "Default address cannot be deleted" : "Delete address"}
                                                title={address.isDefault ? "Default address cannot be deleted" : "Delete Address"}
                                            >
                                                {deletingId === address._id ? (
                                                    <CgSpinner className="animate-spin text-sm text-red-400" />
                                                ) : (
                                                    <FaTrash className="text-sm" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-medium">
                                            {address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ''}, {address.city}, {address.state}{pincodeVal ? ` - ${pincodeVal}` : ''}
                                        </p>
                                        <p className="text-[11px] text-zinc-300 font-bold tracking-wide flex items-center gap-1.5 mt-2">
                                            <IoCallOutline className="text-zinc-500 text-sm" />
                                            {address.phone}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <DeleteAddressModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    if (!deletingId) {
                        setIsDeleteModalOpen(false);
                        setAddressToDelete(null);
                    }
                }}
                address={addressToDelete}
                onConfirm={confirmDeleteAddress}
                isDeleting={Boolean(deletingId)}
            />
        </>
    );
}



