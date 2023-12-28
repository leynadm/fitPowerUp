import React, { createContext, ReactNode, useMemo } from "react";
import { usePresetWorkoutsData } from "../hooks/usePresetWorkoutsData";
interface PresetWorkoutsDataProviderProps {
  children: ReactNode;
}

// Create the context to hold the data and share it among all components
export const UserPresetWorkoutsDataContext = createContext<any>({
  presetWorkoutsData: [],
  setPresetWorkoutsData: null,
  refetchPresetWorkoutsData: null,
});

export const PresetWorkoutsDataProvider = ({
  children,
}: PresetWorkoutsDataProviderProps) => {
  const {
    presetWorkoutsData,
    setPresetWorkoutsData,
    refetchPresetWorkoutsData,
  } = usePresetWorkoutsData();

  // Logic to fetch and update data using the custom hook
  const contextValue = useMemo(
    () => ({
      presetWorkoutsData,
      setPresetWorkoutsData,
      refetchPresetWorkoutsData,
    }),
    [presetWorkoutsData]
  );

  return (
    <UserPresetWorkoutsDataContext.Provider value={contextValue}>
      {children}
    </UserPresetWorkoutsDataContext.Provider>
  );
};
