import React, { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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
import { db } from "../../config/firebase";
import { ReactComponent as StrengthIcon } from "../../assets/strength.svg";
import { ReactComponent as ExperienceIcon } from "../../assets/gym.svg";
import { ReactComponent as PowerLevelIcon } from "../../assets/powerlevel.svg";
import NoConnection from "../../components/ui/NoConnection";


function UserProfile() {

  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [userIndividualFollowers, setUserIndividualFollowers] = useState([]);
  const [userFollowers, setUserFollowers] = useState<number>(0);
  const [userIndividualFollowing, setUserIndividualFollowing] = useState([]);
  const [userFollowing, setUserFollowing] = useState<number>(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const navigate = useNavigate();


  useEffect(() => {

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    console.log('what?')
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };

  }, []);

  useEffect(() => {

    if (isOnline) {
      getProfileFollowers();
    }
 
  }, [uploadCount,updateCount]);



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
 
  if(!isOnline){
    return (
      <NoConnection/>
    );
  }

  return (
    <Box>
      <AppBar elevation={0} position="fixed" style={{ top: 0,height:"56px" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AccountBoxIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              
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
              
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
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
        <Box
          sx={{
            display: "flex",
            gap: 2,
            backgroundColor: "white",
            padding: "8px",
            marginTop: "8px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            boxShadow: 1,
            /* 
            borderBottom:"1px lightgray solid"
           */
          }}
        >
          {currentUserData.profileImage !== "" ? (
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src={currentUserData.profileImage}
                sx={{ width: 56, height: 56, alignSelf: "center" }}
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
              {currentUserData.verified && <VerifiedIcon sx={{color:"#3f51b5",width:"1rem",height:"1rem"}} />}
            </Typography>

            <Button
              variant="contained"
              sx={{ width: "80%" }}
              onClick={() => setEditProfileModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            justifyItems: "center",
            backgroundColor: "white",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            boxShadow: 1,
          }}
        >
          {currentUserData.hidePowerLevel || (currentUserData.powerLevel === undefined && currentUserData.strengthLevel===undefined && currentUserData.experienceLevel===undefined)? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                justifyItems: "center",
              }}
            >

            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                justifyItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PowerLevelIcon width="2rem" height="2rem" />
                {currentUserData.powerLevel!==undefined?(currentUserData.powerLevel):("-")}
              </Typography>

              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }} 
              >
                <StrengthIcon width="1.5rem" height="1.5rem" />

                {currentUserData.strengthLevel!==undefined?(currentUserData.strengthLevel):("-")}
             
              </Typography>

              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ExperienceIcon width="1.5rem" height="1.5rem" />
                {currentUserData.experienceLevel!==undefined?(currentUserData.experienceLevel):("-")}
      
              </Typography>
            </Box>
          )}
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
              {userFollowers === 1
                ? userFollowers + " Spotter"
                : userFollowers + " Spotters"}
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
              {userFollowing === 1
                ? "Spotting " + userFollowing
                : "Spotting " + userFollowing}
            </Typography>
          </Box>
        </Box>
      </Box>
      <EditUserProfileModal
        editProfileModalOpen={editProfileModalOpen}
        setEditProfileModalOpen={setEditProfileModalOpen}
        setUpdateCount={setUpdateCount}
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
