// symptomData.js
// Maps each body part + sub-area to a list of relevant symptoms.
// All text uses simple, plain English for people with intellectual disabilities.
//
// Structure: { [bodyPart]: { [subArea]: [ { id, icon, image, label } ] } }
// For body parts with no sub-areas, use the key "default".
// image: path to cartoon illustration — falls back to icon (emoji) if file not found.

const universalCarerSymptoms = [
  { id: 'carer-irritable',        icon: '😤',  image: '/images/symptoms/carer-irritable.png',        label: 'More irritable or upset than usual'       },
  { id: 'carer-crying',           icon: '😭',  image: '/images/symptoms/carer-crying.png',           label: 'Crying more than usual'                   },
  { id: 'carer-quiet',            icon: '🤫',  image: '/images/symptoms/carer-quiet.png',            label: 'Unusually quiet or withdrawn'             },
  { id: 'carer-refusing-activity',icon: '🚫',  image: '/images/symptoms/carer-refusing-activity.png',label: 'Refusing usual activities'                },
  { id: 'carer-no-eat',           icon: '🍽️',  image: '/images/symptoms/carer-no-eat.png',           label: 'Refusing to eat or drink'                 },
  { id: 'carer-vomiting',         icon: '🤮',  image: '/images/symptoms/carer-vomiting.png',         label: 'Vomiting'                                 },
  { id: 'carer-fever',            icon: '🌡️',  image: '/images/symptoms/carer-fever.png',            label: 'Feels hot to touch'                       },
  { id: 'carer-pale',             icon: '😨',  image: '/images/symptoms/carer-pale.png',             label: 'Looks pale or flushed'                    },
  { id: 'carer-sweating',         icon: '💧',  image: '/images/symptoms/carer-sweating.png',         label: 'Sweating more than usual'                 },
  { id: 'carer-grimacing',        icon: '😣',  image: '/images/symptoms/carer-grimacing.png',        label: 'Facial grimacing'                         },
  { id: 'carer-guarding',         icon: '🤲',  image: '/images/symptoms/carer-guarding.png',         label: 'Protecting or guarding an area'           },
  { id: 'carer-less-active',      icon: '🛋️',  image: '/images/symptoms/carer-less-active.png',      label: 'Less active than usual'                   },
  { id: 'carer-no-sleep',         icon: '😴',  image: '/images/symptoms/carer-no-sleep.png',         label: 'Difficulty sleeping or more restless'     },
  { id: 'carer-no-touch',         icon: '✋',  image: '/images/symptoms/carer-no-touch.png',         label: 'Refusing to be touched'                   },
  { id: 'carer-self-harm',        icon: '⚠️',  image: '/images/symptoms/carer-self-harm.png',        label: 'Hitting or biting themselves'             },
  { id: 'carer-clingy',           icon: '🫂',  image: '/images/symptoms/carer-clingy.png',           label: 'Seeking more comfort than usual'          },
];

