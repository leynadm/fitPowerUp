import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SocialDataContext } from "../../context/SocialData";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import User from "../../utils/interfaces/User";
import { AuthContext } from "../../context/Auth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import VerifiedIcon from "@mui/icons-material/Verified";
import FeedIcon from "@mui/icons-material/Feed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Routes, Route } from "react-router-dom";
import SearchProfilePosts from "./SearchProfilePosts";
import { useNavigate } from "react-router-dom";
import SearchUserProfileFollowers from "./SearchUserProfileFollowers";
import SearchUserProfileFollowing from "./SearchUserProfileFollowing";
import GuestProfileModal from "../../components/ui/GuestProfileModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import FollowersLimitModal from "../../components/ui/FollowersLimitModal";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { ReactComponent as StrengthIcon } from "../../assets/strength.svg";
import { ReactComponent as ExperienceIcon } from "../../assets/gym.svg";
import { ReactComponent as PowerLevelIcon } from "../../assets/powerlevel.svg";
import NoConnection from "../../components/ui/NoConnection";
import SearchViewCharacterProgressModal from "../../components/ui/SearchViewCharacterProgressModal";
import toast from "react-hot-toast";
import useOnlineStatus from "../../hooks/useOnlineStatus";

function SearchUserProfile() {
  const { id } = useParams<{ id: string }>();
  const { setUserFeed, setFeedDataNullCheck, setHasPosts, setUsersDataCache } =
    useContext(SocialDataContext);
  const { currentUser, currentUserData, setCurrentUserData } =
    useContext(AuthContext);
  const [userFollowers, setUserFollowers] = useState<number>(0);
  const [follow, setFollow] = useState<string>("");
  const [queriedUser, setQueriedUser] = useState<User>();
  const [userIndividualFollowers, setUserIndividualFollowers] = useState([]);
  const [userIndividualFollowing, setUserIndividualFollowing] = useState([]);
  const [userFollowing, setUserFollowing] = useState<number>(0);
  const [guestProfileModalOpen, setGuestProfileModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [followersLimitModalOpen, setFollowersLimitModalOpen] = useState(false);
  const [isNewsfeedHovered, setIsNewsfeedHovered] = useState(false);
  const [isSpottersHovered, setIsSpottersHovered] = useState(false);
  const [isSpottingHovered, setIsSpottingHovered] = useState(false);

  const [
    openSearchViewCharacterProgressModal,
    setOpenSearchViewCharacterProgressModal,
  ] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      getProfileData();
      getRelationshipStatus();
      getSearchProfileFollowers();
    }

    

  }, [id]);

  const navigate = useNavigate();

  async function getRelationshipStatus() {
    try {
      if (!id) {
        throw new Error("User ID is undefined");
      }

      const followersFeedRef = doc(db, "followers-feed", id);
      const documentSnapshot = await getDoc(followersFeedRef);

      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        const users = data.users || [];
        setUserFollowers(users.length);
        if (users.includes(currentUser.uid)) {
          setFollow("Stop Spotting");
        } else {
          setFollow("Start To Spot");
        }
      } else {
        setFollow("Start To Spot");
      }
    } catch (error) {
      toast.error("Oops, getRelationshipStatus has an error!");
      // Handle the error here
      console.error("Error getting relationship status:", error);
      // You can also show a user-friendly error message to the user
      // For example: setErrorState("Failed to get relationship status. Please try again later.");
    }
  }

  async function getProfileData() {
    try {
      const userRef = doc(collection(db, "users"), id);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as User;
        const userDataWithId = { ...userData, id: docSnap.id };
        setQueriedUser(userDataWithId);
      } else {
      }
    } catch (error) {
      toast.error("Oops, getProfileData has an error!");
      // Handle the error here
      console.error("Error fetching profile data:", error);
      // You can also show a user-friendly error message to the user
      // For example: setErrorState("Failed to fetch profile data. Please try again later.");
    }
  }

  async function followUser() {
    try {
      if (currentUser.isAnonymous === true) {
        setGuestProfileModalOpen(true);
        return;
      }

      if (currentUser.emailVerified === false) {
        toast("You need to verify your email first!");
        return;
      }

      const followersFeedRef = doc(collection(db, "followers-feed"), `${id}`);
      const followersFeedDoc = await getDoc(followersFeedRef);

      if (!followersFeedDoc.exists()) {
        await setDoc(followersFeedRef, {
          lastPost: null,
          recentPosts: [],
          users: arrayUnion(currentUser.uid),
        });

        setFollow("Stop Spotting");
        setUserFollowers(userFollowers + 1);
      } else {
        const followersFeedData = followersFeedDoc.data();
        const users = followersFeedData.users;

        if (users.length <= 10) {
          await updateDoc(followersFeedRef, {
            users: arrayUnion(currentUser.uid),
          });

          const currentUserfollowersFeedRef = doc(
            collection(db, "followers-feed"),
            `${currentUser.uid}`
          );
          await updateDoc(currentUserfollowersFeedRef, {
            following: arrayUnion(id),
          });

          setFollow("Stop Spotting");
          setUserFollowers(userFollowers + 1);

          getSearchProfileFollowers();
          navigate("");
          setUserFeed([]);
          setHasPosts(false);
          setFeedDataNullCheck(true);
        } else {
          setFollowersLimitModalOpen(!followersLimitModalOpen);
        }
      }
    } catch (error) {
      toast.error("Oops, followUser has an error!");
      // Handle any errors that occur during the execution of the function
      console.error("Error in followUser():", error);
      // You can add specific error handling here based on the error type if needed.
    }
  }

  async function unfollowUser() {
    try {
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

      setFollow("Start To Spot");
      setUserFollowers(userFollowers - 1);

      const currentUserfollowersFeedRef = doc(
        collection(db, "followers-feed"),
        `${currentUser.uid}`
      );

      await updateDoc(currentUserfollowersFeedRef, {
        following: arrayRemove(id),
      });

      getSearchProfileFollowers();
      setUserFeed([]);
      setHasPosts(false);
      setFeedDataNullCheck(true);

      navigate("");
    } catch (error) {
      toast.error("Oops, unfollowUser has an error!");
      // Handle any errors that occur during the execution of the function
      console.error("Error in unfollowUser():", error);
      // You can add specific error handling here based on the error type if needed.
    }
  }

  function handleFollowerClick() {
    if (follow === "Start To Spot") {
      followUser();
    } else {
      unfollowUser();
    }
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

  async function blockUser() {
    if (currentUser.isAnonymous === true) {
      setGuestProfileModalOpen(true);
      return;
    }

    if (currentUser.emailVerified === false) {
      toast("You need to verify your email first!");
      return;
    }

    const userRef = doc(collection(db, "users"), currentUser.uid);

    await updateDoc(userRef, {
      blocked: arrayUnion(id),
    });

    // Assuming you have the currentUserData state and setCurrentUserData setter from useState hook
    setCurrentUserData((prevUserData: any) => {
      return {
        ...prevUserData,
        blocked: [...prevUserData.blocked, id],
      };
    });

    unfollowUser();

    handleClose();
    navigate("/home/friends");
  }

  if (!isOnline) {
    return <NoConnection />;
  }

  function handleSearchViewCharacterProgressModalClick() {
    setOpenSearchViewCharacterProgressModal(
      !openSearchViewCharacterProgressModal
    );
  }

  return (
    <Box>
      <GuestProfileModal
        guestProfileModalOpen={guestProfileModalOpen}
        setGuestProfileModalOpen={setGuestProfileModalOpen}
      />

      <FollowersLimitModal
        followersLimitModalOpen={followersLimitModalOpen}
        setFollowersLimitModalOpen={setFollowersLimitModalOpen}
      />

      <AppBar
        elevation={0}
        position="fixed"
        style={{
          top: 0,
          height: "56px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* 
            <PersonIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
             */}
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
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              {queriedUser && `${queriedUser.name} ${queriedUser.surname}`}
            </Typography>
            {/* 
            <PersonIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            */}
            <Box>
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
                  color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                {queriedUser && `${queriedUser.name} ${queriedUser.surname}`}
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {queriedUser?.powerLevel &&
      openSearchViewCharacterProgressModal &&
      !currentUserData.hidePowerLevel ? (
        <SearchViewCharacterProgressModal
          openSearchViewCharacterProgressModal={
            openSearchViewCharacterProgressModal
          }
          setOpenSearchViewCharacterProgressModal={
            setOpenSearchViewCharacterProgressModal
          }
          queriedUser={queriedUser}
        />
      ) : (
        <div></div>
      )}

      {queriedUser !== undefined && (
        <>
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
              {queriedUser.profileImage !== "" ? (
                <Stack
                  direction="row"
                  spacing={2}
                  onClick={handleSearchViewCharacterProgressModalClick}
                >
                  <Avatar
                    alt="user profile"
                    sx={{ width: 64, height: 64, alignSelf: "center" }}
                    src={queriedUser.profileImage}
                  ></Avatar>
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  spacing={2}
                  onClick={handleSearchViewCharacterProgressModalClick}
                >
                  <Avatar
                    alt="Remy Sharp"
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
                  {`${queriedUser?.name} ${queriedUser?.surname}`}
                  {queriedUser?.verified && (
                    <VerifiedIcon
                      sx={{ color: "#3f51b5", width: "1rem", height: "1rem" }}
                    />
                  )}
                </Typography>

                <Box display="flex" alignItems="center" gap={1}>
                  <Button
                    variant="dbz_mini_icon"
                    sx={{ width: "75%" }}
                    onClick={handleFollowerClick}
                  >
                    {follow}
                    {follow === "Start To Spot" ? (
                      <FavoriteIcon sx={{ verticalAlign: "middle" }} />
                    ) : (
                      <HeartBrokenIcon />
                    )}
                  </Button>

                  <IconButton
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{height:"32px"}}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={blockUser}>Block User</MenuItem>
                  </Menu>
                </Box>
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
              }}
            >
              {queriedUser?.hidePowerLevel ||
              (queriedUser?.powerLevel === undefined &&
                queriedUser?.strengthLevel === undefined &&
                queriedUser?.experienceLevel === undefined) ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                    justifyItems: "center",
                  }}
                >
                  <p style={{ fontSize: "1.25rem" }}>Unknown Power Level</p>
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
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PowerLevelIcon width="1.5rem" height="1.5rem" />
                    {queriedUser?.powerLevel}
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
                    {queriedUser?.strengthLevel}
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
                    {queriedUser?.experienceLevel}
                  </Typography>
                </Box>
              )}
            </Box>
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
                onClick={handleSearchUserProfilePostsBtn}
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
                onClick={handleSearchUserProfileFollowersBtn}
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
                onClick={handleSearchUserProfileFollowingBtn}
                onMouseEnter={() => setIsSpottingHovered(true)}
                onMouseLeave={() => setIsSpottingHovered(false)}
              >
                <FavoriteBorderIcon                 sx={{ color: isSpottingHovered ? "white" : "#000000" }}/>
              </Button>
              <Typography sx={{ fontSize: "small", fontWeight: "light" }}>
                {userFollowing === 1
                  ? " Spotting " + userFollowing
                  : "Spotting " + userFollowing}
              </Typography>
            </Box>
          </Box>
        </>
      )}

      <Routes>
        <Route
          path=""
          element={<SearchProfilePosts queriedUser={queriedUser} id={id} />}
        />
        <Route
          path="followers"
          element={<SearchUserProfileFollowers queriedUser={queriedUser} />}
        />

        <Route
          path="following"
          element={<SearchUserProfileFollowing queriedUser={queriedUser} />}
        />
      </Routes>
    </Box>
  );
}

export default SearchUserProfile;
