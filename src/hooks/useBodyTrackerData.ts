import { useState, useEffect, useContext } from 'react';
import { db } from "../config/firebase";
import { doc, getDocs, collection } from "firebase/firestore";
import { AuthContext } from '../context/Auth';
import toast from "react-hot-toast";
import { IUserBodyTrackerDataEntry } from '../utils/interfaces/IBodyTracker';
import { IUserBodyTrackerData } from '../utils/interfaces/IBodyTracker';

export const useBodyTrackerData = () => {
  const { currentUser } = useContext(AuthContext);
  const [userBodyTrackerData, setUserBodyTrackerData] = useState<IUserBodyTrackerDataEntry[]>([]);

  const fetchUserBodyTrackerData = async () => {
    if (!currentUser) return;

    console.log('fetching user body tracker data')
    const usersDocRef = doc(db, "users", currentUser.uid);
    const userBodyTrackerCollectionRef = collection(usersDocRef, "userBodyTrackerCollection");

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
  };

  useEffect(() => {
    fetchUserBodyTrackerData();
  }, [currentUser]);

  return { userBodyTrackerData, setUserBodyTrackerData,refetchUserBodyTrackerData:fetchUserBodyTrackerData };
};
