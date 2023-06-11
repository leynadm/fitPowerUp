import React, { useContext, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import UserWorkoutCard from "./UserWorkoutCard";
import Box from "@mui/material/Box";
import { AuthContext } from "../../context/Auth";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,  
  startAfter,
  limit,
  documentId,
  startAt
} from "firebase/firestore";
import { db } from "../../config/firebase";
import User from "../../utils/interfaces/User";
import { PostData } from "../../utils/interfaces/PostData";
import { Button, Typography } from "@mui/material";
import { CommitSharp } from "@mui/icons-material";
function Newsfeed() {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [userFeed, setUserFeed] = useState<any>([]);
  const [batchSize, setBatchSize] = useState(2); // Number of posts to load per batch
  const [lastVisiblePost, setLastVisiblePost] = useState(null); // Track the last visible post to paginate
  const [latestDoc, setLatestDoc] = useState<any>(null);
  const [postIDsCache, setPostIDsCache] = useState<any>([]);
  const [usersDataCache, setUsersDataCache] = useState<any>([]);

  useEffect(() => {
    getFeed();
  }, []);

  async function getFeed() {
    const followedUsersRef = collection(db, "followers-feed");
    const usersRef = collection(db, "users");
    const postsRef = collection(db, "posts");

    // Retrieve the documents from the "followers-feed" collection that match the specified query conditions
    const followedUsersSnapshot = await getDocs(
      query(
        followedUsersRef,
        where("users", "array-contains", currentUser.uid),
        orderBy("lastPost", "desc"),
        limit(10)
      )
    );

    // Extract the document IDs of the followed users
    const documentIds = followedUsersSnapshot.docs.map((doc) => doc.id);
    console.log("logging documentIds of the followed users:");
    console.log(documentIds);

    let usersQuery;
    let usersSnapshot;
    let usersData;
    if (usersDataCache.length === 0) {
      // Retrieve the user data of the followed users
      usersQuery = query(usersRef, where(documentId(), "in", documentIds));
      usersSnapshot = await getDocs(usersQuery);

      // Extract the user data from the query snapshot
      usersData = usersSnapshot.docs.map((doc) => {
        const userData = { id: doc.id, ...doc.data() };
        return userData;
      });

      setUsersDataCache(usersData);
      console.log("usersData:");
      console.log(usersData);
    }

    let postIds;
    // Extract the post IDs from the "recentPosts" field of the followed users' documents

    postIds = followedUsersSnapshot.docs.flatMap((doc) => {
      console.log("logging data:");
      console.log(doc.data());

      const recentPosts = (doc.data() as { recentPosts: any }).recentPosts;
      const filteredPosts = recentPosts.filter((post: any) => post.published);
      const sortedPostIds = filteredPosts
        .sort((a: any, b: any) => b.published - a.published)
        .map((post: any) => post.postId);

      return sortedPostIds;
    });

    // Retrieve the post data based on the extracted post IDs
    setPostIDsCache(postIds);

    let postsQuery;
    if (postIds.length > 0) {
      if (latestDoc) {
        postsQuery = query(
          postsRef,
          orderBy("createdAt", "desc"),
          where("documentId", "in", postIds),
          startAfter(latestDoc),
          limit(5)
        );
      } else {
        postsQuery = query(
          postsRef,
          orderBy("createdAt", "desc"),
          where("documentId", "in", postIds),
          limit(5)
        );
      }

      const postsSnapshot = await getDocs(postsQuery);

      if (postsSnapshot.docs.length > 0) {
        setLatestDoc(postsSnapshot.docs[postsSnapshot.docs.length - 1]);
      }

      // Extract the post data from the query snapshot
      const postsData = postsSnapshot.docs.map((doc) => {
        const postData = { ...doc.data(), postId: doc.id };
        return postData;
      });

      console.log("logging postsData:");
      console.log(postsData);
      // Create a mapping from user ID to user data for efficient lookup
      const userIdToUserData: { [key: string]: any } = {};
      if (usersData) {
        usersData.forEach((userData) => {
          const userId = userData.id;
          userIdToUserData[userId] = userData;
        });
      }

      // Combine post data with user data to enrich the feed data
      const feedData = postsData.map((post: any) => {
        const userID = post.userId;
        if (userIdToUserData.hasOwnProperty(userID)) {
          const { name, surname, profileImage } = userIdToUserData[userID];
          return {
            ...post,
            name,
            surname,
            profileImage,
          };
        }
        return null; // Add a default return value, such as null, for cases where userId is not found
      });

      console.log("logging feed data:");
      console.log(feedData);

      // Update the userFeed state with the sorted feed data
      if (latestDoc) {
        setUserFeed((prevUserFeed: PostData[]) => [
          ...prevUserFeed,
          ...feedData,
        ]);
      } else {
        setUserFeed(feedData);
      }
    }
  }

  return (
    <Box sx={{ paddingBottom: "56px", marginTop: "8px" }}>
      <Typography
        sx={{ fontSize: "small", opacity: "50%", textAlign: "right" }}
      >
        Last 7 days
      </Typography>
      {userFeed.map((post: PostData, index: number) => (
        <UserWorkoutCard
          key={index}
          postText={post.postText}
          postImage={post.postImage}
          currentUserDataName={`${post.name} ${post.surname}`}
          workoutData={post.workoutData}
          currentUserDataImage={post.profileImage}
          postTimestamp={post.timestamp}
          postCreatedAt={post.createdAt}
          postId={post.postId}
          comments={post?.comments}
          showWorkout={post.showWorkout}
          unitsSystem={post.unitsSystem}
          postAppreciation={post.postAppreciation}
        />
      ))}

      <Button
        sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}
        onClick={getFeed}
      >
        Load More
      </Button>
    </Box>
  );
}

export default Newsfeed;
