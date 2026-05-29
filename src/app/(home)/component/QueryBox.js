"use client"
import CustomDropdown from '@/components/atoms/CustomDropdown';
import React, { useEffect, useState } from 'react'
import TorqueBlockApi from "@/lib/api"
import { FaWhatsapp } from "react-icons/fa";

function QueryBox() {
  const [selectedTyre, setSelectedTyre] = useState({});
  const [tyreOptions, setTyreOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [selectedModel, setSelectedModel] = useState({});


  useEffect(() => {
    const handleCompatibleTyre = async () => {
      try {
        const res = await TorqueBlockApi.get("/compatible")
        setTyreOptions(res?.brands || [])
      } catch (error) {
        console.log(error)
      }
    }

    handleCompatibleTyre();
  }, [])

  useEffect(() => {
    const handleCompatibleModel = async () => {
      if (!selectedTyre?._id) {
        setModelOptions([]);
        return;
      }

      try {
        const res = await TorqueBlockApi.get(`compatible/brandmodels/${selectedTyre?._id}`)
        setModelOptions(res?.vehicleModels || [])
      } catch (error) {
        console.log(error)
      }
    }

    handleCompatibleModel();
  }, [selectedTyre])

  const HandleFormClick = (e) => {
    e.preventDefault();
    let message = `Hi Torque Block, I need a tyre recommendation for my bike. My bike is:\nBike: ${selectedTyre?.value}\nModel: ${selectedModel?.value}`;
    const phoneNumber = "916366625625";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '');
    const url = isMobile
      ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <div className='h-full w-full'>
      <form onSubmit={HandleFormClick} className='space-y-2 max-w-md px-4 py-4 md:px-6 md:py-8 rounded-lg mx-auto border border-gray-400 bg-white/20 backdrop-blur-xs'>
        <h1 className='text-center text-[22px] md:text-2xl lg:font-bold'>
          <span className='block lg:hidden'>
            Get Expert Tyre Advice
          </span>

          <span className='hidden lg:block'>
            Get Expert Tyre Recommendations
          </span>
        </h1>
        <p className='text-center text-orange-500 text-xs md:text-sm'>Bike-specific tyre advice on WhatsApp in under 2 minutes.</p>
        <div>
          <p className='text-white text-sm pb-2'>Select Bike</p>
          <CustomDropdown
            options={tyreOptions?.map((item) => ({ label: item.brandName, value: item.brandName, ...item })) || []}
            value={selectedTyre?.value}
            onChange={(option) => { setSelectedTyre(option) }}
            placeholder="Choose Your Bike Brand"
            searchable={true}
          />
        </div>

        <div>
          <p className='text-white text-sm pb-2'>Select Model</p>
          <CustomDropdown
            options={modelOptions?.map((item) => ({ label: item.modelName, value: item.modelName, ...item })) || []}
            value={selectedModel?.value}
            onChange={(option) => { setSelectedModel(option) }}
            placeholder="Choose Your Bike Model"
            searchable={true}
            disabled={!selectedTyre?._id}
          />

        </div>

        <button type="submit" disabled={!selectedModel?._id && !selectedModel?.value} className={`
        relative overflow-hidden w-full mt-4 py-4 rounded-xl flex items-center justify-center font-semibold
        transition-all duration-300 ease-in-out
        ${!selectedModel?._id && !selectedModel?.value
            ? "bg-gray-400/80 text-gray-200 cursor-not-allowed backdrop-blur-sm"
            : "bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:bg-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:-translate-y-1 active:translate-y-0"
          }
      `}>  <FaWhatsapp className={`text-xl transition-transform duration-300 ${!selectedModel?._id && !selectedModel?.value ? "group-hover:scale-110 animate-pulse" : ""}`} />
          <span className='ml-3 text-sm tracking-wide'>Ask Tyre Expert on WhatsApp</span></button>
      </form>
    </div>
  )
}

export default QueryBox