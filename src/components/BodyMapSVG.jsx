import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import symptomData from '../data/symptomData';

const REGION_TO_BODY_PART = {
  'front-head':          { part: 'head',          label: 'Head'        },
  'front-left-arm':      { part: 'left-arm',       label: 'Left Arm'    },
  'front-right-arm':     { part: 'right-arm',      label: 'Right Arm'   },
  'front-chest':         { part: 'chest',          label: 'Chest'       },
  'front-mid-abdomen':   { part: 'upper-abdomen',  label: 'Upper Tummy' },
  'front-lower-abdomen': { part: 'lower-abdomen',  label: 'Lower Tummy' },
  'front-left-leg':      { part: 'left-leg',       label: 'Left Leg'    },
  'front-right-leg':     { part: 'right-leg',      label: 'Right Leg'   },
  'back-head':           { part: 'head',           label: 'Head'        },
  'back-upper-back':     { part: 'upper-back',     label: 'Upper Back'  },
  'back-lower-back':     { part: 'lower-back',     label: 'Lower Back'  },
};

const HOVER_LABELS = {
  'front-head':          '📍 Head',
  'front-left-arm':      '📍 Left Arm',
  'front-right-arm':     '📍 Right Arm',
  'front-chest':         '📍 Chest',
  'front-mid-abdomen':   '📍 Upper Tummy',
  'front-lower-abdomen': '📍 Lower Tummy',
  'front-left-leg':      '📍 Left Leg',
  'front-right-leg':     '📍 Right Leg',
  'back-head':           '📍 Head (Back)',
  'back-upper-back':     '📍 Upper Back',
  'back-lower-back':     '📍 Lower Back',
};

const FRONT_REGION_IDS = [
  'front-head', 'front-left-arm', 'front-right-arm', 'front-chest',
  'front-mid-abdomen', 'front-lower-abdomen', 'front-left-leg', 'front-right-leg',
];

