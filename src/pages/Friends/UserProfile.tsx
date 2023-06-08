import React, { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Divider from "@mui/material/Divider";
import powerLevelImg from "../../assets/powerlevel.svg";
import CardMedia from "@mui/material/CardMedia";
import { Routes, Route } from "react-router-dom";
import EditUserProfileModal from "./EditUserProfileModal";
import { AuthContext } from "../../context/Auth";
import FeedIcon from "@mui/icons-material/Feed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import UserProfilePosts from "./UserProfilePosts";
import UserProfileFollowers from "./UserProfileFollowers";
import UserProfileFollowing from "./UserProfileFollowing";
import { useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL, list } from "firebase/storage";

function UserProfile() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [userIndividualFollowers, setUserIndividualFollowers] = useState([]);
  const [userFollowers, setUserFollowers] = useState<number>(0);
  const [userIndividualFollowing, setUserIndividualFollowing] = useState([]);
  const [userFollowing, setUserFollowing] = useState<number>(0);

  useEffect(() => {
    getProfileFollowers();
  }, [uploadCount]);

  const navigate = useNavigate();
  function handleUserProfilePostsBtn() {
    navigate("");
  }

  function handleUserProfileFollowersBtn() {
    navigate("followers", {
      state: { userIndividualFollowers: userIndividualFollowers },
    });
  }

  function handleUserProfileFollowingBtn() {
    navigate("following", {
      state: { userIndividualFollowing: userIndividualFollowing },
    });
  }

  async function getProfileFollowers() {
    const followersFeedRef = doc(db, "followers-feed", currentUser.uid);
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

            <AccountBoxIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

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
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {`${currentUserData.name} ${currentUserData.surname}`}
            </Typography>
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
          {currentUserData.profileImage !== "" ? (
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src={currentUserData.profileImage}
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
              {`${currentUserData.name} ${currentUserData.surname}`}
              {currentUserData.verified && <VerifiedIcon />}
            </Typography>

            <Button
              variant="contained"
              color="success"
              sx={{ width: "80%" }}
              onClick={() => setEditProfileModalOpen(true)}
            >
              Edit Profile
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
            1395
          </Typography>
        </Box>

        <Divider sx={{ width: "100%" }} />

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
              onClick={handleUserProfilePostsBtn}
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
              onClick={handleUserProfileFollowersBtn}
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
              onClick={handleUserProfileFollowingBtn}
            >
              <FavoriteBorderIcon sx={{ color: "#000000" }} />
            </Button>
            <Typography sx={{ fontSize: "small", fontWeight: "light" }}>
            {userFollowing} Following
            </Typography>
          </Box>
        </Box>
      </Box>
      <EditUserProfileModal
        editProfileModalOpen={editProfileModalOpen}
        setEditProfileModalOpen={setEditProfileModalOpen}
      />

      <Routes>
        <Route path="" element={<UserProfilePosts />} />

        <Route path="followers" element={<UserProfileFollowers />} />

        <Route path="following" element={<UserProfileFollowing />} />
      </Routes>
    </Box>
  );
}

export default UserProfile;
