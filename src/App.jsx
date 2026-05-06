import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import PageTransition from './components/PageTransition';
import HomeScreen from './screens/HomeScreen';
import BodyMapScreen from './screens/BodyMapScreen';
import BodyZoomScreen from './screens/BodyZoomScreen';
import SymptomsScreen from './screens/SymptomsScreen';
import PainScaleScreen from './screens/PainScaleScreen';
import RecommendationScreen from './screens/RecommendationScreen';
import PositiveReinforcementScreen from './screens/PositiveReinforcementScreen';
import MyResultsScreen from './screens/MyResultsScreen';
import PharmacyFinderScreen from './screens/PharmacyFinderScreen';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/body-map" element={<BodyMapScreen />} />
        <Route path="/body-zoom" element={<BodyZoomScreen />} />
        <Route path="/symptoms" element={<SymptomsScreen />} />
        <Route path="/pain-scale" element={<PainScaleScreen />} />
        <Route path="/positive-reinforcement" element={<PositiveReinforcementScreen />} />
        <Route path="/recommendation" element={<RecommendationScreen />} />
        <Route path="/my-results" element={<MyResultsScreen />} />
        <Route path="/pharmacy-finder" element={<PharmacyFinderScreen />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
