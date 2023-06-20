import React, { useState, useContext, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import getNotifications from "../../utils/socialFunctions/getNotifications";
import { AuthContext } from "../../context/Auth";
import getTimeDifference from "../../utils/socialFunctions/getTimeDifference";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

import { db } from "../../config/firebase";

function Notifications() {
  const { currentUser } = useContext(AuthContext);

  const [notificationsData, setNotificationsData] = useState([]);

  useEffect(() => {
    getNotifications(currentUser.uid, setNotificationsData);
  }, [currentUser.uid]);

  function deleteNotifications() {
    const notificationDocRef = doc(db, "notifications", currentUser.uid);

    setDoc(notificationDocRef, {
      // Use the comment ID as the field name within the document
    });

    getNotifications(currentUser.uid, setNotificationsData);
  }

  return (
    <Box
      sx={{
        marginTop: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {notificationsData.map((notification: any, index: number) => (
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: "5px",
          }}
        >
          <ListItem key={index} alignItems="flex-start" sx={{ width: "100%" }}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={notification.userProfileImage} />
            </ListItemAvatar>

            <ListItemText
              primary={`${notification.name} ${notification.surname}`}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    <Link
                      to={`/home/friends/posts/p/${notification.postId}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {notification.action}
                    </Link>
                  </Typography>
                  <Typography sx={{ fontSize: "small" }}>
                    {getTimeDifference(notification.timestamp)}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}

      {notificationsData.length > 0 ? (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          sx={{ marginTop: "16px" }}
          onClick={deleteNotifications}
        >
          Delete Notifications
        </Button>
      ) : (
        <Typography sx={{ padding: "8px" }}>
          You don't have any notifications.
        </Typography>
      )}
    </Box>
  );
}

export default Notifications;
