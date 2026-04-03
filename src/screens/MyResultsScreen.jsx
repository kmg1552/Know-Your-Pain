import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function formatSymptomId(id) {
  return id.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function loadResults() {
  try {
    return JSON.parse(localStorage.getItem('kyp_results') || '[]');
  } catch {
    return [];
  }
}

function ResultCard({ record }) {
  const [expanded, setExpanded] = useState(false);

  const symptoms = record.symptoms || [];
  const visibleSymptoms = expanded ? symptoms : symptoms.slice(0, 3);
  const hasMore = symptoms.length > 3;

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '14px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      borderLeft: '4px solid #1565C0',
      padding: '14px 14px 14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      {/* Date */}
      <p style={{ fontSize: '12px', color: '#999', textAlign: 'right', margin: 0 }}>
        {record.date}
      </p>

      {/* Body area */}
      <p style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
        📍 {record.bodyLabel}{record.zoomLabel ? ` › ${record.zoomLabel}` : ''}
      </p>

      {/* Pain level badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          backgroundColor: '#EFF6FF',
          color: '#1565C0',
          borderRadius: '20px',
          padding: '5px 14px',
          fontSize: '15px',
          fontWeight: '700',
        }}>
          {record.painEmoji} Pain level: {record.painScale}/10
        </span>
      </div>

      {/* Symptoms */}
      {symptoms.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {visibleSymptoms.map((s, i) => (
            <span key={i} style={{
              backgroundColor: '#F1F5F9',
              color: '#475569',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '13px',
              fontWeight: '600',
            }}>
              {formatSymptomId(s)}
            </span>
          ))}
          {hasMore && (
            <button
              onClick={() => setExpanded((e) => !e)}
              style={{
                background: 'none',
                border: 'none',
                color: '#1565C0',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                padding: '3px 4px',
              }}
            >
              {expanded ? 'Show less' : `+${symptoms.length - 3} more`}
            </button>
          )}
        </div>
      )}

      {/* Recommendation */}
      {record.recTitle && (
        <p style={{ fontSize: '14px', fontWeight: '800', color: '#2E7D32', margin: 0 }}>
          {record.emoji} {record.recTitle}
        </p>
      )}
    </div>
  );
}

export default function MyResultsScreen() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [results, setResults] = useState(loadResults);

  function handleClose() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }

  function handleClearAll() {
    if (window.confirm('Are you sure? This cannot be undone.')) {
      localStorage.removeItem('kyp_results');
      setResults([]);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F0F4F8' }}>

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: '#1565C0',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: 0 }}>
          📋 My Results
        </h1>
        <button
          onClick={handleClose}
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '6px 14px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          ✕ Close
        </button>
      </header>

      {/* Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {results.length === 0 ? (
          /* Empty state */
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '60px',
            gap: '12px',
            textAlign: 'center',
          }}>
            <span style={{ fontSize: '64px' }}>📋</span>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#333' }}>
              No saved results yet.
            </p>
            <p style={{ fontSize: '14px', color: '#888', maxWidth: '260px' }}>
              Complete the check and tap Save to My Results.
            </p>
          </div>
        ) : (
          <>
            {results.map((record) => (
              <ResultCard key={record.id} record={record} />
            ))}

            {/* Clear all */}
            <button
              onClick={handleClearAll}
              style={{
                width: '100%',
                marginTop: '8px',
                padding: '16px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: '#FEE2E2',
                color: '#B91C1C',
                fontSize: '15px',
                fontWeight: '800',
                cursor: 'pointer',
                marginBottom: '24px',
              }}
            >
              🗑️ Clear All Results
            </button>
          </>
        )}
      </main>
    </div>
  );
}
