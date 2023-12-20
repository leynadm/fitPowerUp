import React, { createContext, ReactNode, useMemo } from "react";

import { useUserTrainingData } from "../hooks/useUserTrainingData";
import formatDateForTextField from "../utils/formatDateForTextfield";
import { useState } from "react";

interface TrainingDataDataProviderProps {
  children: ReactNode;
}

// Create the context to hold the data and share it among all components
export const UserTrainingDataContext = createContext<any>({
  userTrainingData: [],
  setUserTrainingData: null,
  refetchUserTrainingData: null,
  dateForWorkout:null,
  setDateForWorkout:null
});

export const UserTrainingDataProvider = ({
  children,
}: TrainingDataDataProviderProps) => {
  const { userTrainingData, setUserTrainingData, refetchUserTrainingData } =
    useUserTrainingData();
    
    const [dateForWorkout, setDateForWorkout] = useState(
      formatDateForTextField(new Date())
    );
  // Logic to fetch and update data using the custom hook
  const contextValue = useMemo(
    () => ({
      userTrainingData,
      setUserTrainingData,
      refetchUserTrainingData,
      dateForWorkout,
      setDateForWorkout
    }),
    [userTrainingData,dateForWorkout]
  );

  return (
    <UserTrainingDataContext.Provider value={contextValue}>
      {children}
    </UserTrainingDataContext.Provider>
  );
};
