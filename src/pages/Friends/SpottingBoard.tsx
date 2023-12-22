import useOnlineStatus from "../../hooks/useOnlineStatus";
import { FriendsSummaryContext } from "../../context/FriendsSummary";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import User from "../../utils/interfaces/User";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import PictureDBZFrame from "../../components/ui/PictureDBZFrame";
import Paper from '@mui/material/Paper';
function SpottingBoard() {
  
    const onlineStatus = useOnlineStatus();

  const { friendsSummaryOverview } = useContext(
    FriendsSummaryContext
  );

console.log(friendsSummaryOverview)

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Typography align="center" variant="h6">
        Training Leaderboard
      </Typography>

      {friendsSummaryOverview.map((user: User, index: number) => (
        <Paper key={index} sx={{ padding: 1,display:"flex" }} >
          <Box display="flex" flexDirection="column">
            {user.profileImage !== "" ? (
              <PictureDBZFrame
                pictureLink={user.profileImage}
                pictureAlt={user.name}
              />
            ) : (
              <PictureDBZFrame
                pictureLink="/static/images/avatar/1.jpg"
                pictureAlt={user.name}
              />
            )}
            <Typography variant="button" align="center">{user.name}</Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default SpottingBoard;
