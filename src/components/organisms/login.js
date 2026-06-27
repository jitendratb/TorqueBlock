import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa6';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';
import Model from './CustomModel';
import { Input } from '../atoms/input';
import useAuthStore from '@/stores/authStore';
import { useToast } from '@/context/ToastContext';

function Login({ isOpen, onClose }) {
    const [step, setStep] = useState('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const otpRefs = useRef([]);

    const storeLogin = useAuthStore((state) => state.login);
    const storeVerifyOtp = useAuthStore((state) => state.verifyOtp);
    const storeResendOtp = useAuthStore((state) => state.resendOtp);
    const storeClearError = useAuthStore((state) => state.clearError);
    const toast = useToast();

    useEffect(() => {
        let interval = null;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    useEffect(() => {
        if (!isOpen) {
            setStep('phone');
            setPhoneNumber('');
            setOtp(['', '', '', '', '', '']);
            setError('');
            setIsLoading(false);
            setTimer(30);
            setIsTimerActive(false);
            storeClearError();
        }
    }, [isOpen, storeClearError]);

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            setPhoneNumber(value);
            setError('');
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!phoneNumber) {
            setError('Please enter your mobile number.');
            return;
        }
        if (phoneNumber.length !== 10) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }

        setIsLoading(true);
        setError('');
        storeClearError();

        try {
            const data = await storeLogin(phoneNumber);
            setStep('otp');
            setTimer(30);
            setIsTimerActive(true);
            toast.success(data?.message || "OTP Sent Successfully");
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to send OTP. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (value, index) => {
        const cleanValue = value.replace(/\D/g, '');
        if (!cleanValue) {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = cleanValue.slice(-1);
        setOtp(newOtp);

        if (index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                const newOtp = [...otp];
                newOtp[index - 1] = '';
                setOtp(newOtp);
                otpRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pastedData.length === 6) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            otpRefs.current[5]?.focus();
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (!otpCode) {
            setError('Please enter the verification code.');
            return;
        }
        if (otpCode.length !== 6) {
            setError('Please enter a complete 6-digit OTP.');
            return;
        }

        setIsLoading(true);
        setError('');
        storeClearError();

        try {
            const data = await storeVerifyOtp(otpCode);
            console.log(data);
       
                setStep('success');
                setTimeout(() => {
                    onClose();
                }, 2000);
        } catch (err) {
            setError(err?.response?.data?.message || 'Invalid or expired OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (isTimerActive) return;
        setIsLoading(true);
        setError('');
        storeClearError();

        try {
            const data = await storeResendOtp(phoneNumber);
            if (data?.success) {
                setOtp(['', '', '', '', '', '']);
                setTimer(30);
                setIsTimerActive(true);
                otpRefs.current[0]?.focus();
                toast.success(data?.message || 'OTP Resent Successfully');
            } else {
                setError(data?.message || 'Failed to resend OTP.');
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Model
            isOpen={isOpen}
            onClose={onClose}
            title={step === 'success' ? '' : 'Authentication'}
            subtitle={
                step === 'phone' ? 'Enter your mobile number to receive an OTP' : step === 'otp' ? `Enter the 6-digit code sent to +91 ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}` : ''
            }
            themeGlow={step === 'success' ? 'green' : 'orange'}
            size="sm"
            closeOnBackdropClick={!isLoading && step !== 'success'}
            showCloseButton={!isLoading && step !== 'success'}
        >
            <div className="w-full  flex flex-col justify-center">
                {step === 'phone' && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <Input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Mobile Number"
                            placeholder="Enter 10-digit number"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            disabled={isLoading}
                            autoComplete="off"
                            required
                            pattern="[0-9]{10}"
                            variant="glass"
                            size="lg"
                            error={error}
                            leftIcon={
                                <div className="text-sm font-semibold text-white border-r border-white/10 pr-3 flex items-center gap-1.5 pointer-events-none select-none">
                                    <span>+91</span>
                                </div>
                            }
                            autoFocus
                        />

                        <button
                            type="submit"
                            disabled={isLoading || phoneNumber.length !== 10}
                            className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-white cursor-pointer transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] disabled:opacity-40 disabled:pointer-events-none"
                            style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }}
                        >
                            Get One-Time Password
                            {isLoading ? (
                                <CgSpinner className="animate-spin text-lg" />
                            ) : (
                                <FaArrowRight className="text-xs" />
                            )}
                        </button>
                    </form>
                )}

                {step === 'otp' && (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                                    Verification Code
                                </label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep('phone');
                                        setError('');
                                        setOtp(['', '', '', '', '', '']);
                                    }}
                                    disabled={isLoading}
                                    className="text-[10px] font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition flex items-center gap-1 cursor-pointer"
                                >
                                    <FaArrowLeft className="text-[9px]" /> Change Number
                                </button>
                            </div>

                              <div className="grid grid-cols-6 gap-2 md:px-4" onPaste={handleOtpPaste}>
                                {otp.map((digit, idx) => (
                                    <Input
                                        key={idx}
                                        type="tel"
                                        maxLength={1}
                                        value={digit}
                                        ref={(el) => (otpRefs.current[idx] = el)}
                                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                                        disabled={isLoading}
                                        required
                                        pattern="[0-9]{1}"
                                        autoComplete="one-time-code"
                                        variant="glass"
                                        size="sm"
                                        wrapperClassName="aspect-square !p-0 flex items-center justify-center"
                                        className="text-center text-lg font-bold "
                                        autoFocus={idx === 0}
                                    />
                                ))}
                            </div>
                    
                            {error && <p className="text-red-400 text-xs font-semibold mt-1 text-center">{error}</p>}
                        </div>

                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={isLoading || otp.join('').length !== 6}
                                className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-white cursor-pointer transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] disabled:opacity-40 disabled:pointer-events-none"
                                style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }}
                            >

                                Verify & Proceed

                                {isLoading ? (
                                    <CgSpinner className="animate-spin text-lg" />
                                ) : (
                                    <FaArrowRight className="text-xs" />
                                )}
                            </button>

                            <div className="text-center">
                                <p className="text-[11px] text-zinc-500 font-medium">
                                    {isTimerActive ? (
                                        <>
                                            Resend code in{' '}
                                            <span className="text-orange-400 font-bold">{timer}s</span>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            disabled={isLoading}
                                            className="text-[11px] font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition cursor-pointer disabled:opacity-50"
                                        >
                                            Resend Code
                                        </button>
                                    )}
                                </p>
                            </div>
                        </div>
                    </form>
                )}

                {step === 'success' && (
                    <div className="flex flex-col items-center justify-center text-center space-y-4 py-6">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-bounce-slow shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                            <IoShieldCheckmarkOutline className="text-3xl" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-white text-base font-black uppercase tracking-wider">Login Successful</h3>
                            <p className="text-zinc-400 text-xs font-medium max-w-[240px]">
                                Welcome back to TorqueBlock. Redirecting you to your account...
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Model>
    );
}

export default Login;