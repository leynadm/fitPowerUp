import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import User from "../../utils/interfaces/User";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";
interface ParentProps {
  usersFound: User[];
}

function UsersListItem({ usersFound }: ParentProps) {
  useEffect(() => {
    console.log(usersFound);
  }, []);

  return (
    <Box>
      {usersFound.map((user, index) => (
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

      
    </Box>
  );
}

export default UsersListItem;
