import { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { doc, getDoc, collection } from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import toast from "react-hot-toast";
import IPresetWorkoutData from "../utils/interfaces/IPresetWorkoutsData";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export const usePresetWorkoutsData = () => {
  const { currentUser } = useContext(AuthContext);

  const [presetWorkoutsData, setPresetWorkoutsData] = useState<
    IPresetWorkoutData[]
  >([]);

  const [presetRoutinesData, setPresetRoutinesData] = useState<
    IPresetWorkoutData[]
  >([]);

  const fetchPresetWorkoutsData = async () => {
    if (!currentUser) return;

    const usersDocRef = doc(db, "users", currentUser.uid);
    const userCollectionRef = collection(usersDocRef, "userCollection");

    const userPresetWorkoutsDataDocRef = doc(
      userCollectionRef,
      "userPresetWorkouts"
    );
    const userPresetRoutinesDataDocRef = doc(
      userCollectionRef,
      "userPresetRoutines"
    );

    const preselectedWorkoutsRef = ref(
      storage,
      "assets/files/presetWorkoutsData.json"
    );
    const preselectedRoutinesRef = ref(
      storage,
      "assets/files/presetRoutinesData.json"
    );

    try {
      const preselectedWorkoutsUrl = await getDownloadURL(
        preselectedWorkoutsRef
      );
      const preselectedRoutinesUrl = await getDownloadURL(
        preselectedRoutinesRef
      );

      const preselectedWorkoutsResponse = await fetch(preselectedWorkoutsUrl);
      const preselectedRoutinesResponse = await fetch(preselectedRoutinesUrl);

      const preselectedWorkoutsParsedJSON =
        await preselectedWorkoutsResponse.json();
      const preselectedRoutinesParsedJSON =
        await preselectedRoutinesResponse.json();

      const presetWorkoutsDataDocSnap = await getDoc(
        userPresetWorkoutsDataDocRef
      );
      const presetRoutinesDataDocSnap = await getDoc(
        userPresetRoutinesDataDocRef
      );

      // Check if the document data exists before using it
      const queriedUserPresetWorkoutsData = presetWorkoutsDataDocSnap.exists()
        ? presetWorkoutsDataDocSnap.data()
        : {}; // Fallback to an empty object if undefined

      const queriedUserPresetRoutinesData = presetRoutinesDataDocSnap.exists()
        ? presetRoutinesDataDocSnap.data()
        : {}; // Fallback to an empty object if undefined

      const workoutsArray = Object.entries(queriedUserPresetWorkoutsData).map(
        ([key, value]) => ({
          id: key,
          ...value,
        })
      );

      const routinesArray = Object.entries(queriedUserPresetRoutinesData).map(
        ([key, value]) => ({
          id: key,
          ...value,
        })
      );
      const combinedPresetWorkoutsData = [
        ...workoutsArray.flat(),
        ...preselectedWorkoutsParsedJSON,
      ];

      const combinedPresetRoutinesData = [
        ...routinesArray.flat(),
        ...preselectedRoutinesParsedJSON,
      ];

      setPresetWorkoutsData(combinedPresetWorkoutsData);
      setPresetRoutinesData(combinedPresetRoutinesData);
    } catch (error) {
      toast.error("fetchPresetWorkoutsData had an error!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        await fetchPresetWorkoutsData();
      }
    };
    fetchData();
  }, [currentUser]);

  return {
    presetWorkoutsData,
    presetRoutinesData,
    setPresetWorkoutsData,
    refetchPresetWorkoutsData: fetchPresetWorkoutsData,
  };
};
