import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PeopleIcon from "@mui/icons-material/People";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import { IconButton } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { Box } from "@mui/material";

function Friends() {
  return (
    <Container sx={{ paddingBottom: "56px" }}>
      <AppBar position="fixed" style={{ top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <PeopleIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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

            <PeopleIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

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
              Friends
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ height: "100%" }}>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <Typography>My Text</Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
             
        >
          <AdbIcon sx={{
            zIndex:-1
          }} />
        </IconButton>
        
      </Box>
    </Container>
  );
}

export default Friends;
