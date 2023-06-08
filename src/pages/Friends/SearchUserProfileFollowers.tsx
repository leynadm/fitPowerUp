import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import User from "../../utils/interfaces/User";
import VerifiedIcon from "@mui/icons-material/Verified";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { Link } from "react-router-dom";

interface UserData {
  id: string;
  [key: string]: any; // Add this if there are other properties in the user data object.
}

function SearchUserProfileFollowers() {
  const location = useLocation();
  const userIndividualFollowers = location.state.userIndividualFollowers;
  const [userIndividualFollowersData, setUserIndividualFollowersData] =
    useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 1;

  useEffect(() => {
    fetchUserIndividualFollowersData();
  }, [currentPage]);

  async function getUserDocumentById(documentId: any) {
    const documentRef = doc(db, "users", documentId); // Replace with your collection name

    const snapshot = await getDoc(documentRef);

    if (snapshot.exists()) {
      const documentData = snapshot.data();
      return { ...documentData, id: snapshot.id };
    }
    return null;
  }

  async function fetchUserIndividualFollowersData() {
    const startIdx = (currentPage - 1) * resultsPerPage;
    const endIdx = startIdx + resultsPerPage;

    const tempData: UserData[] = [...userIndividualFollowersData]; // Copy the existing array

    for (const docId of userIndividualFollowers.slice(startIdx, endIdx)) {
      const documentData = await getUserDocumentById(docId);
      if (documentData) {
        tempData.push(documentData);
      }
    }

    setUserIndividualFollowersData(tempData);
  }

  return (
    <Box>
      {userIndividualFollowersData.map((user, index) => (
        <Box
          key={index}
          sx={{
            paddingTop: "8px",
            margin: 0,
            display: "flex",
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              alignSelf: "center",
              justifySelf: "center",
            }}
          >
            <ListItem
              alignItems="flex-start"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ flexGrow: 1 }}
                  alt="Remy Sharp"
                  src={user.profileImage}
                />
              </ListItemAvatar>

              <Link to={`u/${user.id}`} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    flexGrow: 1,
                    alignSelf: "center",
                    fontSize: "large",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >{`${user.name} ${user.surname}`}</Typography>
              </Link>
              <Box
                sx={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {user.verified && <VerifiedIcon />}
              </Box>
            </ListItem>
          </List>
        </Box>
      ))}

      <Button
        sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        disabled={userIndividualFollowers.length <= currentPage * resultsPerPage}
      >
        Load More
      </Button>
    </Box>
  );
}

export default SearchUserProfileFollowers;
