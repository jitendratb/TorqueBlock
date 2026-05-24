import { ImageResponse } from 'next/og';

export const alt = 'Torque Block - Tyre Comparison Battle';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  
  const parts = slug.split('-vs-');
  const t1 = parts[0] ? parts[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Tyre Alpha';
  const t2 = parts[1] ? parts[1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Tyre Beta';

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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          position: 'relative',
          fontFamily: fontData ? 'Inter' : 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Dynamic neon collision light background */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, rgba(0,0,0,0) 70%)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* Branding header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 50, zIndex: 10 }}>
          <span style={{ color: '#ffffff', fontSize: 18, fontWeight: 900, letterSpacing: '0.15em' }}>TORQUE</span>
          <span style={{ color: '#f97316', fontSize: 18, fontWeight: 900 }}>{"//"}</span>
          <span style={{ color: '#ffffff', fontSize: 18, fontWeight: 900, letterSpacing: '0.15em' }}>BLOCK</span>
        </div>

        {/* Main vs Layout Container */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 40, zIndex: 10 }}>
          {/* Tyre Alpha Block */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1, textAlign: 'right' }}>
            <span style={{ color: '#f97316', fontSize: 12, fontWeight: 900, letterSpacing: '0.15em', marginBottom: 12 }}>CONTESTANT ALPHA</span>
            <span style={{ color: '#ffffff', fontSize: 38, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{t1.toUpperCase()}</span>
          </div>

          {/* Symmetrical VS circle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', background: '#09090b', border: '2px solid #f97316', boxShadow: '0 0 30px rgba(249, 115, 22, 0.3)', shrink: 0 }}>
            <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 900 }}>VS</span>
          </div>

          {/* Tyre Beta Block */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, textAlign: 'left' }}>
            <span style={{ color: '#a1a1aa', fontSize: 12, fontWeight: 900, letterSpacing: '0.15em', marginBottom: 12 }}>CONTESTANT BETA</span>
            <span style={{ color: '#ffffff', fontSize: 38, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{t2.toUpperCase()}</span>
          </div>
        </div>

        {/* Footer Sub-bar info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: 50, padding: '8px 24px', marginTop: 60, zIndex: 10 }}>
          <span style={{ color: '#f97316', fontSize: 11, fontWeight: 900, letterSpacing: '0.15em' }}>HEAD-TO-HEAD PERFORMANCE COMPARISON REPORT</span>
        </div>
      </div>
    ),
    { ...size, fonts: fontConfig }
  );
}
