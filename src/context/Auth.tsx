import React, { useEffect, useState, createContext, ReactNode } from "react";
import { auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import User from "../utils/interfaces/User";
// Create the context to hold the data and share it among all components
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<any>({
  currentUser: auth.currentUser,
  userCredential: null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Set the current user in case the user is already logged in
  const [currentUser, setCurrentUser] = useState(() => auth.currentUser);
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log("logging how many times this runs;");
      console.log("logging user:");
      console.log(user);

      console.log("checking if user is anonymous");

      if (user && user.isAnonymous === false) {
        console.log("fetching the data");
        fetchData();
        console.log("logging currentUserData");
        console.log(currentUserData);
      } else {
        console.log("we are in the else statement:");
        setCurrentUserData({
          fullname: ["Guest", "User", "Guest User"],
          name: "Guest",
          sex: "male",
          surname: "User",
          profileImage: "",
          verified: false,
          privateAccount: false,
        });
      }
    });
    return unsubscribe;
  }, []);

  async function fetchData() {
    if (currentUser === null) {
      return;
    }

    if (currentUser.isAnonymous === false) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as User;
        setCurrentUserData(userData);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentUserData]);

  return (
    <AuthContext.Provider
      value={{ currentUser, currentUserData, setCurrentUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
