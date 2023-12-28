import { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import toast from "react-hot-toast";
import { IUserFeatsDataEntry } from "../utils/interfaces/IUserFeats";
export const useUserFeatsData = () => {
  const { currentUser } = useContext(AuthContext);

  const [userFeatsData, setUserFeatsData] = useState<IUserFeatsDataEntry[]>([]);

  const fetchUserFeatsData = async () => {
    if (!currentUser) return;
    
    const usersDocRef = doc(db, "users", currentUser.uid);
    const userCollectionRef = collection(usersDocRef, "userCollection");
    const userFeatsDataDocRef = doc(userCollectionRef, "userFeats");
 
    try {
      const userFeatsDataDocSnap = await getDoc(userFeatsDataDocRef);
      if (userFeatsDataDocSnap.exists()) {
        const queriedUserFeatsData = userFeatsDataDocSnap.data();
        setUserFeatsData(queriedUserFeatsData.userFeatsData);
      }
    } catch (error) {
      toast.error("fetchUserFeatsData had an error!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if(currentUser){
        await fetchUserFeatsData();
      }
    };
    fetchData();
  }, [currentUser]);
/* 
  useEffect(() => {
    fetchUserFeatsData();
  }, [currentUser]);
 */
  return {
    userFeatsData,
    setUserFeatsData,
    refetchUserFeatsData: fetchUserFeatsData,
  };
};
