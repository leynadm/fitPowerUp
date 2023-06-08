import React, { useState, useEffect, useContext } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import formatTime from "../../utils/formatTime";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Divider from "@mui/material/Divider";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Timestamp } from "firebase/firestore";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PostComment from "./PostComment";
import getTimeDifference from "../../utils/socialFunctions/getTimeDifference";
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
  arrayUnion,
  updateDoc,
  getDoc,
  onSnapshot
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/Auth";
interface UserProfileProps {
  postText: any;
  postImage: any;
  currentUserDataName: any;
  workoutData: any;
  currentUserDataImage: any;
  postTimestamp: any;
  postCreatedAt: any;
  postId: string;
  comments:any
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface ExpandMoreCommentProps extends IconButtonProps {
  expandComment: boolean;
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

const ExpandMoreComment = styled((props: ExpandMoreCommentProps) => {
  const { expandComment, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expandComment }) => ({
  transform: !expandComment ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));



export default function UserWorkoutCard({
  postText,
  postImage,
  currentUserDataName,
  workoutData,
  currentUserDataImage,
  postTimestamp,
  postCreatedAt,
  postId,
  comments:initialComments
}: UserProfileProps) {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [commentExpanded, setCommentExpanded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [unitsSystem, setUnitsSystem] = useState("kgs");
  const [commentText, setCommentText] = useState("");
  const [fetchedComments, setFetchedComments] = useState(initialComments);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const postDocRef = doc(db, "posts", postId);

    const unsubscribe = onSnapshot(postDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const updatedComments = docSnapshot.data().comments;
        setFetchedComments(updatedComments); // Update the fetched comments state
      }
    });

    return () => unsubscribe();
  }, [postId]);


  const handleCommentExpandClick = () => {
    setCommentExpanded(!commentExpanded);
  };

  function addComment() {
    if (commentText !== "") {
      const postRef = doc(db, "posts", postId);

      const serverTimestampObj = serverTimestamp();
      const timestamp = Timestamp.fromMillis(Date.now());

      updateDoc(postRef, {
        comments: arrayUnion({
          content: commentText,
          userId: currentUser.uid,
          timestamp: timestamp,
          name: currentUserData.name,
          surname: currentUserData.surname,
          profileImage:currentUserData.profileImage
        }),

      })
        .then(() => {
          // Comment added successfully
          console.log("Comment added");
          setCommentText(""); // Clear the comment text
        })
        .catch((error) => {
          // Error occurred while adding comment
          console.error("Error adding comment:", error);
        });
    }
  }

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
        {/* 
          <IconButton aria-label="share">
        
        
          <InsertCommentIcon />
        
        
          </IconButton>

  */}

        <ExpandMoreComment
          expandComment={commentExpanded}
          onClick={handleCommentExpandClick}
          aria-expanded={commentExpanded}
          aria-label="show more"
        >
          <InsertCommentIcon />
        </ExpandMoreComment>
        <Typography >{fetchedComments.length}</Typography>
        
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

      <Collapse in={commentExpanded} timeout="auto" unmountOnExit>
        <Divider sx={{ width: "100%" }} />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <TextField
              multiline
              id="input-with-sx"
              label="Write a comment"
              variant="standard"
              sx={{ width: "100%" }}
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            />
            <IconButton onClick={addComment}>
              <ReplyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            </IconButton>
          </Box>

          <Box sx={{margin:0,padding:0}}>
            {fetchedComments.slice().reverse().map((comment: any, index: number) => (
              <Box sx={{margin:0,padding:0}} key={index}>
                <PostComment comment={comment} />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
