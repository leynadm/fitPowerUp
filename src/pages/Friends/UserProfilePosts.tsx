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
import { Button, Typography } from "@mui/material";

function UserProfilePosts() {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [latestDoc, setLatestDoc] = useState<any>(null);

  useEffect(() => {
    getUserPosts();

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

    const userData = querySnapshot.docs.map((doc) => doc.data());

    /* setUserPosts(userData); */
    if (latestDoc) {
      setUserPosts((prevUserPosts) => [...prevUserPosts, ...userData]);
    } else {
      setUserPosts(userData);
    }

    if (querySnapshot.docs.length > 0) {
      setLatestDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    }

    if (querySnapshot.empty) {
    }
  }

  return (
    <Box sx={{ paddingBottom: "56px" }}>
      {userPosts.map((post: any, index: number) => (
        <UserWorkoutCard
          key={index}
          postText={post.postText}
          postImage={post.postImage}
          currentUserDataName={currentUserData.fullname[2]}
          workoutData={post.workoutData}
          currentUserDataImage={currentUserData.profileImage}
          postTimestamp={post.postTimestamp}
          postCreatedAt={post.createdAt}
        />
      ))}
      <Button
        onClick={getUserPosts}
        sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}
      >
        Load More
      </Button>
    </Box>
  );
}

export default UserProfilePosts;
