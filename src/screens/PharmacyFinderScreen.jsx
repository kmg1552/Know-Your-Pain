import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ScreenLayout from '../components/ScreenLayout';
import { useAppContext } from '../context/AppContext';
import getRecommendation from '../data/recommendationLogic';

// Fix Leaflet default marker icon in Vite builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const PAIN_FACES = ['😊','😌','😐','😕','😟','😣','😖','😫','😩','😭'];

const userIcon = L.divIcon({
  className: '',
  html: '<div style="width:18px;height:18px;background:#1565C0;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.5);"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const pharmacyIcon = L.divIcon({
  className: '',
  html: '<div style="width:14px;height:14px;background:#D32F2F;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,0.4);"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function PharmacyFinderScreen() {
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

  const [status, setStatus] = useState('loading'); // 'loading' | 'denied' | 'searching' | 'done' | 'error'
  const [userCoords, setUserCoords] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!navigator.geolocation) {
      setStatus('denied');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = parseFloat(pos.coords.latitude);
        const userLon = parseFloat(pos.coords.longitude);
        setUserCoords({ lat: userLat, lon: userLon });
        setStatus('searching');
        fetchPharmacies(userLat, userLon);
      },
      () => {
        setStatus('denied');
      }
    );
  }, []);

  async function fetchPharmacies(lat, lon) {
    try {
      const res = await fetch(`/api/pharmacy?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const places = data.places || [];
      const results = places
        .map((place) => ({
          name: place.displayName?.text || 'Unknown Pharmacy',
          address: place.formattedAddress || 'Address not available',
          lat: place.location.latitude,
          lon: place.location.longitude,
          distance: haversine(lat, lon, place.location.latitude, place.location.longitude),
        }))
        .sort((a, b) => a.distance - b.distance);
      setPharmacies(results);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  function handleSave() {
    if (saved) return;
    const result = getRecommendation({
      selectedBodyPart,
      selectedZoomPart,
      selectedSymptoms: selectedSymptoms || [],
      painScale,
    });
    const record = {
      id: Date.now(),
      date: new Date().toLocaleString('en-AU', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }),
      bodyLabel: selectedBodyLabel || '—',
      zoomLabel: selectedZoomLabel || null,
      painScale,
      painEmoji: PAIN_FACES[Math.min((painScale || 1) - 1, 9)],
      symptoms: selectedSymptoms || [],
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
    <ScreenLayout
      currentStep={0}
      totalSteps={0}
      showResultsButton={false}
      hideBottomBar={true}
    >
      <div style={{ paddingBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0D47A1' }}>
          📍 Find My Nearest Pharmacy
        </h2>

        {/* Loading / searching state */}
        {(status === 'loading' || status === 'searching') && (
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '32px 20px',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
            <p style={{ fontSize: '16px', color: '#555', fontWeight: '600' }}>
              {status === 'loading'
                ? 'Waiting for your location…'
                : 'Searching for nearby pharmacies…'}
            </p>
          </div>
        )}

        {/* Location denied */}
        {status === 'denied' && (
          <div style={{
            backgroundColor: '#FFF5F5',
            border: '2px solid #FCA5A5',
            borderRadius: '16px',
            padding: '24px 20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🚫</div>
            <p style={{ fontSize: '16px', color: '#B91C1C', fontWeight: '700' }}>
              Location access was denied. Please enable location in your browser settings.
            </p>
          </div>
        )}

        {/* Network / API error */}
        {status === 'error' && (
          <div style={{
            backgroundColor: '#FFF8E1',
            border: '2px solid #FFE082',
            borderRadius: '16px',
            padding: '24px 20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚠️</div>
            <p style={{ fontSize: '16px', color: '#7B4F00', fontWeight: '700' }}>
              Could not load pharmacy data. Please check your connection and try again.
            </p>
          </div>
        )}

        {/* Map */}
        {status === 'done' && userCoords && (
          <div className="pharmacy-map-container">
            <MapContainer
              center={[userCoords.lat, userCoords.lon]}
              zoom={14}
              style={{ height: '300px', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[userCoords.lat, userCoords.lon]} icon={userIcon}>
                <Popup>You are here</Popup>
              </Marker>
              {pharmacies.map((p, i) => (
                <Marker key={i} position={[p.lat, p.lon]} icon={pharmacyIcon}>
                  <Popup>
                    <strong>{p.name}</strong>
                    {p.address && <><br />{p.address}</>}
                    <br />{p.distance.toFixed(1)} km away
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {/* Pharmacy list */}
        {status === 'done' && (
          <>
            <p style={{ fontSize: '15px', fontWeight: '700', color: '#333' }}>
              {pharmacies.length > 0
                ? `Found ${pharmacies.length} pharmacies nearby:`
                : 'No pharmacies found within 5 km.'}
            </p>
            {pharmacies.map((p, i) => (
              <div key={i} className="pharmacy-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '800', fontSize: '16px', color: '#0D47A1', marginBottom: '4px' }}>
                      💊 {p.name}
                    </p>
                    <p style={{ fontSize: '14px', color: '#555' }}>
                      {p.address || 'Address not available'}
                    </p>
                  </div>
                  <span style={{
                    backgroundColor: '#E8F5E9',
                    color: '#2E7D32',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '13px',
                    fontWeight: '800',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {p.distance.toFixed(1)} km
                  </span>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Bottom buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
          <button
            onClick={() => navigate('/recommendation')}
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
            ← Back
          </button>

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
            {saved ? '✅ Saved!' : '💾 Save My Results'}
          </button>

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
            🏠 Return to Main Page
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
