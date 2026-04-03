import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const floatKeyframes = `
  @keyframes float {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 6px 20px rgba(0,0,0,0.3), 0 0 0 0 rgba(255,213,79,0.5); }
    50%       { box-shadow: 0 6px 20px rgba(0,0,0,0.3), 0 0 0 14px rgba(255,213,79,0); }
  }
`;

export default function HomeScreen() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <style>{floatKeyframes}</style>
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0D47A1 0%, #1565C0 100%)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '16px 20px',
          }}
        >
          <button
            onClick={() => navigate('/my-results')}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: '#fff',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '10px',
              padding: '8px 16px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            My Results 📋
          </button>
        </div>

        {/* Middle section */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 24px',
            gap: '20px',
          }}
        >
          {/* Floating pill emoji */}
          <div
            style={{
              fontSize: '90px',
              lineHeight: 1,
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            💊
          </div>

          {/* Title */}
          <div>
            <div
              style={{
                fontSize: '48px',
                fontWeight: '900',
                lineHeight: 1.1,
                color: '#fff',
              }}
            >
              Know Your
            </div>
            <div
              style={{
                fontSize: '56px',
                fontWeight: '900',
                lineHeight: 1.1,
                color: '#FFD54F',
              }}
            >
              Pain
            </div>
          </div>

          {/* Subtitle */}
          <p
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '17px',
              lineHeight: '1.5',
              maxWidth: '320px',
            }}
          >
            Tell us how you feel. We will help you find the right medicine.
          </p>

          {/* Start button */}
          <button
            onClick={() => navigate('/body-map')}
            style={{
              backgroundColor: '#FFD54F',
              color: '#0D47A1',
              border: 'none',
              borderRadius: '50px',
              padding: '22px 64px',
              fontSize: '24px',
              fontWeight: '900',
              cursor: 'pointer',
              animation: 'pulse 2.4s ease-in-out infinite',
              marginTop: '8px',
              letterSpacing: '0.5px',
            }}
          >
            ▶ Start
          </button>
        </div>

        {/* Bottom disclaimer */}
        <div
          style={{
            padding: '20px 24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '13px',
              lineHeight: '1.5',
            }}
          >
            ⚕️ Always talk to a pharmacist or doctor if you are not sure.
          </p>
        </div>
      </div>
    </>
  );
}
