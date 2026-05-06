// symptomData.js
// Maps each body part + sub-area to a list of relevant symptoms.
// All text uses simple, plain English for people with intellectual disabilities.
//
// Structure: { [bodyPart]: { [subArea]: [ { id, icon, image, label } ] } }
// For body parts with no sub-areas, use the key "default".
// image: path to cartoon illustration — falls back to icon (emoji) if file not found.

const universalCarerSymptoms = [
  { id: 'carer-fever',             icon: '🌡️', image: '/images/symptoms/carer-fever.PNG',             label: 'Feels hot to touch'                   },
  { id: 'carer-pale',              icon: '😨', image: '/images/symptoms/carer-pale.PNG',              label: 'Looks pale or flushed'                },
  { id: 'carer-less-active',       icon: '🛋️', image: '/images/symptoms/carer-less-active.png',       label: 'Less active than usual'               },
  { id: 'carer-no-sleep',          icon: '😴', image: '/images/symptoms/carer-no-sleep.png',          label: 'Difficulty sleeping or more restless' },
  { id: 'carer-clingy',            icon: '🫂', image: '/images/symptoms/carer-clingy.png',            label: 'Seeking more comfort than usual'      },
  { id: 'carer-grimacing',         icon: '😣', image: '/images/symptoms/carer-grimacing.png',         label: 'Facial grimacing'                     },
  { id: 'carer-crying',            icon: '😭', image: '/images/symptoms/carer-crying.PNG',            label: 'Crying more than usual'               },
  { id: 'carer-irritable',         icon: '😤', image: '/images/symptoms/carer-irritable.PNG',         label: 'More irritable or upset than usual'   },
  { id: 'carer-quiet',             icon: '🤫', image: '/images/symptoms/carer-quiet.PNG',             label: 'Unusually quiet or withdrawn'         },
  { id: 'carer-refusing-activity', icon: '🚫', image: '/images/symptoms/carer-refusing-activity.PNG', label: 'Refusing usual activities'            },
  { id: 'carer-wont-move',         icon: '🚫', image: '/images/symptoms/carer-wont-move.png',         label: 'Reluctant to move or bend'            },
  { id: 'carer-self-harm',         icon: '⚠️', image: '/images/symptoms/carer-self-harm.png',         label: 'Hitting or biting themselves'         },
  { id: 'carer-no-touch',          icon: '✋', image: '/images/symptoms/carer-no-touch.png',          label: 'Refusing to be touched'               },
  { id: 'carer-toilet-changes',    icon: '🚽', image: '/images/symptoms/carer-toilet-changes.png',    label: 'Changes in toilet habits'             },
  { id: 'carer-sensitive-light',   icon: '🌟', image: '/images/symptoms/carer-sensitive-light.png',   label: 'Sensitive to light'                   },
  { id: 'carer-sensitive-noise',   icon: '🔇', image: '/images/symptoms/carer-sensitive-noise.png',   label: 'Sensitive to noise'                   },
  { id: 'carer-vomiting',          icon: '🤮', image: '/images/symptoms/carer-vomiting.PNG',          label: 'Vomiting'                             },
  { id: 'carer-no-eat',            icon: '🍽️', image: '/images/symptoms/carer-no-eat.PNG',            label: 'Refusing to eat or drink'             },
];

