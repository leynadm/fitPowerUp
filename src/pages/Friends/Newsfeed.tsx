import React, { useContext, useEffect, useState } from "react";
import UserWorkoutCard from "./UserWorkoutCard";
import Box from "@mui/material/Box";
import { AuthContext } from "../../context/Auth";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import useOnlineStatus from "../../hooks/useOnlineStatus";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  startAfter,
  limit,
  documentId,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { PostData } from "../../utils/interfaces/PostData";
import { Button, Typography } from "@mui/material";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
import NoConnection from "../../components/ui/NoConnection";
import { toast } from "react-hot-toast";
import { SocialDataContext } from "../../context/SocialData";

function Newsfeed() {
  const { currentUser, currentUserData } = useContext(AuthContext);

  const {
    userFeed,
    setUserFeed,
    postIDsCache,
    setPostIDsCache,
    usersDataCache,
    setUsersDataCache,
    latestDoc,
    setLatestDoc,
    hasPosts,
    setHasPosts,
    feedDataNullCheck,
    setFeedDataNullCheck
  } = useContext(SocialDataContext);

  const [loading, setLoading] = useState(false);
  const [loadButtonStatus, setLoadButtonStatus] = useState(false);
  
  const isOnline = useOnlineStatus()
  let renderedOnce = false;

  useEffect(() => {

    if (
      isOnline &&
      ((currentUserData !== undefined || currentUserData !== null) && userFeed.length===0)
    ) {

      getFeed();
    }
  }, []);

  useEffect(() => {

  }, [userFeed, loading]);

  async function loadMoreFeed() {

    const postsRef = collection(db, "posts");
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 2);
    const sevenDaysAgoTimestamp = Timestamp.fromDate(sevenDaysAgo);
    let postsQuery;
    if (latestDoc) {
      postsQuery = query(
        postsRef,
        orderBy("createdAt", "desc"),
        where("createdAt", ">", sevenDaysAgoTimestamp), // Add condition to filter by last 7 days
        where("documentId", "in", postIDsCache),
        startAfter(latestDoc),
        limit(2)
      );
    } else {
      postsQuery = query(
        postsRef,
        orderBy("createdAt", "desc"),
        where("createdAt", ">", sevenDaysAgoTimestamp), // Add condition to filter by last 7 days
        where("documentId", "in", postIDsCache),
        limit(2)
      );
    }

    const postsSnapshot = await getDocs(postsQuery);

    if (postsSnapshot.empty) {
      setLoadButtonStatus(true);
    }

    if (postsSnapshot.docs.length > 0) {
      setLatestDoc(postsSnapshot.docs[postsSnapshot.docs.length - 1]);
    }

    // Extract the post data from the query snapshot
    const newPostsData = postsSnapshot.docs.map((doc) => {
      const postData = { ...doc.data(), postId: doc.id };
      return postData;
    });

    // Create a mapping from user ID to user data for efficient lookup
    const userIdToUserData: { [key: string]: any } = {};
    usersDataCache.forEach((userData: any) => {
      const userId = userData.id;
      userIdToUserData[userId] = userData;
    });

    // Combine post data with user data to enrich the feed data
    const newFeedData = newPostsData.map((post: any) => {
      const userID = post.userId;
      if (userIdToUserData.hasOwnProperty(userID)) {
        const { name, surname, profileImage, verified } =
          userIdToUserData[userID];
        return {
          ...post,
          name,
          surname,
          profileImage,
          verified,
        };
      }
      return null; // Add a default return value, such as null, for cases where userId is not found
    });

    // Update the userFeed state with the new feed data
    setUserFeed((prevUserFeed: PostData[]) => [
      ...prevUserFeed,
      ...newFeedData,
    ]);
  }


  async function getFeed() {
    
    renderedOnce = true;

    try {
      if (renderedOnce) {
        setLoading(true);
      }

      const followedUsersRef = collection(db, "followers-feed");
      const usersRef = collection(db, "users");
      const postsRef = collection(db, "posts");

      // Calculate the timestamp for 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const sevenDaysAgoTimestamp = Timestamp.fromDate(sevenDaysAgo);
      // Retrieve the documents from the "followers-feed" collection that match the specified query conditions

      const followedUsersSnapshot = await getDocs(
        query(
          followedUsersRef,
          where("users", "array-contains", currentUser.uid),
          where("lastPost", ">", sevenDaysAgoTimestamp), // Add condition to filter by last 7 days
          orderBy("lastPost", "desc"),
          limit(10)
        )
      );

      // Extract the document IDs of the followed users
      const documentIds = followedUsersSnapshot.docs.map((doc) => doc.id);

      if (documentIds.length === 0) {
        if (renderedOnce) {
          setLoading(false);
        }
        return;
      }
      
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
      }

      let postIds;
      // Extract the post IDs from the "recentPosts" field of the followed users' documents

      postIds = followedUsersSnapshot.docs.flatMap((doc) => {
      
        const recentPosts = (doc.data() as { recentPosts: any }).recentPosts;
        const filteredPosts = recentPosts.filter((post: any) => post.published);
        const sortedPostIds = filteredPosts
          .sort((a: any, b: any) => b.published - a.published)
          .map((post: any) => post.postId);

        return sortedPostIds;
      });

      if (postIds.length === 0) {
        if (renderedOnce) {
          setLoading(false);
        }

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
            where("createdAt", ">", sevenDaysAgoTimestamp), // Add condition to filter by last 7 days
            startAfter(latestDoc),

            limit(2)
          );
        } else {
          postsQuery = query(
            postsRef,
            orderBy("createdAt", "desc"),
            where("createdAt", ">", sevenDaysAgoTimestamp), // Add condition to filter by last 7 days
            where("documentId", "in", postIds),
            limit(2)
          );
        }

        const postsSnapshot = await getDocs(postsQuery);

        if (postsSnapshot.empty) {
          setLoadButtonStatus(true);
        }

        if (postsSnapshot.docs.length > 0) {
          setLatestDoc(postsSnapshot.docs[postsSnapshot.docs.length - 1]);
        }

        // Extract the post data from the query snapshot
        const postsData = postsSnapshot.docs.map((doc) => {
          const postData = { ...doc.data(), postId: doc.id };
          return postData;
        });

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
            const { name, surname, profileImage, verified } =
              userIdToUserData[userID];
            return {
              ...post,
              name,
              surname,
              profileImage,
              verified,
            };
          }
          return null; // Add a default return value, such as null, for cases where userId is not found
        });

        if (feedData.includes(null)) {
          setFeedDataNullCheck(true);
        }

        // Update the userFeed state with the sorted feed data

        if (latestDoc && !feedData.includes(null)) {
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

      if (renderedOnce) {
        setLoading(false);
      }
    } catch (error) {
      toast.error("Oops, we couldn't get the feed...");
      if (renderedOnce) {
        setLoading(false);
      }
    }
  }

  if(!isOnline){
    return(
      <NoConnection/>
    )
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
        <LoadingScreenCircle text="Please wait while we get your data..." />
      </Box>
    );
  }

  return (
    <Box height="100%">



      {hasPosts && isOnline && !feedDataNullCheck ? (
        <Box sx={{ paddingBottom: "56px", marginTop: "8px", height: "100%" }}>
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
              userVerified={post.verified}
            />
          ))}
          {hasPosts && (
            <Button
              sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}
              onClick={loadMoreFeed}
              disabled={loadButtonStatus}
            >
              Load More
            </Button>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            height: "80vh",
            gap:1
          }}
        >
          <PersonSearchIcon fontSize="large"/>
          <Typography sx={{textAlign:"center" }}>
            No posts yet!<br></br> 
            Spot others to see their activity!
          </Typography>

        </Box>
      )} 

    </Box>
  );
}

export default Newsfeed;
