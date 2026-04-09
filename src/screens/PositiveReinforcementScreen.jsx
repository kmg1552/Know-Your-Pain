import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function BearImage({ src, alt }) {
  const [imgError, setImgError] = useState(false);
  return imgError ? (
    <span style={{ fontSize: '80px', lineHeight: 1 }}>🐻</span>
  ) : (
    <img
      src={src}
      alt={alt}
      onError={(e) => { console.log('Bear image failed to load:', e.currentTarget.src); setImgError(true); }}
      style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
    />
  );
}

export default function PositiveReinforcementScreen() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#FFF8E1',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px 32px',
        boxSizing: 'border-box',
      }}
    >
      {/* Bears side by side */}
      <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '520px', marginBottom: '28px' }}>
        {[
          { src: '/images/bear-celebrate.PNG', alt: 'Bear celebrating with confetti', delay: 0 },
          { src: '/images/bear-thumbs.PNG', alt: 'Bear with thumbs up and star', delay: 0.12 },
        ].map(({ src, alt, delay }) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.4, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18, delay }}
            style={{ flex: 1, aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <BearImage src={src} alt={alt} />
          </motion.div>
        ))}
      </div>

      {/* "Good Job!" heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
        style={{
          fontSize: '42px',
          fontWeight: '900',
          color: '#F57C00',
          textAlign: 'center',
          margin: '0 0 12px',
          lineHeight: 1.1,
        }}
      >
        Good Job! 🌟
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.42, ease: 'easeOut' }}
        style={{
          fontSize: '18px',
          color: '#5D4037',
          textAlign: 'center',
          margin: '0 0 40px',
          lineHeight: '1.5',
          maxWidth: '320px',
        }}
      >
        You did amazing! Let's see what might help.
      </motion.p>

      {/* "See My Result" button */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <button
          onClick={() => navigate('/recommendation')}
          style={{
            width: '100%',
            minHeight: '60px',
            borderRadius: '16px',
            border: 'none',
            backgroundColor: '#1565C0',
            color: '#fff',
            fontSize: '19px',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(21,101,192,0.35)',
            transition: 'background-color 0.15s ease, transform 0.1s ease',
          }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          See My Result →
        </button>
      </motion.div>
    </div>
  );
}
