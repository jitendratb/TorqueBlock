import { ImageResponse } from 'next/og';

export const alt = 'Torque Block - High Performance Tyres';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  
  const tyreName = slug
    ? slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Premium Tyre';

  let fontData = null;
  try {
    const fontUrl = 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6Msp5jAZ9Jjg.ttf';
    const res = await fetch(fontUrl);
    if (res.ok) {
      fontData = await res.arrayBuffer();
    }
  } catch (error) {
    console.warn('Font download failed, using system fallback:', error);
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
        {/* Neon glowing overlays */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.01) 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.8 }} />
        <div style={{ position: 'absolute', bottom: -200, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, rgba(0,0,0,0) 70%)' }} />

        {/* High performance side border accent */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: 'linear-gradient(180deg, #f97316 0%, #ea580c 100%)' }} />

        {/* Left main content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10, maxWidth: 650 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
            <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 900, letterSpacing: '0.15em' }}>TORQUE</span>
            <span style={{ color: '#f97316', fontSize: 24, fontWeight: 900 }}>{"//"}</span>
            <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 900, letterSpacing: '0.15em' }}>BLOCK</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.25)', borderRadius: 50, padding: '6px 16px', marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316' }} />
            <span style={{ color: '#f97316', fontSize: 12, fontWeight: 900, letterSpacing: '0.2em' }}>TECHNICAL DATA SHEET</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 56, fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            <span style={{ color: '#f97316' }}>{tyreName.toUpperCase()}</span>
            <span>HYPER-TRACTION</span>
          </div>

          <p style={{ color: '#a1a1aa', fontSize: 20, fontWeight: 500, marginTop: 24, lineHeight: 1.4 }}>
            Engineered with high-silica rubber compounds for absolute grip, rapid heat-up times, and surgical cornering precision.
          </p>
        </div>

        {/* Right dashboard telemetry metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320, zIndex: 10 }}>
          {[
            { metric: 'DRY GRIP', value: '98%', width: '98%' },
            { metric: 'WET TRACTION', value: '92%', width: '92%' },
            { metric: 'TRACK HANDLING', value: '95%', width: '95%' },
            { metric: 'TREAD LIFE', value: '88%', width: '88%' },
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: 6, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ color: '#e4e4e7', fontSize: 10, fontWeight: 900, letterSpacing: '0.1em' }}>{item.metric}</span>
                <span style={{ color: '#f97316', fontSize: 11, fontWeight: 900 }}>{item.value}</span>
              </div>
              <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: item.width, height: '100%', background: 'linear-gradient(90deg, #ea580c 0%, #f97316 100%)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: fontConfig }
  );
}
