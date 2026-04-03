import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '../components/ScreenLayout';
import { useAppContext } from '../context/AppContext';

const fadeIn = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const PAIN_LEVELS = [
  { value: 1,  emoji: '😊' },
  { value: 2,  emoji: '😌' },
  { value: 3,  emoji: '😐' },
  { value: 4,  emoji: '😕' },
  { value: 5,  emoji: '😟' },
  { value: 6,  emoji: '😣' },
  { value: 7,  emoji: '😖' },
  { value: 8,  emoji: '😫' },
  { value: 9,  emoji: '😩' },
  { value: 10, emoji: '😭' },
];

export default function PainScaleScreen() {
  const navigate = useNavigate();
  const { painScale, setPainScale } = useAppContext();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const selected = PAIN_LEVELS.find((p) => p.value === painScale);

  return (
    <>
      <style>{fadeIn}</style>
      <ScreenLayout
        currentStep={4}
        totalSteps={5}
        onBack={() => navigate('/symptoms')}
        onNext={() => navigate('/recommendation')}
        nextLabel="See Result →"
        nextDisabled={painScale === null}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0D47A1' }}>
            How bad is it? 🌡️
          </h2>
          <p style={{ fontSize: '16px', color: '#555', marginTop: '6px', lineHeight: '1.5' }}>
            1 means a tiny bit of pain. 10 means the worst pain ever.
          </p>
        </div>

        {/* Pain scale buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          marginBottom: '8px',
        }}>
          {PAIN_LEVELS.map(({ value, emoji }) => {
            const isSelected = painScale === value;
            return (
              <button
                key={value}
                onClick={() => setPainScale(value)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 4px',
                  minHeight: '72px',
                  borderRadius: '12px',
                  border: isSelected ? '3px solid #1565C0' : '2px solid #E2E8F0',
                  backgroundColor: isSelected ? '#EFF6FF' : '#fff',
                  cursor: 'pointer',
                  transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                  transition: 'all 0.15s ease',
                  zIndex: isSelected ? 1 : 0,
                  boxShadow: isSelected ? '0 4px 12px rgba(21,101,192,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <span style={{ fontSize: '28px', lineHeight: 1 }}>{emoji}</span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: isSelected ? '#1565C0' : '#555',
                  marginTop: '4px',
                }}>
                  {value}
                </span>
              </button>
            );
          })}
        </div>

        {/* No pain / Worst pain labels */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '24px',
          padding: '4px 2px 0',
        }}>
          <span style={{ fontSize: '14px', color: '#888', fontWeight: '600' }}>😊 No pain</span>
          <span style={{ fontSize: '14px', color: '#888', fontWeight: '600' }}>Worst pain 😭</span>
        </div>

        {/* Selected result card */}
        {selected && (
          <div
            key={selected.value}
            style={{
              backgroundColor: '#fff',
              border: '2px solid #1565C0',
              borderRadius: '16px',
              padding: '24px 16px',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(21,101,192,0.12)',
              animation: 'fadeInUp 0.25s ease-out forwards',
            }}
          >
            <div style={{ fontSize: '60px', lineHeight: 1, marginBottom: '12px' }}>
              {selected.emoji}
            </div>
            <p style={{ fontSize: '20px', fontWeight: '800', color: '#0D47A1' }}>
              You said: {selected.value} out of 10
            </p>
          </div>
        )}
      </ScreenLayout>
    </>
  );
}
