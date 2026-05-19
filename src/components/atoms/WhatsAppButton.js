"use client"
import React from 'react'
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton({ 
  text = "Ask Tyre Expert on WhatsApp", 
  disabled = false, 
  value = "",
  className = "" 
}) {

   const HandleFormClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let message = `Hi Torque Block, ${value}`;
    const phoneNumber = "916366625625";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  }
  
  return (
    <button
      type="submit"
  
      onClick={HandleFormClick}
      className={`
        relative overflow-hidden w-full py-2 lg:py-3 rounded-xl flex items-center justify-center font-semibold
        transition-all duration-300 ease-in-out
        ${disabled 
          ? "bg-gray-400/80 text-gray-200 cursor-not-allowed backdrop-blur-sm" 
          : "bg-green-500 text-white  hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:-translate-y-1 active:translate-y-0"
        }
        ${className}
      `}
    >
      <FaWhatsapp className={`text-xl transition-transform duration-300 ${!disabled ? "group-hover:scale-110" : ""}`} />
      <span className='ml-3 text-sm tracking-wide'>{text}</span>
    </button>
  )
}
