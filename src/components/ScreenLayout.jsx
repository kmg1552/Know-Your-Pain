import { useNavigate } from 'react-router-dom';

export default function ScreenLayout({
  children,
  currentStep = 0,
  totalSteps = 0,
  showResultsButton = false,
  onBack,
  onNext,
  nextLabel = 'Next →',
  nextDisabled = false,
  hideBottomBar = false,
}) {
  const navigate = useNavigate();

  const progressPercent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Sticky header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: '#1565C0',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontWeight: '800', color: '#fff', fontSize: '18px' }}>
          Know Your Pain 💊
        </span>
        {showResultsButton && (
          <button
            onClick={() => navigate('/my-results')}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: '#fff',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '8px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '700',
            }}
          >
            My Results 📋
          </button>
        )}
      </header>

      {/* Progress bar */}
      {currentStep > 0 && (
        <div style={{ backgroundColor: '#1565C0', padding: '6px 16px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>
              Step {currentStep} of {totalSteps}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div
            style={{
              height: '8px',
              borderRadius: '4px',
              backgroundColor: 'rgba(255,255,255,0.25)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                backgroundColor: '#FFD54F',
                borderRadius: '4px',
                transition: 'width 0.35s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <main style={{
        flex: 1,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        padding: '16px',
      }}>
        {children}
      </main>

      {/* Sticky bottom bar */}
      {!hideBottomBar && (
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: '#fff',
            borderTop: '1px solid #e0e0e0',
            padding: '12px 16px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '16px 12px',
              minHeight: '54px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#ECEFF1',
              color: '#333',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            disabled={nextDisabled}
            style={{
              flex: 2,
              padding: '16px 12px',
              minHeight: '54px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: nextDisabled ? '#90CAF9' : '#1565C0',
              color: '#fff',
              fontSize: '17px',
              fontWeight: '800',
              cursor: nextDisabled ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            {nextLabel}
          </button>
        </div>
      )}
    </div>
  );
}
