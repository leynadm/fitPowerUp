import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth";
import {
  query,
  collection,
  where,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import UserWorkoutCard from "./UserWorkoutCard";
import Box from "@mui/material/Box";
import { Button,Typography } from "@mui/material";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
import toast from "react-hot-toast";
function UserProfilePosts() {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [latestDoc, setLatestDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasPosts, setHasPosts] = useState(false);
  const [loadButtonStatus, setLoadButtonStatus] = useState(false)
  
  useEffect(() => {
    getUserPosts();
  }, []);

  async function getUserPosts() {
    try {
      setLoading(true);
  
      let q;
      if (latestDoc) {
        q = query(
          collection(db, "posts"),
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc"),
          startAfter(latestDoc),
          limit(2)
        );
      } else {
        q = query(
          collection(db, "posts"),
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc"),
          limit(2)
        );
      }
  
      const querySnapshot = await getDocs(q);
  
      const userData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, postId: doc.id };
      });
  
      if (latestDoc) {
        setUserPosts((prevUserPosts) => [...prevUserPosts, ...userData]);
      } else {
        setUserPosts(userData);
      }
  
      if (querySnapshot.docs.length > 0) {
        setLatestDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasPosts(true);
      }
  
      if (querySnapshot.empty) {
        setLoadButtonStatus(true);
      }
  
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Oops, getUserPosts has an error!")
      // Handle the error here
      console.error("Error fetching user posts:", error);
      // You can also show a user-friendly error message to the user
      // For example: setErrorState("Failed to fetch user posts. Please try again later.");
    }
  }
  


  if (loading && !hasPosts) {
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
 {hasPosts ? (
    <Box sx={{ paddingBottom: "56px" }}>
      {userPosts.map((post: any, index: number) => (
        <UserWorkoutCard
          key={index}
          postText={post.postText}
          postImage={post.postImage}
          currentUserDataName={`${currentUserData.name} ${currentUserData.surname}`}
          workoutData={post.workoutData}
          currentUserDataImage={currentUserData.profileImage}
          postTimestamp={post.postTimestamp}
          postCreatedAt={post.createdAt}
          postId={post.postId}
          comments={post.comments}
          showWorkout={post.showWorkout}
          unitsSystem={post.unitsSystem}
          postAppreciation={post.postAppreciation}
          documentId={post.documentId}
          postUserId={post.userId}
          getUserPosts={getUserPosts}
          userVerified={currentUserData.verified}
        />
      ))} 
      <Button 
        onClick={getUserPosts}
        sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}
        disabled={loadButtonStatus}
>
        Load More

      </Button>
    </Box>
 ): (
  <Box
    sx={{ paddingBottom: "56px", marginTop: "8px", textAlign: "center",height:"100%" }}
  >
    <Typography sx={{height:"100%"}}>There are no posts yet.</Typography>
  </Box>
)}

    </>
  );
}

export default UserProfilePosts;
