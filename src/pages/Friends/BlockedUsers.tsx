import React, { useState, useContext, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AuthContext } from "../../context/Auth";
import { doc, arrayRemove, updateDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { db } from "../../config/firebase";
import getBlockedUsers from "../../utils/socialFunctions/getBlockedUsers";
import fetchCurrentUserData from "../../utils/fetchCurrentUserData";

function BlockedUsers() {
  const { currentUser, setCurrentUserData } = useContext(AuthContext);

  const [blockedUsersData, setBlockedUsersData] = useState([]);

  useEffect(() => {
    getBlockedUsers(currentUser.uid, setBlockedUsersData);
  }, []);

  async function unblockUser(
    userId: string,
    currentUserUid: string,
    setBlockedUsersData: any
  ) {
    try {
      const userDocRef = doc(db, "users", currentUserUid);

      // Remove the user from the blocked array
      await updateDoc(userDocRef, {
        blocked: arrayRemove(userId),
      });

      // Update the blocked users data after unblocking
      getBlockedUsers(currentUserUid, setBlockedUsersData);
      //fetchCurrentUserData(currentUser, setCurrentUserData);
      toast.success("User succesfully unblocked!");
    } catch (error) {
      toast.error("Oops, unblockUser has encountered an error!");
      console.error("Error unblocking user:", error);
    }
  }

  if (blockedUsersData.length === 0) {
    return (
      <Box
        sx={{
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "64px",
          height: "100%",
        }}
      >
        <Typography>You haven't blocked any users!</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        marginTop: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "64px",
      }}
    >
      <Typography>Blocked Users</Typography>

      {blockedUsersData.map((blockedUser: any, index: number) => (
        <List
          key={index}
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: "5px",
            paddingBottom: 0,
            marginBottom: 0,
            marginTop: 0.5,
          }}
        >
          <ListItem
            key={index}
            alignItems="flex-start"
            sx={{
              width: "100%",
              boxShadow: 1,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              gap: 1,
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={blockedUser.profileImage}
                sx={{ width: 56, height: 56, alignSelf: "center" }}
              />
            </ListItemAvatar>

            <ListItemText
              primary={`${blockedUser.name} ${blockedUser.surname}`}
              secondary={
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "smaller",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() =>
                    unblockUser(
                      blockedUser.userId,
                      currentUser.uid,
                      setBlockedUsersData
                    )
                  }
                >
                  Unblock
                </Button>
              }
            />
          </ListItem>
        </List>
      ))}
    </Box>
  );
}

export default BlockedUsers;
