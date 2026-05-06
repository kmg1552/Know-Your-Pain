import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const STEP_LABELS = ['Body Map', 'Zoom In', 'Symptoms', 'Pain Level', 'Results'];

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
  hideNext = false,
}) {
  const navigate = useNavigate();
  const { layoutMode } = useAppContext();
  const progressPercent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className={layoutMode === 'desktop' ? 'kyp-shell kyp-desktop' : 'kyp-shell kyp-mobile'}>
      {/* ── Sticky header ── */}
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
        <span style={{ fontWeight: '800', color: '#fff', fontSize: '20px' }}>
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
              padding: '8px 14px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '700',
              minHeight: '48px',
            }}
          >
            My Results 📋
          </button>
        )}
      </header>

      {/* ── Progress bar (mobile + tablet) ── */}
      {currentStep > 0 && (
        <div
          style={{ backgroundColor: '#1565C0', padding: '6px 16px 10px' }}
          className="kyp-progress-bar-wrap"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>
              Step {currentStep} of {totalSteps}
            </span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>
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

      {/* ── Body: sidebar (desktop) + content ── */}
      <div className="kyp-body">

        {/* Left sidebar — desktop only */}
        {currentStep > 0 && (
          <nav className="kyp-sidebar">
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Progress
            </p>
            {STEP_LABELS.slice(0, totalSteps).map((label, i) => {
              const stepNum = i + 1;
              const isDone    = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;
              return (
                <div
                  key={stepNum}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: isCurrent
                      ? 'rgba(255,255,255,0.18)'
                      : 'transparent',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: '800',
                      flexShrink: 0,
                      backgroundColor: isDone
                        ? '#4CAF50'
                        : isCurrent
                        ? '#FFD54F'
                        : 'rgba(255,255,255,0.15)',
                      color: isDone || isCurrent ? '#0D47A1' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {isDone ? '✓' : stepNum}
                  </div>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: isCurrent ? '700' : '500',
                      color: isCurrent
                        ? '#fff'
                        : isDone
                        ? 'rgba(255,255,255,0.85)'
                        : 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}

            {/* Back button pinned to bottom of sidebar on desktop */}
            <div style={{ flex: 1 }} />
            <button
              onClick={onBack}
              style={{
                width: '100%',
                padding: '14px 12px',
                minHeight: '48px',
                borderRadius: '12px',
                border: '2px solid rgba(255,255,255,0.3)',
                backgroundColor: 'transparent',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              ← Back
            </button>
          </nav>
        )}

        {/* Right column (or full-width on mobile/tablet) */}
        <div className="kyp-right-col" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Scrollable content */}
          <main className="kyp-main">
            {children}
          </main>

          {/* Sticky bottom bar */}
          {!hideBottomBar && (
            <div className="kyp-bottom-bar">
              {/* Back button hidden on desktop (it's in the sidebar instead) */}
              <button
                onClick={onBack}
                className="kyp-btn-back kyp-hide-on-desktop"
                style={{
                  flex: 1,
                  padding: '16px 12px',
                  minHeight: '54px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#ECEFF1',
                  color: '#333',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
              >
                ← Back
              </button>
              {!hideNext && (
                <button
                  onClick={onNext}
                  disabled={nextDisabled}
                  className="kyp-btn-next"
                  style={{
                    flex: 2,
                    padding: '16px 12px',
                    minHeight: '54px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: nextDisabled ? '#90CAF9' : '#1565C0',
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: '800',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  {nextLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
