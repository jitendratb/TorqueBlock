'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RefreshButton() {
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.refresh();
        // Reset state after a short delay to allow UI to show loading state
        setTimeout(() => setIsRefreshing(false), 500);
    };

    return (
        <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="mt-4 px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 
                     bg-zinc-100 text-zinc-900 hover:bg-white active:scale-95 
                     disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100
                     flex items-center gap-2 mx-auto"
        >
            {isRefreshing ? (
                <>
                    <svg className="animate-spin h-4 w-4 text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Refreshing...
                </>
            ) : (
                <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Try Again
                </>
            )}
        </button>
    );
}
