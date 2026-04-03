// symptomData.js
// Maps each body part + sub-area to a list of relevant symptoms.
// All text uses simple, plain English for people with intellectual disabilities.
//
// Structure: { [bodyPart]: { [subArea]: [ { id, icon, image, label } ] } }
// For body parts with no sub-areas, use the key "default".
// image: path to cartoon illustration — falls back to icon (emoji) if file not found.

export default {

  // ── FRONT HEAD ──
  head: {
    forehead: [
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
      { id: 'pressure',  icon: '🤜', image: '/images/symptoms/pressure.png',  label: 'Feels like pressure'  },
      { id: 'dull',      icon: '😞', image: '/images/symptoms/dull.png',      label: 'Dull ache'            },
      { id: 'hot',       icon: '🔥', image: '/images/symptoms/hot.png',       label: 'Feels hot'            },
      { id: 'dizzy',     icon: '😵', image: '/images/symptoms/dizzy.png',     label: 'Feeling dizzy'        },
    ],
    'eye-left': [
      { id: 'eye-hurts', icon: '👁️', image: '/images/symptoms/eye-hurts.png', label: 'My eye hurts'      },
      { id: 'light',     icon: '🌟', image: '/images/symptoms/light.png',     label: 'Light hurts my eye' },
      { id: 'blurry',    icon: '😵', image: '/images/symptoms/blurry.png',    label: 'Things look blurry' },
      { id: 'watery',    icon: '💧', image: '/images/symptoms/watery.png',    label: 'My eye is watery'   },
    ],
    'eye-right': [
      { id: 'eye-hurts', icon: '👁️', image: '/images/symptoms/eye-hurts.png', label: 'My eye hurts'      },
      { id: 'light',     icon: '🌟', image: '/images/symptoms/light.png',     label: 'Light hurts my eye' },
      { id: 'blurry',    icon: '😵', image: '/images/symptoms/blurry.png',    label: 'Things look blurry' },
      { id: 'watery',    icon: '💧', image: '/images/symptoms/watery.png',    label: 'My eye is watery'   },
    ],
    'ear-left': [
      { id: 'ear-inside', icon: '😣', image: '/images/symptoms/ear-inside.png', label: 'My ear hurts inside' },
      { id: 'ringing',    icon: '🔔', image: '/images/symptoms/ringing.png',    label: 'I hear ringing'      },
      { id: 'cant-hear',  icon: '🔇', image: '/images/symptoms/cant-hear.png',  label: "I can't hear well"   },
    ],
    'ear-right': [
      { id: 'ear-inside', icon: '😣', image: '/images/symptoms/ear-inside.png', label: 'My ear hurts inside' },
      { id: 'ringing',    icon: '🔔', image: '/images/symptoms/ringing.png',    label: 'I hear ringing'      },
      { id: 'cant-hear',  icon: '🔇', image: '/images/symptoms/cant-hear.png',  label: "I can't hear well"   },
    ],
    nose: [
      { id: 'runny',      icon: '🤧', image: '/images/symptoms/runny.png',      label: 'Runny nose'                           },
      { id: 'blocked',    icon: '😤', image: '/images/symptoms/blocked.png',    label: "Blocked / can't breathe through nose" },
      { id: 'nose-hurts', icon: '😣', image: '/images/symptoms/nose-hurts.png', label: 'My nose hurts'                        },
    ],
    'mouth-jaw': [
      { id: 'tooth',  icon: '🦷', image: '/images/symptoms/tooth.png',  label: 'My tooth hurts' },
      { id: 'jaw',    icon: '😣', image: '/images/symptoms/jaw.png',    label: 'My jaw hurts'   },
      { id: 'throat', icon: '🤒', image: '/images/symptoms/throat.png', label: 'Sore throat'    },
    ],
    'whole-head': [
      { id: 'headache',  icon: '🤕', image: '/images/symptoms/headache.png',  label: 'Headache all over'    },
      { id: 'dizzy',     icon: '🌀', image: '/images/symptoms/dizzy.png',     label: 'Feeling dizzy'        },
      { id: 'nausea',    icon: '🤢', image: '/images/symptoms/nausea.png',    label: 'Feeling sick'         },
      { id: 'fever',     icon: '🌡️', image: '/images/symptoms/fever.png',     label: 'I feel very hot'      },
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
    ],
  },

  // ── BACK HEAD ──
  'head-back': {
    'back-of-head': [
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
      { id: 'dull',      icon: '😞', image: '/images/symptoms/dull.png',      label: 'Dull ache'            },
      { id: 'pressure',  icon: '🤜', image: '/images/symptoms/pressure.png',  label: 'Feels like pressure'  },
      { id: 'stiff',     icon: '🤷', image: '/images/symptoms/stiff.png',     label: 'Neck feels stiff'     },
    ],
    'temple-left': [
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
      { id: 'sharp',     icon: '⚡', image: '/images/symptoms/sharp.png',     label: 'Sharp pain'           },
      { id: 'pressure',  icon: '🤜', image: '/images/symptoms/pressure.png',  label: 'Feels like pressure'  },
    ],
    'temple-right': [
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
      { id: 'sharp',     icon: '⚡', image: '/images/symptoms/sharp.png',     label: 'Sharp pain'           },
      { id: 'pressure',  icon: '🤜', image: '/images/symptoms/pressure.png',  label: 'Feels like pressure'  },
    ],
    'whole-head': [
      { id: 'headache',  icon: '🤕', image: '/images/symptoms/headache.png',  label: 'Headache all over'    },
      { id: 'dizzy',     icon: '🌀', image: '/images/symptoms/dizzy.png',     label: 'Feeling dizzy'        },
      { id: 'nausea',    icon: '🤢', image: '/images/symptoms/nausea.png',    label: 'Feeling sick'         },
      { id: 'fever',     icon: '🌡️', image: '/images/symptoms/fever.png',     label: 'I feel very hot'      },
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
    ],
  },

  // ── FRONT NECK ──
  neck: {
    default: [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'           },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Dull ache'            },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning / sore'       },
      { id: 'stiff',   icon: '🤷', image: '/images/symptoms/stiff.png',   label: 'Stiff / hard to move' },
      { id: 'swollen', icon: '😣', image: '/images/symptoms/swollen.png', label: 'Feels swollen'        },
    ],
  },

  // ── BACK NECK ──
  'neck-back': {
    default: [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'           },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Dull ache'            },
      { id: 'stiff',   icon: '🤷', image: '/images/symptoms/stiff.png',   label: 'Stiff / hard to move' },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning'              },
    ],
  },

  // ── CHEST ──
  chest: {
    'chest-centre': [
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning feeling'         },
      { id: 'tight',   icon: '🤜', image: '/images/symptoms/tight.png',   label: 'Tight / hard to breathe' },
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'              },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Heavy / dull feeling'    },
    ],
    'chest-left': [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'    },
      { id: 'tight',   icon: '🤜', image: '/images/symptoms/tight.png',   label: 'Tight feeling' },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning'       },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Dull ache'     },
    ],
    'chest-right': [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain' },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Dull ache'  },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning'    },
    ],
  },

  // ── UPPER TUMMY ──
  'upper-abdomen': {
    'upper-mid': [
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning feeling' },
      { id: 'gassy',   icon: '💨', image: '/images/symptoms/gassy.png',   label: 'Gassy / bloated' },
      { id: 'nausea',  icon: '🤢', image: '/images/symptoms/nausea.png',  label: 'Feeling sick'    },
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'      },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Dull ache'       },
    ],
    'upper-left': [
      { id: 'sharp', icon: '⚡', image: '/images/symptoms/sharp.png', label: 'Sharp pain' },
      { id: 'cramp', icon: '😖', image: '/images/symptoms/cramp.png', label: 'Cramping'   },
      { id: 'dull',  icon: '😞', image: '/images/symptoms/dull.png',  label: 'Dull ache'  },
    ],
    'upper-right': [
      { id: 'sharp', icon: '⚡', image: '/images/symptoms/sharp.png', label: 'Sharp pain' },
      { id: 'cramp', icon: '😖', image: '/images/symptoms/cramp.png', label: 'Cramping'   },
      { id: 'dull',  icon: '😞', image: '/images/symptoms/dull.png',  label: 'Dull ache'  },
    ],
  },

  // ── LOWER TUMMY ──
  'lower-abdomen': {
    'lower-mid': [
      { id: 'sharp',    icon: '⚡', image: '/images/symptoms/sharp.png',    label: 'Sharp pain'       },
      { id: 'cramp',    icon: '😖', image: '/images/symptoms/cramp.png',    label: 'Cramping'         },
      { id: 'dull',     icon: '😞', image: '/images/symptoms/dull.png',     label: 'Dull ache'        },
      { id: 'gassy',    icon: '💨', image: '/images/symptoms/gassy.png',    label: 'Gassy / bloated'  },
      { id: 'pressure', icon: '🤜', image: '/images/symptoms/pressure.png', label: 'Pressure feeling' },
    ],
    'lower-left': [
      { id: 'sharp', icon: '⚡', image: '/images/symptoms/sharp.png', label: 'Sharp pain' },
      { id: 'cramp', icon: '😖', image: '/images/symptoms/cramp.png', label: 'Cramping'   },
      { id: 'dull',  icon: '😞', image: '/images/symptoms/dull.png',  label: 'Dull ache'  },
    ],
    'lower-right': [
      { id: 'sharp', icon: '⚡', image: '/images/symptoms/sharp.png', label: 'Sharp pain' },
      { id: 'cramp', icon: '😖', image: '/images/symptoms/cramp.png', label: 'Cramping'   },
      { id: 'dull',  icon: '😞', image: '/images/symptoms/dull.png',  label: 'Dull ache'  },
    ],
  },

  // ── UPPER BACK ──
  'upper-back': {
    default: [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp / stabbing pain' },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Dull ache'             },
      { id: 'stiff',   icon: '🤷', image: '/images/symptoms/stiff.png',   label: 'Stiff / hard to move'  },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning'               },
    ],
  },

  // ── LOWER BACK ──
  'lower-back': {
    default: [
      { id: 'sharp', icon: '⚡', image: '/images/symptoms/sharp.png', label: 'Sharp / stabbing pain' },
      { id: 'dull',  icon: '😞', image: '/images/symptoms/dull.png',  label: 'Dull ache'             },
      { id: 'stiff', icon: '🤷', image: '/images/symptoms/stiff.png', label: 'Stiff / hard to move'  },
      { id: 'cramp', icon: '😖', image: '/images/symptoms/cramp.png', label: 'Cramping / spasm'      },
    ],
  },

  // ── ARMS ──
  'left-arm': {
    default: [
      { id: 'sharp',     icon: '⚡', image: '/images/symptoms/sharp.png',     label: 'Sharp pain' },
      { id: 'dull',      icon: '😞', image: '/images/symptoms/dull.png',      label: 'Dull ache'  },
      { id: 'burning',   icon: '🔥', image: '/images/symptoms/burning.png',   label: 'Burning'    },
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing'  },
      { id: 'weak',      icon: '🤜', image: '/images/symptoms/weak.png',      label: 'Feels weak' },
    ],
  },
  'right-arm': {
    default: [
      { id: 'sharp',     icon: '⚡', image: '/images/symptoms/sharp.png',     label: 'Sharp pain' },
      { id: 'dull',      icon: '😞', image: '/images/symptoms/dull.png',      label: 'Dull ache'  },
      { id: 'burning',   icon: '🔥', image: '/images/symptoms/burning.png',   label: 'Burning'    },
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing'  },
      { id: 'weak',      icon: '🤜', image: '/images/symptoms/weak.png',      label: 'Feels weak' },
    ],
  },

  // ── LEGS ──
  'left-leg': {
    default: [
      { id: 'sharp',     icon: '⚡', image: '/images/symptoms/sharp.png',     label: 'Sharp pain' },
      { id: 'dull',      icon: '😞', image: '/images/symptoms/dull.png',      label: 'Dull ache'  },
      { id: 'cramp',     icon: '😖', image: '/images/symptoms/cramp.png',     label: 'Cramping'   },
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing'  },
      { id: 'burning',   icon: '🔥', image: '/images/symptoms/burning.png',   label: 'Burning'    },
    ],
  },
  'right-leg': {
    default: [
      { id: 'sharp',     icon: '⚡', image: '/images/symptoms/sharp.png',     label: 'Sharp pain' },
      { id: 'dull',      icon: '😞', image: '/images/symptoms/dull.png',      label: 'Dull ache'  },
      { id: 'cramp',     icon: '😖', image: '/images/symptoms/cramp.png',     label: 'Cramping'   },
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing'  },
      { id: 'burning',   icon: '🔥', image: '/images/symptoms/burning.png',   label: 'Burning'    },
    ],
  },

};
