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
import useOnlineStatus from "../hooks/useOnlineStatus";
import updateAppVersionWithNewDocs from "../utils/accountSetupFunctions/updateAppVersionWithNewDocs";
import updateAppVersionToV3 from "../utils/accountSetupFunctions/updateAppVersionToV3";
import { onSnapshot } from "firebase/firestore";
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
        setLoginFetchTrigger(true);
        enablePersistentData();

        const docRef = doc(db, "users", user.uid);

        const unsubscribeSnapshot = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data() as User;
            setCurrentUserData(userData);
          }
        });

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

        /* const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          setCurrentUserData(userData);
        } */
        return () => unsubscribeSnapshot();
      } else {
        setLoginFetchTrigger(true);
      }
    });

    return unsubscribe;
  }, []);

  /*   useEffect(() => {
    console.log('currentuserdata effect, not fetching')
    if (!currentUserData && currentUser) {
      setLoginFetchTrigger(false);
      console.log('currentuserdata effect, actually fetching')
      const fetchData = async () => {
        const tempCurrentUserData = await fetchCurrentUserData(
          currentUser,
          setCurrentUserData
        );
        if (
          tempCurrentUserData &&
          currentUser !== null &&
          tempCurrentUserData.appVersion === undefined
        ) {
          await updateAppVersionWithNewDocs(currentUser.uid);
          await updateAppVersionToV3(currentUser.uid);
        } else if (
          tempCurrentUserData &&
          currentUser !== null &&
          tempCurrentUserData.appVersion === 2
        ) {
          await updateAppVersionToV3(currentUser.uid);
        }
      };

      const timeoutId = setTimeout(() => {
        fetchData().catch(console.error);
        setLoginFetchTrigger(true);
      }, 1750);

      return () => clearTimeout(timeoutId);
    }

  }, [currentUser,currentUserData]); */

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