export default function BodyMapSVG({ view }) {
  const navigate = useNavigate();
  const { setBodyPart, setZoomPart } = useAppContext();
  const [hoveredRegion, setHoveredRegion] = useState(null);

  function handleClick(regionId) {
    const { part, label } = REGION_TO_BODY_PART[regionId];
    setBodyPart(part, label);
    setZoomPart(null, null);
    const hasZoom = symptomData[part] && Object.keys(symptomData[part]).length > 1;
    navigate(hasZoom ? '/body-zoom' : '/symptoms');
  }

  function pathProps(regionId) {
    const isFront = FRONT_REGION_IDS.includes(regionId);
    const isActive = view === 'front' ? isFront : !isFront;
    const isHovered = hoveredRegion === regionId;

    if (!isActive) {
      return { fill: 'transparent', stroke: 'none', pointerEvents: 'none' };
    }

    return {
      fill: isHovered ? 'rgba(74, 144, 217, 0.45)' : 'transparent',
      stroke: isHovered ? '#4A90D9' : '#C8956C',
      strokeWidth: isHovered ? 2.5 : 1.5,
      opacity: 1,
      style: { cursor: 'pointer', transition: 'fill 0.15s ease, stroke 0.15s ease' },
      onClick: () => handleClick(regionId),
      onTouchStart: (e) => { e.preventDefault(); handleClick(regionId); },
      onMouseEnter: () => setHoveredRegion(regionId),
      onMouseLeave: () => setHoveredRegion(null),
    };
  }

  return (
    <div style={{ position: 'relative', paddingTop: '48px' }}>
      {/* Hover label badge */}
      {hoveredRegion && (
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#fff',
          border: '2px solid #4A90D9',
          borderRadius: '20px',
          padding: '5px 14px',
          fontSize: '18px',
          fontWeight: 600,
          color: '#4A90D9',
          whiteSpace: 'nowrap',
          zIndex: 10,
          pointerEvents: 'none',
        }}>
          {HOVER_LABELS[hoveredRegion]}
        </div>
      )}

      {/* Two-layer overlay container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        aspectRatio: '865 / 884',
      }}>
        {/* Layer 1 — base body visual */}
        <img
          src="/images/base-body.svg"
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 2 — interactive hit regions */}
        <svg
          viewBox="0 0 865 884"
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <g transform="translate(145.961, 79)">

          {/* ── Front figure ── */}
          <path id="front-head"
            d="M117.539 0.5H123.039H132.039L141.539 3L148.039 7L151.539 9L155.039 12.5L157.539 14.5L159.539 17.5L161.539 20.5L164.539 32L166.039 46L164.539 67.5L161.539 82L158.539 88.5L155.039 94.5L151.039 98.5L146.539 103L141.539 106.5L136.039 109.5L130.039 111H125.539H121.539L117.539 109.5L112.039 107.5L106.539 105L104.539 104L102.539 102L99.039 98.5L96.539 95.5L94.539 92.5L91.539 89.5L89.539 83.5L87.039 70.5L85.039 59V51V42.5V38.5V33.5L87.039 27L88.539 22.5L91.539 17.5L94.539 13.5L97.539 11L99.039 9.5L100.539 8L102.539 7L104.539 6L106.539 4.5L110.039 3L117.539 0.5Z"
            {...pathProps('front-head')}
          />
          <path id="front-left-arm"
            d="M55.039 147.5L66.039 142.5L68.039 147.5V162.5V173C67.3723 176.667 66.039 184.3 66.039 185.5C66.039 186.7 62.039 196.667 60.039 201.5L63.539 216L45.539 310.5L29.039 368.5L0.538971 361L4.53897 320L17.039 258.5L24.039 201.5L26.039 193L30.539 177L35.039 167L41.039 158L47.539 152L55.039 147.5Z"
            {...pathProps('front-left-arm')}
          />
          <path id="front-right-arm"
            d="M190.039 144.5L184.539 142.5L183.539 144.5L182.039 153V161V169.5C182.039 170.3 183.039 176.833 183.539 180L191.539 204L187.039 219L197.539 270L205.039 310L221.039 368L250.539 360.5L246.039 322.5L242.039 300.5L236.039 272L224.039 192L221.039 180L216.539 168.5L211.039 159.5L204.539 153L198.039 148.5L190.039 144.5Z"
            {...pathProps('front-right-arm')}
          />
          <path id="front-chest"
            d="M107.539 130L99.539 128L66.539 143L67.039 146.5L68.039 153.5V161V170L67.039 180.5L65.039 189L60.039 202L66.039 224L68.039 234.5H183.039L185.039 224L190.539 203.5L187.539 195L185.039 186.5L183.039 177L182.039 171V166V159V153.5L183.039 142.5L150.039 128L136.539 131L125.539 132L113.539 131L107.539 130Z"
            {...pathProps('front-chest')}
          />
          <path id="front-mid-abdomen"
            d="M182.539 235.5H69.039L70.039 261V281V305H180.539V275V256L182.539 235.5Z"
            {...pathProps('front-mid-abdomen')}
          />
          <path id="front-lower-abdomen"
            d="M181.039 306H69.539V307.5L62.039 347L65.039 348.5L75.539 353L93.539 362L116.039 378L125.039 383.5L130.039 381.5L149.039 367.5L161.039 360L175.539 352L188.539 347L181.039 306Z"
            {...pathProps('front-lower-abdomen')}
          />
          <path id="front-left-leg"
            d="M57.039 381.5L62.039 347.5V346.5L71.039 350L94.039 362L124.539 384V388V430V460L123.539 481.5C122.872 496.5 121.539 526.7 121.539 527.5V549L126.039 585L124.039 618L122.539 644.5L121.539 695L125.039 712V741.5L115.039 745L93.039 743L75.039 739.5L74.039 732.5L85.539 713L88.539 707L91.539 694L90.539 683.5L89.539 674.5L87.039 660L81.039 629.5L75.039 601V579.5V563V537L71.539 522.5L66.039 498.5L61.039 470L58.039 441.5L56.539 420V396L57.039 381.5Z"
            {...pathProps('front-left-leg')}
          />
          <path id="front-right-leg"
            d="M135.039 378L125.539 383.5V421.5L126.539 465L128.039 508.5L129.039 539.5V557.5L125.539 572.5V616.5L127.539 629L129.039 673L127.539 706.5L125.539 711V741.5L131.039 743.5H153.539L174.039 740L176.039 737.5V730.5L160.539 703.5L159.539 700.5L159.039 691.5L162.039 664L169.039 630.5L175.539 595.5L176.539 579V533.5L177.539 527L184.039 498.5L188.539 474.5L191.539 451.5L194.039 424V401L192.539 378L188.039 347L180.539 349.5L161.039 359.5L149.039 367.5L135.039 378Z"
            {...pathProps('front-right-leg')}
          />

          {/* ── Back figure ── */}
          <path id="back-upper-back"
            d="M528.539 293.5H419.539V268L418.039 253.5L416.539 235L412.039 217L409.539 206V143.5L445.539 129L449.539 122.5H496.539L502.539 129L535.539 143.5L538.039 206L535.539 217L531.539 235L529.539 253.5L528.539 268V293.5Z"
            {...pathProps('back-upper-back')}
          />
          <path id="back-lower-back"
            d="M474.539 388.5L478.539 391.5L487.539 396L501.539 399.5L515.539 398L527.539 391.5L542.039 378.5L539.039 355L527.539 293.5H419.039L409.539 355L406.539 378.5L417.539 388.5L420.039 390.5L426.039 396L435.039 398L448.539 399.5L459.039 397L468.039 391.5L474.539 388.5ZM474.539 388.5V385.5"
            {...pathProps('back-lower-back')}
          />
          <path id="back-head"
            d="M464.039 1.5L472.039 0.5H482.039L487.039 2.5L492.039 4L495.539 6L501.539 10L506.539 16L513.039 29L514.039 44.5L512.039 76.5L502.539 96.5L499.539 99L498.039 105L497.039 116.5V122H450.539V116.5V105L448.039 99L445.039 96.5L435.039 76.5L433.539 44.5L435.039 29L441.039 16L447.039 10L452.039 6L456.539 4L459.539 2.5L464.039 1.5Z"
            {...pathProps('back-head')}
          />

          </g>
        </svg>
      </div>
    </div>
  );
}
