import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/Auth";
import Button from "@mui/material/Button";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  Timestamp,
  updateDoc,
  limit,
  startAfter,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import UserWorkoutCard from "./UserWorkoutCard";
import Box from "@mui/material/Box";

function UserProfilePosts() {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState<any>([]);
  const [latestDoc, setLatestDoc] = useState<any>(null);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    getUserPosts();
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("Reached the bottom!");
        getUserPosts();
      }
    };

    // Attach scroll event listener to the window
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function getUserPosts() {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      limit(3)
    );

    const querySnapshot = await getDocs(q);

    const userPosts = querySnapshot.docs.map((doc) => doc.data());

    setUserPosts(userPosts);
    console.log("logging in userPosts query snapshot map result");
    console.log(userPosts);
    if (querySnapshot.docs.length > 0) {
      setLatestDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    }
    if (querySnapshot.empty) {
      // detach the event listener from the loading process
      window.removeEventListener("scroll", handleScroll);
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
    </Box>
  );
}

export default UserProfilePosts;
