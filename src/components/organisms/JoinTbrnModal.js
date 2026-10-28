"use client";

import React, { useState } from 'react';
import clsx from 'clsx';
import { CgSpinner } from 'react-icons/cg';
import { FiArrowRight, FiCheckCircle, FiGift, FiLink, FiMoreHorizontal, FiPlay } from 'react-icons/fi';
import { FaBullhorn } from 'react-icons/fa';
import { MdGroups } from 'react-icons/md';
import Model from '@/components/organisms/CustomModel';
import { Input } from '@/components/atoms/input';
import CustomDropdown from '@/components/atoms/CustomDropdown';
import Checkbox from '@/components/atoms/Checkbox';
import Textarea from '@/components/atoms/textarea';
import { useToast } from '@/context/ToastContext';
import tbrnService from '@/services/tbrnService';

const FORM_ID = 'join-tbrn-form';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LABEL_CLASS = 'text-[11px] md:text-xs font-bold tracking-widest text-white';
const OPTION_CLASS = 'cursor-pointer rounded-lg border transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange-500/60';
const OPTION_ACTIVE = 'border-orange-500 bg-orange-500/15 text-white shadow-[0_0_12px_rgba(249,115,22,0.25)]';
const OPTION_IDLE = 'border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/20';

const APPLICANT_TYPES = [
    { value: 'individual_creator', label: 'Individual Creator' },
    { value: 'riding_group', label: 'Riding Group / Community' },
    { value: 'business_brand', label: 'Business / Brand' },
    { value: 'other', label: 'Other' },
];

const PLATFORMS = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'whatsapp', label: 'WhatsApp Group / Channel' },
    { value: 'other', label: 'Other' },
];

const CONTENT_FOCUS = [
    { value: 'street', label: 'Street' },
    { value: 'touring', label: 'Touring' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'off_road', label: 'Off-road' },
    { value: 'track', label: 'Track' },
    { value: 'motorcycle_tyres', label: 'Motorcycle tyres' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'other', label: 'Other' },
];

const COLLABORATION_TYPES = [
    { value: 'affiliate_referral', label: 'Affiliate / Referral', hint: '(commission)', icon: FiLink },
    { value: 'content_collaboration', label: 'Content Collaboration', hint: '(reviews, videos, etc.)', icon: FiPlay },
    { value: 'product_support', label: 'Tyre / Product Support', hint: '(free tyres or products)', icon: FiGift },
    { value: 'paid_campaign', label: 'Paid Campaign Opportunities', icon: FaBullhorn },
    { value: 'community_partnership', label: 'Community Partnership', hint: '(member offers, events, etc.)', icon: MdGroups },
    { value: 'open_to_multiple', label: 'Open to Multiple Options', icon: FiMoreHorizontal },
];

const EMPTY_FORM = {
    fullName: '',
    email: '',
    phone: '',
    cityState: '',
    applicantType: '',
    mainPlatform: '',
    profileLink: '',
    otherLinks: '',
    audienceSize: '',
    contentFocus: [],
    collaborationInterests: [],
    additionalInfo: '',
};

