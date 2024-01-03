import { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import toast from "react-hot-toast";
import IChallengeObj from "../utils/interfaces/IChallengeObj";
export const useUserChallengessData = () => {
  const { currentUser } = useContext(AuthContext);

  const [userChallengesData, setUserChallengesData] = useState<IChallengeObj[]>(
    []
  );

  const fetchUserChallengesData = async () => {
    if (!currentUser) return;

    const usersDocRef = doc(db, "users", currentUser.uid);
    const userCollectionRef = collection(usersDocRef, "userCollection");
    const userChallengesDataDocRef = doc(userCollectionRef, "userChallenges");

    try {
      const userChallengesDataDocSnap = await getDoc(userChallengesDataDocRef);
      if (userChallengesDataDocSnap.exists()) {
        const queriedUserChallengesData = userChallengesDataDocSnap.data();
        setUserChallengesData(queriedUserChallengesData.challenges);
      }
    } catch (error) {
      toast.error("fetchUserChallengesData had an error!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        await fetchUserChallengesData();
      }
    };
    fetchData();
  }, [currentUser]);
  /* 
  useEffect(() => {
    fetchUserChallengesData();
  }, [currentUser]);
 */
  return {
    userChallengesData,
    setUserChallengesData,
    refetchUserChallengesData: fetchUserChallengesData,
  };
};
