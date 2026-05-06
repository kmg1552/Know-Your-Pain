import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '../components/ScreenLayout';
import BodyMapSVG from '../components/BodyMapSVG';

export default function BodyMapScreen() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [view, setView] = useState('front');

  return (
    <ScreenLayout
      currentStep={1}
      totalSteps={5}
      onBack={() => navigate('/')}
      hideNext={true}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0D47A1' }}>
          Where does it hurt? 📍
        </h2>
        <p style={{ fontSize: '18px', color: '#555', marginTop: '4px' }}>
          Tap the part of the body that hurts.
        </p>
      </div>

      {/* Front / Back toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
        <div style={{
          display: 'inline-flex',
          backgroundColor: '#e8edf5',
          borderRadius: '50px',
          padding: '4px',
          gap: '4px',
        }}>
          {['front', 'back'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '10px 28px',
                minHeight: '48px',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '700',
                backgroundColor: view === v ? '#1565C0' : 'transparent',
                color: view === v ? '#fff' : '#555',
                transition: 'background-color 0.2s ease, color 0.2s ease',
              }}
            >
              {v === 'front' ? 'Front' : 'Back'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG body figure — handles click + navigation internally */}
      <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <BodyMapSVG view={view} />
      </div>
    </ScreenLayout>
  );
}
