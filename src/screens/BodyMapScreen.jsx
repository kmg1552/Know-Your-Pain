import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '../components/ScreenLayout';
import { useAppContext } from '../context/AppContext';

const cssKeyframes = `
  @keyframes glowPulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 1;    }
    50%       { transform: translate(-50%, -50%) scale(1.15); opacity: 0.85; }
  }
  @keyframes tagFadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

// ─────────────────────────────────────────────────────────────
// HOTSPOT DATA — percentage-based, relative to image container.
// All hotspots are circular (border-radius: 50%).
// Adjust top/left/width/height strings to fine-tune positions.
// ─────────────────────────────────────────────────────────────

const FRONT_SHAPES = [
  { part: 'head',          label: 'Head',          top: '15.4%', left: '44.5%', width: '12%', height: '12%' },
  { part: 'neck',          label: 'Neck / Throat', top: '28.0%', left: '45.2%', width: '8%',  height: '8%'  },
  { part: 'chest',         label: 'Chest',         top: '32.0%', left: '42.7%', width: '14%', height: '14%' },
  { part: 'left-arm',      label: 'Left Arm',      top: '42.4%', left: '20.8%', width: '10%', height: '10%' },
  { part: 'right-arm',     label: 'Right Arm',     top: '42.4%', left: '68.5%', width: '10%', height: '10%' },
  { part: 'upper-abdomen', label: 'Upper Tummy',   top: '47.3%', left: '43.9%', width: '12%', height: '12%' },
  { part: 'lower-abdomen', label: 'Lower Tummy',   top: '53.7%', left: '43.9%', width: '12%', height: '12%' },
  { part: 'left-leg',      label: 'Left Leg',      top: '72.3%', left: '30.5%', width: '12%', height: '12%' },
  { part: 'right-leg',     label: 'Right Leg',     top: '72.3%', left: '56.6%', width: '12%', height: '12%' },
];

const BACK_SHAPES = [
  { part: 'head-back',      label: 'Head',        top: '12.7%', left: '42.8%', width: '12%', height: '12%' },
  { part: 'upper-back',     label: 'Upper Back',  top: '31.3%', left: '42.0%', width: '14%', height: '14%' },
  { part: 'lower-back',     label: 'Lower Back',  top: '53.0%', left: '42.0%', width: '14%', height: '14%' },
  { part: 'left-arm-back',  label: 'Left Arm',    top: '45.3%', left: '24.8%', width: '10%', height: '10%' },
  { part: 'right-arm-back', label: 'Right Arm',   top: '45.3%', left: '65.0%', width: '10%', height: '10%' },
  { part: 'left-leg-back',  label: 'Left Leg',    top: '70.4%', left: '34.3%', width: '12%', height: '12%' },
  { part: 'right-leg-back', label: 'Right Leg',   top: '70.4%', left: '51.3%', width: '12%', height: '12%' },
];

const ZOOM_PARTS = ['head', 'head-back', 'chest', 'upper-abdomen', 'lower-abdomen'];

function BodySVGFallback() {
  return (
    <svg viewBox="0 0 200 480" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="45" rx="38" ry="42" fill="#FDBCB4" stroke="#e0a090" strokeWidth="2" />
      <circle cx="88" cy="42" r="4" fill="#555" />
      <circle cx="112" cy="42" r="4" fill="#555" />
      <path d="M 88 58 Q 100 68 112 58" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="88" y="84" width="24" height="22" rx="4" fill="#FDBCB4" stroke="#e0a090" strokeWidth="1.5" />
      <rect x="55" y="104" width="90" height="120" rx="16" fill="#FDBCB4" stroke="#e0a090" strokeWidth="2" />
      <rect x="18" y="108" width="34" height="100" rx="14" fill="#FDBCB4" stroke="#e0a090" strokeWidth="1.5" />
      <rect x="148" y="108" width="34" height="100" rx="14" fill="#FDBCB4" stroke="#e0a090" strokeWidth="1.5" />
      <rect x="58" y="220" width="38" height="140" rx="14" fill="#FDBCB4" stroke="#e0a090" strokeWidth="1.5" />
      <rect x="104" y="220" width="38" height="140" rx="14" fill="#FDBCB4" stroke="#e0a090" strokeWidth="1.5" />
      <ellipse cx="77" cy="368" rx="22" ry="10" fill="#FDBCB4" stroke="#e0a090" strokeWidth="1.5" />
      <ellipse cx="123" cy="368" rx="22" ry="10" fill="#FDBCB4" stroke="#e0a090" strokeWidth="1.5" />
    </svg>
  );
}

export default function BodyMapScreen() {
  const navigate = useNavigate();
  const { setBodyPart, setZoomPart } = useAppContext();

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [view, setView]                 = useState('front');
  const [selectedPart, setSelectedPart] = useState(null);
  const [hoveredPart, setHoveredPart]   = useState(null);
  const [imgError, setImgError]         = useState(false);

  const shapes = view === 'front' ? FRONT_SHAPES : BACK_SHAPES;
  const selectedShape = shapes.find((s) => s.part === selectedPart)
    ?? (view === 'front' ? BACK_SHAPES : FRONT_SHAPES).find((s) => s.part === selectedPart);

  function handleSelect(part, label) {
    setSelectedPart(part);
    setBodyPart(part, label);
  }

  function handleViewToggle(newView) {
    if (newView === view) return;
    const newShapes = newView === 'front' ? FRONT_SHAPES : BACK_SHAPES;
    const stillExists = newShapes.some((s) => s.part === selectedPart);
    if (!stillExists) {
      setSelectedPart(null);
      setBodyPart(null, null);
    }
    setHoveredPart(null);
    setView(newView);
    setImgError(false);
  }

  function handleNext() {
    if (!selectedPart) return;
    if (ZOOM_PARTS.includes(selectedPart)) {
      navigate('/body-zoom');
    } else {
      setZoomPart(null, null);
      navigate('/symptoms');
    }
  }

  // Compute glow centre from the selected shape's position data
  function glowCenter(shape) {
    const cx = parseFloat(shape.left) + parseFloat(shape.width) / 2;
    const cy = parseFloat(shape.top)  + parseFloat(shape.height) / 2;
    return { x: cx, y: cy };
  }

  return (
    <>
      <style>{cssKeyframes}</style>
      <ScreenLayout
        currentStep={1}
        totalSteps={5}
        onBack={() => navigate('/')}
        onNext={handleNext}
        nextLabel="Next →"
        nextDisabled={!selectedPart}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0D47A1' }}>
            Where does it hurt? 📍
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '4px' }}>
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
                onClick={() => handleViewToggle(v)}
                style={{
                  padding: '8px 24px',
                  borderRadius: '50px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
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

        {/* Selection tag */}
        <div style={{ minHeight: '36px', display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          {selectedShape && (
            <div
              key={selectedPart}
              style={{
                backgroundColor: '#fff',
                color: '#1565C0',
                border: '2px solid #1565C0',
                borderRadius: '50px',
                padding: '6px 18px',
                fontSize: '16px',
                fontWeight: '700',
                boxShadow: '0 2px 8px rgba(21,101,192,0.2)',
                animation: 'tagFadeIn 0.25s ease-out forwards',
              }}
            >
              📍 {selectedShape.label}
            </div>
          )}
        </div>

        {/* Body image + hotspot overlay */}
        <div
          style={{ position: 'relative', width: '100%', backgroundColor: '#FFFFFF', borderRadius: '4px', overflow: 'hidden' }}
        >
          {/* Body image (or fallback) */}
          {imgError ? (
            <BodySVGFallback />
          ) : (
            <img
              src={view === 'front' ? '/images/body-front.JPG' : '/images/body-back.jpg'}
              alt={view === 'front' ? 'Front view of human body' : 'Back view of human body'}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
            />
          )}

          {/* Circular hotspot buttons */}
          {shapes.map((shape) => {
            const isSelected = selectedPart === shape.part;
            const isHovered  = hoveredPart  === shape.part;
            return (
              <button
                key={shape.part}
                onClick={(e) => { e.stopPropagation(); handleSelect(shape.part, shape.label); }}
                onMouseEnter={() => setHoveredPart(shape.part)}
                onMouseLeave={() => setHoveredPart(null)}
                style={{
                  position:        'absolute',
                  top:             shape.top,
                  left:            shape.left,
                  width:           shape.width,
                  height:          shape.height,
                  borderRadius:    '50%',
                  border:          'none',
                  backgroundColor: isSelected
                    ? 'rgba(239, 68, 68, 0.5)'
                    : isHovered
                    ? 'rgba(239, 68, 68, 0.3)'
                    : 'transparent',
                  cursor:          'pointer',
                  transition:      'background-color 0.15s ease',
                  padding:         0,
                  boxSizing:       'border-box',
                  zIndex:          2,
                }}
              />
            );
          })}

          {/* Red glow on selected hotspot */}
          {selectedShape && (() => {
            const c = glowCenter(selectedShape);
            return (
              <div
                key={`glow-${selectedPart}`}
                style={{
                  position:      'absolute',
                  top:           `${c.y}%`,
                  left:          `${c.x}%`,
                  width:         '60px',
                  height:        '60px',
                  pointerEvents: 'none',
                  borderRadius:  '50%',
                  background:    'radial-gradient(circle, rgba(220,38,38,0.85) 0%, rgba(220,38,38,0.55) 30%, rgba(220,38,38,0.25) 60%, transparent 100%)',
                  transform:     'translate(-50%, -50%)',
                  animation:     'glowPulse 1.8s ease-in-out infinite',
                  zIndex:        3,
                }}
              />
            );
          })()}
        </div>
      </ScreenLayout>
    </>
  );
}
