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
  limit,
  documentId,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import User from "../../utils/interfaces/User";
import { PostData } from "../../utils/interfaces/PostData";
import { Button, Typography } from "@mui/material";
function Newsfeed() {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [userFeed, setUserFeed] = useState<any>([]);

  useEffect(() => {
    getFeed();
  }, []);

  async function getFeed() {
    // Get a reference to the followers-feed collection
    const followedUsersRef = collection(db, "followers-feed");

    // Create a query to get all the documents of the users in the followers-feed collection followed by the logged in user (the recentPosts field should be limited to 10)
    const q = query(
      followedUsersRef,
      where("users", "array-contains", currentUser.uid),
      orderBy("lastPost", "desc"),
      limit(2)
    );

    // Retrieve the documents that matched the query above
    const followedUsersSnapshot = await getDocs(q);

    // Extract the data from the above query and create an array of objects containing the documents data of the users the logged in user is following
    let feedData = followedUsersSnapshot.docs.map((doc) => doc.data());
    console.log(feedData);
    // Flaten the "recentPosts" array field in the feedData document objects into a single array. The reduce() method iterates over the feedData array and concatenates the recentPosts array of each user into a single array
    const feedCuratedPosts = feedData.reduce(
      (accumulator, currentElement) =>
        accumulator.concat(currentElement.recentPosts),
      []
    );

    const sortedFeedCuratedPosts = feedCuratedPosts.sort((a: any, b: any) => {
      const dateA = new Date(a.published);
      const dateB = new Date(b.published);
      return dateA.getTime() - dateB.getTime();
    });
    // This line creates an array of post IDs from the sortedFeedCuratedPosts array.
    const postIds = sortedFeedCuratedPosts.map((post: any) => post.postId);

    const documentIds: string[] = [];

    followedUsersSnapshot.forEach((doc) => {
      documentIds.push(doc.id);
    });

    // Slice the postIds array into chunks of 10 or less
    const chunks = [];
    for (let i = 0; i < documentIds.length; i += 10) {
      chunks.push(documentIds.slice(i, i + 10));
    }

    const usersData: any[] = [];

    for (const chunk of chunks) {
      const usersQuery = query(
        collection(db, "users"),
        where(documentId(), "in", chunk)
      );
      const usersSnapshot = await getDocs(usersQuery);

      usersSnapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() }; // Include the document ID
        usersData.push(userData);
      });
    }
    console.log(usersData);
    if (postIds.length > 0) {
      const batchedPostIds = [];

      for (let i = 0; i < postIds.length; i += 10) {
        batchedPostIds.push(postIds.slice(i, i + 10));
      }

      const batchedPostsData: PostData[] = [];

      for (const batch of batchedPostIds) {
        const postsQuery = query(
          collection(db, "posts"),
          where(documentId(), "in", batch)
        );

        const postsSnapshot = await getDocs(postsQuery);

        postsSnapshot.forEach((doc) => {
          const postData = { ...doc.data(), postId: doc.id } as PostData;
          batchedPostsData.push(postData);
        });
      }

      const userIdToUserData: { [key: string]: any } = {};
      usersData.forEach((userData) => {
        const userId = userData.id;
        userIdToUserData[userId] = userData;
      });
      console.log(batchedPostsData);
      const postsDataBatch: any = batchedPostsData.map(async (post: any) => {
        const userID = post.userId;

        // Check if the user data is available in the mapping
        if (userIdToUserData.hasOwnProperty(userID)) {
          const { name, surname, profileImage } = userIdToUserData[userID];

          // Add the name, surname, and profileImage properties to the postData object
          return {
            ...post,
            name,
            surname,
            profileImage,
          };
        }
      });

      const feedBatchPostData = await Promise.all(postsDataBatch);

      const sortedFeedBatchPostData = feedBatchPostData.sort(
        (a: any, b: any) => b.createdAt - a.createdAt
      );
      setUserFeed(sortedFeedBatchPostData);
      console.log(sortedFeedBatchPostData);
    }
  }

  return (
    <Box sx={{ paddingBottom: "56px", marginTop: "8px" }}>
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
        />
      ))}

      <Button sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}>
        Load More
      </Button>
    </Box>
  );
}

export default Newsfeed;
