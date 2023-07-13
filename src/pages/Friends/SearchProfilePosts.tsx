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
import LoadingCircle from "../../components/ui/LoadingCircle";

interface SearchProfilePostsProps {
  queriedUser: any;
  id: string | undefined;
}

function SearchProfilePosts({ queriedUser, id }: SearchProfilePostsProps) {
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [latestDoc, setLatestDoc] = useState<any>(null);
  const [loadButtonStatus, setLoadButtonStatus] = useState(false)
  const [loading, setLoading] = useState(false);
  const [hasPosts, setHasPosts] = useState(false);

  useEffect(() => {
    if (queriedUser) {
      getUserPosts();
    }

    console.log("logging queried user:");
    console.log(queriedUser);
  }, [queriedUser]);

  async function getUserPosts() {

    setLoading(true)
    let q;

    if (latestDoc) {
      q = query(
        collection(db, "posts"),
        where("userId", "==", id),
        orderBy("createdAt", "desc"),
        startAfter(latestDoc),
        limit(2)
      );
    } else {
      q = query(
        collection(db, "posts"),
        where("userId", "==", id),
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
      setHasPosts(true)
    }

    if (querySnapshot.empty) {
      setLoadButtonStatus(true)
    }

    setLoading(false)
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
        <LoadingCircle />
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
          currentUserDataName={`${queriedUser?.name} ${queriedUser?.surname}`}
          workoutData={post.workoutData}
          currentUserDataImage={queriedUser?.profileImage}
          postTimestamp={post.postTimestamp}
          postCreatedAt={post.createdAt}
          postId={post.postId}
          comments={post.comments}
          showWorkout={post.showWorkout}
          unitsSystem={post.unitsSystem}
          postAppreciation={post.postAppreciation}
          documentId={post.documentId}
          postUserId={post.userId}
          userVerified={queriedUser.verified}
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

export default SearchProfilePosts;
