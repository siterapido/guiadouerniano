import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Guia do UERNIANO';
  const type = searchParams.get('type') ?? 'site';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: 'linear-gradient(135deg, #003087 0%, #1A5FB4 60%, #2870D4 100%)',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Decorative element */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '400px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
            transform: 'translate(100px, -100px)',
          }}
        />

        {/* Type badge */}
        {type !== 'site' && (
          <div
            style={{
              display: 'flex',
              background: '#E63946',
              color: '#fff',
              borderRadius: '8px',
              padding: '6px 16px',
              fontSize: '18px',
              fontWeight: 700,
              width: 'fit-content',
              marginBottom: '24px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {type === 'blog' ? 'Blog' : type === 'guide' ? 'Guia' : type === 'event' ? 'Evento' : type}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? '44px' : '56px',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.15,
            marginBottom: '32px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: '#E63946',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 800,
              color: '#fff',
            }}
          >
            G
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '20px', fontWeight: 600 }}>
            guiadouerniano.com.br
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
