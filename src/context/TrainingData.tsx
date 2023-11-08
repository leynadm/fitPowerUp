import React, {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { db } from "../config/firebase";
import toast from "react-hot-toast";
import { IWorkoutData } from "../utils/firebaseDataFunctions/completeWorkout";
import { doc, getDoc, collection } from "firebase/firestore";
import { AuthContext } from "./Auth";
import formatDateForTextField from "../utils/formatDateForTextfield";

// Create the context to hold the data and share it among all components
interface TrainingDataProviderProps {
  children: ReactNode;
}
export const TrainingDataContext = createContext<any>({
  currentUser: null,
  userCredential: null,
  userTrainingData: null,
});

interface IUserTrainingData {
  workoutSessions: IWorkoutData;
}



export interface IUserSelectedExercises {
  category: string;
  favorite: boolean;
  measurement: [];
  name: string;
  imageURL: string;
  iconURL: string;
  imageURLName: string;
  iconURLName: string;
}

export const TrainingDataProvider = ({
  children,
}: TrainingDataProviderProps) => {
  // Set the current user in case the user is already logged in
  const [userTrainingData, setUserTrainingData] = useState<IWorkoutData | undefined>();
  const [userSelectedExercises, setUserSelectedExercises] = useState<
    IUserSelectedExercises[]
  >([]);
  const { currentUser } = useContext(AuthContext);
  const [dateForWorkout, setDateForWorkout] = useState(
    formatDateForTextField(new Date())
  );

  useEffect(() => {
    fetchUserData()
  }, []);

  async function fetchUserData() {
    if (currentUser === null) {
      return;
    }

    try {
      const usersDocRef = doc(db, "users", currentUser.uid);
      const userCollectionRef = collection(usersDocRef, "userCollection");

      const preselectedExercisesDocRef = doc(
        userCollectionRef,
        "userSelectedExercises"
      );

      const userTrainingDataDocRef = doc(userCollectionRef, "userTrainingData");

      const preselectedExercisesDocSnap = await getDoc(
        preselectedExercisesDocRef
      );

      if (preselectedExercisesDocSnap.exists()) {
        const userSelectedExercisesData =
          preselectedExercisesDocSnap.data() as IUserSelectedExercises;
        setUserSelectedExercises([userSelectedExercisesData]);
      }

      const userTrainingDataDocSnap = await getDoc(userTrainingDataDocRef);

      if (userTrainingDataDocSnap.exists()) {
        const userTrainingExercisesData =
          userTrainingDataDocSnap.data() as IUserTrainingData;
          
        //console.log(userTrainingExercisesData.workoutSessions)
        setUserTrainingData(userTrainingExercisesData.workoutSessions);
      }
    } catch (error) {
      toast.error("We couldn't fetch the data...");
      console.error("Error while fetching user data:", error);
    }
  }

  return (
    <TrainingDataContext.Provider
      value={{
        userTrainingData,
        setUserTrainingData,
        userSelectedExercises,
        setUserSelectedExercises,
        dateForWorkout,
        setDateForWorkout
      }}
    >
      {children}
    </TrainingDataContext.Provider>
  );
};
