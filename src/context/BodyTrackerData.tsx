import React, { createContext, ReactNode, useMemo } from "react";

import { useBodyTrackerData } from "../hooks/useBodyTrackerData";

interface BodyTrackerDataProviderProps {
  children: ReactNode;
}

// Create the context to hold the data and share it among all components
export const BodyTrackerDataContext = createContext<any>({
  userBodyTrackerData: null,
  setUserBodyTrackerData: null,
  refetchUserBodyTrackerData: null,
});

export const BodyTrackerDataProvider = ({
  children,
}: BodyTrackerDataProviderProps) => {
  const {
    userBodyTrackerData,
    setUserBodyTrackerData,
    refetchUserBodyTrackerData,
  } = useBodyTrackerData();

  // Logic to fetch and update data using the custom hook
  const contextValue = useMemo(
    () => ({
      userBodyTrackerData,
      setUserBodyTrackerData,
      refetchUserBodyTrackerData,
    }),
    [userBodyTrackerData]
  );

  return (
    <BodyTrackerDataContext.Provider value={contextValue}>
      {children}
    </BodyTrackerDataContext.Provider>
  );
};
