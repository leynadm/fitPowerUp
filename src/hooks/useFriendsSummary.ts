import { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { doc, getDoc} from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import toast from "react-hot-toast";

export interface IFriendsSummary {
  spottingNumber: number;
  spottersNumber: number;
  spottersIdsArr: string[];
  spottingIdsArr: string[];
}

export const useFriendsSummary = () => {
  const { currentUser } = useContext(AuthContext);
  const [friendsSummary, setFriendsSummary] = useState<IFriendsSummary>({
    spottingNumber: 0,
    spottersNumber: 0,
    spottersIdsArr: [],
    spottingIdsArr: [],
  });

  const fetchFriendsSummary = async () => {
    if (!currentUser) return;
    const followersFeedRef = doc(db, "followers-feed", currentUser.uid);
    const documentSnapshot = await getDoc(followersFeedRef);

    try {
      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        const users = data.users || [];
        const following = data.following || [];

        setFriendsSummary((prevState) => {
          return {
            ...prevState, // Spread the previous state to maintain other properties
            spottersNumber: users.length,
            spottingNumber: following.length,
            spottersIdsArr: users,
            spottingIdsArr: following,

            // Update the specific property
          };
        });
      }
    } catch (error) {
      toast.error("fetchUserBodyTrackerData had an error!");
    }
  };

  useEffect(() => {
    fetchFriendsSummary();
  }, [currentUser]);

  return { friendsSummary, setFriendsSummary, refetchFriendsSummary: fetchFriendsSummary };
};
