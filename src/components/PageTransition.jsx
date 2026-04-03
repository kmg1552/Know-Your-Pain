import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Route order determines slide direction
const ROUTE_ORDER = [
  '/',
  '/body-map',
  '/body-zoom',
  '/symptoms',
  '/pain-scale',
  '/recommendation',
  '/my-results',
];

function getDirection(pathname) {
  const idx = ROUTE_ORDER.indexOf(pathname);
  return idx; // higher = came from left (forward), lower = came from right (back)
}

const variants = {
  enter: (direction) => ({
    x: direction >= 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction >= 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        custom={getDirection(location.pathname)}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        style={{ width: '100%', minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
