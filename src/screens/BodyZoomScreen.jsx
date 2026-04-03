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
// ZOOM IMAGE — maps selectedBodyPart → image file path
// ─────────────────────────────────────────────────────────────
const zoomImages = {
  'head':           '/images/body-zoomin-head.png',
  'head-back':      '/images/body-zoomin-headback.png',
  'chest':          '/images/body-front.png',
  'upper-abdomen':  '/images/body-front.png',
  'lower-abdomen':  '/images/body-front.png',
};

// ─────────────────────────────────────────────────────────────
// ZOOM PARTS — SVG viewBox "0 0 100 100" (percentage coords)
// glowX / glowY are the % positions for the red glow circle.
// ─────────────────────────────────────────────────────────────
const zoomParts = {

  head: [
    {
      id: 'forehead', label: 'Forehead', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 30, y: 18, w: 40, h: 19,
      glowX: 50, glowY: 28, glowSize: 55,
    },
    {
      id: 'eye-left', label: 'Left Eye', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 29, y: 50, w: 14, h: 10,
      glowX: 36, glowY: 55, glowSize: 35,
    },
    {
      id: 'eye-right', label: 'Right Eye', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 57, y: 50, w: 18, h: 10,
      glowX: 66, glowY: 55, glowSize: 35,
    },
    {
      id: 'ear-left', label: 'Left Ear', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 13, y: 43, w: 12, h: 19,
      glowX: 19, glowY: 52, glowSize: 35,
    },
    {
      id: 'ear-right', label: 'Right Ear', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 75, y: 43, w: 12, h: 19,
      glowX: 81, glowY: 52, glowSize: 35,
    },
    {
      id: 'nose', label: 'Nose', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 41, y: 50, w: 18, h: 16,
      glowX: 50, glowY: 58, glowSize: 35,
    },
    {
      id: 'mouth-jaw', label: 'Mouth / Jaw', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 30, y: 67, w: 40, h: 18,
      glowX: 50, glowY: 76, glowSize: 48,
    },
  ],

  'head-back': [
    {
      id: 'back-of-head', label: 'Back of Head', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 22, y: 15, w: 56, h: 50,
      glowX: 50, glowY: 40, glowSize: 65,
    },
    {
      id: 'temple-left', label: 'Left Temple', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 13, y: 25, w: 17, h: 25,
      glowX: 21, glowY: 37, glowSize: 38,
    },
    {
      id: 'temple-right', label: 'Right Temple', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 70, y: 25, w: 17, h: 25,
      glowX: 79, glowY: 37, glowSize: 38,
    },
    {
      id: 'whole-head', label: 'Whole Head', shape: 'ellipse',
      // ← ADJUST cx/cy/rx/ry to match the image
      cx: 50, cy: 40, rx: 35, ry: 38,
      glowX: 50, glowY: 40, glowSize: 70,
    },
  ],

  chest: [
    {
      id: 'chest-centre', label: 'Centre', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 35, y: 22, w: 30, h: 10,
      glowX: 50, glowY: 27, glowSize: 55,
    },
    {
      id: 'chest-left', label: 'Left Side', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 25, y: 22, w: 10, h: 10,
      glowX: 30, glowY: 27, glowSize: 40,
    },
    {
      id: 'chest-right', label: 'Right Side', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 65, y: 22, w: 10, h: 10,
      glowX: 70, glowY: 27, glowSize: 40,
    },
  ],

  'upper-abdomen': [
    {
      id: 'upper-mid', label: 'Upper Middle', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 36, y: 32, w: 28, h: 11,
      glowX: 50, glowY: 37, glowSize: 55,
    },
    {
      id: 'upper-left', label: 'Left Side', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 25, y: 32, w: 12, h: 11,
      glowX: 31, glowY: 37, glowSize: 38,
    },
    {
      id: 'upper-right', label: 'Right Side', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 63, y: 32, w: 12, h: 11,
      glowX: 69, glowY: 37, glowSize: 38,
    },
  ],

  'lower-abdomen': [
    {
      id: 'lower-mid', label: 'Lower Middle', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 37, y: 43, w: 26, h: 11,
      glowX: 50, glowY: 48, glowSize: 55,
    },
    {
      id: 'lower-left', label: 'Left Side', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 25, y: 43, w: 13, h: 11,
      glowX: 31, glowY: 48, glowSize: 38,
    },
    {
      id: 'lower-right', label: 'Right Side', shape: 'rect',
      // ← ADJUST THESE COORDS to match the image
      x: 62, y: 43, w: 13, h: 11,
      glowX: 69, glowY: 48, glowSize: 38,
    },
  ],
};

