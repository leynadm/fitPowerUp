import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PeopleIcon from "@mui/icons-material/People";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Friends() {
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "56px" }}>
      <AppBar position="fixed" style={{ top: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <PeopleIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for a friend..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
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
          <AdbIcon
            sx={{
              zIndex: -1,
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Friends;
