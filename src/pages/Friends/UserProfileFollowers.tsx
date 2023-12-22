import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import VerifiedIcon from "@mui/icons-material/Verified";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { ReactComponent as StrengthIcon } from "../../assets/strength.svg";
import { ReactComponent as ExperienceIcon } from "../../assets/gym.svg";
import { ReactComponent as PowerLevelIcon } from "../../assets/powerlevel.svg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
import toast from "react-hot-toast";
import UserProfileBar from "../../components/ui/UserProfileBar";
interface UserData {
  id: string;
  [key: string]: any; // Add this if there are other properties in the user data object.
}

function UserProfileFollowers() {
  const location = useLocation();
  const userIndividualFollowers = location.state.userIndividualFollowers;
  const [userIndividualFollowersData, setUserIndividualFollowersData] =
    useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasFollowers, setHasFollowers] = useState(false);

  const resultsPerPage = 5;

  useEffect(() => {
    fetchUserIndividualFollowersData();
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
      toast.error("Oops, getUserDocumentById has an error!")
      // Handle the error here
      console.error("Error fetching user document by ID:", error);
      // You can also show a user-friendly error message to the user
      // For example: setErrorState("Failed to fetch user data. Please try again later.");
      throw error; // Re-throw the error to propagate it to the calling function if needed.
    }
  }
  

  async function fetchUserIndividualFollowersData() {
    try {
      setLoading(true);
      const startIdx = (currentPage - 1) * resultsPerPage;
      const endIdx = startIdx + resultsPerPage;
  
      const tempData: UserData[] = [...userIndividualFollowersData]; // Copy the existing array
  
      for (const docId of userIndividualFollowers.slice(startIdx, endIdx)) {
        try {
          const documentData = await getUserDocumentById(docId);
          if (documentData) {
            tempData.push(documentData);
          }
        } catch (error) {
          // Handle the error for an individual user document fetch
          console.error(`Error fetching data for user with ID ${docId}:`, error);
          // You can choose to continue with the loop and skip the problematic user
          // or handle it in a way that fits your specific use case.
        }
      }
  
      if (tempData.length > 0) {
        setHasFollowers(true);
      }
  
      setUserIndividualFollowersData(tempData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Oops, fetchUserIndividualFollowersData has an error!")
      // Handle any other unexpected errors that might occur during the function execution
      console.error("An unexpected error occurred:", error);
      // You can show a user-friendly error message or take appropriate actions.
    }
  }
  

  if (loading && !hasFollowers) {
    return (
      <Box
        sx={{
          paddingBottom: "56px",
          marginTop: "8px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <LoadingScreenCircle text="" />
      </Box>
    );
  }

  return (
    <>
      {hasFollowers ? (
        <Box display="flex" flexDirection="column" gap={1} paddingBottom="56px">
          {userIndividualFollowersData.map((user, index) => (
           <UserProfileBar user={user} index={index}/>
           ))}
          <Button
            sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={
              userIndividualFollowers.length <= currentPage * resultsPerPage
            }
          >
            Load More
          </Button>
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
            No spotters currently.
          </Typography>
        </Box>
      )}
    </>
  );
}

export default UserProfileFollowers;
