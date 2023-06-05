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

  return (
    <Box >
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
          {currentUserData.profileImage !== '' ? (
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

        <Box>
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
          >
            <Button
              sx={{ flexGrow: 1, padding: 0, fontSize: "smaller" }}
              key="posts"
            >
              SEE Posts
            </Button>
            <Button
              sx={{ flexGrow: 1, padding: 0, fontSize: "smaller" }}
              key="followers"
            >
              Followers
            </Button>
            <Button
              sx={{ flexGrow: 1, padding: 0, fontSize: "smaller" }}
              key="following"
            >
              Following
            </Button>
          </ButtonGroup>
        </Box>
        <Divider sx={{ width: "100%",marginBottom:"16px" }} />
      </Box>
      <EditUserProfileModal
        editProfileModalOpen={editProfileModalOpen}
        setEditProfileModalOpen={setEditProfileModalOpen}
      />

      <Routes>
        <Route path="" element={<UserProfilePosts />} />
      </Routes>
    </Box>
  );
}

export default UserProfile;
