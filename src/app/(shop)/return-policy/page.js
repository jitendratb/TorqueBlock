import React from 'react';
import WebPageSchema from '@/components/seo/WebPageSchema';

export const metadata = {
  title: 'Returns & Refund Policy | Torque Block Premium Motorcycle Tyres',
  description: 'Read Torque Block’s returns, cancellations, replacement, and refund policy for premium motorcycle tyres including eligibility conditions, refund timelines, warranty guidelines, and reverse logistics terms.',
  keywords: [
    'motorcycle tyre return policy India',
    'superbike tyre refund policy',
    'premium tyre replacement',
    'motorcycle tyre cancellation',
    'Pirelli tyre returns',
    'Metzeler warranty India',
    'Torque Block refund policy'
  ],
  alternates: { canonical: 'https://torqueblock.com/return-policy' },
  openGraph: {
    title: 'Returns & Refund Policy | Torque Block',
    description: 'Read Torque Block’s returns, cancellations, replacement, and refund policy for premium motorcycle tyres.',
    url: 'https://torqueblock.com/return-policy',
    siteName: 'Torque Block',
    type: 'website',
    images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
  },
};

export default function ReturnPolicyPage() {
  return (
    <>
      <WebPageSchema
        type="WebPage"
        title="Returns & Refund Policy | Torque Block"
        description="Torque Block returns, replacement, cancellation, and refund policy for premium motorcycle tyres."
        url="/return-policy"
      />
      <div className="min-h-screen text-white py-6">
        <div className="max-w-4xl mx-auto px-4">

          <div className="mb-6 text-center">
            <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] block mb-2">
              Store Policies
            </span>

            <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white">
              Returns & <span className="text-orange-500">Refund Policy</span>
            </h1>

            <div className="w-20 h-1 bg-orange-500 rounded-full mt-4 mx-auto" />

          </div>

          {/* MAIN CONTENT */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 lg:p-10 rounded-3xl backdrop-blur-md space-y-10 text-zinc-300 text-sm lg:text-base leading-relaxed">

            {/* INTRO */}
            <section className="space-y-5">

              <p>
                At Torque Block, we aim to maintain transparent and fair return policies
                while ensuring that all premium motorcycle tyres supplied to riders remain
                in factory-grade condition.
              </p>

              <p>
                Since motorcycle tyres are critical performance and safety components,
                all return, replacement, cancellation, and refund requests are subject to
                inspection and eligibility verification.
              </p>

            </section>

            {/* GENERAL GUIDELINES */}
            <section className="space-y-4">

              <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
                1. General Return Guidelines
              </h2>

              <ul className="list-disc pl-5 space-y-3">

                <li>
                  <strong>Return Window:</strong> Return requests must be initiated
                  within 24 hours from the time of delivery.
                  In exceptional situations, some requests may be reviewed up to 48 hours
                  after delivery at the sole discretion of Torque Block.
                </li>

                <li>
                  <strong>Cancellation Window:</strong> Orders may only be cancelled
                  from the time the order is placed until dispatch confirmation.
                </li>

                <li>
                  <strong>Condition of Product:</strong> Products must remain in original,
                  unused, unmounted, and undamaged condition to qualify for return eligibility.
                </li>

                <li>
                  <strong>Proof of Purchase:</strong> Original invoice, order ID,
                  or purchase confirmation must be provided for all return or refund requests.
                </li>

                <li>
                  <strong>Restocking Charges:</strong> Applicable reverse shipping,
                  handling, or nominal restocking deductions may apply on approved returns.
                </li>

              </ul>

            </section>

            {/* RETURN ELIGIBILITY */}
            <section className="space-y-4">

              <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
                2. Conditions for Return Eligibility
              </h2>

              <p>
                Returned products must satisfy all of the following conditions:
              </p>

              <ul className="list-disc pl-5 space-y-3">

                <li>
                  The tyre must be completely unused, unmounted, and unfitted.
                </li>

                <li>
                  Tyres showing signs of installation, rim marks,
                  mounting compound residue, punctures, scratches,
                  bead damage, stretching, or road usage will not be accepted.
                </li>

                <li>
                  Original labels, packaging, stickers,
                  and barcodes must remain intact.
                </li>

                <li>
                  Returned products must pass inspection verification
                  by the Torque Block operations team.
                </li>

              </ul>

            </section>

            {/* NON RETURNABLE */}
            <section className="space-y-4">

              <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
                3. Non-Returnable Situations
              </h2>

              <ul className="list-disc pl-5 space-y-3">

                <li>Mounted or used tyres.</li>

                <li>Products damaged during improper installation or handling.</li>

                <li>Tyres used for racing, track sessions, or competition usage.</li>

                <li>Products missing labels, stickers, or invoice documentation.</li>

                <li>Special-order, imported, or custom-request inventory.</li>

                <li>Requests raised beyond the eligible return review window.</li>

              </ul>

            </section>

            {/* RETURN PROCESS */}
            <section className="space-y-4">

              <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
                4. Return Request Process
              </h2>

              <p>
                To initiate a return request, customers must contact Torque Block support with:
              </p>

              <ul className="list-disc pl-5 space-y-3">

                <li>Order ID or proof of purchase.</li>

                <li>Photos showing tyre condition and packaging.</li>

                <li>Reason for return request.</li>

              </ul>

              <p>
                Return approvals are subject to documentation review and inspection eligibility.
              </p>

            </section>

            {/* INCORRECT SHIPMENT */}
            <section className="space-y-4">

              <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
                5. Incorrect Shipment or Missing Products
              </h2>

              <p>
                If customers receive an incorrect product or incomplete shipment,
                Torque Block will arrange a replacement or resolution after verification.
              </p>

              <p>
                Such concerns must be reported within 24 hours of delivery.
              </p>

            </section>

            {/* DEFECTIVE PRODUCTS */}
            <section className="space-y-4">

              <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
                6. Manufacturing Defects & Warranty
              </h2>

              <p>
                Warranty policies apply only to eligible manufacturing defects
                and do not cover physical damage, punctures,
                improper installation, misuse, accidents,
                racing usage, or road hazards.
              </p>

              <p>
                Warranty evaluations are subject to manufacturer inspection
                and approval processes.
              </p>

            </section>

            {/* REFUND PROCESS */}
            <section className="space-y-4">

              <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
                7. Refund Processing
              </h2>

              <p>
                Approved refunds are processed only after returned products
                are received and inspected by the Torque Block operations team.
              </p>

              <ul className="list-disc pl-5 space-y-3">

                <li>
                  Inspection is generally completed within 48 business hours
                  of receiving the returned product.
                </li>

                <li>
                  Approved refunds are issued to the original payment source.
                </li>

                <li>
                  Refund timelines may vary between 5 to 7 business days
                  depending on payment gateway and banking operations.
                </li>

              </ul>

            </section>

            {/* RESTOCKING */}
            <section className="space-y-4">

              <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
                8. Reverse Shipping & Restocking Charges
              </h2>

              <p>
                Reverse logistics charges, shipping deductions,
                and nominal restocking fees may apply
                for customer-initiated returns.
              </p>

              <p>
                Applicable deductions, if any,
                will be communicated during return approval.
              </p>

            </section>

            {/* ORDER CANCELLATIONS */}
            <section className="space-y-4">

              <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
                9. Order Cancellation Policy
              </h2>

              <ul className="list-disc pl-5 space-y-3">

                <li>
                  Orders may only be cancelled before dispatch confirmation.
                </li>

                <li>
                  Once shipment processing or dispatch has started,
                  cancellation requests may no longer be possible.
                </li>

                <li>
                  Shipment refusal after dispatch may result in
                  applicable shipping and return deductions.
                </li>

              </ul>

            </section>

            {/* RECOMMENDATION */}
            <section className="space-y-4">

              <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
                10. Purchase Recommendations
              </h2>

              <p>
                Customers are encouraged to carefully verify tyre size,
                motorcycle compatibility, riding application,
                and product specifications before placing an order.
              </p>

              <p>
                If assistance is required, riders may contact Torque Block support
                for product guidance before purchase confirmation.
              </p>

            </section>

            {/* CONTACT */}
            <section className="space-y-4">

              <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
                11. Contact & Support
              </h2>

              <p>
                For return, replacement, cancellation,
                refund, or warranty-related assistance,
                customers may contact Torque Block support through:
              </p>

              <ul className="list-disc pl-5 space-y-3">

                <li>WhatsApp Support</li>

                <li>Customer Helpline</li>

                <li>Email Assistance</li>

              </ul>

              <p>
                Customers may also use the WhatsApp support icon
                or contact options available on the Torque Block website
                for faster assistance.
              </p>

            </section>

          </div>
        </div>
      </div>
    </>
  )
}