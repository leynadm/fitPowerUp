import React, { useState, createContext, ReactNode } from "react";

// Create the context to hold the data and share it among all components
interface LogDataProviderProps {
  children: ReactNode;
}

export const LogDataContext = createContext<any>({
  time: 120,
  setTime: () => {},
  showRestTimer: false,
  setShowRestTimer: () => {},
  autoStar: 120,
  setAutoStart: () => {},
  selectedExercise:"",
  setSelectedExercise:() => {}
});

export const LogDataProvider = ({ children }: LogDataProviderProps) => {
  // Set the current user in case the user is already logged in
  const [time, setTime] = useState<number>(0);
  const [showRestTimer, setShowRestTimer] = useState<boolean>(false);
  const [autoStart, setAutoStart] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<{
    category: string;
    name: string;
    measurement: any[];
  }>({ category: "", name: "", measurement: [] });

  return (
    <LogDataContext.Provider
      value={{
        time,
        setTime,
        showRestTimer,
        setShowRestTimer,
        autoStart,
        setAutoStart,
        selectedExercise,
        setSelectedExercise
      }}
    >
      {children}
    </LogDataContext.Provider>
  );
};
