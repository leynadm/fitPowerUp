import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
  arrayRemove,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref, getDownloadURL, list } from "firebase/storage";
import User from "../../utils/interfaces/User";
import { AuthContext } from "../../context/Auth";
import convertTimestamp from "../../utils/socialFunctions/convertTimestamp";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import VerifiedIcon from "@mui/icons-material/Verified";
import FeedIcon from "@mui/icons-material/Feed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Routes, Route } from "react-router-dom";
import SearchProfilePosts from "./SearchProfilePosts";
import { useNavigate } from "react-router-dom";
import SearchUserProfileFollowers from "./SearchUserProfileFollowers";
import SearchUserProfileFollowing from "./SearchUserProfileFollowing";

function SearchUserProfile() {
  const { id } = useParams<{ id: string }>();
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [userFeed, setUserFeed] = useState<any>([]);
  const [userFollowers, setUserFollowers] = useState<number>(0);
  const [follow, setFollow] = useState<string>("");
  const [queriedUser, setQueriedUser] = useState<User>();
  const [userIndividualFollowers, setUserIndividualFollowers] = useState([]);
  const [userIndividualFollowing, setUserIndividualFollowing] = useState([]);
  const [userFollowing, setUserFollowing] = useState<number>(0);


  useEffect(() => {
    getProfileData();
    getRelationshipStatus();
    getUsersPosts();
    getSearchProfileFollowers()
    console.log("logging queried user:");
    console.log(queriedUser);
  }, []); 
  
  const navigate = useNavigate();

  async function getRelationshipStatus() {
    if (!id) {
      console.error("User ID is undefined");
      return;
    }

    const followersFeedRef = doc(db, "followers-feed", id);
    const documentSnapshot = await getDoc(followersFeedRef);

    if (documentSnapshot.exists()) {
      const data = documentSnapshot.data();
      const users = data.users || [];
      setUserFollowers(users.length);
      if (users.includes(currentUser.uid)) {
        setFollow("Unfollow");
      } else {
        setFollow("Follow");
      }
    } else {
      setFollow("Follow");
    }
  }

  async function getProfileData() {
    const userRef = doc(collection(db, "users"), id);
    const docSnap = await getDoc(userRef);
  
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      const userData = docSnap.data() as User;
      const userDataWithId = { ...userData, id: docSnap.id };
      setQueriedUser(userDataWithId);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  

  async function followUser() {

    if(currentUser.isAnonymous===true){
      return
    }

    const followersFeedRef = doc(collection(db, "followers-feed"), `${id}`);
    const followersFeedDoc = await getDoc(followersFeedRef);
    if (!followersFeedDoc.exists()) {
      await setDoc(followersFeedRef, {
        lastPost: null,
        recentPosts: [],
        users: arrayUnion(currentUser.uid),
      });
    }

    await updateDoc(followersFeedRef, {
      users: arrayUnion(currentUser.uid),
    });

    setFollow("Unfollow");
    setUserFollowers(userFollowers + 1);

    const currentUserfollowersFeedRef = doc(collection(db, "followers-feed"), `${currentUser.uid}`);
    await updateDoc(currentUserfollowersFeedRef, {
      following: arrayUnion(id),
    });


  }

  async function getUsersPosts() {
    const followedUserPostsRef = collection(db, "posts");

    // Create a query to get all the posts documents of the user
    const q = query(
      followedUserPostsRef,
      where("userID", "==", id),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    // Retrieve the documents that matched the query above
    const followedUserPostSnapshot = await getDocs(q);

    let followedUserFeedData = followedUserPostSnapshot.docs.map((doc) =>
      doc.data()
    );
    setUserFeed(followedUserFeedData);
  }

  function handleFollowerClick() {
    if (follow === "Follow") {
      followUser();
    } else {
      unfollowUser();
    }
  }

  async function unfollowUser() {
    const followersFeedRef = doc(collection(db, "followers-feed"), `${id}`);
    const followersFeedDoc = await getDoc(followersFeedRef);
    if (!followersFeedDoc.exists()) {
      // If the followers feed document doesn't exist, there's nothing to unfollow
      return;
    }

    const followersFeedData = followersFeedDoc.data();
    if (!followersFeedData.users.includes(currentUser.uid)) {
      // If the current user is not in the users array, they're not following this user
      return;
    }

    await updateDoc(followersFeedRef, {
      users: arrayRemove(currentUser.uid),
    });
    setFollow("Follow");
    setUserFollowers(userFollowers - 1);
  
    const currentUserfollowersFeedRef = doc(collection(db, "followers-feed"), `${currentUser.uid}`);
    await updateDoc(currentUserfollowersFeedRef, {
      following: arrayRemove(id),
    });
  }

  function handleSearchUserProfilePostsBtn() {
    navigate("");
  }

  function handleSearchUserProfileFollowersBtn() {
    navigate("followers", {
      state: { userIndividualFollowers: userIndividualFollowers },
    });
  }

  function handleSearchUserProfileFollowingBtn() {
    navigate("following", {
      state: { userIndividualFollowing: userIndividualFollowing },
    });
  }

  async function getSearchProfileFollowers() {
    const followersFeedRef = doc(db, "followers-feed", `${id}`);
    const documentSnapshot = await getDoc(followersFeedRef);

    if (documentSnapshot.exists()) {
      const data = documentSnapshot.data();
      const users = data.users || [];
      const following = data.following || [];
      setUserFollowers(users.length);
      setUserFollowing(following.length);
      setUserIndividualFollowers(users);
      setUserIndividualFollowing(following);
    }
  }

  return (
    <Box>
      <AppBar elevation={0} position="fixed" style={{ top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <QueryStatsIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <PersonIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {`${queriedUser?.name} ${queriedUser?.surname}`}
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {queriedUser?.profileImage !== "" ? (
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src={queriedUser?.profileImage}
                sx={{ width: 64, height: 64, alignSelf: "center" }}
              />
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56, alignSelf: "center" }}
              />
            </Stack>
          )}

          <Box
            sx={{
              marginLeft: "8px",
              marginTop: "8px",
              marginBottom: "8px",
              width: "100%",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <Typography
              sx={{
                justifySelf: "start",
                width: "100%",
                alignSelf: "center",
                fontSize: "large",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {`${queriedUser?.name} ${queriedUser?.surname}`}
              {queriedUser?.verified && <VerifiedIcon />}
            </Typography>

            <Button variant="contained" color="success" sx={{ width: "80%" }} onClick={handleFollowerClick}>
              {follow} <FavoriteIcon />
            </Button>
          </Box>
        </Box>

        <Divider sx={{ width: "100%", marginTop: "8px" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ padding: "8px", fontSize: "large", fontWeight: "bold" }}
          >
            1445
          </Typography>
        </Box>

        <Divider sx={{ width: "100%" }} />
      </Box>

      <Box sx={{ display: "flex", width: "100%", padding: "8px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: 1,
                fontSize: "small",
                border: "none",
                borderRadius: 2,
                backgroundColor: "white",
                ":hover": {
                  bgcolor: "success.main", // theme.palette.primary.main
                  border: "none",
                },
              }}
              key="posts"
              variant="contained"
              onClick={handleSearchUserProfilePostsBtn}
            >
              <FeedIcon sx={{ color: "#000000" }} />
            </Button>

            <Typography sx={{ fontSize: "small", fontWeight: "light" }}>
              Newsfeed
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                flexGrow: 1,
                margin: 1,
                fontSize: "small",
                border: "none",
                borderRadius: 2,
                backgroundColor: "white",
                ":hover": {
                  bgcolor: "success.main", // theme.palette.primary.main
                  border: "none",
                },
              }}
              key="followers"
              variant="contained"
              onClick={handleSearchUserProfileFollowersBtn}
            >
              <FavoriteIcon sx={{ color: "#000000" }} />
            </Button>
            <Typography sx={{ fontSize: "small", fontWeight: "light" }}>
              {userFollowers} Followers
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                color: "black",
                flexGrow: 1,
                margin: 1,
                fontSize: "small",
                border: "none",
                borderRadius: 2,
                backgroundColor: "white",
                ":hover": {
                  bgcolor: "success.main", // theme.palette.primary.main
                  border: "none",
                },
              }}
              key="following"
              variant="contained"
              onClick={handleSearchUserProfileFollowingBtn}
            >
              <FavoriteBorderIcon sx={{ color: "#000000" }} />
            </Button>
            <Typography sx={{ fontSize: "small", fontWeight: "light" }}>
            {userFollowing} Following
            </Typography>
          </Box>
        </Box>

        <Routes>

        <Route path="" element={<SearchProfilePosts queriedUser={queriedUser}  />} />
        <Route path="followers" element={<SearchUserProfileFollowers />} />
                 
        <Route path="following" element={<SearchUserProfileFollowing />} />
      </Routes>
       
    </Box>
  );
}

export default SearchUserProfile;
