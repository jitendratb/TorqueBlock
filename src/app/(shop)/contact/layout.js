export async function generateMetadata() {
  return {
    title: 'Contact Torque Block | Get Expert Tyre Selection Support',
    description: 'Need help choosing tyres for your superbike? Get in touch with our performance motorcycle tyre specialists via phone, email, or by submitting an enquiry.',
    alternates: {
      canonical: 'https://www.torqueblock.com/contact',
    },
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

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
