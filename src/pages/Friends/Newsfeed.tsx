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
  startAt,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import User from "../../utils/interfaces/User";
import { PostData } from "../../utils/interfaces/PostData";
import { Button, Typography } from "@mui/material";
import LoadingCircle from "../../components/ui/LoadingCircle";
function Newsfeed() {
  const { currentUser } = useContext(AuthContext);
  const [userFeed, setUserFeed] = useState<any>([]);
  const [latestDoc, setLatestDoc] = useState<any>(null);
  const [postIDsCache, setPostIDsCache] = useState<any>([]);
  const [usersDataCache, setUsersDataCache] = useState<any>([]);
  const [userFeedLength, setUserFeedLength] = useState<number | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [hasPosts, setHasPosts] = useState(false);
  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    console.log("rerendering based on has posts");
    console.log({ hasPosts });
    console.log({ loading });
  }, [loading, hasPosts]);

  async function getFeed() {

    const followedUsersRef = collection(db, "followers-feed");
    const usersRef = collection(db, "users");
    const postsRef = collection(db, "posts");

    // Calculate the timestamp for 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Retrieve the documents from the "followers-feed" collection that match the specified query conditions
    const followedUsersSnapshot = await getDocs(
      query(
        followedUsersRef,
        where("users", "array-contains", currentUser.uid),
        orderBy("lastPost", "desc"),
        where("lastPost", ">", sevenDaysAgo), // Add condition to filter by last 7 days
        limit(10)
      )
    );

    // Extract the document IDs of the followed users
    const documentIds = followedUsersSnapshot.docs.map((doc) => doc.id);
    console.log("logging documentIds of the followed users:");
    if (documentIds.length === 0) {
      console.log("No post IDs found.");
    
      // Handle the empty postIds array (e.g., display a message to the user)
      return;
    }
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

    console.log(postIds.length);
    if (postIds.length === 0) {
      console.log("No post IDs found.");
      console.log("SETTING LOADING TO FALSE!!!");
      setLoading(false);

      // Handle the empty postIds array (e.g., display a message to the user)

      return;
    }

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
        setHasPosts(feedData.length > 0);
      } else {
        setUserFeed(feedData);
        setHasPosts(feedData.length > 0);
      }
    }

    console.log("SETTING LOADING TO FALSE!!!");
    setLoading(false);
  }
/* 
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
 */
  return (
    <>
      {hasPosts ? (
        <Box sx={{ paddingBottom: "56px", marginTop: "8px",height:"100%" }}>
          {/* 
          <Typography sx={{ fontSize: "small", opacity: "50%", textAlign: "right" }}>
            Last 7 days
          </Typography>
          */}
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
              documentId={post.documentId}
              postUserId={post.userId}
            />
          ))}
          {hasPosts && (
            <Button
              sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}
              onClick={getFeed}
            >
              Load More
            </Button>
          )}
        </Box>
      ) : (
        <Box
          sx={{ paddingBottom: "56px", marginTop: "8px", textAlign: "center",height:"100%" }}
        >
          <Typography sx={{height:"100%"}}>No posts, follow others to see their activity!</Typography>
        </Box>
      )}
    </>
  );
}

export default Newsfeed;
