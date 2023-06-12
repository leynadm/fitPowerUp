import React, { useEffect, useState, createContext, ReactNode, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import UserRelations from "../utils/interfaces/UserRelations";
import { AuthContext } from "./Auth";
// Create the context to hold the data and share it among all components
interface RelationProviderProps {
  children: ReactNode;
}


export const RelationContext = createContext<any>({
  userRelations: []
});

export const RelationProvider = ({ children }: RelationProviderProps) => {
  // Set the current user in case the user is already logged in
  const {currentUser} = useContext(AuthContext)
  const [userRelations, setUserRelations] = useState<UserRelations>();

  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    if (currentUser === null) {
      return;
    }

    if (currentUser.isAnonymous === false) {
      const docRef = doc(db, "followers-feed", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as UserRelations;
        setUserRelations(userData);
        return userData;
      }
    }
  }


  return (
    <RelationContext.Provider value={{ userRelations }}>
      {children}
    </RelationContext.Provider>
  );
};
