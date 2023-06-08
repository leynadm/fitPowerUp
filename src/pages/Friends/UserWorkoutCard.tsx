import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import formatTime from "../../utils/formatTime";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Divider from "@mui/material/Divider";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Timestamp } from "firebase/firestore";
interface UserProfileProps {
  postText: any;
  postImage: any;
  currentUserDataName: any;
  workoutData: any;
  currentUserDataImage: any;
  postTimestamp: any;
  postCreatedAt: any;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function getTimeDifference(createdAt: any) {
  if (createdAt instanceof Timestamp) {
    // If the createdAt value is a Firebase Timestamp object, convert it to a Date object
    createdAt = createdAt.toDate();
  } else if (!(createdAt instanceof Date)) {
    // If the createdAt value is not a Date object or a Timestamp object, try to parse it as a string
    const parsedDate = Date.parse(createdAt);
    if (!isNaN(parsedDate)) {
      // If the parsed value is a valid date, create a new Date object from it
      createdAt = new Date(parsedDate);
    } else {
      // Otherwise, throw an error
      throw new Error(`Invalid createdAt value: ${createdAt}`);
    }
  }

  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime();

  // Convert milliseconds to minutes, hours, and days
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  // Determine the appropriate format based on the time difference
  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else {
    return `${diffDays} days ago`;
  }
}
export default function UserWorkoutCard({
  postText,
  postImage,
  currentUserDataName,
  workoutData,
  currentUserDataImage,
  postTimestamp,
  postCreatedAt,
}: UserProfileProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [unitsSystem, setUnitsSystem] = React.useState("kgs");
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    console.log("logging postImate");
    console.log(postImage);
  }, []);
  return (
    <Card sx={{ width: "100%", marginBottom: "16px" }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={currentUserDataImage}
            alt="user image"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={currentUserDataName}
        subheader={getTimeDifference(postCreatedAt)}
      />

      {postImage !== null && (
        <CardMedia component="img" image={postImage} alt="post image" />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postText}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <InsertCommentIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider sx={{ width: "100%" }} />
        <CardContent>
          <Box>
            {workoutData
              /* 
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              ) */
              .map((group: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    borderRadius: "4px",
                    boxShadow: 1,
                    backgroundColor: "white",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontSize: "medium",
                      backgroundColor: "#F0F2F5",
                    }}
                  >
                    {group.name.toLocaleUpperCase()}
                  </Typography>

                  <Divider sx={{ backgroundColor: "aliceblue" }} />
                  {group.exercises.map(
                    (exercise: any, exerciseIndex: number) => (
                      <Box
                        key={exerciseIndex}
                        sx={{
                          display: "grid",
                          gridAutoFlow: "column",
                          gridTemplateColumns: "1fr 1fr 4fr",
                          justifyContent: "space-evenly",
                          justifyItems: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        {exercise.comment ? ( // Check if 'comment' property exists
                          <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                          >
                            <CommentIcon
                              sx={{
                                zIndex: 0,
                              }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            disabled // Placeholder element
                          >
                            <CommentIcon style={{ opacity: 0 }} />
                          </IconButton>
                        )}

                        {exercise.is_pr ? (
                          <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            disabled // Placeholder element
                          >
                            <EmojiEventsIcon sx={{ zIndex: 0 }} />
                          </IconButton>
                        ) : (
                          <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            disabled // Placeholder element
                          >
                            <EmojiEventsIcon sx={{ opacity: 0, zIndex: 0 }} />
                          </IconButton>
                        )}

                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            alignItems: "center",
                            justifyItems: "center",
                            width: "100%",
                            justifyContent: "space-evenly",
                          }}
                        >
                          {exercise.weight !== 0 && (
                            <Typography sx={{ fontSize: "small" }}>
                              {`${exercise.weight.toFixed(2)} ${
                                unitsSystem === "metric" ? "kgs" : "lbs"
                              }`}
                            </Typography>
                          )}

                          {exercise.reps !== 0 && (
                            <Typography sx={{ fontSize: "small" }}>
                              {exercise.reps} reps
                            </Typography>
                          )}

                          {exercise.distance !== 0 && (
                            <Typography
                              sx={{ fontSize: "small" }}
                            >{`${exercise.distance} ${exercise.distance_unit}`}</Typography>
                          )}

                          {exercise.time !== 0 && (
                            <Typography sx={{ fontSize: "small" }}>
                              {exercise.time !== 0
                                ? formatTime(exercise.time)
                                : ""}
                            </Typography>
                          )}
                        </Box>

                        <Divider />
                      </Box>
                    )
                  )}
                </Box>
              ))}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
