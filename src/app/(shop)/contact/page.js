"use client"

import React, { useState } from "react"
import TorqueBlockApi from "@/lib/api"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, } from "react-icons/fa"
import WebPageSchema from '@/components/seo/WebPageSchema';

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", model: "", message: "", })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value, })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")
      setSuccess(false)

      const response = await TorqueBlockApi.post("/leads/callback-leads", form)
      setForm({ name: "", email: "", phone: "", model: "", message: "", })
      setSuccess(true)

    } catch (err) {
      console.log(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <WebPageSchema 
        type="ContactPage"
        title="Contact Torque Block | Premium Motorcycle Tyre Support"
        description="Connect with premium superbike tyre experts for fitment, sizing, pricing, and delivery support."
        url="/contact"
      />
      <div className="min-h-screen text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="text-orange-500 text-xs font-black uppercase tracking-[0.4em] block mb-3">
              Get In Touch
            </span>

            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight">
              Connect With{" "}
              <span className="text-orange-500">Torque Block</span>
            </h1>

            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mt-5" />

            <p className="text-zinc-400 mt-6 max-w-2xl mx-auto leading-relaxed">
              Need help selecting the perfect tyre setup? Contact our premium
              superbike tyre experts for fitment, sizing, pricing, and delivery
              support.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 h-full">
                <h2 className="text-2xl font-black uppercase text-orange-500 mb-8">
                  Contact Details
                </h2>

                <div className="space-y-8">
                  <a href="tel:+916366625625" className="flex gap-4 group" >
                    <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all">
                      <FaPhoneAlt />
                    </div>

                    <div>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest">
                        Phone Support
                      </p>

                      <h3 className="text-lg font-bold mt-1 group-hover:text-orange-500 transition-all">
                        +91 6366 625 625
                      </h3>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:ops@torqueblock.com"
                    className="flex gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all">
                      <FaEnvelope />
                    </div>

                    <div>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest">
                        Email Enquiry
                      </p>

                      <h3 className="text-lg font-bold mt-1 group-hover:text-orange-500 transition-all">
                        ops@torqueblock.com
                      </h3>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                      <FaMapMarkerAlt />
                    </div>

                    <div>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest">
                        Headquarters
                      </p>

                      <h3 className="text-lg font-bold mt-1">
                        Bangalore, Karnataka, India
                      </h3>
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                      <FaClock />
                    </div>

                    <div>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest">
                        Business Hours
                      </p>

                      <h3 className="text-lg font-bold mt-1">
                        Monday - Saturday
                      </h3>

                      <p className="text-zinc-400 text-sm">
                        10:00 AM - 7:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-800 mt-10 pt-6">
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    We respond to online enquiries within 24 hours. Our tyre
                    specialists are available during business hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 lg:p-10">
                <h2 className="text-3xl font-black uppercase mb-8">
                  Send A{" "}
                  <span className="text-orange-500">
                    Direct Enquiry
                  </span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">{error}</div>}
                  {success && <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm">Thank you for contacting us. We will get back to you shortly!</div>}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">
                        Your Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Torque Block"
                        required
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        required
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="torqueblock@example.com"
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">
                        Motorcycle Model
                      </label>

                      <input
                        type="text"
                        name="model"
                        value={form.model}
                        onChange={handleChange}
                        placeholder="BMW S1000RR"
                        required
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">
                      Message
                    </label>

                    <textarea
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us your tyre requirements, bike usage, preferred riding style, track or touring setup..."
                      required
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-all resize-none"
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white  uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer"
                  >
                    {loading ? "Submitting..." : "Submit Enquiry"}

                    <FaPaperPlane />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}