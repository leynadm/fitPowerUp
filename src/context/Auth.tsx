import React, {
  useEffect,
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import User from "../utils/interfaces/User";
import toast from "react-hot-toast";
import createInitialDbTables from "../utils/IndexedDbCRUDFunctions/createInitialDbTables";
import enablePersistentData from "../utils/enablePersistentData";

import updateAppVersionWithNewDocs from "../utils/accountSetupFunctions/updateAppVersionWithNewDocs";
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
  const [currentUserData, setCurrentUserData] = useState<User>();
  const [loginFetchTrigger, setLoginFetchTrigger] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        enablePersistentData();

        createInitialDbTables(user.uid)
          .then(() => {
            //console.log("Tables are inside the database.");
          })
          .catch((error) => {
            console.error("Error creating tables:", error);
          })
          .finally(() => {
            //console.log("IndexedDb tables creation completed.");
          });

          if(!currentUserData){
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
              const userData = docSnap.data() as User;
              setCurrentUserData(userData);
            }
          }
      }
      setLoginFetchTrigger(true);
    });

    return unsubscribe;
  }, [currentUserData]);

/*   useEffect(() => {
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
  }, []); */

  useEffect(() => {

    if (!currentUserData && currentUser) {
    
      const fetchData = async () => {
        const tempCurrentUserData = await fetchCurrentUserData(
          currentUser,
          setCurrentUserData
        );
        if (
          tempCurrentUserData &&
          currentUser !== null &&
          tempCurrentUserData.appVersion !== 2
        ) {
          updateAppVersionWithNewDocs(currentUser.uid);
        }
      };

      fetchData().catch(console.error);
    }
  }, [currentUser]);

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

export async function fetchCurrentUserData(
  currentUser: any,
  setCurrentUserData: Dispatch<SetStateAction<User | undefined>>
) {
  if (currentUser === null) {
    return;
  }
  
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
