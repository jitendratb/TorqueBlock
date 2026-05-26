"use client";

import ErrorBoundary from '@/components/atoms/error';
import React from 'react';

export default function ErrorPage({ error, reset }) {
  return (
   <ErrorBoundary error={error} reset={reset} />
  )
}