export default {

  // ── FRONT HEAD ──
  head: {
    forehead: [
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
      { id: 'pressure',  icon: '🤜', image: '/images/symptoms/pressure.png',  label: 'Feels like pressure'  },
      { id: 'dull',      icon: '😞', image: '/images/symptoms/dull.png',      label: 'Dull ache'            },
      { id: 'hot',       icon: '🔥', image: '/images/symptoms/hot.png',       label: 'Feels hot'            },
      { id: 'dizzy',     icon: '😵', image: '/images/symptoms/dizzy.png',     label: 'Feeling dizzy'        },
      { id: 'carer-sensitive-light', icon: '🌟', image: '/images/symptoms/carer-sensitive-light.png', label: 'Sensitive to light' },
      { id: 'carer-sensitive-noise', icon: '🔇', image: '/images/symptoms/carer-sensitive-noise.png', label: 'Sensitive to noise' },
      { id: 'carer-holding-head',    icon: '🤲', image: '/images/symptoms/carer-holding-head.png',    label: 'Holding their head' },
      ...universalCarerSymptoms,
    ],
    'eye-left': [
      { id: 'eye-hurts', icon: '👁️', image: '/images/symptoms/eye-hurts.png', label: 'My eye hurts'      },
      { id: 'light',     icon: '🌟', image: '/images/symptoms/light.png',     label: 'Light hurts my eye' },
      { id: 'blurry',    icon: '😵', image: '/images/symptoms/blurry.png',    label: 'Things look blurry' },
      { id: 'watery',    icon: '💧', image: '/images/symptoms/watery.png',    label: 'My eye is watery'   },
      ...universalCarerSymptoms,
    ],
    'eye-right': [
      { id: 'eye-hurts', icon: '👁️', image: '/images/symptoms/eye-hurts.png', label: 'My eye hurts'      },
      { id: 'light',     icon: '🌟', image: '/images/symptoms/light.png',     label: 'Light hurts my eye' },
      { id: 'blurry',    icon: '😵', image: '/images/symptoms/blurry.png',    label: 'Things look blurry' },
      { id: 'watery',    icon: '💧', image: '/images/symptoms/watery.png',    label: 'My eye is watery'   },
      ...universalCarerSymptoms,
    ],
    'ear-left': [
      { id: 'ear-inside', icon: '😣', image: '/images/symptoms/ear-inside.png', label: 'My ear hurts inside' },
      { id: 'ringing',    icon: '🔔', image: '/images/symptoms/ringing.png',    label: 'I hear ringing'      },
      { id: 'cant-hear',  icon: '🔇', image: '/images/symptoms/cant-hear.png',  label: "I can't hear well"   },
      { id: 'carer-pulling-ear', icon: '👂', image: '/images/symptoms/carer-pulling-ear.png', label: 'Pulling or touching their ear' },
      ...universalCarerSymptoms,
    ],
    'ear-right': [
      { id: 'ear-inside', icon: '😣', image: '/images/symptoms/ear-inside.png', label: 'My ear hurts inside' },
      { id: 'ringing',    icon: '🔔', image: '/images/symptoms/ringing.png',    label: 'I hear ringing'      },
      { id: 'cant-hear',  icon: '🔇', image: '/images/symptoms/cant-hear.png',  label: "I can't hear well"   },
      { id: 'carer-pulling-ear', icon: '👂', image: '/images/symptoms/carer-pulling-ear.png', label: 'Pulling or touching their ear' },
      ...universalCarerSymptoms,
    ],
    nose: [
      { id: 'runny',      icon: '🤧', image: '/images/symptoms/runny.png',      label: 'Runny nose'                           },
      { id: 'blocked',    icon: '😤', image: '/images/symptoms/blocked.png',    label: "Blocked / can't breathe through nose" },
      { id: 'nose-hurts', icon: '😣', image: '/images/symptoms/nose-hurts.png', label: 'My nose hurts'                        },
      { id: 'carer-runny-nose',  icon: '🤧', image: '/images/symptoms/carer-runny-nose.png',  label: 'Runny nose visible'                   },
      { id: 'carer-congestion',  icon: '😤', image: '/images/symptoms/carer-congestion.png',  label: 'Nose looks blocked or congested'      },
      ...universalCarerSymptoms,
    ],
    'mouth-jaw': [
      { id: 'tooth',  icon: '🦷', image: '/images/symptoms/tooth.png',  label: 'My tooth hurts' },
      { id: 'jaw',    icon: '😣', image: '/images/symptoms/jaw.png',    label: 'My jaw hurts'   },
      { id: 'throat', icon: '🤒', image: '/images/symptoms/throat.png', label: 'Sore throat'    },
      ...universalCarerSymptoms,
    ],
    'whole-head': [
      { id: 'headache',  icon: '🤕', image: '/images/symptoms/headache.png',  label: 'Headache all over'    },
      { id: 'dizzy',     icon: '🌀', image: '/images/symptoms/dizzy.png',     label: 'Feeling dizzy'        },
      { id: 'nausea',    icon: '🤢', image: '/images/symptoms/nausea.png',    label: 'Feeling sick'         },
      { id: 'fever',     icon: '🌡️', image: '/images/symptoms/fever.png',     label: 'I feel very hot'      },
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
      { id: 'carer-sensitive-light', icon: '🌟', image: '/images/symptoms/carer-sensitive-light.png', label: 'Sensitive to light' },
      { id: 'carer-sensitive-noise', icon: '🔇', image: '/images/symptoms/carer-sensitive-noise.png', label: 'Sensitive to noise' },
      { id: 'carer-holding-head',    icon: '🤲', image: '/images/symptoms/carer-holding-head.png',    label: 'Holding their head' },
      ...universalCarerSymptoms,
    ],
  },

  // ── BACK HEAD ──
  'head-back': {
    'back-of-head': [
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
      { id: 'dull',      icon: '😞', image: '/images/symptoms/dull.png',      label: 'Dull ache'            },
      { id: 'pressure',  icon: '🤜', image: '/images/symptoms/pressure.png',  label: 'Feels like pressure'  },
      { id: 'stiff',     icon: '🤷', image: '/images/symptoms/stiff.png',     label: 'Neck feels stiff'     },
      ...universalCarerSymptoms,
    ],
    'temple-left': [
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
      { id: 'sharp',     icon: '⚡', image: '/images/symptoms/sharp.png',     label: 'Sharp pain'           },
      { id: 'pressure',  icon: '🤜', image: '/images/symptoms/pressure.png',  label: 'Feels like pressure'  },
      ...universalCarerSymptoms,
    ],
    'temple-right': [
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
      { id: 'sharp',     icon: '⚡', image: '/images/symptoms/sharp.png',     label: 'Sharp pain'           },
      { id: 'pressure',  icon: '🤜', image: '/images/symptoms/pressure.png',  label: 'Feels like pressure'  },
      ...universalCarerSymptoms,
    ],
    'whole-head': [
      { id: 'headache',  icon: '🤕', image: '/images/symptoms/headache.png',  label: 'Headache all over'    },
      { id: 'dizzy',     icon: '🌀', image: '/images/symptoms/dizzy.png',     label: 'Feeling dizzy'        },
      { id: 'nausea',    icon: '🤢', image: '/images/symptoms/nausea.png',    label: 'Feeling sick'         },
      { id: 'fever',     icon: '🌡️', image: '/images/symptoms/fever.png',     label: 'I feel very hot'      },
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing / pounding' },
      ...universalCarerSymptoms,
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
      ...universalCarerSymptoms,
    ],
  },

  // ── BACK NECK ──
  'neck-back': {
    default: [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'           },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Dull ache'            },
      { id: 'stiff',   icon: '🤷', image: '/images/symptoms/stiff.png',   label: 'Stiff / hard to move' },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning'              },
      ...universalCarerSymptoms,
    ],
  },

  // ── CHEST ──
  chest: {
    'chest-centre': [
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning feeling'         },
      { id: 'tight',   icon: '🤜', image: '/images/symptoms/tight.png',   label: 'Tight / hard to breathe' },
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'              },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Heavy / dull feeling'    },
      { id: 'carer-coughing',          icon: '😮‍💨', image: '/images/symptoms/carer-coughing.png',          label: 'Coughing more than usual'              },
      { id: 'carer-breathing-fast',    icon: '💨',  image: '/images/symptoms/carer-breathing-fast.png',    label: 'Breathing faster than usual'           },
      { id: 'carer-breathing-noisy',   icon: '🔊',  image: '/images/symptoms/carer-breathing-noisy.png',   label: 'Breathing noisily or with difficulty'  },
      { id: 'carer-rubbing-chest',     icon: '✋',  image: '/images/symptoms/carer-rubbing-chest.png',     label: 'Rubbing their chest'                   },
      ...universalCarerSymptoms,
    ],
    'chest-left': [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain'    },
      { id: 'tight',   icon: '🤜', image: '/images/symptoms/tight.png',   label: 'Tight feeling' },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning'       },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Dull ache'     },
      { id: 'carer-coughing',          icon: '😮‍💨', image: '/images/symptoms/carer-coughing.png',          label: 'Coughing more than usual'              },
      { id: 'carer-breathing-fast',    icon: '💨',  image: '/images/symptoms/carer-breathing-fast.png',    label: 'Breathing faster than usual'           },
      { id: 'carer-breathing-noisy',   icon: '🔊',  image: '/images/symptoms/carer-breathing-noisy.png',   label: 'Breathing noisily or with difficulty'  },
      { id: 'carer-rubbing-chest',     icon: '✋',  image: '/images/symptoms/carer-rubbing-chest.png',     label: 'Rubbing their chest'                   },
      ...universalCarerSymptoms,
    ],
    'chest-right': [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp pain' },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Dull ache'  },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning'    },
      { id: 'carer-coughing',          icon: '😮‍💨', image: '/images/symptoms/carer-coughing.png',          label: 'Coughing more than usual'              },
      { id: 'carer-breathing-fast',    icon: '💨',  image: '/images/symptoms/carer-breathing-fast.png',    label: 'Breathing faster than usual'           },
      { id: 'carer-breathing-noisy',   icon: '🔊',  image: '/images/symptoms/carer-breathing-noisy.png',   label: 'Breathing noisily or with difficulty'  },
      { id: 'carer-rubbing-chest',     icon: '✋',  image: '/images/symptoms/carer-rubbing-chest.png',     label: 'Rubbing their chest'                   },
      ...universalCarerSymptoms,
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
      { id: 'carer-rubbing-tummy', icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png', label: 'Rubbing their tummy'         },
      { id: 'carer-bent-over',     icon: '🫄', image: '/images/symptoms/carer-bent-over.png',     label: 'Bent over or hunched forward' },
      ...universalCarerSymptoms,
    ],
    'upper-left': [
      { id: 'sharp', icon: '⚡', image: '/images/symptoms/sharp.png', label: 'Sharp pain' },
      { id: 'cramp', icon: '😖', image: '/images/symptoms/cramp.png', label: 'Cramping'   },
      { id: 'dull',  icon: '😞', image: '/images/symptoms/dull.png',  label: 'Dull ache'  },
      { id: 'carer-rubbing-tummy', icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png', label: 'Rubbing their tummy'         },
      { id: 'carer-bent-over',     icon: '🫄', image: '/images/symptoms/carer-bent-over.png',     label: 'Bent over or hunched forward' },
      ...universalCarerSymptoms,
    ],
    'upper-right': [
      { id: 'sharp', icon: '⚡', image: '/images/symptoms/sharp.png', label: 'Sharp pain' },
      { id: 'cramp', icon: '😖', image: '/images/symptoms/cramp.png', label: 'Cramping'   },
      { id: 'dull',  icon: '😞', image: '/images/symptoms/dull.png',  label: 'Dull ache'  },
      { id: 'carer-rubbing-tummy', icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png', label: 'Rubbing their tummy'         },
      { id: 'carer-bent-over',     icon: '🫄', image: '/images/symptoms/carer-bent-over.png',     label: 'Bent over or hunched forward' },
      ...universalCarerSymptoms,
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
      { id: 'carer-rubbing-tummy',  icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png',  label: 'Rubbing their tummy'        },
      { id: 'carer-toilet-changes', icon: '🚽', image: '/images/symptoms/carer-toilet-changes.png', label: 'Changes in toilet habits'   },
      { id: 'carer-bent-over',      icon: '🫄', image: '/images/symptoms/carer-bent-over.png',      label: 'Bent over or hunched forward' },
      ...universalCarerSymptoms,
    ],
    'lower-left': [
      { id: 'sharp', icon: '⚡', image: '/images/symptoms/sharp.png', label: 'Sharp pain' },
      { id: 'cramp', icon: '😖', image: '/images/symptoms/cramp.png', label: 'Cramping'   },
      { id: 'dull',  icon: '😞', image: '/images/symptoms/dull.png',  label: 'Dull ache'  },
      { id: 'carer-rubbing-tummy',  icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png',  label: 'Rubbing their tummy'        },
      { id: 'carer-toilet-changes', icon: '🚽', image: '/images/symptoms/carer-toilet-changes.png', label: 'Changes in toilet habits'   },
      { id: 'carer-bent-over',      icon: '🫄', image: '/images/symptoms/carer-bent-over.png',      label: 'Bent over or hunched forward' },
      ...universalCarerSymptoms,
    ],
    'lower-right': [
      { id: 'sharp', icon: '⚡', image: '/images/symptoms/sharp.png', label: 'Sharp pain' },
      { id: 'cramp', icon: '😖', image: '/images/symptoms/cramp.png', label: 'Cramping'   },
      { id: 'dull',  icon: '😞', image: '/images/symptoms/dull.png',  label: 'Dull ache'  },
      { id: 'carer-rubbing-tummy',  icon: '✋', image: '/images/symptoms/carer-rubbing-tummy.png',  label: 'Rubbing their tummy'        },
      { id: 'carer-toilet-changes', icon: '🚽', image: '/images/symptoms/carer-toilet-changes.png', label: 'Changes in toilet habits'   },
      { id: 'carer-bent-over',      icon: '🫄', image: '/images/symptoms/carer-bent-over.png',      label: 'Bent over or hunched forward' },
      ...universalCarerSymptoms,
    ],
  },

  // ── UPPER BACK ──
  'upper-back': {
    default: [
      { id: 'sharp',   icon: '⚡', image: '/images/symptoms/sharp.png',   label: 'Sharp / stabbing pain' },
      { id: 'dull',    icon: '😞', image: '/images/symptoms/dull.png',    label: 'Dull ache'             },
      { id: 'stiff',   icon: '🤷', image: '/images/symptoms/stiff.png',   label: 'Stiff / hard to move'  },
      { id: 'burning', icon: '🔥', image: '/images/symptoms/burning.png', label: 'Burning'               },
      { id: 'carer-hunched',    icon: '🪑', image: '/images/symptoms/carer-hunched.png',    label: 'Hunched posture'             },
      { id: 'carer-wont-move', icon: '🚫', image: '/images/symptoms/carer-wont-move.png', label: 'Reluctant to move or bend'   },
      ...universalCarerSymptoms,
    ],
  },

  // ── LOWER BACK ──
  'lower-back': {
    default: [
      { id: 'sharp', icon: '⚡', image: '/images/symptoms/sharp.png', label: 'Sharp / stabbing pain' },
      { id: 'dull',  icon: '😞', image: '/images/symptoms/dull.png',  label: 'Dull ache'             },
      { id: 'stiff', icon: '🤷', image: '/images/symptoms/stiff.png', label: 'Stiff / hard to move'  },
      { id: 'cramp', icon: '😖', image: '/images/symptoms/cramp.png', label: 'Cramping / spasm'      },
      { id: 'carer-hunched',    icon: '🪑', image: '/images/symptoms/carer-hunched.png',    label: 'Hunched posture'             },
      { id: 'carer-wont-move', icon: '🚫', image: '/images/symptoms/carer-wont-move.png', label: 'Reluctant to move or bend'   },
      ...universalCarerSymptoms,
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
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
    ],
  },
  'right-arm': {
    default: [
      { id: 'sharp',     icon: '⚡', image: '/images/symptoms/sharp.png',     label: 'Sharp pain' },
      { id: 'dull',      icon: '😞', image: '/images/symptoms/dull.png',      label: 'Dull ache'  },
      { id: 'burning',   icon: '🔥', image: '/images/symptoms/burning.png',   label: 'Burning'    },
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing'  },
      { id: 'weak',      icon: '🤜', image: '/images/symptoms/weak.png',      label: 'Feels weak' },
      { id: 'carer-not-using-arm', icon: '💪', image: '/images/symptoms/carer-not-using-arm.png', label: 'Not using their arm as usual' },
      { id: 'carer-swelling-arm',  icon: '💪', image: '/images/symptoms/carer-swelling-arm.png',  label: 'Swelling visible on arm'      },
      ...universalCarerSymptoms,
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
      { id: 'carer-limping',     icon: '🦵', image: '/images/symptoms/carer-limping.png',     label: 'Limping or walking differently'  },
      { id: 'carer-swelling-leg',icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png',label: 'Swelling visible on leg'         },
      { id: 'carer-rubbing-leg', icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png', label: 'Rubbing or holding their leg'    },
      ...universalCarerSymptoms,
    ],
  },
  'right-leg': {
    default: [
      { id: 'sharp',     icon: '⚡', image: '/images/symptoms/sharp.png',     label: 'Sharp pain' },
      { id: 'dull',      icon: '😞', image: '/images/symptoms/dull.png',      label: 'Dull ache'  },
      { id: 'cramp',     icon: '😖', image: '/images/symptoms/cramp.png',     label: 'Cramping'   },
      { id: 'throbbing', icon: '💗', image: '/images/symptoms/throbbing.png', label: 'Throbbing'  },
      { id: 'burning',   icon: '🔥', image: '/images/symptoms/burning.png',   label: 'Burning'    },
      { id: 'carer-limping',     icon: '🦵', image: '/images/symptoms/carer-limping.png',     label: 'Limping or walking differently'  },
      { id: 'carer-swelling-leg',icon: '🦵', image: '/images/symptoms/carer-swelling-leg.png',label: 'Swelling visible on leg'         },
      { id: 'carer-rubbing-leg', icon: '✋', image: '/images/symptoms/carer-rubbing-leg.png', label: 'Rubbing or holding their leg'    },
      ...universalCarerSymptoms,
    ],
  },

};
