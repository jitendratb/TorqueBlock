'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FiRefreshCw } from 'react-icons/fi';

export default function InfiniteScroll({
  children,
  hasMore = false,
  loading = false,
  onLoadMore,
  threshold = 0.1,
  rootMargin = '250px',
  scrollableTargetId = null,
  scrollableRef = null,
  loader = null,
  endMessage = null,
  error = null,
  onRetry = null,
  className = '',
  sentinelClassName = ''
}) {
  const sentinelRef = useRef(null);
  const loadingLockRef = useRef(false);

  useEffect(() => {
    loadingLockRef.current = loading;
  }, [loading]);

  const handleIntersect = useCallback(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting && hasMore && !loadingLockRef.current && !error && onLoadMore) {
        loadingLockRef.current = true;
        onLoadMore();
      }
    },
    [hasMore, error, onLoadMore]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let rootElement = null;
    if (scrollableRef?.current) {
      rootElement = scrollableRef.current;
    } else if (scrollableTargetId) {
      rootElement = document.getElementById(scrollableTargetId);
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root: rootElement,
      rootMargin,
      threshold
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, rootMargin, threshold, scrollableRef, scrollableTargetId]);

  return (
    <div className={`w-full ${className}`}>
      {children}

      <div
        ref={sentinelRef}
        className={`w-full flex flex-col items-center justify-center py-6 min-h-[50px] transition-all duration-300 ${sentinelClassName}`}
      >
        {error && (
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            <span>{typeof error === 'string' ? error : 'Failed to load content.'}</span>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white font-semibold text-xs transition cursor-pointer active:scale-95"
              >
                <FiRefreshCw className="text-xs" />
                Retry
              </button>
            )}
          </div>
        )}

        {!error && loading && (
          loader || (
            <div className="flex items-center justify-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-orange-400 text-xs font-semibold shadow-lg">
              <CgSpinner className="animate-spin text-lg text-orange-500" />
              <span className="tracking-wide">Loading content...</span>
            </div>
          )
        )}

        {!error && !loading && !hasMore && endMessage && (
          <div className="text-center text-zinc-500 text-xs py-3 font-medium tracking-wide">
            {typeof endMessage === 'string' ? endMessage : endMessage}
          </div>
        )}
      </div>
    </div>
  );
}
