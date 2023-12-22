import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import fetchFriendsOverview from "../utils/socialFunctions/fetchFriendsOverview";
import { useFriendsSummary } from "../hooks/useFriendsSummary";
import User from "../utils/interfaces/User";
import { AuthContext } from "./Auth";
import { UserTrainingDataContext } from "./UserTrainingData";
import { IFriendsSummary } from "../hooks/useFriendsSummary";
import fetchAdditionalDataForUsers from "../utils/socialFunctions/fetchFriendsWorkouts";
import fetchUserAndTrainingData from "../utils/socialFunctions/fetchUserAndTrainingData";
import SocialUser from "../utils/interfaces/SocialUser";

interface FriendsSummaryProviderProps {
  children: ReactNode;
}
interface myObj {
  friendsSummary: IFriendsSummary;
  friendsSummaryOverview: any[];
}

// Create the context to hold the data and share it among all components
export const FriendsSummaryContext = createContext<any>({
  spottingUsersForBoard: null,
});

export const FriendsSummaryProvider = ({
  children,
}: FriendsSummaryProviderProps) => {
  const { friendsSummary, setFriendsSummary, refetchFriendsSummary } =
    useFriendsSummary();

  const { currentUserData, currentUser } = useContext(AuthContext);
  const {userTrainingData} = useContext(UserTrainingDataContext)
  const [data, setData] = useState<myObj>({
    friendsSummary: friendsSummary,
    friendsSummaryOverview: [],
  });

  const contextValue = useMemo(
    () => ({
      ...data,
      setFriendsSummary,
      refetchFriendsSummary,
    }),
    [data, setFriendsSummary, refetchFriendsSummary]
  );

  useEffect(() => {


    const fetchOverview = async () => {
      try {

        const overviewData = await fetchUserAndTrainingData(friendsSummary.spottingIdsArr)
        
        const currentUserDataWithId = {...currentUserData,trainingData:userTrainingData,id:currentUser.uid}
        const currentUserDataArr = []
        currentUserDataArr.push(currentUserDataWithId)
        const combinedArray = overviewData?.concat(currentUserDataWithId);

        console.log(combinedArray)
         
        if(combinedArray){
 
          combinedArray.sort((a: any, b: any) => b.powerLevel - a.powerLevel);
 

          setData((prev) => ({
            ...prev,
            friendsSummaryOverview: combinedArray,
          }));

        } 
        
        /* 
        const currentUserDataWithId = {
          ...currentUserData,
          id: currentUser.uid,
        };

        const overviewData = await fetchFriendsOverview(
          friendsSummary.spottingIdsArr
        );
        const combinedArray = overviewData?.concat(currentUserDataWithId);

        if (combinedArray) {
          combinedArray.sort((a: User, b: User) => b.powerLevel - a.powerLevel);

          setData((prev) => ({
            ...prev,
            friendsSummaryOverview: combinedArray,
          }));
        }
    */
      } catch (error) {
        console.error("Failed to fetch friends summary overview:", error);
      }
    };

    if (friendsSummary?.spottingIdsArr) {
      fetchOverview();
    }
  }, [currentUserData, friendsSummary]);

  return (
    <FriendsSummaryContext.Provider value={contextValue}>
      {children}
    </FriendsSummaryContext.Provider>
  );
};
