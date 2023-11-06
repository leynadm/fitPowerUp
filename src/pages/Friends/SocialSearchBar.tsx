import React, { useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { db } from "../../config/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { AuthContext } from "../../context/Auth";
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
  const {currentUser,currentUserData} = useContext(AuthContext)
  async function getUsers() {
    console.log("User to search is: " + userToSearch);

    let q;

    if (userToSearch !== "") {

      q = query(
        collection(db, "users"),
        where("fullname", "array-contains", userToSearch),
        where("hideProfile", "==", false)
      );
    } else {
      q = query(
        collection(db, "users"),
        where("hideProfile", "==", false),
        where("fullname", "array-contains", "daniel matei"),
        limit(5)
      );
    }

    const querySnapshot = await getDocs(q);


    const userResults: any = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const user = doc.data();
      user.id = doc.id; // Add this line to set the 'id' property
      if(user.id !== currentUser.uid && !currentUserData.blocked.includes(user.id)){
        userResults.push(user);
      }
    });

    setUsersFound(userResults);

    navigate("results", { state: { usersFound: userResults } });
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserToSearch(event.target.value.toLocaleLowerCase());
    // Perform any necessary operations with the value
  };


  return (
    <Box>
      <Search sx={{ display: "flex",padding:"0",margin:"0" }}>
        <IconButton onClick={getUsers} sx={{display:"flex", justifyContent:"center"}}>
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
        
        <StyledInputBase
          placeholder="Search for someone…"
          onChange={onChange}
          value={userToSearch}
          inputProps={{ "aria-label": "search" }}
        />

      </Search>
    </Box>
  );
}

export default SocialSearchBar;
