"use client"
import React, { use, useEffect, useState } from 'react'

function H1Tags() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const title = [
    "India’s No.1 destination for performance tyres",
    "Find The Perfect Tyres For Your Bike & Riding Style",
    // "Confused Which Tyres Are Right For Your Bike?",
    "Get The Right Tyre Setup Without Guesswork",
    "Trusted by 50,000+ riders nationwide",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * title.length);
      setCurrentIndex(randomIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='py-4 md:py-0 flex flex-col justify-center md:block md:max-h-[350px]'>
      <p className='text-2xl lg:text-5xl py-2 lg:py-4'>We Are</p>
      <h1
        key={currentIndex}
        className='text-3xl h-25 md:h-auto md:text-4xl lg:text-6xl font-bold text-orange-500 animate-slide-down-fade'
        id="dynamic-title"
      >
        {title[currentIndex]}
      </h1>
    </div>
  )
}

export default H1Tags;