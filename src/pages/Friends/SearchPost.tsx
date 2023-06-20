import { useParams } from "react-router";
import React, { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/Auth";
import UserWorkoutCard from "./UserWorkoutCard";

function SearchPost() {
  const { id } = useParams<{ id: string }>();
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const { currentUser, currentUserData } = useContext(AuthContext);
  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, []);

  async function getPost(postId: string) {
    const postRef = doc(db, "posts", postId);

    try {
      const docSnapshot = await getDoc(postRef);

      if (docSnapshot.exists()) {
        const post = { ...docSnapshot.data(), postId: docSnapshot.id };
        setUserPosts([post]);
      } else {
        console.log("Post document does not exist");
        setUserPosts([]);
      }
    } catch (error) {
      console.error("Error getting post document:", error);
      setUserPosts([]);
    }
  }

  return (
    <Box sx={{ paddingBottom: "56px", marginTop: "8px"  }}>
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
        />
      ))}
    </Box>
  );
}

export default SearchPost;
