import { ImageResponse } from 'next/og';

export const alt = 'Torque Block - Premium Motorcycle Brands';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Context-aware dynamic OpenGraph generator for individual bike brands
export default async function Image({ params }) {
  // Resolve params as a Promise (Next.js 16 standard convention)
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  
  // Format the brand name elegantly (e.g. "yamaha-motor" -> "Yamaha Motor")
  const brandName = slug
    ? slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Motorcycle';

  let fontData = null;
  try {
    // Dynamic loading of high-quality Inter-Black for enterprise look
    const fontUrl = 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6Msp5jAZ9Jjg.ttf';
    const res = await fetch(fontUrl);
    if (res.ok) {
      fontData = await res.arrayBuffer();
    }
  } catch (error) {
    console.warn('Dynamic OG font load failed, falling back to system fonts:', error);
  }

  const fontConfig = fontData
    ? [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 900,
        },
      ]
    : [];

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
        {/* Subtle dynamic background racing grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.8,
          }}
        />

        {/* Dynamic neon glowing background blobs */}
        <div
          style={{
            position: 'absolute',
            top: -150,
            right: -150,
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, rgba(0,0,0,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(0,0,0,0) 70%)',
          }}
        />

        {/* High performance side border accent */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            background: 'linear-gradient(180deg, #f97316 0%, #ea580c 100%)',
          }}
        />

        {/* Left Area: Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            zIndex: 10,
            maxWidth: 600,
          }}
        >
          {/* Header Branding Tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 40,
            }}
          >
            <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 900, letterSpacing: '0.15em' }}>TORQUE</span>
            <span style={{ color: '#f97316', fontSize: 24, fontWeight: 900 }}>{"//"}</span>
            <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 900, letterSpacing: '0.15em' }}>BLOCK</span>
          </div>

          {/* Dynamic Subtitle Badge containing Brand Name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(249, 115, 22, 0.1)',
              border: '1px solid rgba(249, 115, 22, 0.25)',
              borderRadius: 50,
              padding: '6px 16px',
              marginBottom: 24,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316' }} />
            <span style={{ color: '#f97316', fontSize: 12, fontWeight: 900, letterSpacing: '0.2em' }}>
              OFFICIAL {brandName.toUpperCase()} DIRECTORY
            </span>
          </div>

          {/* Dynamic visual headline containing Brand Name */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 62,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            <span>{brandName.toUpperCase()}</span>
            <span style={{ color: '#f97316' }}>MODELS CATALOG</span>
          </div>

          {/* Dynamic Description */}
          <p
            style={{
              color: '#a1a1aa',
              fontSize: 20,
              fontWeight: 500,
              marginTop: 20,
              lineHeight: 1.4,
            }}
          >
            Locate high-performance tyres perfectly optimized for your specific {brandName} motorcycle model, engine displacement, and riding style.
          </p>

          {/* Enterprise level Quality Badges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginTop: 40,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#27272a', background: '#ffffff', borderRadius: 4, padding: '2px 6px', fontSize: 10, fontWeight: 900 }}>FIT</span>
              <span style={{ color: '#e4e4e7', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em' }}>100% SECURE FITMENT</span>
            </div>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#52525b' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#27272a', background: '#f97316', borderRadius: 4, padding: '2px 6px', fontSize: 10, fontWeight: 900 }}>OEM</span>
              <span style={{ color: '#e4e4e7', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em' }}>PREMIUM BRANDS ONLY</span>
            </div>
          </div>
        </div>

        {/* Right Area: Stylized compatible segments listing */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: 320,
            zIndex: 10,
          }}
        >
          {[
            { name: 'SUPERSPORT', bg: 'rgba(239, 68, 68, 0.05)', border: 'rgba(239, 68, 68, 0.15)' },
            { name: 'STREET & ROAD', bg: 'rgba(59, 130, 246, 0.05)', border: 'rgba(59, 130, 246, 0.15)' },
            { name: 'ADVENTURE & DUAL', bg: 'rgba(34, 197, 94, 0.05)', border: 'rgba(34, 197, 94, 0.15)' },
            { name: 'TRACK RACING', bg: 'rgba(255, 255, 255, 0.03)', border: 'rgba(255, 255, 255, 0.08)' },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: item.bg,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: item.border,
                borderRadius: 16,
                padding: '16px 24px',
                width: '100%',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 900, letterSpacing: '0.05em' }}>
                {item.name}
              </span>
              <span style={{ color: '#f97316', fontSize: 16, fontWeight: 900 }}>→</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontConfig,
    }
  );
}