export default function BodyZoomScreen() {
  const navigate = useNavigate();
  const { selectedBodyPart, selectedBodyLabel, selectedZoomPart, setZoomPart } = useAppContext();

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [hoveredPart, setHoveredPart] = useState(null);

  const parts    = zoomParts[selectedBodyPart] || [];
  const imageSrc = zoomImages[selectedBodyPart] || '/images/body-front.png';
  const selectedPartData = parts.find((p) => p.id === selectedZoomPart);

  function handleSelect(id, label) {
    setHoveredPart(null);
    setZoomPart(id, label);
  }

  function fillColor(partId) {
    if (selectedZoomPart === partId) return 'rgba(220,38,38,0.15)';
    if (hoveredPart === partId)      return 'rgba(59,130,246,0.20)';
    return 'transparent';
  }

  function strokeColor(partId) {
    if (selectedZoomPart === partId) return 'rgba(220,38,38,0.80)';
    if (hoveredPart === partId)      return 'rgba(59,130,246,0.60)';
    return 'transparent';
  }

  const shapeProps = (part) => ({
    fill:        fillColor(part.id),
    stroke:      strokeColor(part.id),
    strokeWidth: selectedZoomPart === part.id ? '0.8' : '0.6',
    style: { cursor: 'pointer', transition: 'fill 0.2s ease, stroke 0.2s ease' },
    onMouseEnter: () => setHoveredPart(part.id),
    onMouseLeave: () => setHoveredPart(null),
    onClick:      () => handleSelect(part.id, part.label),
  });

  return (
    <>
      <style>{cssKeyframes}</style>
      <ScreenLayout
        currentStep={2}
        totalSteps={5}
        onBack={() => navigate('/body-map')}
        onNext={() => navigate('/symptoms')}
        nextLabel="Next →"
        nextDisabled={!selectedZoomPart}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0D47A1' }}>
            Which part of your {selectedBodyLabel || 'body'}? 🔍
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '4px' }}>
            Tap the exact area that hurts.
          </p>
        </div>

        {/* Selection tag */}
        <div style={{ minHeight: '36px', display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          {selectedPartData && (
            <div
              key={selectedZoomPart}
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
              📍 {selectedPartData.label}
            </div>
          )}
        </div>

        {/* Zoom image + SVG overlay */}
        <div style={{ position: 'relative', width: '100%', backgroundColor: '#FFFFFF', borderRadius: '4px', overflow: 'hidden' }}>

          <img
            src={imageSrc}
            alt={`Zoom of ${selectedBodyLabel || 'body part'}`}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
          />

          {/* SVG hotspot overlay */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
            }}
          >
            {parts.map((part) =>
              part.shape === 'ellipse' ? (
                <ellipse
                  key={part.id}
                  cx={part.cx} cy={part.cy}
                  rx={part.rx} ry={part.ry}
                  {...shapeProps(part)}
                />
              ) : (
                <rect
                  key={part.id}
                  x={part.x}
                  y={part.y}
                  width={part.w}
                  height={part.h}
                  rx="4"
                  ry="4"
                  {...shapeProps(part)}
                />
              )
            )}
          </svg>

          {/* Red glow on selected sub-region */}
          {selectedPartData && (
            <div
              key={`glow-${selectedZoomPart}`}
              style={{
                position: 'absolute',
                left: `${selectedPartData.glowX}%`,
                top:  `${selectedPartData.glowY}%`,
                width:  `${selectedPartData.glowSize}px`,
                height: `${selectedPartData.glowSize}px`,
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(220,38,38,0.85) 0%, rgba(220,38,38,0.55) 30%, rgba(220,38,38,0.25) 60%, transparent 100%)',
                borderRadius: '50%',
                pointerEvents: 'none',
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