const withProtocol = (link) => (link && !/^https?:\/\//i.test(link) ? `https://${link}` : link);

const validate = (form) => {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = 'Required';
    if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Enter a valid email';
    if (!/^[6-9]\d{9}$/.test(form.phone)) errors.phone = 'Enter a valid 10-digit number';
    if (!form.cityState.trim()) errors.cityState = 'Required';
    if (!form.applicantType) errors.applicantType = 'Select one';
    if (!form.mainPlatform) errors.mainPlatform = 'Select your main platform';
    if (!/^https?:\/\/\S+\.\S+/i.test(form.profileLink)) errors.profileLink = 'Enter a valid link';
    if (!form.audienceSize) errors.audienceSize = 'Required';
    if (!form.contentFocus.length) errors.contentFocus = 'Select at least one';
    if (!form.collaborationInterests.length) errors.collaborationInterests = 'Select at least one';
    return errors;
};

function FieldError({ message }) {
    if (!message) return null;
    return <p className="text-xs font-semibold text-red-400">{message}</p>;
}

export default function JoinTbrnModal({ isOpen, onClose, source = 'website' }) {
    const toast = useToast();
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);

    const setField = (name, value) => {
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') return setField(name, value.replace(/\D/g, '').slice(0, 10));
        if (name === 'audienceSize') return setField(name, value.replace(/\D/g, '').slice(0, 12));
        setField(name, value);
    };

    const toggleListValue = (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: prev[name].includes(value) ? prev[name].filter(item => item !== value) : [...prev[name], value],
        }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleClose = () => {
        if (!isSubmitting) onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const application = { ...form, profileLink: withProtocol(form.profileLink.trim()), source };
        const formErrors = validate(application);
        setForm(prev => ({ ...prev, profileLink: application.profileLink }));
        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            toast.error('Please fill in all required fields highlighted in red.');
            return;
        }

        setIsSubmitting(true);
        const res = await tbrnService.submitApplication(application);
        setIsSubmitting(false);

        if (res?.success) {
            setResult(res);
            return;
        }

        setErrors(res?.errors || {});
        toast.error(res?.message || 'Could not submit your application. Please try again.');
    };

    return (
        <Model
            isOpen={isOpen}
            onClose={handleClose}
            title="Become a TBRN Creator"
            subtitle="Takes about 2 minutes"
            themeGlow="orange"
            size="lg"
            closeOnBackdropClick={!isSubmitting}
            showCloseButton={!isSubmitting}
        >
            {result ? (
                <div role="status" className="flex flex-col items-center px-4 py-10 text-center">
                    <FiCheckCircle aria-hidden="true" className="h-12 w-12 text-orange-500" />
                    <p className="mt-4 text-xl font-black text-white">
                        {result.alreadyApplied ? 'You have already applied' : 'Application received'}
                    </p>
                    <p className="mt-2 max-w-md text-sm text-zinc-300">{result.message}</p>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="mt-6 cursor-pointer rounded-xl bg-orange-500 px-8 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-orange-600"
                    >
                        Close
                    </button>
                </div>
            ) : (
                <form id={FORM_ID} onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Input
                            id="tbrn-fullName"
                            name="fullName"
                            label="Full Name *"
                            placeholder="Your name"
                            autoComplete="name"
                            value={form.fullName}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            variant="glass"
                            size="sm"
                            error={errors.fullName}
                        />
                        <Input
                            id="tbrn-email"
                            type="email"
                            name="email"
                            label="Email *"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            variant="glass"
                            size="sm"
                            error={errors.email}
                        />
                        <Input
                            id="tbrn-phone"
                            type="tel"
                            inputMode="numeric"
                            name="phone"
                            label="WhatsApp / Mobile *"
                            placeholder="10-digit number"
                            autoComplete="tel-national"
                            maxLength={10}
                            value={form.phone}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            variant="glass"
                            size="sm"
                            error={errors.phone}
                        />
                        <Input
                            id="tbrn-cityState"
                            name="cityState"
                            label="City & State *"
                            placeholder="City, State"
                            value={form.cityState}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            variant="glass"
                            size="sm"
                            error={errors.cityState}
                        />
                    </div>

                    <div role="radiogroup" aria-labelledby="tbrn-applicantType-label" className="space-y-2">
                        <p id="tbrn-applicantType-label" className={LABEL_CLASS}>I am a *</p>
                        <div className="flex flex-wrap gap-1">
                            {APPLICANT_TYPES.map(({ value, label }) => (
                                <label
                                    key={value}
                                    className={clsx(OPTION_CLASS, 'flex flex-1 items-center justify-center whitespace-nowrap px-2 py-2 text-center text-xs', form.applicantType === value ? OPTION_ACTIVE : OPTION_IDLE)}
                                >
                                    <input
                                        type="radio"
                                        name="applicantType"
                                        value={value}
                                        checked={form.applicantType === value}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="sr-only"
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                        <FieldError message={errors.applicantType} />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <span className={LABEL_CLASS}>Main Platform *</span>
                            <CustomDropdown
                                options={PLATFORMS}
                                value={form.mainPlatform}
                                onChange={(item) => setField('mainPlatform', item.value)}
                                placeholder="Select platform"
                                searchable={false}
                                size="sm"
                                disabled={isSubmitting}
                            />
                            <FieldError message={errors.mainPlatform} />
                        </div>
                        <Input
                            id="tbrn-profileLink"
                            type="url"
                            name="profileLink"
                            label="Profile / Channel / Community Link *"
                            placeholder="https://"
                            value={form.profileLink}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            variant="glass"
                            size="sm"
                            error={errors.profileLink}
                        />
                    </div>

                    <Input
                        id="tbrn-otherLinks"
                        name="otherLinks"
                        label="Other Links (optional)"
                        placeholder="Instagram, YouTube, Website, etc."
                        value={form.otherLinks}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        variant="glass"
                         size="sm"
                        error={errors.otherLinks}
                    />

                    <Input
                        id="tbrn-audienceSize"
                        inputMode="numeric"
                        name="audienceSize"
                        label="Approximate Followers / Members *"
                        placeholder="e.g. 5,000"
                        value={form.audienceSize ? Number(form.audienceSize).toLocaleString('en-IN') : ''}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        variant="glass"
                         size="sm"
                        error={errors.audienceSize}
                    />

                    <div role="group" aria-labelledby="tbrn-contentFocus-label" className="space-y-2">
                        <p id="tbrn-contentFocus-label" className={LABEL_CLASS}>What do you mainly cover? *</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
                            {CONTENT_FOCUS.map(({ value, label }) => (
                                <label key={value} className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-300">
                                    <Checkbox
                                        checked={form.contentFocus.includes(value)}
                                        onChange={() => toggleListValue('contentFocus', value)}
                                        disabled={isSubmitting}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                        <FieldError message={errors.contentFocus} />
                    </div>

                    <div role="group" aria-labelledby="tbrn-collaboration-label" className="space-y-2">
                        <p id="tbrn-collaboration-label" className={LABEL_CLASS}>
                            How would you like to work with us? * <span className="font-normal text-zinc-400">(select all that apply)</span>
                        </p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                            {COLLABORATION_TYPES.map(({ value, label, hint, icon: Icon }) => {
                                const selected = form.collaborationInterests.includes(value);

                                return (
                                    <label key={value} className={clsx(OPTION_CLASS, 'flex items-center gap-2 px-2.5 py-2', selected ? OPTION_ACTIVE : OPTION_IDLE)}>
                                        <input
                                            type="checkbox"
                                            checked={selected}
                                            onChange={() => toggleListValue('collaborationInterests', value)}
                                            disabled={isSubmitting}
                                            className="sr-only"
                                        />
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm text-orange-500">
                                            <Icon aria-hidden="true" />
                                        </span>
                                        <span className="min-w-0 text-xs font-semibold leading-tight text-white">
                                            {label}
                                            {hint && <span className={clsx('block text-[10px] font-normal', selected ? 'text-orange-100/80' : 'text-zinc-400')}>{hint}</span>}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                        <FieldError message={errors.collaborationInterests} />
                    </div>

                    <Textarea
                        id="tbrn-additionalInfo"
                        name="additionalInfo"
                        label="Additional Information (optional)"
                        placeholder="Tell us more about your idea, past work or any specific request."
                        value={form.additionalInfo}
                        onChange={handleChange}
                        characterLimit={2000}
                        disabled={isSubmitting}
                        className="h-24"
                    />
                </form>
            )}

            {!result && (
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-zinc-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 md:px-6 md:py-3.5"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        form={FORM_ID}
                        disabled={isSubmitting}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-1.5 text-xs font-black text-white shadow-[0_0_20px_rgba(249,115,22,0.2)] transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 md:px-8 md:py-3.5 md:uppercase md:tracking-widest"
                    >
                        {isSubmitting ? (
                            <>
                                <CgSpinner className="animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                Submit Application
                                <FiArrowRight aria-hidden="true" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </Model>
    );
}
