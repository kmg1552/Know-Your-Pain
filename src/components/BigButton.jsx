import { useState } from 'react';

export default function BigButton({ emoji, image, label, selected, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="kyp-bigbtn"
      style={{
        background: selected ? '#EFF6FF' : 'white',
        border: selected ? '2.5px solid #1565C0' : '2.5px solid #E2E8F0',
        borderRadius: '16px',
        padding: '14px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        minHeight: '160px',
        width: '100%',
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
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          fontWeight: 'bold',
        }}>✓</div>
      )}

      {/* Image or emoji */}
      <div className="kyp-bigbtn-media">
        {image && !imgError ? (
          <img
            src={image}
            alt={label}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <span className="kyp-bigbtn-emoji">{emoji}</span>
        )}
      </div>

      {/* Label */}
      <span className="kyp-bigbtn-label" style={{
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
