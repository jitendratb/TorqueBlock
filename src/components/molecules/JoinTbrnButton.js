"use client";

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import JoinTbrnModal from '@/components/organisms/JoinTbrnModal';

export default function JoinTbrnButton({ source, className, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

    const open = () => {
        setHasOpened(true);
        setIsOpen(true);
    };

    return (
        <>
            <button type="button" aria-haspopup="dialog" onClick={open} className={className}>
                {children}
            </button>
            {/* Portal to <body> so the modal doesn't inherit text alignment or other styles from where the button sits */}
            {hasOpened && createPortal(
                <JoinTbrnModal isOpen={isOpen} onClose={() => setIsOpen(false)} source={source} />,
                document.body
            )}
        </>
    );
}
