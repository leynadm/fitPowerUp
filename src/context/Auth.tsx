import React, { useEffect, useState, createContext, ReactNode } from "react";
import { auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import User from "../utils/interfaces/User";
import toast from "react-hot-toast";
import createInitialDbTables from "../utils/IndexedDbCRUDFunctions/createInitialDbTables";
import enablePersistentData from "../utils/enablePersistentData";
// Create the context to hold the data and share it among all components
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<any>({
  currentUser: null,
  userCredential: null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Set the current user in case the user is already logged in
  const [currentUser, setCurrentUser] = useState(() => auth.currentUser);
  const [currentUserData, setCurrentUserData] = useState<User | undefined>(
    undefined
  );
  const [loginFetchTrigger, setLoginFetchTrigger] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        if (user?.isAnonymous === false) {
          enablePersistentData();
          createInitialDbTables(user.uid)
            .then(() => {
              console.log("Tables are inside the database.");
            })
            .catch((error) => {
              console.error("Error creating tables:", error);
            })
            .finally(() => {
              console.log("IndexedDb tables creation completed.");
            });

          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data() as User;
            setCurrentUserData(userData);
          }
        } else {
          setCurrentUserData({
            fullname: ["guest", "user", "guest user"],
            name: "guest",
            sex: "male",
            surname: "user",
            profileImage: "",
            verified: false,
            privateAccount: false,
            blocked: [],
            hideProfile: false,
            hidePowerLevel: true,
            hideFollowers: false,
            hideFollowing: false,
            powerLevel: 0,
            strengthLevel: 0,
            experienceLevel: 0,
            firstPowerExercise: "No Exercise Selected Yet",
            secondPowerExercise: "No Exercise Selected Yet",
            thirdPowerExercise: "No Exercise Selected Yet",
            weight: 0,
          });
        }
      }
      setLoginFetchTrigger(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleOffline = () => {
      setLoginFetchTrigger(true); // Set the trigger to false when offline
    };

    const handleOnline = () => {
      setLoginFetchTrigger(true); // Set the trigger to true when online
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  async function fetchData() {
    if (currentUser === null) {
      return;
    }

    if (currentUser.isAnonymous === false) {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          setCurrentUserData(userData);
          return userData;
        }
      } catch (error) {
        toast.error("We couldn't fetch the data...");
        console.error("Error while fetching user data:", error);
      }
    }
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserData,
        setCurrentUserData,
        loginFetchTrigger,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
