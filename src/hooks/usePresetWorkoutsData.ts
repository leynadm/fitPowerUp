import { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { doc, getDoc, collection } from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import toast from "react-hot-toast";
import IPresetWorkoutData from "../utils/interfaces/IPresetWorkoutsData";
export const usePresetWorkoutsData = () => {
  const { currentUser } = useContext(AuthContext);

  const [presetWorkoutsData, setPresetWorkoutsData] = useState<IPresetWorkoutData[]>([]);

  const fetchPresetWorkoutsData = async () => {
    if (!currentUser) return;

    const usersDocRef = doc(db, "users", currentUser.uid);
    const userCollectionRef = collection(usersDocRef, "userCollection");
    const userPresetWorkoutsDataDocRef = doc(userCollectionRef, "userPresetWorkouts");

    try {
      const presetWorkoutsDataDocSnap = await getDoc(userPresetWorkoutsDataDocRef);

      if (presetWorkoutsDataDocSnap.exists()) {
        const queriedUserPresetWorkoutsData = presetWorkoutsDataDocSnap.data();
        setPresetWorkoutsData(queriedUserPresetWorkoutsData.presetWorkouts);
      }
    } catch (error) {
      toast.error("fetchPresetWorkoutsData had an error!");
    }
  };

  useEffect(() => {
    fetchPresetWorkoutsData();
  }, [currentUser]);

  return {
    presetWorkoutsData,
    setPresetWorkoutsData,
    refetchPresetWorkoutsData: fetchPresetWorkoutsData,
  };
};
