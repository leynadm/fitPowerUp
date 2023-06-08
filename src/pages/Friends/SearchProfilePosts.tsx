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
import { useParams } from "react-router";
import User from "../../utils/interfaces/User";
interface SearchProfilePostsProps {
  queriedUser: User | undefined;
}

function SearchProfilePosts({queriedUser}:SearchProfilePostsProps) {

  const { currentUser, currentUserData } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [latestDoc, setLatestDoc] = useState<any>(null);

  useEffect(() => {
    if(queriedUser){
      getUserPosts();
    }
    
    console.log('logging queried user:')
    console.log(queriedUser)
    /* 
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; */
  }, [queriedUser]);

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
        where("userId", "==", queriedUser?.id),
        orderBy("createdAt", "desc"),
        startAfter(latestDoc),
        limit(2)
      );
    } else {
      q = query(
        collection(db, "posts"),
        where("userId", "==", queriedUser?.id),
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
          currentUserDataName={`${queriedUser?.name} ${queriedUser?.surname}`}
          workoutData={post.workoutData}
          currentUserDataImage={queriedUser?.profileImage}
          postTimestamp={post.postTimestamp}
          postCreatedAt={post.createdAt}
          postId={post.postId}
          comments={post.comments}
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

export default SearchProfilePosts;
