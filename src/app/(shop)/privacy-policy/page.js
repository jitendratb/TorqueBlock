import React from 'react'

export const metadata = {
  title:
    'Privacy Policy | Torque Block Premium Motorcycle Tyres',

  description:
    'Learn how Torque Block collects, stores, protects, and uses customer information, payment details, browser data, and analytics information for premium motorcycle tyre purchases.',

  keywords: [
    'privacy policy India ecommerce',
    'motorcycle tyre privacy policy',
    'superbike ecommerce privacy',
    'secure tyre purchase India',
    'Torque Block privacy policy'
  ]
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen text-white py-6">

      {/* JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Privacy Policy',
            description:
              'Torque Block privacy policy for customer data, payments, analytics, and communications.',
            publisher: {
              '@type': 'Organization',
              name: 'Torque Block'
            }
          })
        }}
      />

      <div className="">

        {/* HEADER */}
        <div className="mb-10 text-center">

          <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] block mb-2">
            Legal & Security
          </span>

          <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white">
            Privacy <span className="text-orange-500">Policy</span>
          </h1>

          <div className="w-20 h-1 bg-orange-500 rounded-full mt-4 mx-auto" />

        </div>

        {/* MAIN CONTENT */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 lg:p-10 rounded-3xl backdrop-blur-md space-y-10 text-zinc-300 text-sm lg:text-base leading-relaxed">

          {/* INTRO */}
          <section className="space-y-5">

            <p>
              Torque Block values customer privacy and is committed to protecting
              personal information shared through our website, communication channels,
              and order processing systems.
            </p>

            <p>
              This Privacy Policy explains how customer information is collected,
              stored, processed, and protected when interacting with Torque Block services.
            </p>

          </section>

          {/* DATA COLLECTION */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              1. Information We Collect
            </h2>

            <p>
              We may collect information required for order processing,
              customer support, logistics coordination, and website optimization.
            </p>

            <ul className="list-disc pl-5 space-y-3">

              <li>
                <strong>Personal Information:</strong> Name, phone number,
                email address, billing address, and shipping address.
              </li>

              <li>
                <strong>Motorcycle Information:</strong> Motorcycle make,
                model, variant, and tyre specifications provided for compatibility assistance.
              </li>

              <li>
                <strong>Technical Information:</strong> IP address,
                browser type, device information, session activity,
                and website interaction analytics.
              </li>

              <li>
                <strong>Communication Data:</strong> Information shared through
                WhatsApp, forms, customer support chats, email, or phone interactions.
              </li>

            </ul>

          </section>

          {/* DATA USAGE */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              2. How We Use Your Information
            </h2>

            <ul className="list-disc pl-5 space-y-3">

              <li>
                To process and deliver customer orders.
              </li>

              <li>
                To provide product recommendations and compatibility support.
              </li>

              <li>
                To send order confirmations, tracking updates,
                invoices, and service-related notifications.
              </li>

              <li>
                To improve website performance,
                analytics, and customer experience.
              </li>

              <li>
                To respond to customer enquiries and support requests.
              </li>

            </ul>

          </section>

          {/* PAYMENT SECURITY */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              3. Payment Security
            </h2>

            <p>
              Torque Block does not store credit card numbers,
              debit card details, CVV information,
              or banking credentials on local servers.
            </p>

            <p>
              Payments are securely processed through third-party payment gateway providers
              using encrypted transaction systems and industry-standard SSL protection.
            </p>

          </section>

          {/* COOKIES */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              4. Cookies & Analytics
            </h2>

            <p>
              Torque Block may use cookies, analytics tools,
              and session technologies to improve browsing experience,
              cart functionality, website performance,
              and marketing effectiveness.
            </p>

            <p>
              Customers may disable cookies through browser settings,
              although certain website functions may become limited.
            </p>

          </section>

          {/* THIRD PARTY */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              5. Third-Party Services
            </h2>

            <p>
              Torque Block may share limited operational information
              with trusted third-party service providers including:
            </p>

            <ul className="list-disc pl-5 space-y-3">

              <li>Payment gateway providers</li>

              <li>Courier and logistics partners</li>

              <li>Analytics and performance tools</li>

              <li>Customer communication platforms</li>

            </ul>

            <p>
              Information shared is limited to what is reasonably required
              for operational and service-related purposes.
            </p>

          </section>

          {/* DATA PROTECTION */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              6. Data Protection & Security
            </h2>

            <p>
              We implement commercially reasonable technical,
              operational, and administrative safeguards
              to help protect customer information from unauthorized access,
              misuse, or disclosure.
            </p>

            <p>
              However, no digital transmission or storage system
              can be guaranteed as completely secure.
            </p>

          </section>

          {/* MARKETING */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              7. Marketing Communications
            </h2>

            <p>
              Customers may receive promotional messages,
              product updates, offers, or service announcements
              through email, SMS, or WhatsApp communications.
            </p>

            <p>
              Customers may opt out of marketing communications
              at any time by contacting Torque Block support.
            </p>

          </section>

          {/* DATA RETENTION */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              8. Data Retention
            </h2>

            <p>
              Customer information may be retained for operational,
              legal, accounting, fraud prevention,
              and customer support purposes for a commercially reasonable duration.
            </p>

          </section>

          {/* USER RIGHTS */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              9. Customer Rights
            </h2>

            <p>
              Customers may request access,
              correction, or deletion of eligible personal information
              by contacting Torque Block support.
            </p>

            <p>
              Certain information may need to be retained
              for legal, compliance, or operational obligations.
            </p>

          </section>

          {/* CHILDREN */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              10. Children’s Privacy
            </h2>

            <p>
              Torque Block services are not intended for individuals under 18 years of age.
              We do not knowingly collect personal information from minors.
            </p>

          </section>

          {/* POLICY UPDATES */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              11. Policy Updates
            </h2>

            <p>
              Torque Block reserves the right to modify or update this Privacy Policy
              at any time without prior notice.
            </p>

            <p>
              Updated versions will be published on this page with revised effective dates where applicable.
            </p>

          </section>

          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              12. Contact & Privacy Requests
            </h2>

            <p>
              For questions regarding this Privacy Policy,
              customer data requests,
              or privacy-related concerns,
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
  )
}