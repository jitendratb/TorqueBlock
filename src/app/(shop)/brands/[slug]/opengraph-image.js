import { ImageResponse } from 'next/og';

export const alt = 'Torque Block - Premium Partner Brands';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  
  const brandName = slug
    ? slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Tyre Manufacturer';

  let fontData = null;
  try {
    const fontUrl = 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6Msp5jAZ9Jjg.ttf';
    const res = await fetch(fontUrl);
    if (res.ok) {
      fontData = await res.arrayBuffer();
    }
  } catch (error) {
    console.warn('Font loading failed:', error);
  }

  const fontConfig = fontData ? [{ name: 'Inter', data: fontData, style: 'normal', weight: 900 }] : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#09090b',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '80px 100px',
          position: 'relative',
          fontFamily: fontData ? 'Inter' : 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.01) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.8 }} />
        <div style={{ position: 'absolute', top: -150, right: -150, width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, rgba(0,0,0,0) 70%)' }} />

        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: 'linear-gradient(180deg, #f97316 0%, #ea580c 100%)' }} />

        {/* Left Block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10, maxWidth: 650 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
            <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 900, letterSpacing: '0.15em' }}>TORQUE</span>
            <span style={{ color: '#f97316', fontSize: 24, fontWeight: 900 }}>{"//"}</span>
            <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 900, letterSpacing: '0.15em' }}>BLOCK</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.25)', borderRadius: 50, padding: '6px 16px', marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316' }} />
            <span style={{ color: '#f97316', fontSize: 12, fontWeight: 900, letterSpacing: '0.2em' }}>AUTHORIZED DISTRIBUTION PARTNER</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 56, fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            <span>{brandName.toUpperCase()}</span>
            <span style={{ color: '#f97316' }}>PREMIUM PIPELINE</span>
          </div>

          <p style={{ color: '#a1a1aa', fontSize: 20, fontWeight: 500, marginTop: 24, lineHeight: 1.4 }}>
            Direct access to official {brandName} tyres, next-gen treads, and custom racing compounds with secure fitment guarantee.
          </p>
        </div>

        {/* Right Partner Stats Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320, zIndex: 10 }}>
          {[
            { label: 'AUTHENTICITY', val: '100% SOURCED DIRECT' },
            { label: 'WARRANTY', val: 'FULL MANUFACTURER COVER' },
            { label: 'FITMENT', val: '100% SECURE ALIGNMENT' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '16px 24px' }}>
              <span style={{ color: '#f97316', fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', marginBottom: 4 }}>{item.label}</span>
              <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 900 }}>{item.val}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: fontConfig }
  );
}
