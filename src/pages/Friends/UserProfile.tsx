import React, { useState,useContext,useEffect } from "react";
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
import UserProfilePosts from "./UserProfilePosts";
import EditUserProfileModal from "./EditUserProfileModal";
import { AuthContext } from "../../context/Auth";
import FeedIcon from '@mui/icons-material/Feed';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import UserProfileFollowers from "./UserProfileFollowers";
import UserProfileFollowing from "./UserProfileFollowing";
import { useNavigate } from "react-router-dom";
function UserProfile() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const {currentUser, currentUserData } = useContext(AuthContext);
  const navigate = useNavigate()
  function handleUserProfilePostsBtn(){
    navigate("")
  }

  function handleUserProfileFollowersBtn(){
    navigate("followers")
  }

  function handleUserProfileFollowingBtn(){
    navigate("following")
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
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Profile
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
        <Box sx={{ display: "flex" }}>
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
              }}
            >
              {currentUserData.fullname[2]}
            </Typography>
            <Button
              variant="outlined"
              sx={{ backgroundColor: "white", color: "black", width: "100%" }}
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
          {/* 
          <ButtonGroup
            variant="text"
            sx={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 1,
              marginTop: "8px",
              marginBottom: "8px",
            }}
            size="large"
            aria-label="large button group"
          >  */}

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
              backgroundColor: "white",
              border: "none",
              borderRadius: 2,
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
            key="posts"
            variant="contained"
            onClick={handleUserProfilePostsBtn}
          >
            <FeedIcon />
          </Button>

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
              backgroundColor: "white",
              border: "none",
              borderRadius: 2,
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
            key="followers"
            variant="contained"
            onClick={handleUserProfileFollowersBtn}
          >
            <FavoriteIcon />
          </Button>

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
              backgroundColor: "white",
              border: "none",
              borderRadius: 2,
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
            key="following"
            variant="contained"
            onClick={handleUserProfileFollowingBtn}
          >
            <FavoriteBorderIcon />
          </Button>

          {/* 
          </ButtonGroup>
            */}
        </Box>
        {/* 
        <Divider sx={{ width: "100%",marginBottom:"16px" }} />
            */}
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
