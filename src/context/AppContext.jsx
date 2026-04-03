import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [selectedBodyPart, setSelectedBodyPartState] = useState(null);
  const [selectedBodyLabel, setSelectedBodyLabel] = useState(null);
  const [selectedZoomPart, setSelectedZoomPartState] = useState(null);
  const [selectedZoomLabel, setSelectedZoomLabelState] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [painScale, setPainScaleState] = useState(null);

  function setBodyPart(part, label) {
    setSelectedBodyPartState(part);
    setSelectedBodyLabel(label);
  }

  function setZoomPart(part, label) {
    setSelectedZoomPartState(part);
    setSelectedZoomLabelState(label);
  }

  function toggleSymptom(symptomId) {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  }

  function setPainScale(value) {
    setPainScaleState(value);
  }

  function resetAll() {
    setSelectedBodyPartState(null);
    setSelectedBodyLabel(null);
    setSelectedZoomPartState(null);
    setSelectedZoomLabelState(null);
    setSelectedSymptoms([]);
    setPainScaleState(null);
  }

  return (
    <AppContext.Provider
      value={{
        selectedBodyPart,
        selectedBodyLabel,
        selectedZoomPart,
        selectedZoomLabel,
        selectedSymptoms,
        painScale,
        setBodyPart,
        setZoomPart,
        toggleSymptom,
        setPainScale,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
