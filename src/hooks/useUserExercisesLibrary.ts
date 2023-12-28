import { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { doc, getDoc, collection } from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import toast from "react-hot-toast";
import { IUserExercisesLibrary } from "../utils/interfaces/IUserExercisesLibrary";
export const useUserExercisesLibrary = () => {
  const { currentUser } = useContext(AuthContext);

  const [userExercisesLibrary, setUserExercisesLibrary] = useState<
    IUserExercisesLibrary[]
  >([]);

  const fetchUserExercisesLibrary = async () => {
    if (!currentUser) return;
 
    const usersDocRef = doc(db, "users", currentUser.uid);
    const userCollectionRef = collection(usersDocRef, "userCollection");

    const preselectedExercisesDocRef = doc(
      userCollectionRef,
      "userSelectedExercises"
    );
 
    try {
      
      const preselectedExercisesDocSnap = await getDoc(
        preselectedExercisesDocRef
      );

      if (preselectedExercisesDocSnap.exists()) {

        const UserExercisesLibraryData =
          preselectedExercisesDocSnap.data() as IUserExercisesLibrary;
        setUserExercisesLibrary([UserExercisesLibraryData]);
      }
    } catch (error) {
      toast.error("fetchUserExercisesLibrary had an error!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if(currentUser){
        await fetchUserExercisesLibrary();
      }
    };
    fetchData();
  }, [currentUser]);
  /* 
  useEffect(() => {
    fetchUserExercisesLibrary();
  }, [currentUser]);
 */
  return {
    userExercisesLibrary,
    setUserExercisesLibrary,
    refetchUserExercisesLibrary: fetchUserExercisesLibrary,
  };
};
