import React from 'react';

function Textarea({ id, label, value, onChange, placeholder, required, className, characterLimit, ...props }) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={id} className="text-white font-semibold text-sm">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={characterLimit}
                className={`w-full bg-black/20 border border-white/10 rounded-xl p-3.5 text-zinc-300 text-sm placeholder:text-white/40 focus:outline-none focus:border-orange-500 transition-colors resize-none h-20 scrollbar-thin scrollbar-thumb-zinc-700 ${className || ''}`}
                {...props}
            />
            {characterLimit && (
                <div className="flex justify-end">
                    <span className="text-white/80 text-xs">
                        {(value || '').length}/{characterLimit}
                    </span>
                </div>
            )}
        </div>
    );
}

export default Textarea;
