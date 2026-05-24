import React from 'react';
import WebPageSchema from '@/components/seo/WebPageSchema';

export async function generateMetadata() {
  return ;
}

export default function TermsPage() {
  return (
    <>
      <WebPageSchema 
        type="WebPage"
        title="Terms & Conditions | Torque Block"
        description="Torque Block terms and conditions for website usage, product purchases, warranties, and customer responsibilities."
        url="/terms"
      />
      <div className="min-h-screen text-white py-6">
        <div className="">
        <div className="mb-10 flex flex-col items-center text-center">

          <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] block mb-2">
            Legal & Security
          </span>

          <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white">
            Terms & <span className="text-orange-500">Conditions</span>
          </h1>

          <div className="w-20 h-1 bg-orange-500 rounded-full mt-4" />

        </div>

        {/* MAIN CONTENT */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 lg:p-10 rounded-3xl backdrop-blur-md space-y-10 text-zinc-300 text-sm lg:text-base leading-relaxed">

          {/* INTRO */}
          <section className="space-y-5">

            <p>
              Welcome to Torque Block.
              By accessing our website, purchasing products,
              or interacting with our services,
              you agree to comply with the following Terms & Conditions.
            </p>

            <p>
              These terms govern website usage,
              product purchases, consultations,
              logistics coordination, and customer interactions
              with Torque Block.
            </p>

          </section>

          {/* WEBSITE USAGE */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              1. Website Usage
            </h2>

            <p>
              Torque Block provides product listings,
              motorcycle tyre recommendations,
              fitment guidance,
              comparison tools,
              and related ecommerce services.
            </p>

            <p>
              Users agree not to misuse,
              disrupt,
              reverse-engineer,
              scrape,
              automate,
              or attempt unauthorized access
              to any part of the website,
              database systems,
              APIs,
              or operational infrastructure.
            </p>

          </section>

          {/* PRODUCT INFO */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              2. Product Information & Fitment Responsibility
            </h2>

            <p>
              Torque Block makes commercially reasonable efforts
              to provide accurate tyre specifications,
              fitment information,
              and compatibility guidance.
            </p>

            <p>
              However,
              final responsibility for verifying tyre size,
              load rating,
              speed rating,
              wheel compatibility,
              and motorcycle fitment remains with the customer.
            </p>

            <p>
              Customers are advised to verify motorcycle manufacturer specifications,
              owner manuals,
              and current wheel setup details before placing an order.
            </p>

            <p>
              Torque Block shall not be held responsible
              for compatibility issues arising from modified motorcycles,
              aftermarket wheel conversions,
              custom swingarms,
              incorrect customer selections,
              or improper installation.
            </p>

          </section>

          {/* PRICING */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              3. Pricing, Inventory & Order Acceptance
            </h2>

            <p>
              Product pricing,
              stock availability,
              specifications,
              and promotional offers
              are subject to change without prior notice.
            </p>

            <p>
              While Torque Block attempts to maintain accurate inventory
              and pricing information,
              occasional technical,
              administrative,
              or synchronization errors may occur.
            </p>

            <p>
              Torque Block reserves the right to:
            </p>

            <ul className="list-disc pl-5 space-y-3">

              <li>Cancel or refuse orders affected by pricing or inventory errors.</li>

              <li>Limit order quantities where necessary.</li>

              <li>Request additional customer verification before processing high-value orders.</li>

              <li>Issue refunds for cancelled or unavailable orders.</li>

            </ul>

          </section>

          {/* PAYMENTS */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              4. Payments & Transaction Security
            </h2>

            <p>
              Payments are processed through third-party payment gateways
              using secure encrypted transaction systems.
            </p>

            <p>
              Torque Block does not store sensitive payment credentials
              such as card numbers,
              CVV details,
              or banking passwords on local servers.
            </p>

          </section>

          {/* SHIPPING */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              5. Shipping & Delivery
            </h2>

            <p>
              Shipping timelines are estimates
              and may vary depending on logistics operations,
              courier serviceability,
              regional conditions,
              and operational constraints.
            </p>

            <p>
              Torque Block shall not be held liable
              for delays caused by third-party logistics providers,
              weather disruptions,
              strikes,
              transportation failures,
              or force majeure events.
            </p>

          </section>

          {/* RETURNS */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              6. Returns, Refunds & Cancellations
            </h2>

            <p>
              Returns,
              cancellations,
              refunds,
              and replacements
              are governed by the official Torque Block Returns & Refund Policy.
            </p>

            <p>
              Customers are advised to review the applicable policy
              before completing a purchase.
            </p>

          </section>

          {/* WARRANTY */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              7. Warranty & Product Liability
            </h2>

            <p>
              Product warranties,
              where applicable,
              are provided by the respective tyre manufacturers.
            </p>

            <p>
              Warranty coverage generally applies only to eligible manufacturing defects
              and does not cover:
            </p>

            <ul className="list-disc pl-5 space-y-3">

              <li>Improper installation</li>

              <li>Incorrect inflation pressure</li>

              <li>Track or racing usage</li>

              <li>Road hazards and punctures</li>

              <li>Burnouts or misuse</li>

              <li>Accidental damage</li>

              <li>Improper storage or maintenance</li>

            </ul>

            <p>
              Warranty approvals remain subject to manufacturer inspection
              and evaluation procedures.
            </p>

          </section>

          {/* LIMITATION */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              8. Limitation of Liability
            </h2>

            <p>
              Torque Block shall not be liable for indirect,
              incidental,
              consequential,
              special,
              or punitive damages arising from:
            </p>

            <ul className="list-disc pl-5 space-y-3">

              <li>Product misuse</li>

              <li>Improper installation</li>

              <li>Incorrect fitment selection</li>

              <li>Motorcycle modifications</li>

              <li>Racing or competition usage</li>

              <li>Third-party logistics delays</li>

              <li>Unauthorized repairs or alterations</li>

            </ul>

          </section>

          {/* INTELLECTUAL PROPERTY */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              9. Intellectual Property
            </h2>

            <p>
              All website content including logos,
              graphics,
              product descriptions,
              comparison systems,
              branding,
              and design elements
              are the intellectual property of Torque Block
              unless otherwise stated.
            </p>

            <p>
              Unauthorized reproduction,
              scraping,
              copying,
              redistribution,
              or commercial usage is prohibited.
            </p>

          </section>

          {/* POLICY CHANGES */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              10. Policy Updates
            </h2>

            <p>
              Torque Block reserves the right to modify,
              revise,
              or update these Terms & Conditions
              at any time without prior notice.
            </p>

            <p>
              Updated versions will be published on this page.
            </p>

          </section>

          {/* GOVERNING LAW */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              11. Governing Law & Jurisdiction
            </h2>

            <p>
              These Terms & Conditions
              shall be governed by the laws of India.
            </p>

            <p>
              Any disputes,
              legal proceedings,
              or claims arising from the use of Torque Block services
              shall fall under the exclusive jurisdiction
              of the competent courts located in Bengaluru, Karnataka.
            </p>

          </section>

          {/* CONTACT */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              12. Contact & Support
            </h2>

            <p>
              For questions regarding these Terms & Conditions,
              customers may contact Torque Block support through:
            </p>

            <ul className="list-disc pl-5 space-y-3">

              <li>Email Support</li>

              <li>WhatsApp Assistance</li>

              <li>Customer Helpline</li>

            </ul>

          </section>

        </div>
      </div>
    </div>
    </>
  )
}