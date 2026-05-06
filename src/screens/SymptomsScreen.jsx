import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '../components/ScreenLayout';
import BigButton from '../components/BigButton';
import { useAppContext } from '../context/AppContext';
import symptomData from '../data/symptomData';

export default function SymptomsScreen() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const {
    selectedBodyPart,
    selectedBodyLabel,
    selectedZoomPart,
    selectedZoomLabel,
    selectedSymptoms,
    toggleSymptom,
  } = useAppContext();

  // ── Look up the correct symptom list ──
  const bodyKey = selectedBodyPart;
  const zoomKey = selectedZoomPart;

  let symptoms = [];

  if (symptomData[bodyKey]) {
    if (zoomKey && symptomData[bodyKey][zoomKey]) {
      symptoms = symptomData[bodyKey][zoomKey];
    } else if (symptomData[bodyKey]['default']) {
      symptoms = symptomData[bodyKey]['default'];
    } else {
      const firstKey = Object.keys(symptomData[bodyKey])[0];
      symptoms = symptomData[bodyKey][firstKey];
    }
  }

  if (symptoms.length === 0) {
    symptoms = [
      { id: 'sharp',     icon: '⚡', label: 'Sharp pain' },
      { id: 'dull',      icon: '😞', label: 'Dull ache'  },
      { id: 'burning',   icon: '🔥', label: 'Burning'    },
      { id: 'throbbing', icon: '💗', label: 'Throbbing'  },
    ];
  }

  const patientSymptoms = symptoms.filter(s => !s.image || !s.image.includes('/carer-'));
  const carerSymptoms   = symptoms.filter(s =>  s.image &&  s.image.includes('/carer-'));

  const locationLabel = selectedZoomLabel || selectedBodyLabel || 'Body';

  function handleBack() {
    if (selectedZoomPart) {
      navigate('/body-zoom');
    } else {
      navigate('/body-map');
    }
  }

  return (
    <ScreenLayout
      currentStep={3}
      totalSteps={5}
      onBack={handleBack}
      onNext={() => navigate('/pain-scale')}
      nextLabel="Next →"
      nextDisabled={false}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0D47A1' }}>
          What do you feel? 😔
        </h2>
        <p style={{ fontSize: '18px', color: '#555', marginTop: '6px', lineHeight: '1.5' }}>
          Tap everything that feels right. You can choose more than one.
        </p>
      </div>

      {/* Location tag */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <div style={{
          backgroundColor: '#1565C0',
          color: '#fff',
          borderRadius: '50px',
          padding: '8px 20px',
          fontSize: '18px',
          fontWeight: '700',
        }}>
          📍 {locationLabel}
        </div>
      </div>

      {/* Patient symptom grid — 2 col mobile, 3 col tablet, 4 col desktop */}
      <div className="kyp-symptom-grid" style={{ marginBottom: '16px' }}>
        {patientSymptoms.map((symptom) => (
          <BigButton
            key={symptom.id}
            emoji={symptom.icon}
            image={symptom.image}
            label={symptom.label}
            selected={selectedSymptoms.includes(symptom.id)}
            onClick={() => toggleSymptom(symptom.id)}
          />
        ))}
      </div>

      {/* Carer section */}
      {carerSymptoms.length > 0 && (
        <>
          <p style={{ fontSize: '22px', fontWeight: 700, color: '#2471A3', margin: '28px 0 12px 0', paddingTop: '20px', borderTop: '2px solid #D0E8F5' }}>
            For Carer: Please choose your observations.
          </p>
          <div className="kyp-symptom-grid" style={{ marginBottom: '16px' }}>
            {carerSymptoms.map((symptom) => (
              <BigButton
                key={symptom.id}
                emoji={symptom.icon}
                image={symptom.image}
                label={symptom.label}
                selected={selectedSymptoms.includes(symptom.id)}
                onClick={() => toggleSymptom(symptom.id)}
              />
            ))}
          </div>
        </>
      )}

      {/* Helper note */}
      <p style={{ textAlign: 'center', fontSize: '18px', color: '#aaa' }}>
        Can't find the right word? That's okay. Just tap Next.
      </p>
    </ScreenLayout>
  );
}
