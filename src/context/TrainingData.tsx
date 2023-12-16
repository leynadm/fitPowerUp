import React, {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { Dispatch, SetStateAction } from "react";
import { db } from "../config/firebase";
import toast from "react-hot-toast";
import { IWorkoutData } from "../utils/firebaseDataFunctions/completeWorkout";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
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
  userBodyTrackerData: null,
});

export interface IUserTrainingData {
  workoutSessions: IWorkoutData[];
}

export interface IUserBodyTrackerData {
  [index: number]: {
    bodyTrackerData: IUserBodyTrackerDataEntry[];
  };
}

export interface IUserSelectedExercises {
  group: string;
  favorite: boolean;
  measurement: [];
  id:string;
  type:string;
  mInvolved:[string]
  erase:boolean;
  equipment:[string]
  multi:boolean
  name:string
}

export interface IUserBodyTrackerDataEntry {
  date: string;
  weight: number;
  bodyFat: number;
  caloricIntake: number;
  neck: number;
  shoulders: number;
  chest: number;
  leftBicep: number;
  rightBicep: number;
  leftForearm: number;
  rightForearm: number;
  waist: number;
  hips: number;
  leftThigh: number;
  rightThigh: number;
  leftCalf: number;
  rightCalf: number;
}

export interface IUserFeatsDataEntry {
  feat: string;
  name: string;
  state: boolean;
  date: string;
  level: number;
  type: string;
  featValue: number;
  description: string;
}

export const TrainingDataProvider = ({
  children,
}: TrainingDataProviderProps) => {
  // Set the current user in case the user is already logged in
  const [userTrainingData, setUserTrainingData] = useState<IWorkoutData[]>();
  const [userSelectedExercises, setUserSelectedExercises] = useState<
    IUserSelectedExercises[]
  >([]);
  const { currentUser } = useContext(AuthContext);
  const [dateForWorkout, setDateForWorkout] = useState(
    formatDateForTextField(new Date())
  );
  const [userBodyTrackerData, setUserBodyTrackerData] = useState<
    IUserBodyTrackerDataEntry[]
  >([]);

  const [userFeatsData, setUserFeatsData] = useState<IUserFeatsDataEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserBodyTrackerData(currentUser, setUserBodyTrackerData);
      await fetchUserFeatsData(currentUser, setUserFeatsData);
      await fetchUserTrainingData(currentUser, setUserTrainingData);
      await fetchUserSelectedExercises(currentUser, setUserSelectedExercises);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <TrainingDataContext.Provider
      value={{
        userTrainingData,
        setUserTrainingData,
        userSelectedExercises,
        setUserSelectedExercises,
        dateForWorkout,
        setDateForWorkout,
        userBodyTrackerData,
        setUserBodyTrackerData,
        userFeatsData,
        setUserFeatsData,
      }}
    >
      {children}
    </TrainingDataContext.Provider>
  );
};

export async function fetchUserBodyTrackerData(
  currentUser: any,
  setUserBodyTrackerData: Dispatch<SetStateAction<IUserBodyTrackerDataEntry[]>>
) {
  const usersDocRef = doc(db, "users", currentUser.uid);
  const userBodyTrackerCollectionRef = collection(
    usersDocRef,
    "userBodyTrackerCollection"
  );

  try {
    const querySnapshot = await getDocs(userBodyTrackerCollectionRef);

    let onlyData: IUserBodyTrackerDataEntry[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as IUserBodyTrackerData;
      onlyData = onlyData.concat(data.bodyTrackerData);
    });
    setUserBodyTrackerData(onlyData);
  } catch (error) {
    toast.error("fetchUserBodyTrackerData had an error!");
  }
}

export interface IUserBodyTrackerData {
  bodyTrackerData: IUserBodyTrackerDataEntry[];
  weight: number;
}

export async function fetchUserFeatsData(
  currentUser: any,
  setUserFeatsData: Dispatch<SetStateAction<IUserFeatsDataEntry[]>>
) {
  try {
    const usersDocRef = doc(db, "users", currentUser.uid);
    const userCollectionRef = collection(usersDocRef, "userCollection");

    const userFeatsDataDocRef = doc(userCollectionRef, "userFeats");

    const userFeatsDataDocSnap = await getDoc(userFeatsDataDocRef);

    if (userFeatsDataDocSnap.exists()) {
      const queriedUserFeatsData = userFeatsDataDocSnap.data();
      setUserFeatsData(queriedUserFeatsData.userFeatsData);
    } else {
      setUserFeatsData([]);
    }
  } catch (error) {}
}

export async function fetchUserTrainingData(
  currentUser: any,
  setUserTrainingData: Dispatch<SetStateAction<IWorkoutData[] | undefined>>
) {
  if (currentUser === null) {
    return;
  }

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
    //toast.error("We couldn't fetch the training sessions...");
    console.error("Error while fetching user training sessions:", error);
  }
}

export async function fetchUserSelectedExercises(
  currentUser: any,
  setUserSelectedExercises: Dispatch<SetStateAction<IUserSelectedExercises[]>>
) {
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

    const preselectedExercisesDocSnap = await getDoc(
      preselectedExercisesDocRef
    );

    if (preselectedExercisesDocSnap.exists()) {
      const userSelectedExercisesData =
        preselectedExercisesDocSnap.data() as IUserSelectedExercises;
      setUserSelectedExercises([userSelectedExercisesData]);
    }
  } catch (error) {
    toast.error("We couldn't fetch the data...");
    console.error("Error while fetching user data:", error);
  }
}
