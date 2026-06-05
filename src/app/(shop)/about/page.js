import React from 'react'
import Link from 'next/link'
import { FaShieldAlt, FaTruck, FaMapPin, FaUserCheck, FaCheckCircle, FaChevronDown } from 'react-icons/fa'
import WhatsAppButton from '@/components/atoms/WhatsAppButton'
import WebPageSchema from '@/components/seo/WebPageSchema'

export async function generateMetadata() {
  return {
    title: 'About Torque Block | India’s Premium Motorcycle Tyre Specialists',
    description: 'Torque Block is India’s trusted destination for premium motorcycle tyres including Pirelli, Michelin, Metzeler, and Bridgestone. Genuine inventory, pan-India delivery, expert superbike tyre consultation, and rider-first support.',
    keywords: [
      'premium motorcycle tyres India',
      'superbike tyres India',
      'Pirelli tyres India',
      'Metzeler tyres India',
      'Michelin motorcycle tyres',
      'performance motorcycle tyres',
      'bike tyre experts India',
      'Torque Block'
    ],
    alternates: { canonical: 'https://www.torqueblock.com/about' },
    openGraph: {
      title: 'About Torque Block | India’s Premium Motorcycle Tyre Specialists',
      description: 'Torque Block is India’s trusted destination for premium motorcycle tyres including Pirelli, Michelin, Metzeler, and Bridgestone.',
      url: 'https://www.torqueblock.com/about',
      siteName: 'Torque Block',
      images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
      type: 'website',
    },
  };
}

