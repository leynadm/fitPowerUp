import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import formatTime from "../../utils/formatTime";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Timestamp, arrayRemove } from "firebase/firestore";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ReplyIcon from "@mui/icons-material/Reply";
import PostComment from "./PostComment";
import getTimeDifference from "../../utils/socialFunctions/getTimeDifference";
import { LazyLoadImage } from "react-lazy-load-image-component";
import uuid from "react-uuid";
import DeletePostModal from "../../components/ui/DeletePostModal";
import { useNavigate } from "react-router-dom";
import GuestProfileModal from "../../components/ui/GuestProfileModal";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
  deleteDoc,
  arrayUnion,
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
  comments: any;
  showWorkout: boolean;
  unitsSystem: string;
  postAppreciation: any;
  documentId: string;
  postUserId: string;
  getUserPosts?: () => void;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface ExpandMoreCommentProps extends IconButtonProps {
  expandComment: boolean;
}
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

export default function UserWorkoutCard({
  postText,
  postImage,
  currentUserDataName,
  workoutData,
  currentUserDataImage,
  postTimestamp,
  postCreatedAt,
  postId,
  showWorkout,
  unitsSystem,
  comments: initialComments,
  postAppreciation,
  documentId,
  postUserId,
  getUserPosts,
}: UserProfileProps) {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [commentExpanded, setCommentExpanded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [repliesLength, setRepliesLength] = useState(0);
  const [deletePostModalOpen, setDeletePostModalOpen] = useState(false);
  const [postDeleteTrigger, setPostDeleteTrigger] = useState(0);
  const [guestProfileModalOpen, setGuestProfileModalOpen] = useState(false);
  const [postAppreciationStatus, setPostAppreciationStatus] = useState(
    postAppreciation.length !== 0
      ? postAppreciation.includes(currentUser.uid)
      : false
  );

  const [postAppreciationNumber, setPostAppreciationNumber] = useState<number>(
    postAppreciation.length !== 0 ? postAppreciation.length : 0
  );

  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentExpandClick = () => {
    if (currentUser.isAnonymous === true) {
      setGuestProfileModalOpen(true);
      return;
    }
    getPostComments();
    setCommentExpanded(!commentExpanded);
  };

  function getPostComments() {
    const postRef = doc(db, "posts", postId);
    const commentsDocRef = doc(collection(postRef, "comments"), "commentDoc");

    getDoc(commentsDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const commentsData = [];

          const commentData = docSnapshot.data();
          for (const field in commentData) {
            const fieldValue = commentData[field];
            commentsData.push(fieldValue);
          }
          commentsData.sort(
            (a, b) => a.timestamp.toMillis() - b.timestamp.toMillis()
          );

          console.log("Comments document data:", commentsData);
          setComments(commentsData);
        } else {
          console.log("Comments document does not exist");
          setComments([]);
        }
      })
      .catch((error) => {
        console.error("Error getting comments document:", error);
        setComments([]);
      });
  }

  function addComment() {
    if (commentText !== "") {
      const postRef = doc(db, "posts", postId);
      const commentsCollectionRef = collection(postRef, "comments");

      const serverTimestampObj = serverTimestamp();
      const timestamp = Timestamp.fromMillis(Date.now());

      const commentId = uuid(); // Generate a unique identifier for the comment

      const commentData = {
        content: commentText,
        userId: currentUser.uid,
        timestamp: timestamp,
        name: currentUserData.name,
        surname: currentUserData.surname,
        profileImage: currentUserData.profileImage,
        commentId: commentId,
      };

      const commentDocRef = doc(commentsCollectionRef, "commentDoc"); // Provide the desired ID for the comment document

      getDoc(commentDocRef)
        .then((doc) => {
          if (doc.exists()) {
            // Comment document already exists, update the document
            return updateDoc(commentDocRef, {
              [commentId]: commentData, // Use the comment ID as the field name within the document
            });
          } else {
            // Comment document doesn't exist, create a new document
            return setDoc(commentDocRef, {
              [commentId]: commentData, // Use the comment ID as the field name within the document
            });
          }
        })
        .then(() => {
          // Comment added successfully
          console.log("Comment added");
          setCommentText(""); // Clear the comment text
          getPostComments();
        })
        .catch((error) => {
          // Error occurred while adding comment
          console.error("Error adding comment:", error);
        });
    }
  }

  async function deletePost() {
    try {
      const postRef = doc(db, "posts", postId);
      await deleteDoc(postRef);
      setPostDeleteTrigger((prevTrigger) => prevTrigger + 1);
      navigate("/home");
      console.log("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  function handleDeletePostClick() {
    setDeletePostModalOpen(!deletePostModalOpen);
  }

  function appreciatePost() {
    const postRef = doc(db, "posts", postId);

    if (postAppreciationStatus) {
      updateDoc(postRef, {
        postAppreciation: arrayRemove(currentUser.uid),
      })
        .then(() => {
          setPostAppreciationStatus(!postAppreciationStatus);
          setPostAppreciationNumber((prevNumber) => prevNumber - 1);

          console.log("Post not appreciated");
        })
        .catch((error) => {
          console.error("Error appreciating post:", error);
        });
    } else {
      updateDoc(postRef, {
        postAppreciation: arrayUnion(currentUser.uid),
      })
        .then(() => {
          setPostAppreciationStatus(!postAppreciationStatus);
          setPostAppreciationNumber((prevNumber) => prevNumber + 1);
          console.log("Post appreciated");
        })
        .catch((error) => {
          console.error("Error appreciating post:", error);
        });
    }
    // Add the current user's UID to the "appreciations" array in the Firestore document
  }

  return (
    <div>
      <GuestProfileModal
        guestProfileModalOpen={guestProfileModalOpen}
        setGuestProfileModalOpen={setGuestProfileModalOpen}
      />
      <Card sx={{ width: "100%", marginBottom: "16px" }}>
        <DeletePostModal
          deletePostModalOpen={deletePostModalOpen}
          setDeletePostModalOpen={setDeletePostModalOpen}
          deletePost={deletePost}
        />
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" sx={{ bgcolor: "white" }}>
              {currentUserDataImage ? (
                <LazyLoadImage
                  src={currentUserDataImage}
                  alt="user image"
                  effect="blur" // optional blur effect, you can remove it if not needed
                  style={{ width: "100%", height: "100%" }} // match the LazyLoadImage size to the Avatar
                />
              ) : (
                // Placeholder avatar content if currentUserDataImage is not available
                <Stack direction="row" spacing={2}>
                <Avatar
                  alt="Remy Sharp"
                  
                  sx={{ width: 42, height: 42, alignSelf: "center" }}
                /> 
              </Stack>
              )}
            </Avatar>
          }
          action={
            postUserId === currentUser.uid && (
              <IconButton aria-label="settings" onClick={handleDeletePostClick}>
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            <Link
              to={`/home/friends/results/u/${postUserId}`}
              style={{ textDecoration: "none",color:"black",fontWeight:"bolder" }}
            >
              {currentUserDataName}
            </Link>
          }
          subheader={getTimeDifference(postCreatedAt)}
        />

        {postImage !== null && (
          <LazyLoadImage
            src={postImage}
            alt="post image"
            effect="blur" // optional blur effect, you can remove it if not needed
            style={{ width: "100%", height: "100%" }}
            wrapperProps={{ style: { width: "100%", height: "100%" } }}
          />
        )}

        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line" }}
          >
            {postText}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={appreciatePost}
            style={{ color: postAppreciationStatus ? "red" : undefined }}
          >
            <FavoriteIcon />
          </IconButton>
          {postAppreciation && ( // Add conditional check
            <Typography>{postAppreciationNumber}</Typography>
          )}

          <ExpandMoreComment
            expandComment={commentExpanded}
            onClick={handleCommentExpandClick}
            aria-expanded={commentExpanded}
            aria-label="show more"
          >
            <InsertCommentIcon />
          </ExpandMoreComment>

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
              {showWorkout &&
                workoutData
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
                                <EmojiEventsIcon
                                  sx={{ opacity: 0, zIndex: 0 }}
                                />
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

            <Box sx={{ margin: 0, padding: 0 }}>
              {comments &&
                comments
                  .slice()
                  .reverse()
                  .map((comment: any, index: number) => (
                    <Box sx={{ margin: 0, padding: 0 }} key={index}>
                      <PostComment
                        comment={comment}
                        commentIndex={index}
                        postId={postId}
                        commentId={comment.commentId}
                        getPostComments={getPostComments}
                        postUserId={postUserId}
                      />
                    </Box>
                  ))}
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
