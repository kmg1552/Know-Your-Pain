import { useState } from 'react';

export default function BigButton({ emoji, image, label, selected, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        background: selected ? '#EFF6FF' : 'white',
        border: selected ? '2.5px solid #1565C0' : '2.5px solid #E2E8F0',
        borderRadius: '16px',
        padding: '14px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        minHeight: '160px',
        width: '100%',
        transition: 'all 0.15s ease',
        position: 'relative',
      }}
    >
      {/* Checkmark for selected state */}
      {selected && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: '#1565C0',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
        }}>✓</div>
      )}

      {/* Image or emoji */}
      <div style={{
        width: '120px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {image && !imgError ? (
          <img
            src={image}
            alt={label}
            onError={() => setImgError(true)}
            style={{ width: '120px', height: '120px', objectFit: 'contain' }}
          />
        ) : (
          <span style={{ fontSize: '64px', lineHeight: 1 }}>{emoji}</span>
        )}
      </div>

      {/* Label */}
      <span style={{
        fontSize: '14px',
        fontWeight: '700',
        color: selected ? '#1565C0' : '#1A202C',
        textAlign: 'center',
        lineHeight: '1.3',
      }}>
        {label}
      </span>
    </button>
  );
}
