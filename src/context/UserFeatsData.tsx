import React, { createContext, ReactNode, useMemo } from "react";

import { useUserFeatsData } from "../hooks/useUserFeatsData";
interface UserFeatsDataProviderProps {
  children: ReactNode;
}

// Create the context to hold the data and share it among all components
export const UserFeatsDataContext = createContext<any>({
  userFeatsData: null,
  setUserFeatsData: null,
  refetchUserFeatsData: null,
});

export const UserFeatsDataProvider = ({
  children,
}: UserFeatsDataProviderProps) => {
  const { userFeatsData, setUserFeatsData, refetchUserFeatsData } =
    useUserFeatsData();

  // Logic to fetch and update data using the custom hook
  const contextValue = useMemo(
    () => ({
      userFeatsData,
      setUserFeatsData,
      refetchUserFeatsData,
    }),
    [userFeatsData]
  );

  return (
    <UserFeatsDataContext.Provider value={contextValue}>
      {children}
    </UserFeatsDataContext.Provider>
  );
};
