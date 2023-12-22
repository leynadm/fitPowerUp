import React, { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
import UserViewCharacterProgressModal from "../../components/ui/UserViewCharacterProgressModal";
import toast from "react-hot-toast";
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
  const [
    openUserViewCharacterProgressModal,
    setOpenUserViewCharacterProgressModal,
  ] = useState(false);
  const navigate = useNavigate();

  const [isNewsfeedHovered, setIsNewsfeedHovered] = useState(false);
  const [isSpottersHovered, setIsSpottersHovered] = useState(false);
  const [isSpottingHovered, setIsSpottingHovered] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      getProfileFollowers();
    }
  }, [uploadCount, updateCount]);

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
    try {
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
    } catch (error) {
      toast.error("Oops, getProfileFollowers has an error!");
      // Handle the error here
      console.error("Error fetching profile followers:", error);
      // You can also show a user-friendly error message to the user
      // For example: setErrorState("Failed to fetch followers data. Please try again later.");
    }
  }

  if (!isOnline) {
    return <NoConnection />;
  }

  function handleUserViewCharacterProgressModalClick() {
    setOpenUserViewCharacterProgressModal(!openUserViewCharacterProgressModal);
  }

  return (
    <Box>
      <AppBar
        elevation={0}
        position="fixed"
        style={{
          top: 0,
          height: "56px",
          background:
            "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Container maxWidth="md">
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
              Guest User
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

      {currentUserData.powerLevel &&
      openUserViewCharacterProgressModal &&
      !currentUserData.hidePowerLevel ? (
        <UserViewCharacterProgressModal
          openUserViewCharacterProgressModal={
            openUserViewCharacterProgressModal
          }
          setOpenUserViewCharacterProgressModal={
            setOpenUserViewCharacterProgressModal
          }
        />
      ) : (
        <div></div>
      )}

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
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          {currentUserData.profileImage !== "" ? (
            <Stack
              direction="row"
              spacing={2}
              onClick={handleUserViewCharacterProgressModalClick}
            >
              <Avatar
                alt="user profile"
                src={currentUserData.profileImage}
                sx={{ width: 64, height: 64, alignSelf: "center" }}
              />
            </Stack>
          ) : (
            <Stack
              direction="row"
              spacing={2}
              onClick={handleUserViewCharacterProgressModalClick}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 64, height: 64, alignSelf: "center" }}
              />
            </Stack>
          )}

          <Box
            sx={{
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
              {currentUserData.verified && (
                <VerifiedIcon
                  sx={{ color: "#3f51b5", width: "1rem", height: "1rem" }}
                />
              )}
            </Typography>

            <Button
              variant="dbz_mini"
              sx={{ width: "80%" }}
              onClick={() => setEditProfileModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>

        <Box
          className="CheckingForTheLevel"
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            justifyItems: "center",
            backgroundColor: "white",
          }}
        >
          {currentUserData.hidePowerLevel ||
          (currentUserData.powerLevel === undefined &&
            currentUserData.strengthLevel === undefined &&
            currentUserData.experienceLevel === undefined) ? (
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              Unknown Power Level
            </Typography>
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
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PowerLevelIcon width="1.5rem" height="1.5rem" />

                {currentUserData.powerLevel !== undefined
                  ? currentUserData.powerLevel
                  : "-"}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StrengthIcon width="1rem" height="1rem" />

                {currentUserData.strengthLevel !== undefined
                  ? currentUserData.strengthLevel
                  : "-"}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ExperienceIcon width="1rem" height="1rem" />
                {currentUserData.experienceLevel !== undefined
                  ? currentUserData.experienceLevel
                  : "-"}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", width: "100%" }}>
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
                flexGrow: 1,
                ":hover": {
                  bgcolor: "success.secondary", // theme.palette.primary.main
                  border: "none",
                },
              }}
              key="posts"
              variant="dbz_mini"
              onClick={handleUserProfilePostsBtn}
              onMouseEnter={() => setIsNewsfeedHovered(true)}
              onMouseLeave={() => setIsNewsfeedHovered(false)}
            >
              <FeedIcon
                sx={{ color: isNewsfeedHovered ? "white" : "#000000" }}
              />
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
                margin: 1,
                fontSize: "small",
                flexGrow: 1,
                ":hover": {
                  bgcolor: "success.secondary", // theme.palette.primary.main
                  border: "none",
                },
              }}
              key="followers"
              variant="dbz_mini"
              onClick={handleUserProfileFollowersBtn}
              onMouseEnter={() => setIsSpottersHovered(true)}
              onMouseLeave={() => setIsSpottersHovered(false)}
            >
              <FavoriteIcon
                sx={{ color: isSpottersHovered ? "white" : "#000000" }}
              />
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
                margin: 1,
                fontSize: "small",

                flexGrow: 1,
                ":hover": {
                  bgcolor: "success.secondary", // theme.palette.primary.main
                  border: "none",
                },
              }}
              key="following"
              variant="dbz_mini"
              onClick={handleUserProfileFollowingBtn}
              onMouseEnter={() => setIsSpottingHovered(true)}
              onMouseLeave={() => setIsSpottingHovered(false)}
            >
              <FavoriteBorderIcon
                sx={{ color: isSpottingHovered ? "white" : "#000000" }}
              />
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
