"use client"
import React, { use, useEffect, useState } from 'react'

function H1Tags() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const title = [
  "India’s No.1 Destination for Performance Tyres",
  "Find the Perfect Tyres for Your Bike & Riding Style",
  "Get the Right Tyre Setup Without the Guesswork",
  "Trusted by 50,000+ Riders Nationwide",
];

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % title.length);
      }, 3000);
      return () => clearInterval(interval);
    }, 4000);

    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <div className='py-4 md:py-0 flex flex-col justify-center md:block min-h-[160px] md:min-h-[350px]'>
      <p className='text-2xl lg:text-5xl py-2 lg:py-4'>We are</p>
      <h1
        key={currentIndex}
        className='text-3xl md:text-4xl lg:text-6xl font-bold text-orange-500 animate-slide-down-fade'
        id="dynamic-title"
      >
        {title[currentIndex]}
      </h1>
    </div>
  )
}

export default H1Tags;