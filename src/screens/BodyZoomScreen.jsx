import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '../components/ScreenLayout';
import { useAppContext } from '../context/AppContext';

const cssKeyframes = `
  @keyframes tagFadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

// ─────────────────────────────────────────────────────────────
// ZOOM IMAGES — maps selectedBodyPart → image file path
// ─────────────────────────────────────────────────────────────
const zoomImages = {
  'head':            '/images/body-zoomin-head.JPG',
  'head-back':       '/images/body-zoomin-head.JPG',
  'chest':           '/images/body-zoomin-chest.JPG',
  'left-arm':        '/images/body-zoomin-arm.JPG',
  'right-arm':       '/images/body-zoomin-arm.JPG',
  'left-leg':        '/images/body-zoomin-leg.JPG',
  'right-leg':       '/images/body-zoomin-leg.JPG',
  'upper-abdomen':   '/images/body-front.png',
  'lower-abdomen':   '/images/body-front.png',
};

// ─────────────────────────────────────────────────────────────
// ZOOM PARTS — percentage-based button positions per body part.
// All values are % of the rendered image width/height.
// Adjust individual top/left/width/height strings to fine-tune.
// ─────────────────────────────────────────────────────────────
const zoomParts = {

  // HEAD (front) — face at top ~60%, 4 equal boxes in bottom 40%
  head: [
    { id: 'eyes',  label: 'Eyes',  top: '60.6%', left: '11.4%', width: '18.3%', height: '26.8%' },
    { id: 'nose',  label: 'Nose',  top: '60.6%', left: '34.6%', width: '13.4%', height: '26.8%' },
    { id: 'mouth', label: 'Mouth', top: '60.6%', left: '52.7%', width: '13.8%', height: '26.8%' },
    { id: 'ears',  label: 'Ears',  top: '60.6%', left: '70.8%', width: '16.7%', height: '26.8%' },
  ],

  // HEAD (back) — approximate regions on the same head image
  'head-back': [
    { id: 'back-of-head',  label: 'Back of Head',  top: '15%', left: '22%', width: '56%', height: '50%' },
    { id: 'temple-left',   label: 'Left Temple',   top: '25%', left: '13%', width: '17%', height: '25%' },
    { id: 'temple-right',  label: 'Right Temple',  top: '25%', left: '70%', width: '17%', height: '25%' },
  ],

  // CHEST — Lungs box left, Heart box right
  chest: [
    { id: 'lungs', label: 'Lungs', top: '20%', left: '2%',  width: '30%', height: '55%' },
    { id: 'heart', label: 'Heart', top: '20%', left: '68%', width: '30%', height: '55%' },
  ],

  // ARM — 3 boxes top row, 2 boxes bottom row
  'left-arm': [
    { id: 'upper-arm', label: 'Upper Arm', top: '10%', left: '2%',  width: '31%', height: '42%' },
    { id: 'lower-arm', label: 'Lower Arm', top: '10%', left: '34%', width: '31%', height: '42%' },
    { id: 'wrist',     label: 'Wrist',     top: '10%', left: '66%', width: '32%', height: '42%' },
    { id: 'hand',      label: 'Hand',      top: '55%', left: '18%', width: '31%', height: '42%' },
    { id: 'fingers',   label: 'Fingers',   top: '55%', left: '51%', width: '31%', height: '42%' },
  ],
  'right-arm': [
    { id: 'upper-arm', label: 'Upper Arm', top: '10%', left: '2%',  width: '31%', height: '42%' },
    { id: 'lower-arm', label: 'Lower Arm', top: '10%', left: '34%', width: '31%', height: '42%' },
    { id: 'wrist',     label: 'Wrist',     top: '10%', left: '66%', width: '32%', height: '42%' },
    { id: 'hand',      label: 'Hand',      top: '55%', left: '18%', width: '31%', height: '42%' },
    { id: 'fingers',   label: 'Fingers',   top: '55%', left: '51%', width: '31%', height: '42%' },
  ],

  // LEG — 3 boxes top row, 2 boxes bottom row
  'left-leg': [
    { id: 'upper-leg', label: 'Upper Leg', top: '10%', left: '2%',  width: '31%', height: '42%' },
    { id: 'lower-leg', label: 'Lower Leg', top: '10%', left: '34%', width: '31%', height: '42%' },
    { id: 'ankle',     label: 'Ankle',     top: '10%', left: '66%', width: '32%', height: '42%' },
    { id: 'feet',      label: 'Feet',      top: '55%', left: '18%', width: '31%', height: '42%' },
    { id: 'toes',      label: 'Toes',      top: '55%', left: '51%', width: '31%', height: '42%' },
  ],
  'right-leg': [
    { id: 'upper-leg', label: 'Upper Leg', top: '10%', left: '2%',  width: '31%', height: '42%' },
    { id: 'lower-leg', label: 'Lower Leg', top: '10%', left: '34%', width: '31%', height: '42%' },
    { id: 'ankle',     label: 'Ankle',     top: '10%', left: '66%', width: '32%', height: '42%' },
    { id: 'feet',      label: 'Feet',      top: '55%', left: '18%', width: '31%', height: '42%' },
    { id: 'toes',      label: 'Toes',      top: '55%', left: '51%', width: '31%', height: '42%' },
  ],

  // UPPER ABDOMEN — approximate regions on body-front.png
  'upper-abdomen': [
    { id: 'upper-mid',   label: 'Upper Middle', top: '32%', left: '36%', width: '28%', height: '11%' },
    { id: 'upper-left',  label: 'Left Side',    top: '32%', left: '25%', width: '12%', height: '11%' },
    { id: 'upper-right', label: 'Right Side',   top: '32%', left: '63%', width: '12%', height: '11%' },
  ],

  // LOWER ABDOMEN — approximate regions on body-front.png
  'lower-abdomen': [
    { id: 'lower-mid',   label: 'Lower Middle', top: '43%', left: '37%', width: '26%', height: '11%' },
    { id: 'lower-left',  label: 'Left Side',    top: '43%', left: '25%', width: '13%', height: '11%' },
    { id: 'lower-right', label: 'Right Side',   top: '43%', left: '62%', width: '13%', height: '11%' },
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
    setZoomPart(id, label);
  }

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
            Select where it hurts on the{' '}
            <span style={{ color: '#00796B' }}>{selectedBodyLabel || 'body'}</span>
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

        {/* Image + transparent button overlay */}
        {/* paddingBottom sets container height to match the image's natural aspect ratio */}
        <div
          style={{ position: 'relative', width: '100%', paddingBottom: '75%' }}
        >
          <img
            src={imageSrc}
            alt={`Zoom of ${selectedBodyLabel || 'body part'}`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
          />

          {parts.map((part) => {
            const isSelected = selectedZoomPart === part.id;
            const isHovered  = hoveredPart === part.id;
            return (
              <button
                key={part.id}
                onClick={() => handleSelect(part.id, part.label)}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                style={{
                  position:        'absolute',
                  top:             part.top,
                  left:            part.left,
                  width:           part.width,
                  height:          part.height,
                  backgroundColor: isSelected
                    ? 'rgba(147, 197, 253, 0.5)'
                    : isHovered
                    ? 'rgba(147, 197, 253, 0.4)'
                    : 'transparent',
                  border:          isSelected ? '2px solid rgba(21, 101, 192, 0.7)' : 'none',
                  borderRadius:    '8px',
                  cursor:          'pointer',
                  transition:      'background-color 0.15s ease',
                  boxSizing:       'border-box',
                  padding:         0,
                }}
              />
            );
          })}
        </div>
      </ScreenLayout>
    </>
  );
}
