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
import { Button } from "@mui/material";
import LoadingCircle from "../../components/ui/LoadingCircle";

function UserProfilePosts() {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [latestDoc, setLatestDoc] = useState<any>(null);
  const [loadButtonStatus, setLoadButtonStatus] = useState(false)
  useEffect(() => {
    getUserPosts();
    console.log('gettingUserPosts')
    /* 
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; */
  }, []);

  /* 
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 56) {
      fetchMore();
    }
  };  */

  async function getUserPosts() {
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
    
    /* setUserPosts(userData); */
    if (latestDoc) {
      setUserPosts((prevUserPosts) => [...prevUserPosts, ...userData]);
    } else {
      console.log(userData)
      setUserPosts(userData);
    }

    if (querySnapshot.docs.length > 0) {
      setLatestDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    }

    if (querySnapshot.empty) {
      setLoadButtonStatus(true)
    }
  }


  return (

    
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
          userVerified={post.verified}
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



  );
}

export default UserProfilePosts;
