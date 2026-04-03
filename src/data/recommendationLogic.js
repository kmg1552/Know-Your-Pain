// recommendationLogic.js
// Takes user selections and returns a recommendation result object.

const HEAD_ZOOM_PARTS = [
  'forehead', 'eye-left', 'eye-right', 'ear-left', 'ear-right',
  'nose', 'mouth-jaw', 'whole-head',
  'back-of-head', 'temple-left', 'temple-right',
];

const HEAD_RED_FLAGS = [
  'A headache that came on very suddenly',
  'Headache with a stiff neck or high fever',
  'Headache after a knock to the head',
  'Weakness or numbness in your face or arm',
];

const HEARTBURN_RED_FLAGS = [
  'Chest pain that spreads to your arm or jaw',
  'Difficulty swallowing',
  'Vomiting blood or very dark material',
  'Pain that keeps getting much worse',
];

const EMERGENCY = {
  emoji: '🚨',
  type: 'Emergency',
  title: 'Please get help right now',
  medicines: [],
  images: [],
  advice:
    'Your pain is very severe. Please call 000 or go to the emergency department immediately. Do not drive.',
  redFlags: [],
};

export default function getRecommendation({
  selectedBodyPart,
  selectedZoomPart,
  selectedSymptoms,
  painScale,
}) {
  // ── SCENARIO 1: Headache ──
  const isHeadArea =
    selectedBodyPart === 'head' ||
    selectedBodyPart === 'head-back' ||
    HEAD_ZOOM_PARTS.includes(selectedZoomPart);

  if (isHeadArea) {
    if (painScale >= 9) return EMERGENCY;

    if (painScale >= 7) {
      return {
        emoji: '⚕️',
        type: 'Severe headache',
        title: 'See a doctor today',
        medicines: ['Paracetamol (short-term only)'],
        images: ['/images/paracetamol.png'],
        advice:
          'Your headache is quite bad. Please see a doctor today. You can take Paracetamol while you wait.',
        redFlags: HEAD_RED_FLAGS,
      };
    }

    return {
      emoji: '💊',
      type: 'This may be a headache',
      title: 'Paracetamol or Ibuprofen can help',
      medicines: ['Paracetamol', 'Ibuprofen'],
      images: ['/images/paracetamol.png', '/images/ibuprofen.png'],
      advice:
        'Take Paracetamol or Ibuprofen from the pharmacy. Drink lots of water. Rest in a quiet, dark room. Do not take both medicines at the same time — choose one.',
      redFlags: HEAD_RED_FLAGS,
    };
  }

  // ── SCENARIO 2: Heartburn ──
  const isHeartburnArea =
    selectedBodyPart === 'upper-abdomen' || selectedBodyPart === 'chest';
  const hasBurning = selectedSymptoms.includes('burning');

  if (isHeartburnArea && hasBurning) {
    if (painScale >= 9) return EMERGENCY;

    return {
      emoji: '🔥',
      type: 'This may be heartburn',
      title: 'Gaviscon can help',
      medicines: ['Gaviscon'],
      images: ['/images/gaviscon.png'],
      advice:
        'Gaviscon helps soothe the burning feeling. Take it after meals or at bedtime. Avoid spicy food and large meals. Do not lie down right after eating.',
      redFlags: HEARTBURN_RED_FLAGS,
    };
  }

  // ── DEFAULT ──
  return {
    emoji: '💬',
    type: 'We need more information',
    title: 'Talk to a pharmacist',
    medicines: [],
    images: [],
    advice:
      'Based on your answers, we suggest talking to a pharmacist or doctor. Show them this screen — they will help you.',
    redFlags: [],
  };
}
