import React, { useEffect, useState, createContext, ReactNode } from "react";
import { auth } from "../config/firebase";
// Create the context to hold the data and share it among all components
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<any>({
  currentUser:null,
  userCredential:null
});

export const AuthProvider = ({ children}:AuthProviderProps ) => {
  // Set the current user in case the user is already logged in
  const [currentUser, setCurrentUser] = useState(() => auth.currentUser);

  // Grab the user from the firebase auth object
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
