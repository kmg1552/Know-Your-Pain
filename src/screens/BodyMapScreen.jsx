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
// BODY SHAPES — SVG viewBox "0 0 100 100" (percentage coords)
// Each shape has a glowCenter {x, y} used to position the glow.
// type: "ellipse" | "rect"
// ─────────────────────────────────────────────────────────────

const FRONT_SHAPES = [
  // ← ADJUST: Head ellipse
  { part: 'head',          label: 'Head',          type: 'ellipse',
    cx: 50, cy: 11, rx: 9, ry: 9,
    glowCenter: { x: 50, y: 11 }, glowSize: 60 },

  // ← ADJUST: Neck
  { part: 'neck',          label: 'Neck / Throat', type: 'rect',
    x: 44, y: 20, w: 12, h: 4,
    glowCenter: { x: 50, y: 22 }, glowSize: 38 },

  // ← ADJUST: Chest
  { part: 'chest',         label: 'Chest',         type: 'rect',
    x: 40, y: 24, w: 20, h: 8,
    glowCenter: { x: 50, y: 28 }, glowSize: 55 },

  // ← ADJUST: Upper Tummy
  { part: 'upper-abdomen', label: 'Upper Tummy',   type: 'rect',
    x: 40, y: 32, w: 20, h: 11,
    glowCenter: { x: 50, y: 37 }, glowSize: 52 },

  // ← ADJUST: Lower Tummy
  { part: 'lower-abdomen', label: 'Lower Tummy',   type: 'rect',
    x: 41, y: 43, w: 18, h: 11,
    glowCenter: { x: 50, y: 48 }, glowSize: 50 },

  // ← ADJUST: Left Arm
  { part: 'left-arm',      label: 'Left Arm',      type: 'rect',
    x: 28, y: 22, w: 12, h: 30,
    glowCenter: { x: 34, y: 37 }, glowSize: 42 },

  // ← ADJUST: Right Arm
  { part: 'right-arm',     label: 'Right Arm',     type: 'rect',
    x: 60, y: 22, w: 12, h: 30,
    glowCenter: { x: 66, y: 37 }, glowSize: 42 },

  // ← ADJUST: Left Leg
  { part: 'left-leg',      label: 'Left Leg',      type: 'rect',
    x: 36, y: 54, w: 14, h: 43,
    glowCenter: { x: 43, y: 75 }, glowSize: 52 },

  // ← ADJUST: Right Leg
  { part: 'right-leg',     label: 'Right Leg',     type: 'rect',
    x: 50, y: 54, w: 14, h: 43,
    glowCenter: { x: 57, y: 75 }, glowSize: 52 },
];

const BACK_SHAPES = [
  // ← ADJUST: Head ellipse (back)
  { part: 'head-back',     label: 'Head',          type: 'ellipse',
    cx: 50, cy: 11, rx: 9, ry: 9,
    glowCenter: { x: 50, y: 11 }, glowSize: 60 },

  // ← ADJUST: Neck (back)
  { part: 'neck-back',     label: 'Back of Neck',  type: 'rect',
    x: 44, y: 20, w: 12, h: 4,
    glowCenter: { x: 50, y: 22 }, glowSize: 38 },

  // ← ADJUST: Upper Back
  { part: 'upper-back',    label: 'Upper Back',    type: 'rect',
    x: 40, y: 22, w: 20, h: 16,
    glowCenter: { x: 50, y: 30 }, glowSize: 60 },

  // ← ADJUST: Lower Back
  { part: 'lower-back',    label: 'Lower Back',    type: 'rect',
    x: 40, y: 38, w: 20, h: 15,
    glowCenter: { x: 50, y: 45 }, glowSize: 55 },

  // ← ADJUST: Left Arm (back)
  { part: 'left-arm-back', label: 'Left Arm',      type: 'rect',
    x: 28, y: 22, w: 12, h: 30,
    glowCenter: { x: 34, y: 37 }, glowSize: 42 },

  // ← ADJUST: Right Arm (back)
  { part: 'right-arm-back',label: 'Right Arm',     type: 'rect',
    x: 60, y: 22, w: 12, h: 30,
    glowCenter: { x: 66, y: 37 }, glowSize: 42 },

  // ← ADJUST: Left Leg (back)
  { part: 'left-leg-back', label: 'Left Leg',      type: 'rect',
    x: 36, y: 53, w: 14, h: 44,
    glowCenter: { x: 43, y: 75 }, glowSize: 52 },

  // ← ADJUST: Right Leg (back)
  { part: 'right-leg-back',label: 'Right Leg',     type: 'rect',
    x: 50, y: 53, w: 14, h: 44,
    glowCenter: { x: 57, y: 75 }, glowSize: 52 },
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
  const [view, setView]               = useState('front');
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

  // Fill/stroke colours per state
  function shapeStyle(part) {
    if (selectedPart === part) {
      return {
        fill:        'rgba(220,38,38,0.15)',
        stroke:      'rgba(220,38,38,0.80)',
        strokeWidth: '0.8',
      };
    }
    if (hoveredPart === part) {
      return {
        fill:        'rgba(59,130,246,0.20)',
        stroke:      'rgba(59,130,246,0.60)',
        strokeWidth: '0.5',
      };
    }
    return { fill: 'transparent', stroke: 'transparent', strokeWidth: '0' };
  }

  const sharedSvgProps = (shape) => ({
    style: { cursor: 'pointer', transition: 'fill 0.2s ease, stroke 0.2s ease' },
    onClick:      () => handleSelect(shape.part, shape.label),
    onMouseEnter: () => setHoveredPart(shape.part),
    onMouseLeave: () => setHoveredPart(null),
    ...shapeStyle(shape.part),
  });

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

        {/* Body image + SVG overlay */}
        <div style={{ position: 'relative', width: '100%', backgroundColor: '#FFFFFF', borderRadius: '4px', overflow: 'hidden' }}>

          {/* Body image (or fallback) */}
          {imgError ? (
            <BodySVGFallback />
          ) : (
            <img
              src={view === 'front' ? '/images/body-front.png' : '/images/body-back.png'}
              alt={view === 'front' ? 'Front view of human body' : 'Back view of human body'}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
            />
          )}

          {/* SVG hotspot overlay */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              overflow: 'visible',
            }}
          >
            {shapes.map((shape) =>
              shape.type === 'ellipse' ? (
                <ellipse
                  key={shape.part}
                  cx={shape.cx}
                  cy={shape.cy}
                  rx={shape.rx}
                  ry={shape.ry}
                  {...sharedSvgProps(shape)}
                />
              ) : (
                <rect
                  key={shape.part}
                  x={shape.x}
                  y={shape.y}
                  width={shape.w}
                  height={shape.h}
                  rx="4"
                  ry="4"
                  {...sharedSvgProps(shape)}
                />
              )
            )}
          </svg>

          {/* Red glow — positioned using glowCenter percentages */}
          {selectedShape && (
            <div
              key={`glow-${selectedPart}`}
              style={{
                position: 'absolute',
                top:  `${selectedShape.glowCenter.y}%`,
                left: `${selectedShape.glowCenter.x}%`,
                width:  `${selectedShape.glowSize}px`,
                height: `${selectedShape.glowSize}px`,
                pointerEvents: 'none',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(220,38,38,0.85) 0%, rgba(220,38,38,0.55) 30%, rgba(220,38,38,0.25) 60%, transparent 100%)',
                transform: 'translate(-50%, -50%)',
                animation: 'glowPulse 1.8s ease-in-out infinite',
                zIndex: 3,
              }}
            />
          )}
        </div>
      </ScreenLayout>
    </>
  );
}