export default {

  // ── HEAD ──
  head: {
    // "Head" sub-region on the zoom image
    head: [
      { id: 'dizzy',    icon: '😵', image: '/images/symptoms/dizzy.png',    label: 'Feeling dizzy'        },
      { id: 'dull',     icon: '😞', image: '/images/symptoms/dull.png',     label: 'Dull ache'            },
      { id: 'pressure', icon: '🤜', image: '/images/symptoms/pressure.png', label: 'Feels like pressure'  },
      { id: 'throbbing',icon: '💗', image: '/images/symptoms/throbbing.png',label: 'Throbbing / pounding' },
      { id: 'light',    icon: '🌟', image: '/images/symptoms/light.png',    label: 'Light hurts my eye'   },
      { id: 'hot',      icon: '🔥', image: '/images/symptoms/hot.png',      label: 'Feels hot'            },
      ...universalCarerSymptoms,
    ],
    eyes: [
      { id: 'eye-hurts', icon: '👁️', image: '/images/symptoms/eye-hurts.png', label: 'My eye hurts'      },
      { id: 'blurry',    icon: '😵', image: '/images/symptoms/blurry.png',    label: 'Things look blurry' },
      { id: 'watery',    icon: '💧', image: '/images/symptoms/watery.png',    label: 'My eye is watery'   },
      { id: 'light',     icon: '🌟', image: '/images/symptoms/light.png',    label: 'Light hurts my eye' },
      { id: 'hot',       icon: '🔥', image: '/images/symptoms/hot.png',      label: 'Feels hot'          },
      ...universalCarerSymptoms,
    ],
    ears: [
      { id: 'ear-inside', icon: '😣', image: '/images/symptoms/ear-inside.png', label: 'My ear hurts inside' },
      { id: 'cant-hear',  icon: '🔇', image: '/images/symptoms/cant-hear.png',  label: "I can't hear well"   },
      { id: 'ringing',    icon: '🔔', image: '/images/symptoms/ringing.png',    label: 'I hear ringing'      },
      { id: 'hot',        icon: '🔥', image: '/images/symptoms/hot.png',        label: 'Feels hot'           },
      { id: 'carer-pulling-ear', icon: '👂', image: '/images/symptoms/carer-pulling-ear.png', label: 'Pulling or touching their ear' },
      ...universalCarerSymptoms,
    ],
    nose: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-runny-nose', icon: '🤧', image: '/images/symptoms/carer-runny-nose.png', label: 'Runny nose visible'              },
      { id: 'carer-congestion', icon: '😤', image: '/images/symptoms/carer-congestion.png', label: 'Nose looks blocked or congested' },
      ...universalCarerSymptoms,
    ],
    mouth: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      ...universalCarerSymptoms,
    ],

    // HEAD (back) — kept as-is, not in the confirmed mapping
    'head-back': [
      { id: 'back-of-head', icon: '🤕', image: '/images/symptoms/throbbing.png', label: 'Back of head hurts' },
      { id: 'dull',         icon: '😞', image: '/images/symptoms/dull.png',      label: 'Dull ache'          },
      { id: 'hot',          icon: '🔥', image: '/images/symptoms/hot.png',       label: 'Feels hot'          },
      ...universalCarerSymptoms,
    ],
  },

  // ── CHEST ──
  chest: {
    default: [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'      },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning feeling' },
      { id: 'hot',     icon: '🔥', image: '/images/symptoms/hot.png',     label: 'Feels hot'       },
      { id: 'carer-breathing-fast',  icon: '💨',  image: '/images/symptoms/carer-breathing-fast.png',  label: 'Breathing faster than usual'         },
      { id: 'carer-breathing-noisy', icon: '🔊',  image: '/images/symptoms/carer-breathing-noisy.png', label: 'Breathing noisily or with difficulty' },
      { id: 'carer-coughing',        icon: '😮‍💨', image: '/images/symptoms/carer-coughing.png',        label: 'Coughing more than usual'            },
      { id: 'carer-rubbing-chest',   icon: '✋',  image: '/images/symptoms/carer-rubbing-chest.png',   label: 'Rubbing their chest'                 },
      ...universalCarerSymptoms,
    ],
    left: [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'      },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning feeling' },
      { id: 'hot',     icon: '🔥', image: '/images/symptoms/hot.png',     label: 'Feels hot'       },
      { id: 'carer-breathing-fast',  icon: '💨',  image: '/images/symptoms/carer-breathing-fast.png',  label: 'Breathing faster than usual'         },
      { id: 'carer-breathing-noisy', icon: '🔊',  image: '/images/symptoms/carer-breathing-noisy.png', label: 'Breathing noisily or with difficulty' },
      { id: 'carer-coughing',        icon: '😮‍💨', image: '/images/symptoms/carer-coughing.png',        label: 'Coughing more than usual'            },
      { id: 'carer-rubbing-chest',   icon: '✋',  image: '/images/symptoms/carer-rubbing-chest.png',   label: 'Rubbing their chest'                 },
      ...universalCarerSymptoms,
    ],
    middle: [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'      },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning feeling' },
      { id: 'hot',     icon: '🔥', image: '/images/symptoms/hot.png',     label: 'Feels hot'       },
      { id: 'carer-breathing-fast',  icon: '💨',  image: '/images/symptoms/carer-breathing-fast.png',  label: 'Breathing faster than usual'         },
      { id: 'carer-breathing-noisy', icon: '🔊',  image: '/images/symptoms/carer-breathing-noisy.png', label: 'Breathing noisily or with difficulty' },
      { id: 'carer-coughing',        icon: '😮‍💨', image: '/images/symptoms/carer-coughing.png',        label: 'Coughing more than usual'            },
      { id: 'carer-rubbing-chest',   icon: '✋',  image: '/images/symptoms/carer-rubbing-chest.png',   label: 'Rubbing their chest'                 },
      ...universalCarerSymptoms,
    ],
    right: [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'      },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning feeling' },
      { id: 'hot',     icon: '🔥', image: '/images/symptoms/hot.png',     label: 'Feels hot'       },
      { id: 'carer-breathing-fast',  icon: '💨',  image: '/images/symptoms/carer-breathing-fast.png',  label: 'Breathing faster than usual'         },
      { id: 'carer-breathing-noisy', icon: '🔊',  image: '/images/symptoms/carer-breathing-noisy.png', label: 'Breathing noisily or with difficulty' },
      { id: 'carer-coughing',        icon: '😮‍💨', image: '/images/symptoms/carer-coughing.png',        label: 'Coughing more than usual'            },
      { id: 'carer-rubbing-chest',   icon: '✋',  image: '/images/symptoms/carer-rubbing-chest.png',   label: 'Rubbing their chest'                 },
      ...universalCarerSymptoms,
    ],
  },

  // ── UPPER ABDOMEN ──
  'upper-abdomen': {
    default: [
      { id: 'gassy', icon: '💨', image: '/images/symptoms/gassy.png', label: 'Gassy / bloated' },
      { id: 'hot',   icon: '🔥', image: '/images/symptoms/hot.png',   label: 'Feels hot'       },
      { id: 'carer-bent-over',     icon: '🫄', image: '/images/symptoms/carer-bent-over.png',     label: 'Bent over or hunched forward' },
      { id: 'carer-rubbing-tummy', icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png', label: 'Rubbing their tummy'         },
      ...universalCarerSymptoms,
    ],
    'upper-mid': [
      { id: 'gassy', icon: '💨', image: '/images/symptoms/gassy.png', label: 'Gassy / bloated' },
      { id: 'hot',   icon: '🔥', image: '/images/symptoms/hot.png',   label: 'Feels hot'       },
      { id: 'carer-bent-over',     icon: '🫄', image: '/images/symptoms/carer-bent-over.png',     label: 'Bent over or hunched forward' },
      { id: 'carer-rubbing-tummy', icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png', label: 'Rubbing their tummy'         },
      ...universalCarerSymptoms,
    ],
    'upper-left': [
      { id: 'gassy', icon: '💨', image: '/images/symptoms/gassy.png', label: 'Gassy / bloated' },
      { id: 'hot',   icon: '🔥', image: '/images/symptoms/hot.png',   label: 'Feels hot'       },
      { id: 'carer-bent-over',     icon: '🫄', image: '/images/symptoms/carer-bent-over.png',     label: 'Bent over or hunched forward' },
      { id: 'carer-rubbing-tummy', icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png', label: 'Rubbing their tummy'         },
      ...universalCarerSymptoms,
    ],
    'upper-right': [
      { id: 'gassy', icon: '💨', image: '/images/symptoms/gassy.png', label: 'Gassy / bloated' },
      { id: 'hot',   icon: '🔥', image: '/images/symptoms/hot.png',   label: 'Feels hot'       },
      { id: 'carer-bent-over',     icon: '🫄', image: '/images/symptoms/carer-bent-over.png',     label: 'Bent over or hunched forward' },
      { id: 'carer-rubbing-tummy', icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png', label: 'Rubbing their tummy'         },
      ...universalCarerSymptoms,
    ],
  },

  // ── LOWER ABDOMEN ──
  'lower-abdomen': {
    default: [
      { id: 'gassy', icon: '💨', image: '/images/symptoms/gassy.png', label: 'Gassy / bloated' },
      { id: 'hot',   icon: '🔥', image: '/images/symptoms/hot.png',   label: 'Feels hot'       },
      { id: 'carer-bent-over',     icon: '🫄', image: '/images/symptoms/carer-bent-over.png',     label: 'Bent over or hunched forward' },
      { id: 'carer-rubbing-tummy', icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png', label: 'Rubbing their tummy'         },
      ...universalCarerSymptoms,
    ],
    'lower-mid': [
      { id: 'gassy', icon: '💨', image: '/images/symptoms/gassy.png', label: 'Gassy / bloated' },
      { id: 'hot',   icon: '🔥', image: '/images/symptoms/hot.png',   label: 'Feels hot'       },
      { id: 'carer-bent-over',     icon: '🫄', image: '/images/symptoms/carer-bent-over.png',     label: 'Bent over or hunched forward' },
      { id: 'carer-rubbing-tummy', icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png', label: 'Rubbing their tummy'         },
      ...universalCarerSymptoms,
    ],
    'lower-left': [
      { id: 'gassy', icon: '💨', image: '/images/symptoms/gassy.png', label: 'Gassy / bloated' },
      { id: 'hot',   icon: '🔥', image: '/images/symptoms/hot.png',   label: 'Feels hot'       },
      { id: 'carer-bent-over',     icon: '🫄', image: '/images/symptoms/carer-bent-over.png',     label: 'Bent over or hunched forward' },
      { id: 'carer-rubbing-tummy', icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png', label: 'Rubbing their tummy'         },
      ...universalCarerSymptoms,
    ],
    'lower-right': [
      { id: 'gassy', icon: '💨', image: '/images/symptoms/gassy.png', label: 'Gassy / bloated' },
      { id: 'hot',   icon: '🔥', image: '/images/symptoms/hot.png',   label: 'Feels hot'       },
      { id: 'carer-bent-over',     icon: '🫄', image: '/images/symptoms/carer-bent-over.png',     label: 'Bent over or hunched forward' },
      { id: 'carer-rubbing-tummy', icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png', label: 'Rubbing their tummy'         },
      ...universalCarerSymptoms,
    ],
  },

  // ── UPPER BACK ──
  'upper-back': {
    default: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-bent-over', icon: '🫄', image: '/images/symptoms/carer-bent-over.png', label: 'Bent over or hunched forward' },
      ...universalCarerSymptoms,
    ],
  },

  // ── LOWER BACK ──
  'lower-back': {
    default: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-bent-over', icon: '🫄', image: '/images/symptoms/carer-bent-over.png', label: 'Bent over or hunched forward' },
      ...universalCarerSymptoms,
    ],
  },

  // ── ARMS ──
  'left-arm': {
    default: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
    'upper-arm': [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
    'lower-arm': [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
    wrist: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
    hand: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
    fingers: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
  },
  'right-arm': {
    default: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
    'upper-arm': [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
    'lower-arm': [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
    wrist: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
    hand: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
    fingers: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
  },

  // ── LEGS ──
  'left-leg': {
    default: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
    'upper-leg': [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
    'lower-leg': [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
    ankle: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
    feet: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
    toes: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
  },
  'right-leg': {
    default: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
    'upper-leg': [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
    'lower-leg': [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
    ankle: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
    feet: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
    toes: [
      { id: 'hot', icon: '🔥', image: '/images/symptoms/hot.png', label: 'Feels hot' },
      { id: 'carer-rubbing-leg',  icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png',  label: 'Rubbing or holding their leg'   },
      { id: 'carer-swelling-leg', icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png', label: 'Swelling visible'               },
      { id: 'carer-limping',      icon: '🦵', image: '/images/symptoms/carer-limping.png',      label: 'Limping or walking differently' },
      ...universalCarerSymptoms,
    ],
  },

};
