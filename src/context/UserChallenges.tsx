import React, { createContext, ReactNode, useMemo } from "react";
import { useUserChallengessData } from "../hooks/useUserChallengesData";
interface userChallengesProviderProps {
  children: ReactNode;
}

// Create the context to hold the data and share it among all components
export const UserChallengesContext = createContext<any>({
  userChallengesData: [],
  setUserChallengesData: null,
  refetchUserChallengesData: null,
});

export const UserChallengesDataProvider = ({
  children,
}: userChallengesProviderProps) => {
  const {
    userChallengesData,
    setUserChallengesData,
    refetchUserChallengesData,
  } = useUserChallengessData();

  // Logic to fetch and update data using the custom hook
  const contextValue = useMemo(
    () => ({
      userChallengesData,
      setUserChallengesData,
      refetchUserChallengesData,
    }),
    [userChallengesData]
  );
  return (
    <UserChallengesContext.Provider value={contextValue}>
      {children}
    </UserChallengesContext.Provider>
  );
};
