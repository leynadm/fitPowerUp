import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import VerifiedIcon from "@mui/icons-material/Verified";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import { ReactComponent as StrengthIcon } from "../../assets/strength.svg";
import { ReactComponent as ExperienceIcon } from "../../assets/gym.svg";
import { ReactComponent as PowerLevelIcon } from "../../assets/powerlevel.svg";
import User from "../../utils/interfaces/User";
interface UserData {
    id: string;
    [key: string]: any; // Add this if there are other properties in the user data object.
  }

interface IUserProfileBar{
    user:UserData
    index:number
}

function UserProfileBar({user,index}:IUserProfileBar){

    return(
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
              boxShadow: 2,
              borderRadius:"4px"
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

                <Link
                  to={`/home/friends/results/u/${user.id}`}
                  style={{textDecoration:"none",textDecorationColor:"black",color:"black"}}
                >
                  <Typography
                    sx={{
                      flexGrow: 1,
                      alignSelf: "center",
                      fontSize: "large",
                      fontWeight: "bold",
                      color: "black",
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      textDecoration:"none",
                      textDecorationColor:"black"
                    }}
                  >
                    {`${user.name} ${user.surname}`}
                    {user.verified && (
                      <VerifiedIcon
                        sx={{
                          color: "#3f51b5",
                          width: "1rem",
                          height: "1rem",
                        }}
                      />
                    )}
                  </Typography>

                  {user.hidePowerLevel ||
                  (user.powerLevel === undefined &&
                    user.strengthLevel === undefined &&
                    user.experienceLevel === undefined) ? (
                    <Typography sx={{ textDecoration: "none",color:"black",

                    textDecorationColor:"black"
                    }} >
                      Unknown Power Level
                    </Typography>
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
                        <PowerLevelIcon
                          width="1.35rem"
                          height="1.35rem"
                        />
                        {user.powerLevel}
                      </Typography>{" "}
                      <Typography
                        sx={{
                          fontSize: "1.25rem",
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          textDecoration: "none"
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
                        <ExperienceIcon
                          width="1.15rem"
                          height="1.15rem"
                        />
                        {user.experienceLevel}
                      </Typography>{" "}
                    </Box>
                  )}
                </Link>
                <Box
                  sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                ></Box>
              </ListItem>
            </List>
          </Box>
        
    )

}

export default UserProfileBar