import React, { useState, createContext, ReactNode } from "react";

export const CurrentUserDataContext = createContext<any>({
  currentUserData: null
});

export const CurrentUserDataProvider = ({ children }: { children: ReactNode }) => {
  const [currentUserData, setCurrentUserData] = useState(null);

  function setContext(userData:any) {
    setCurrentUserData(userData);
  }

  return (
    <CurrentUserDataContext.Provider value={{ currentUserData, setContext }}>
      {children}
    </CurrentUserDataContext.Provider>
  );
};
