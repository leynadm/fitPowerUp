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
  userBodyTrackerData: null,
});

export interface IUserTrainingData {
  workoutSessions: IWorkoutData[];
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

export interface IUserFeatsDataEntry{

  feat: string;
  name: string;
  state: boolean;
  date:string;
  level: number;
  type: string;
  featValue:number;
  description:string;
}

export const TrainingDataProvider = ({
  children,
}: TrainingDataProviderProps) => {
  // Set the current user in case the user is already logged in
  const [userTrainingData, setUserTrainingData] = useState<
    IWorkoutData[]
  >();
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

  const [userFeatsData, setUserFeatsData] = useState<
  IUserFeatsDataEntry[]
>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData(
        currentUser,
        setUserSelectedExercises,
        setUserTrainingData
      );
      await fetchUserBodyTrackerData(currentUser, setUserBodyTrackerData);
      await fetchUserFeatsData(currentUser,setUserFeatsData)
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
        setUserFeatsData
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
  try {
    const usersDocRef = doc(db, "users", currentUser.uid);
    const userCollectionRef = collection(usersDocRef, "userCollection");

    const userBodyTrackerDataDocRef = doc(userCollectionRef, "userBodyTracker");

    const userBodyTrackerDataDocSnap = await getDoc(userBodyTrackerDataDocRef);

    if (userBodyTrackerDataDocSnap.exists()) {
      const queriedUserBodyTrackerData =
        userBodyTrackerDataDocSnap.data() as IUserBodyTrackerDataEntry;

      setUserBodyTrackerData([queriedUserBodyTrackerData]);
    }
  } catch (error) {}
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
      const queriedUserFeatsData =
        userFeatsDataDocSnap.data();
        setUserFeatsData(queriedUserFeatsData.userFeatsData);
    } else {
      setUserFeatsData([])
    }
  } catch (error) {}
}


export async function fetchUserData(
  currentUser: any,
  setUserSelectedExercises: Dispatch<SetStateAction<IUserSelectedExercises[]>>,
  setUserTrainingData: Dispatch<SetStateAction<IWorkoutData[]|undefined>>
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
        userTrainingDataDocSnap.data()
      setUserTrainingData(userTrainingExercisesData.workoutSessions);
    }else{
      setUserTrainingData([])
    }
  } catch (error) {
    toast.error("We couldn't fetch the data...");
    console.error("Error while fetching user data:", error);
  }
}
