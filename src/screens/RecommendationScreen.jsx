import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '../components/ScreenLayout';
import { useAppContext } from '../context/AppContext';

const fadeIn = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const HEAD_ZOOM_PARTS = [
  'forehead', 'eye-left', 'eye-right', 'ear-left', 'ear-right',
  'nose', 'mouth-jaw', 'whole-head',
  'back-of-head', 'temple-left', 'temple-right',
];

const PAIN_FACES = ['😊','😌','😐','😕','😟','😣','😖','😫','😩','😭'];

function MedicineImage({ src, name }) {
  const [error, setError] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '110px',
        height: '110px',
      }}>
        {error ? (
          <span style={{ fontSize: '64px' }}>💊</span>
        ) : (
          <img
            src={src}
            alt={name}
            onError={() => setError(true)}
            style={{ maxHeight: '100px', maxWidth: '100px', objectFit: 'contain' }}
          />
        )}
      </div>
      <span style={{
        backgroundColor: '#E8F5E9',
        color: '#2E7D32',
        borderRadius: '30px',
        padding: '6px 16px',
        fontSize: '13px',
        fontWeight: '800',
      }}>
        {name}
      </span>
    </div>
  );
}

export default function RecommendationScreen() {
  const navigate = useNavigate();
  const {
    selectedBodyPart,
    selectedBodyLabel,
    selectedZoomPart,
    selectedZoomLabel,
    selectedSymptoms,
    painScale,
    resetAll,
  } = useAppContext();

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [saved, setSaved] = useState(false);

  const symptoms = selectedSymptoms || [];

  // ── Recommendation logic ──
  const isHeadache =
    selectedBodyPart === 'head' ||
    selectedBodyPart === 'head-back' ||
    HEAD_ZOOM_PARTS.includes(selectedZoomPart);

  const isHeartburn =
    (selectedBodyPart === 'upper-abdomen' || selectedBodyPart === 'chest') &&
    symptoms.includes('burning');

  const HEAD_RED_FLAGS = [
    'A headache that came on very suddenly',
    'Headache with a stiff neck or high fever',
    'Headache after a knock to the head',
    'Weakness or numbness in your face or arm',
  ];

  const HEARTBURN_RED_FLAGS = [
    'Chest pain that spreads to your arm or jaw',
    'Difficulty swallowing',
    'Vomiting blood or very dark material',
    'Pain that keeps getting much worse',
  ];

  const EMERGENCY = {
    emoji: '🚨', type: 'Emergency', title: 'Please get help right now',
    medicines: [], images: [],
    advice: 'Your pain is very severe. Please call 000 or go to the emergency department immediately. Do not drive yourself.',
    redFlags: [], urgent: true,
  };

  let result;

  if (isHeadache && painScale >= 9) {
    result = EMERGENCY;
  } else if (isHeadache && painScale >= 7) {
    result = {
      emoji: '⚕️', type: 'Severe headache', title: 'See a doctor today',
      medicines: ['Paracetamol (short-term only)'],
      images: ['/images/paracetamol.png'],
      advice: 'Your headache is quite bad. Please see a doctor today. You can take Paracetamol while you wait.',
      redFlags: HEAD_RED_FLAGS, urgent: false,
    };
  } else if (isHeadache) {
    result = {
      emoji: '💊', type: 'This may be a headache', title: 'Paracetamol or Ibuprofen can help',
      medicines: ['Paracetamol', 'Ibuprofen'],
      images: ['/images/paracetamol.png', '/images/ibuprofen.png'],
      advice: 'Take Paracetamol or Ibuprofen from the pharmacy. Drink lots of water. Rest in a quiet, dark room. Do not take both medicines at the same time — choose one.',
      redFlags: HEAD_RED_FLAGS, urgent: false,
    };
  } else if (isHeartburn && painScale >= 9) {
    result = EMERGENCY;
  } else if (isHeartburn) {
    result = {
      emoji: '🔥', type: 'This may be heartburn', title: 'Gaviscon can help',
      medicines: ['Gaviscon'],
      images: ['/images/gaviscon.png'],
      advice: 'Gaviscon helps soothe the burning feeling. Take it after meals or at bedtime. Avoid spicy food and large meals. Do not lie down right after eating.',
      redFlags: HEARTBURN_RED_FLAGS, urgent: false,
    };
  } else {
    result = {
      emoji: '💬', type: 'We need more information', title: 'Talk to a pharmacist',
      medicines: [], images: [],
      advice: 'Based on your answers, we suggest talking to a pharmacist or doctor. Show them this screen — they will help you.',
      redFlags: [], urgent: false,
    };
  }

  // ── Save to localStorage ──
  function handleSave() {
    if (saved) return;
    const record = {
      id: Date.now(),
      date: new Date().toLocaleString('en-AU', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }),
      bodyLabel: selectedBodyLabel || '—',
      zoomLabel: selectedZoomLabel || null,
      painScale: painScale,
      painEmoji: PAIN_FACES[Math.min((painScale || 1) - 1, 9)],
      symptoms: symptoms,
      recTitle: result.title,
      medicines: result.medicines,
      emoji: result.emoji,
    };
    const existing = JSON.parse(localStorage.getItem('kyp_results') || '[]');
    existing.unshift(record);
    localStorage.setItem('kyp_results', JSON.stringify(existing));
    setSaved(true);
  }

  function handleStartOver() {
    resetAll();
    navigate('/');
  }

  return (
    <>
      <style>{fadeIn}</style>
      <ScreenLayout
        currentStep={5}
        totalSteps={5}
        showResultsButton={true}
        onBack={() => navigate('/pain-scale')}
        hideBottomBar={true}
      >
        <div style={{ paddingBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* ── Result card ── */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '48px', lineHeight: 1, flexShrink: 0 }}>{result.emoji}</span>
              <div>
                <p style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>
                  {result.type}
                </p>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0D47A1', lineHeight: 1.2 }}>
                  {result.title}
                </h2>
              </div>
            </div>

            {/* Medicine images */}
            {result.images.length > 0 && (
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {result.images.map((src, i) => (
                  <MedicineImage key={src} src={src} name={result.medicines[i] || ''} />
                ))}
              </div>
            )}

            {/* Advice */}
            <p style={{ fontSize: '16px', color: '#1a1a1a', lineHeight: '1.6' }}>
              {result.advice}
            </p>

            {/* Urgent call box */}
            {result.urgent && (
              <div style={{
                backgroundColor: '#B91C1C',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '800',
              }}>
                📞 Call 000 now
              </div>
            )}

            {/* Red flags */}
            {result.redFlags.length > 0 && (
              <div style={{
                backgroundColor: '#FFF5F5',
                border: '2px solid #FCA5A5',
                borderRadius: '12px',
                padding: '14px',
              }}>
                <p style={{ fontSize: '14px', fontWeight: '800', color: '#B91C1C', marginBottom: '8px' }}>
                  🚨 See a doctor if you notice:
                </p>
                {result.redFlags.map((flag, i) => (
                  <p key={i} style={{ fontSize: '14px', color: '#B91C1C', marginBottom: '4px' }}>
                    ⚠️ {flag}
                  </p>
                ))}
              </div>
            )}

            {/* Pharmacist reminder */}
            <div style={{
              backgroundColor: '#FFF8E1',
              border: '2px solid #FFE082',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '30px', flexShrink: 0 }}>👩‍⚕️</span>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#7B4F00' }}>
                Always talk to your pharmacist before taking medicine.
              </p>
            </div>
          </div>

          {/* ── Save button ── */}
          <button
            onClick={handleSave}
            disabled={saved}
            style={{
              width: '100%',
              padding: '18px',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: saved ? '#757575' : '#2E7D32',
              color: '#fff',
              fontSize: '17px',
              fontWeight: '800',
              cursor: saved ? 'default' : 'pointer',
            }}
          >
            {saved ? '✅ Saved!' : '💾 Save to My Results'}
          </button>

          {/* ── View My Results button (visible after saving) ── */}
          {saved && (
            <button
              onClick={() => navigate('/my-results')}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                border: '2px solid #1565C0',
                backgroundColor: '#fff',
                color: '#1565C0',
                fontSize: '16px',
                fontWeight: '800',
                cursor: 'pointer',
                animation: 'fadeInUp 0.3s ease-out forwards',
              }}
            >
              📋 View My Results
            </button>
          )}

          {/* ── Start Over button ── */}
          <button
            onClick={handleStartOver}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '14px',
              border: '2px solid #E2E8F0',
              backgroundColor: '#fff',
              color: '#555',
              fontSize: '16px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            🔄 Start Over
          </button>

          {/* ── Find Nearby Pharmacy button ── */}
          <button
            onClick={() => navigate('/pharmacy-finder')}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '14px',
              border: '2px solid #1565C0',
              backgroundColor: '#fff',
              color: '#1565C0',
              fontSize: '16px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            📍 Find My Nearest Pharmacy
          </button>

        </div>
      </ScreenLayout>
    </>
  );
}
