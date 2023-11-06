import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import User from "../../utils/interfaces/User";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";
import { ReactComponent as StrengthIcon } from "../../assets/strength.svg";
import { ReactComponent as ExperienceIcon } from "../../assets/gym.svg";
import { ReactComponent as PowerLevelIcon } from "../../assets/powerlevel.svg";
import NoConnection from "../../components/ui/NoConnection";

interface ParentProps {
  usersFound: User[];
}

function UsersListItem({ usersFound }: ParentProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <NoConnection />;
  }

  return (
    <Box sx={{ paddingBottom: "64px" }}>
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
            boxShadow: 1,
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
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ flexGrow: 1 }}
                  alt="Remy Sharp"
                  src={user.profileImage}
                />
              </ListItemAvatar>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateRows: "1fr 1fr",
                  width: "100%",
                }}
              >
                <Link to={`u/${user.id}`} style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      flexGrow: 1,
                      alignSelf: "center",
                      fontSize: "large",
                      color: "black",
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {`${user.name} ${user.surname}`}

                    {user.verified && (
                      <VerifiedIcon
                        sx={{ color: "#3f51b5", width: "1rem", height: "1rem" }}
                      />
                    )}
                  </Typography>
                </Link>

                {user.hidePowerLevel ||
                (user.powerLevel === undefined &&
                  user.strengthLevel === undefined &&
                  user.experienceLevel === undefined) ? (
                  <Typography>Unknown Power Level</Typography>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <PowerLevelIcon width="1.35rem" height="1.35rem" />
                      {user.powerLevel}
                    </Typography>{" "}
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <StrengthIcon width="1.15rem" height="1.15rem" />
                      {user.strengthLevel}
                    </Typography>{" "}
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ExperienceIcon width="1.15rem" height="1.15rem" />
                      {user.experienceLevel}
                    </Typography>{" "}
                  </Box>
                )}
              </Box>
            </ListItem>
          </List>
        </Box>
      ))}
    </Box>
  );
}

export default UsersListItem;
