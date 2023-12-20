import { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { doc, getDocs, collection } from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import toast from "react-hot-toast";
import { IWorkoutData } from "../utils/interfaces/IUserTrainingData";
import { IUserTrainingData } from "../utils/interfaces/IUserTrainingData";
export const useUserTrainingData = () => {
  const { currentUser } = useContext(AuthContext);
  const [userTrainingData, setUserTrainingData] = useState<IWorkoutData[]>([]);

  const fetchUserTrainingData = async () => {
    if (!currentUser) return;

    const usersDocRef = doc(db, "users", currentUser.uid);
    const userTrainingCollectionRef = collection(
      usersDocRef,
      "userTrainingCollection"
    );
    try {
      const querySnapshot = await getDocs(userTrainingCollectionRef);

      const sessions: IUserTrainingData[] = [];
      querySnapshot.forEach((doc) => {
        // Assuming each document in the collection represents a training session
        // You might want to adjust this line depending on your data structure
        sessions.push(doc.data() as IUserTrainingData);
      });

      let onlyData: IWorkoutData[][] = [];

      for (const element of sessions) {
        if (Array.isArray(element.workoutSessions)) {
          onlyData.push(element.workoutSessions);
        }
      }

      // Flatten the array of arrays into a single array
      const combinedSessions = onlyData.flat();

      setUserTrainingData(combinedSessions);
    } catch (error) {
      toast.error("fetchUserTrainingData had an error!");
    }
  };

  useEffect(() => {
    fetchUserTrainingData();
  }, [currentUser]);

  return {
    userTrainingData,
    setUserTrainingData,
    refetchUserTrainingData: fetchUserTrainingData,
  };
};
