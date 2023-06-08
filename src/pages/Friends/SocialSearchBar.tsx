import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { db } from "../../config/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function SocialSearchBar() {
  const navigate = useNavigate();
  const [userToSearch, setUserToSearch] = useState("");
  const [usersFound, setUsersFound] = useState<any>({});

  async function getUsers() {
    console.log("User to search is: " + userToSearch);

    let q;

    if (userToSearch !== "") {
      console.log("value of userToSearch:" + userToSearch);
      q = query(
        collection(db, "users"),
        where("fullname", "array-contains", userToSearch),
        where("privateAccount", "==", false)
      );
    } else {
      q = query(
        collection(db, "users"),
        where("privateAccount", "==", false),
        limit(25)
      );
    }

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

    const userResults: any = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const user = doc.data();
      user.id = doc.id; // Add this line to set the 'id' property
      userResults.push(user);
    });

    console.log(userResults);
    setUsersFound(userResults);

    navigate("results", { state: { usersFound: userResults } });
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserToSearch(event.target.value.toLocaleLowerCase());
    // Perform any necessary operations with the value
  };

  return (
    <Box>
      <Search sx={{ display: "flex" }}>
        <IconButton onClick={getUsers}>
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
        <StyledInputBase
          placeholder="Search for someone…"
          inputProps={{ "aria-label": "search" }}
          onChange={onChange}
          value={userToSearch}
        />
      </Search>
    </Box>
  );
}

export default SocialSearchBar;