export default function AboutPage() {
  const values = [
    {
      icon: <FaShieldAlt size={24} />,
      title: '100% Genuine Inventory',
      desc: 'Every tyre is sourced through verified distribution channels with strict authenticity checks and freshness standards.'
    },
    {
      icon: <FaTruck size={24} />,
      title: 'Pan-India Delivery',
      desc: 'Secure multi-layer packaging and trusted logistics partnerships ensure safe delivery across India.'
    },
    {
      icon: <FaMapPin size={24} />,
      title: 'Verified Fitment Partners',
      desc: 'We work with trusted superbike garages and fitment partners in major cities for professional installation support.'
    },
    {
      icon: <FaUserCheck size={24} />,
      title: 'Expert Rider Consultation',
      desc: 'Get tyre recommendations based on your motorcycle, riding style, terrain, and performance expectations.'
    }
  ]

  const faqs = [
    {
      q: 'Are all tyres sold by Torque Block genuine?',
      a: 'Yes. All tyres are sourced from verified brand-authorized distribution channels with strict authenticity checks.'
    },
    {
      q: 'Do you deliver across India?',
      a: 'Yes. Torque Block ships premium motorcycle tyres across India with secure packaging and logistics support.'
    },
    {
      q: 'Can you help me choose the right tyres?',
      a: 'Absolutely. Our team helps riders select tyres based on motorcycle category, riding style, terrain, and usage.'
    },
    {
      q: 'Do you support superbikes and premium motorcycles?',
      a: 'Yes. Torque Block specializes in performance motorcycles, superbikes, hypersport, touring, and adventure motorcycles.'
    },
    {
      q: 'Do you provide fitment support?',
      a: 'Yes. We work with garage partners and fitment specialists in multiple cities across India.'
    }
  ]

  return (
    <>
      <WebPageSchema 
        type="AboutPage"
        title="About Torque Block"
        description="India’s premium motorcycle tyre platform for superbikes and performance motorcycles."
        url="/about"
      />
      <div className="min-h-screen py-8">

      <div className="space-y-8">
        <div className="text-center">

          <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] block mb-3">
            India’s Premium Motorcycle Tyre Platform
          </span>

          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white">
            About <span className="text-orange-500">Torque Block</span>
          </h1>

          <div className="w-24 h-1 bg-orange-500 rounded-full mx-auto mt-5" />

        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 lg:p-12 rounded-[2rem] backdrop-blur-md space-y-6">

          <p className="text-white text-lg lg:text-xl font-bold leading-relaxed">
            Torque Block was built to solve one of the biggest problems faced by premium motorcycle riders in India —
            access to genuine, high-performance tyres backed by real expertise.
          </p>

          <p className="text-zinc-300 text-sm lg:text-base leading-relaxed">
            For years, superbike owners across India struggled with counterfeit inventory,
            old manufacturing stock, improper storage conditions, and limited access to premium global brands.
            Riders investing heavily into their motorcycles were still forced to compromise on the only point of contact with the road — their tyres.
          </p>

          <p className="text-zinc-300 text-sm lg:text-base leading-relaxed">
            Torque Block was created to change that.
            We built a rider-first platform focused exclusively on premium motorcycle tyres from globally trusted brands including Pirelli, Metzeler, Michelin, Bridgestone, and more.
          </p>

          <p className="text-zinc-300 text-sm lg:text-base leading-relaxed">
            From aggressive track compounds and hypersport setups to sport-touring and adventure applications,
            we help riders choose the right tyre based on riding style, motorcycle category, terrain, weather conditions, and performance expectations.
          </p>

          <p className="text-zinc-300 text-sm lg:text-base leading-relaxed">
            Every tyre shipped through Torque Block goes through strict authenticity verification,
            inventory freshness checks, and protective logistics handling to ensure factory-grade performance and reliability.
          </p>

        </div>

        <div className="">
          <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight text-center text-white mb-12">
            Why Riders <span className="text-orange-500">Trust Torque Block</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {values.map((v, i) => (
              <div
                key={i}
                className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-2xl flex gap-5 items-start"
              >

                <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                  {v.icon}
                </div>

                <div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {v.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">

            <div className="flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-orange-500" />
              <h3 className="text-white font-bold text-lg">
                Inventory Freshness Standards
              </h3>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              We prioritize recently manufactured inventory and maintain proper storage standards
              to preserve compound integrity, grip performance, and tyre reliability.
            </p>

          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">

            <div className="flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-orange-500" />
              <h3 className="text-white font-bold text-lg">
                Rider-Focused Consultation
              </h3>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Our recommendations are based on real rider usage including track riding,
              highway touring, city performance, aggressive cornering, and long-distance stability.
            </p>

          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">

            <div className="flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-orange-500" />
              <h3 className="text-white font-bold text-lg">
                Pan-India Fulfilment
              </h3>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Torque Block delivers premium motorcycle tyres across India with secure packaging,
              trusted logistics support, and garage partner coordination.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-950 border border-zinc-900 p-8 rounded-3xl text-center">
          <div>
            <p className="text-3xl lg:text-4xl font-black text-orange-500">
              200000+
            </p>

            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-1">
              Tyres Delivered
            </p>
          </div>

          <div>
            <p className="text-3xl lg:text-4xl font-black text-white">
              100%
            </p>

            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-1">
              Genuine Inventory
            </p>
          </div>

          <div>
            <p className="text-3xl lg:text-4xl font-black text-white">
              400+
            </p>

            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-1">
              Cities Serviced
            </p>
          </div>

          <div>
            <p className="text-3xl lg:text-4xl font-black text-white">
              100+
            </p>

            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-1">
              Garage Partners
            </p>
          </div>

        </div>

        <div className="">
          <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight text-center text-white mb-6">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>

          <div className="space-y-4">

            {faqs?.map((faq, i) => (
              <details
                key={i}
                className="group border border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700/60 rounded-2xl overflow-hidden transition-all duration-300 group-open:bg-zinc-900/50 group-open:border-orange-500/30 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between p-4 text-white font-bold text-base md:text-lg cursor-pointer select-none list-none outline-none hover:text-orange-400 group-open:text-orange-500 transition-all duration-300">
                  <span>{faq.q}</span>
                  <FaChevronDown className="w-5 h-5 text-zinc-500 group-open:text-orange-500 transform group-open:rotate-180 transition-all duration-300" />
                </summary>

                <div className="px-6 pb-6 pt-2 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/40 mt-1">
                  <p className="animate-fade-in">{faq.a}</p>
                </div>
              </details>
            ))}

          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md rounded-[2rem] p-7 lg:p-10 text-center">
          <h2 className="text-3xl lg:text-5xl font-black text-white  mb-5 uppercase tracking-tighter">
            Need Help Choosing <br className="hidden md:inline" /><span className='text-orange-500'>The Right Tyres?</span>
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto mb-10 text-sm lg:text-base leading-relaxed">
            Connect with premium performance tyre specialists. Get customized suggestions tailored for your motorcycle, compound preferences, and riding style.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

            <div className="w-full sm:w-auto min-w-[280px]">
              <WhatsAppButton
                text="CLAIM FREE FITMENT PLAN"
                value="Hey Torque Block! I'm on your About page and would like to get a free Expert Fitment Plan to see which tyres match my riding style and motorcycle setup."
                className='h-14 w-full'
              />
            </div>

            <Link
              href="/tyres"
              className="w-full sm:w-auto h-14 flex items-center justify-center border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-900 text-zinc-400 hover:text-white px-8 rounded-xl font-bold transition-all text-sm uppercase tracking-wider"
            >
              Browse Tyres
            </Link>

          </div>

        </div>
      </div>
    </div>
    </>
  )
}