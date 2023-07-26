import React, { useState, createContext, ReactNode } from "react";

// Create the context to hold the data and share it among all components
interface SocialDataProviderProps {
    children:ReactNode
}

export const SocialDataContext = createContext<any>({
    userFeed: [],
    setUserFeed: () => {},
    postIDsCache: [],
    setPostIDsCache: () => {},
    usersDataCache: [],
    setUsersDataCache: () => {},
    latestDoc: null,
    setLatestDoc: () => {},
    hasPosts: false,
    setHasPosts: () => {},
    feedDataNullCheck: false,
    setFeedDataNullCheck: () => {},
});

export const SocialDataProvider = ({ children }: SocialDataProviderProps) => {
  // Set the current user in case the user is already logged in
  const [userFeed, setUserFeed] = useState<any[]>([]);
  const [postIDsCache, setPostIDsCache] = useState<any[]>([]);
  const [usersDataCache, setUsersDataCache] = useState<any[]>([]);
  const [latestDoc, setLatestDoc] = useState<any | null>(null);
  const [hasPosts, setHasPosts] = useState<boolean>(false);
  const [feedDataNullCheck, setFeedDataNullCheck] = useState<boolean>(false);
  
  return (
    <SocialDataContext.Provider
      value={{
        userFeed,
        setUserFeed,
        postIDsCache,
        setPostIDsCache,
        usersDataCache,
        setUsersDataCache,
        latestDoc,
        setLatestDoc,
        hasPosts,
        setHasPosts,
        setFeedDataNullCheck,
        feedDataNullCheck
      }}
    >
      {children}
    </SocialDataContext.Provider>
  );
};
