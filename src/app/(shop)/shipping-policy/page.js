import React from 'react';
import WebPageSchema from '@/components/seo/WebPageSchema';

export async function generateMetadata() {
  return ;
}

export default function ShippingPolicyPage() {
  return (
    <>
      <WebPageSchema 
        type="WebPage"
        title="Shipping & Delivery Policy | Torque Block"
        description="Torque Block shipping and delivery policy for premium motorcycle tyres in India."
        url="/shipping-policy"
      />
    <div className="min-h-screen text-white py-6">
    

      <div className="">

        <div className="mb-14 mx-auto w-full flex flex-col items-center text-center">

          <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] block mb-2">
            Store Policies
          </span>

          <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white">
            Shipping & <span className="text-orange-500">Delivery Policy</span>
          </h1>

          <div className="w-20 h-1 bg-orange-500 rounded-full mt-4" />

        </div>

        {/* MAIN CONTENT */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 lg:p-10 rounded-3xl backdrop-blur-md space-y-10 text-zinc-300 text-sm lg:text-base leading-relaxed">

          {/* INTRO */}
          <section className="space-y-5">

            <p>
              At Torque Block, we understand that premium motorcycle tyres are critical performance and safety components.
              Every order is handled with strict packaging, storage, and shipping standards to ensure tyres arrive in optimal condition.
            </p>

            <p>
              We work with trusted logistics partners across India to provide reliable delivery for superbike,
              hypersport, sport-touring, cruiser, and adventure motorcycle tyres.
            </p>

          </section>

          {/* ORDER PROCESSING */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              1. Order Processing & Dispatch Timelines
            </h2>

            <ul className="list-disc pl-5 space-y-3">

              <li>
                <strong>Standard Orders:</strong> Verified orders are typically dispatched within
                24 to 48 business hours.
              </li>

              <li>
                <strong>Weekend & Holiday Orders:</strong> Orders placed after 2:00 PM on Saturdays,
                Sundays, or public holidays are processed on the next working day.
              </li>

              <li>
                <strong>Pre-Orders & Special Inventory:</strong> Certain racing compounds,
                uncommon tyre sizes, or imported inventory may require extended dispatch timelines.
                Estimated timelines will be communicated before confirmation.
              </li>

              <li>
                <strong>Order Verification:</strong> Torque Block reserves the right to verify customer,
                payment, or shipping details before dispatching high-value orders.
              </li>

            </ul>

          </section>

          {/* DELIVERY TIMELINES */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              2. Delivery Timelines
            </h2>

            <p>
              Delivery timelines may vary based on destination location,
              courier operations, weather conditions, and regional logistics constraints.
            </p>

            <ul className="list-disc pl-5 space-y-3">

              <li>
                <strong>Metro Cities:</strong> 2 to 4 business days.
              </li>

              <li>
                <strong>Tier 2 & Tier 3 Locations:</strong> 4 to 7 business days.
              </li>

              <li>
                <strong>Remote Regions:</strong> 7 to 10 business days depending on courier accessibility.
              </li>

            </ul>

          </section>

          {/* COURIER PARTNERS */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              3. Courier & Logistics Partners
            </h2>

            <p>
              Torque Block works with leading logistics providers including Blue Dart,
              Delhivery, DTDC, and other specialized cargo partners depending on shipment type and destination.
            </p>

            <p>
              Courier allocation is determined based on delivery reliability,
              transit safety, and regional serviceability.
            </p>

          </section>

          {/* PACKAGING */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              4. Packaging Standards
            </h2>

            <p>
              Premium motorcycle tyres require careful handling during transit.
              Every shipment is securely packed using protective wrapping and reinforced handling procedures
              to minimize transit-related damage.
            </p>

            <p>
              Additional protective measures may be used for high-value superbike tyres,
              imported inventory, and multi-tyre shipments.
            </p>

          </section>

          {/* SHIPPING CHARGES */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              5. Shipping Charges
            </h2>

            <p>
              Shipping charges are calculated based on order value,
              destination location, tyre dimensions, and courier serviceability.
            </p>

            <p>
              Promotional free shipping offers, if applicable,
              will be displayed during checkout.
            </p>

          </section>

          {/* SHIPMENT TRACKING */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              6. Shipment Tracking
            </h2>

            <p>
              Customers will receive shipment tracking details via SMS,
              email, or WhatsApp once the order has been dispatched.
            </p>

            <p>
              Tracking updates are dependent on courier scanning and logistics operations.
            </p>

          </section>

          {/* DAMAGED SHIPMENTS */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              7. Damaged or Tampered Deliveries
            </h2>

            <p>
              Customers are advised to inspect the shipment packaging at the time of delivery.
            </p>

            <ul className="list-disc pl-5 space-y-3">

              <li>
                If the package appears severely damaged or tampered with,
                customers should refuse delivery where possible.
              </li>

              <li>
                Photo or video documentation should be captured before opening the shipment.
              </li>

              <li>
                Delivery-related concerns must be reported to Torque Block support within 24 hours of delivery.
              </li>

            </ul>

          </section>

          {/* FAILED DELIVERIES */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              8. Failed Delivery Attempts
            </h2>

            <p>
              Customers are responsible for providing accurate shipping information
              and ensuring availability at the delivery location.
            </p>

            <p>
              Additional shipping or reattempt charges may apply for failed deliveries caused by incorrect addresses,
              unreachable recipients, or repeated delivery refusals.
            </p>

          </section>

          {/* DELAYS */}
          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              9. Delivery Delays & Force Majeure
            </h2>

            <p>
              While Torque Block aims to ensure timely delivery,
              delays may occur due to weather conditions, transport disruptions,
              regional restrictions, strikes, natural disasters,
              or other circumstances beyond operational control.
            </p>

            <p>
              Delivery timelines provided are estimates
              and should not be treated as guaranteed commitments.
            </p>

          </section>

          <section className="space-y-4">

            <h2 className="text-white font-bold text-lg uppercase tracking-wide border-b border-zinc-800 pb-2">
              10. Support & Assistance
            </h2>

            <p>
              For shipping-related assistance, customers may contact Torque Block support through:
            </p>

            <ul className="list-disc pl-5 space-y-2">

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