import { useEffect, useState } from "react";
import IFitPowerUpUser from "../utils/interfaces/User";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// Custom hook for fetching user data
export const useUserDataFetch = (
  currentUser: any,
  defaultUser: IFitPowerUpUser
) => {
  const [currentUserData, setCurrentUserData] =
    useState<IFitPowerUpUser>(defaultUser);

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUserData(docSnap.data() as IFitPowerUpUser);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [currentUser]);

  return { currentUserData, setCurrentUserData };
};
