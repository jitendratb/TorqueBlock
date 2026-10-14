import React from 'react'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa'
import TorqueBlockApi from '@/lib/api'
import { Input } from '@/components/atoms/input'
import Textarea from '@/components/atoms/textarea'
import WhatsAppButton from '@/components/atoms/WhatsAppButton'
import WebPageSchema from '@/components/seo/WebPageSchema'
import { siteConfig } from '@/config/site'

export async function generateMetadata() {
  return {
    title: 'Contact Torque Block | Get Expert Tyre Selection Support',
    description: 'Need help choosing tyres for your superbike? Get in touch with our performance motorcycle tyre specialists via phone, email, WhatsApp, or by submitting an enquiry.',
    alternates: { canonical: 'https://www.torqueblock.com/contact' },
    openGraph: {
      title: 'Contact Torque Block | Get Expert Tyre Selection Support',
      description: 'Need help choosing tyres for your superbike? Get in touch with our performance motorcycle tyre specialists.',
      url: 'https://www.torqueblock.com/contact',
      siteName: 'Torque Block',
      images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
      type: 'website',
    },
  };
}

async function submitEnquiry(formData) {
  'use server'

  const lead = {
    name: formData.get('name')?.toString().trim() || '',
    phone: formData.get('phone')?.toString().trim() || '',
    model: formData.get('model')?.toString().trim() || '',
    message: formData.get('message')?.toString().trim() || '',
  }

  try {
    await TorqueBlockApi.post('/leads/callback-leads', lead)
  } catch (err) {
    console.error('[ContactPage] Failed to save enquiry:', err?.message ?? err)
  }

  const text = [
    'Hi Torque Block, I need help choosing tyres for my motorcycle.',
    '',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Motorcycle: ${lead.model}`,
    '',
    lead.message,
  ].join('\n')

  const phoneNumber = '916366625625'
  const userAgent = (await headers()).get('user-agent') || ''
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent)

  redirect(isMobile
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(text)}`)
}

export default async function ContactPage() {
  const details = [
    { icon: <FaPhoneAlt />, label: 'Phone Support', value: '+91 6366 625 625', href: 'tel:+916366625625' },
    { icon: <FaEnvelope />, label: 'Email Enquiry', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: <FaMapMarkerAlt />, label: 'Headquarters', value: 'Bangalore, Karnataka, India' },
    { icon: <FaClock />, label: 'Business Hours', value: 'Monday - Saturday', note: '10:00 AM - 7:00 PM IST' },
  ]

  return (
    <>
      <WebPageSchema
        type="ContactPage"
        title="Contact Torque Block | Premium Motorcycle Tyre Support"
        description="Connect with premium superbike tyre experts for fitment, sizing, pricing, and delivery support."
        url="/contact"
      />
      <div className="h-full py-8">
        <div className="space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-orange-500/70 md:w-12" />
              <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em]">
                Get In Touch
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-orange-500/70 md:w-12" />
            </div>

            <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Connect <span className="text-orange-500"> With Us</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-[2fr_3fr] gap-4">
            <div className="">
              <div className="bg-white/10 space-y-4 border border-zinc-800/80 backdrop-blur-md rounded-[2rem] p-6 h-full flex flex-col">
                <h2 className="text-2xl font-black tracking-tight text-white">
                  Contact <span className="text-orange-500">Details</span>
                </h2>

                <div className="space-y-4">
                  {details.map((d) => {
                    const content = (
                      <>
                        <div className="h-10 w-10 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-black transition-all">
                          {d.icon}
                        </div>

                        <div>
                          <p className="text-zinc-500 text-xs font-bold tracking-widest">
                            {d.label}
                          </p>
                          <p className="text-white text-sm font-bold group-hover:text-orange-500 transition-all">
                            {d.value}
                          </p>
                          {d.note && <p className="text-zinc-400 text-sm">{d.note}</p>}
                        </div>
                      </>
                    )

                    return d.href ? (
                      <a key={d.label} href={d.href} className="flex gap-4 items-center group">
                        {content}
                      </a>
                    ) : (
                      <div key={d.label} className="flex gap-4 items-center">
                        {content}
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-zinc-800/80  space-y-4 lg:mt-auto">
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Quick question? Chat with us on WhatsApp.
                  </p>

                  <WhatsAppButton
                    text="Chat with an Expert"
                    value="I'm on your Contact page and need help choosing the right tyres for my motorcycle. Can you help me with sizing, pricing, and fitment?"
                    className="h-14 w-full"
                  />

                  <p className="text-zinc-500 text-xs leading-relaxed">
                    We respond to online enquiries within 24 hours during business hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              <div className="bg-white/10 space-y-4 border border-zinc-800/80 backdrop-blur-md rounded-[2rem] p-6 h-full">
                <h2 className="text-2xl font-black tracking-tight text-white">
                  Send A <span className="text-orange-500">Direct Enquiry</span>
                </h2>

                <form action={submitEnquiry} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input id="name" type="text" name="name" label="Your Name *" placeholder="Torque Block" required variant="glass" />
                    <Input id="phone" type="tel" name="phone" label="Phone Number *" placeholder="+91 9876543210" required variant="glass" />
                  </div>

                  <Input id="model" type="text" name="model" label="Motorcycle Model *" placeholder="BMW S1000RR" required variant="glass" />

                  <Textarea
                    id="message"
                    name="message"
                    label="Message"
                    placeholder="Tell us your tyre requirements, bike usage, preferred riding style, track or touring setup..."
                    required
                    className="h-28 bg-white/[0.02] rounded-lg px-2.5 md:px-3.5 py-2 md:py-3 text-white placeholder:text-gray-300 hover:border-orange-500"
                  />

                  <button
                    type="submit"
                    className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                  >
                    <FaWhatsapp className="text-lg" />
                    Send on WhatsApp
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
