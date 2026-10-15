import React from 'react'
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa'
import WhatsAppButton from '@/components/atoms/WhatsAppButton'
import WebPageSchema from '@/components/seo/WebPageSchema'

export async function generateMetadata() {
  return {
    title: 'Contact Torque Block | Get Expert Tyre Selection Support',
    description: 'Need help choosing tyres for your superbike? Get in touch with our performance motorcycle tyre specialists via WhatsApp, phone, or email.',
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

const helpTopics = [
  'Tyre fitment & sizing',
  'Pricing & availability',
  'Track, street & touring setups',
  'Delivery & order support',
]

const details = [
  { icon: <FaPhoneAlt />, label: 'Call Us', value: '+91 6366 625 625', note: 'Talk to a tyre specialist', href: 'tel:+916366625625' },
  { icon: <FaMapMarkerAlt />, label: 'Headquarters', value: 'Bangalore, Karnataka', note: 'Shipping across India' },
  { icon: <FaMapMarkerAlt />, label: 'Delhi Branch', value: 'Naraina, New Delhi', note: 'View on map', href: 'https://share.google/tUeXufqut8begnL9f', external: true },
  { icon: <FaClock />, label: 'Business Hours', value: 'Monday - Saturday', note: '10:00 AM - 7:00 PM IST' },
]

export default function ContactPage() {
  return (
    <>
      <WebPageSchema
        type="ContactPage"
        title="Contact Torque Block | Premium Motorcycle Tyre Support"
        description="Connect with premium superbike tyre experts for fitment, sizing, pricing, and delivery support."
        url="/contact"
      />
      <div className="py-8">
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

            <p className="text-zinc-400 mt-4 max-w-2xl text-sm lg:text-base leading-relaxed">
              Need help selecting the perfect tyre setup? Our superbike tyre experts are here for
              fitment, sizing, pricing, and delivery support.
            </p>
          </div>

          <div className="bg-white/10 border border-zinc-800/80 backdrop-blur-md rounded-[2rem] p-6 lg:p-10 grid lg:grid-cols-[3fr_2fr] gap-8 items-center">
            <div className="space-y-5">
              <span className="block text-orange-500 text-[10px] font-black uppercase ">
                Fastest Response
              </span>

              <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-white">
                Talk To A <span className="text-orange-500">Tyre Expert</span>
              </h2>

              <p className="text-zinc-400 text-sm lg:text-base leading-relaxed max-w-xl">
                Tell us your motorcycle and how you ride. We&apos;ll recommend the right tyres,
                confirm sizing, and share pricing on WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-auto sm:min-w-[260px]">
                  <WhatsAppButton
                    text="Chat on WhatsApp"
                    value="I'm on your Contact page and need help choosing the right tyres for my motorcycle. Can you help me with sizing, pricing, and fitment?"
                    className="h-12 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/10 border border-zinc-800/80 rounded-2xl p-6 space-y-4">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                We can help with
              </p>

              <ul className="space-y-3">
                {helpTopics.map((topic) => (
                  <li key={topic} className="flex items-center gap-3 text-white text-sm font-semibold">
                    <FaCheckCircle className="text-orange-500 shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {details.map((d) => {
              const content = (
                <>
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black transition-all">
                    {d.icon}
                  </div>

                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                      {d.label}
                    </p>
                    <p className="text-white text-sm font-bold break-words group-hover:text-orange-500 transition-all">
                      {d.value}
                    </p>
                    <p className="text-zinc-400 text-xs">{d.note}</p>
                  </div>
                </>
              )

              const cardClass = 'bg-white/10 border border-zinc-800/80 backdrop-blur-md rounded-2xl p-5 flex items-center gap-4 sm:flex-col sm:items-start'

              return d.href ? (
                <a key={d.label} href={d.href} target={d.external ? '_blank' : undefined} rel={d.external ? 'noopener noreferrer' : undefined} className={`${cardClass} group hover:border-orange-500/40 transition-all`}>
                  {content}
                </a>
              ) : (
                <div key={d.label} className={cardClass}>
                  {content}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
