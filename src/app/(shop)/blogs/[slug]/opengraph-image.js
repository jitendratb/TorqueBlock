import { ImageResponse } from 'next/og';

export const alt = 'Torque Block - Expert Insights & Reviews';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  
  const articleTitle = slug
    ? slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Expert Insights';

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
        <div style={{ position: 'absolute', top: -100, right: -100, width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, rgba(0,0,0,0) 70%)' }} />

        {/* Color bar indicator for blog categories */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: 'linear-gradient(180deg, #ea580c 0%, #f43f5e 100%)' }} />

        {/* Left Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10, maxWidth: 700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
            <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 900, letterSpacing: '0.15em' }}>TORQUE</span>
            <span style={{ color: '#f97316', fontSize: 24, fontWeight: 900 }}>{"//"}</span>
            <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 900, letterSpacing: '0.15em' }}>BLOCK</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.25)', borderRadius: 50, padding: '6px 16px', marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f43f5e' }} />
            <span style={{ color: '#f43f5e', fontSize: 12, fontWeight: 900, letterSpacing: '0.2em' }}>EXPERT INSIGHTS ENGINE</span>
          </div>

          <h1 style={{ display: 'flex', flexDirection: 'column', fontSize: 50, fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            {articleTitle}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 40 }}>
            <span style={{ color: '#a1a1aa', fontSize: 14, fontWeight: 700 }}>BY PERFORMANCE TEAM</span>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#52525b' }} />
            <span style={{ color: '#f97316', fontSize: 14, fontWeight: 900 }}>5 MIN READ</span>
          </div>
        </div>

        {/* Right side reading summary card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '30px 24px', zIndex: 10 }}>
          <span style={{ color: '#f97316', fontSize: 10, fontWeight: 900, letterSpacing: '0.15em' }}>IN THIS ARTICLE</span>
          <span style={{ color: '#ffffff', fontSize: 16, fontWeight: 900 }}>Tread Compound Analysis</span>
          <span style={{ color: '#ffffff', fontSize: 16, fontWeight: 900 }}>Standard Fitment Guidelines</span>
          <span style={{ color: '#ffffff', fontSize: 16, fontWeight: 900 }}>Live Track Wet Grip Trials</span>
        </div>
      </div>
    ),
    { ...size, fonts: fontConfig }
  );
}
