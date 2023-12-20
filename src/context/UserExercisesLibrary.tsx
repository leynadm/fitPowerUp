import React, { createContext, ReactNode, useMemo } from "react";

import { useUserExercisesLibrary } from "../hooks/useUserExercisesLibrary";
interface UserExercisesLibraryProviderProps {
  children: ReactNode;
}

// Create the context to hold the data and share it among all components
export const UserExercisesLibraryContext = createContext<any>({
  userExercisesLibrary: [],
  setUserExercisesLibrary: null,
  refetchUserExercisesLibrary: null,
});

export const UserExercisesLibraryDataProvider = ({
  children,
}: UserExercisesLibraryProviderProps) => {
  
    const {
    userExercisesLibrary,
    setUserExercisesLibrary,
    refetchUserExercisesLibrary,
  } = useUserExercisesLibrary();

  // Logic to fetch and update data using the custom hook
  const contextValue = useMemo(
    () => ({
      userExercisesLibrary,
      setUserExercisesLibrary,
      refetchUserExercisesLibrary,
    }),
    [userExercisesLibrary]
  );

  return (
    <UserExercisesLibraryContext.Provider value={contextValue}>
      {children}
    </UserExercisesLibraryContext.Provider>
  );
};
