import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import User from "../../utils/interfaces/User";
import VerifiedIcon from "@mui/icons-material/Verified";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";
import { ReactComponent as StrengthIcon } from "../../assets/strength.svg";
import { ReactComponent as ExperienceIcon } from "../../assets/gym.svg";
import { ReactComponent as PowerLevelIcon } from "../../assets/powerlevel.svg";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
import toast from "react-hot-toast";
import UserProfileBar from "../../components/ui/UserProfileBar";
interface UserData {
  id: string;
  [key: string]: any; // Add this if there are other properties in the user data object.
}

interface SearchProfileProps {
  queriedUser: User | undefined;
}

function SearchUserProfileFollowing({ queriedUser }: SearchProfileProps) {
  const location = useLocation();
  const userIndividualFollowing = location.state.userIndividualFollowing;
  const [userIndividualFollowingData, setUserIndividualFollowingData] =
    useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasFollowing, setHasFollowing] = useState(false);

  const resultsPerPage = 5;

  useEffect(() => {
    fetchUserIndividualFollowingData();
  }, [currentPage]);

  async function getUserDocumentById(documentId: any) {
    try {
      const documentRef = doc(db, "users", documentId); // Replace with your collection name
  
      const snapshot = await getDoc(documentRef);
  
      if (snapshot.exists()) {
        const documentData = snapshot.data();
        return { ...documentData, id: snapshot.id };
      }
      return null;
    } catch (error) {
      // Handle the error here
      toast.error("Oops, getUserDocumentById has an error!")
      console.error("Error fetching user document by ID:", error);
      // You can also show a user-friendly error message to the user
      // For example: setErrorState("Failed to fetch user data. Please try again later.");
      return null; // Return null or an empty object to indicate that there was an error.
    }
  }
  
  async function fetchUserIndividualFollowingData() {
    try {
      setLoading(true);
      const startIdx = (currentPage - 1) * resultsPerPage;
      const endIdx = startIdx + resultsPerPage;
  
      const tempData: UserData[] = [...userIndividualFollowingData]; // Copy the existing array
  
      for (const docId of userIndividualFollowing.slice(startIdx, endIdx)) {
        try {
          const documentData = await getUserDocumentById(docId);
          if (documentData) {
            tempData.push(documentData);
          }
        } catch (error) {
          toast.error("Oops, error fetching data for user with specific ID!")
          // Handle the error for an individual user document fetch
          console.error(`Error fetching data for user with ID ${docId}:`, error);
          // You can choose to continue with the loop and skip the problematic user
          // or handle it in a way that fits your specific use case.
        }
      }
  
      if (tempData.length > 0) {
        setHasFollowing(true);
      }
  
      setUserIndividualFollowingData(tempData);
      setLoading(false);
    } catch (error) {
      toast.error("Oops, fetchUserIndividualFollowingData has an error!")
      setLoading(false);
      // Handle any other unexpected errors that might occur during the function execution
      console.error("An unexpected error occurred:", error);
      // You can show a user-friendly error message or take appropriate actions.
    }
  }
  

  if (loading && !hasFollowing) {
    return (
      <Box
        sx={{
          paddingBottom: "56px",
          marginTop: "8px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <LoadingScreenCircle text="Please wait while..."/>
      </Box>
    );
  }

  return (
    <>
      {hasFollowing ? (
        <Box>
          {queriedUser?.hideFollowing ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 1,
              }}
            >
              <Typography sx={{ textAlign: "center" }}>
                {queriedUser.name} {queriedUser.surname} has decided to keep its
                followed users private.
              </Typography>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={1} paddingBottom="56px">
              {userIndividualFollowingData.map((user, index) => (
                <UserProfileBar user={user} index={index}/>
              ))}

              <Button
                sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                disabled={
                  userIndividualFollowing.length <= currentPage * resultsPerPage
                }
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            paddingBottom: "56px",
            marginTop: "8px",
            textAlign: "center",
            height: "100%",
          }}
        >
          <Typography sx={{ height: "100%" }}>
            You aren't spotting anyone currently.
          </Typography>
        </Box>
      )}
    </>
  );
}

export default SearchUserProfileFollowing;
