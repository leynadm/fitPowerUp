import React, { useState, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import formatTime from "../../utils/formatTime";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Timestamp, deleteField } from "firebase/firestore";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ReplyIcon from "@mui/icons-material/Reply";
import PostComment from "./PostComment";
import getTimeDifference from "../../utils/socialFunctions/getTimeDifference";
import uuid from "react-uuid";
import DeletePostModal from "../../components/ui/DeletePostModal";
import GuestProfileModal from "../../components/ui/GuestProfileModal";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import addNotificationEntry from "../../utils/socialFunctions/addNotificationEntry";
import VerifiedIcon from "@mui/icons-material/Verified";
import toast from "react-hot-toast";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from '@mui/material/Skeleton';
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
  deleteDoc,
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
  userVerified: boolean;
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
  userVerified,
}: UserProfileProps) {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [commentExpanded, setCommentExpanded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [checkCommentsExist, setCheckCommentsExist] = useState("");
  const [deletePostModalOpen, setDeletePostModalOpen] = useState(false);
  const [postDeleteTrigger, setPostDeleteTrigger] = useState(0);
  const [guestProfileModalOpen, setGuestProfileModalOpen] = useState(false);
  const [postAppreciations, setPostAppreciations] = useState<any>([]);
  const [postAppreciationsNumber, setPostAppreciationsNumber] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [postAppreciationStatus, setPostAppreciationStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPostAppreciations();
    checkIfPostHasComments();

    const fetchImageURL = async () => {
      if (postImage !== null) {
        const exerciseImageRef = ref(
          storage,
          `posts/images/${postUserId}/${postUserId}_${postImage}`
        );

        try {
          const url = await getDownloadURL(exerciseImageRef);
          setImageURL(url);
        } catch (error) {
          //toast.error("Oops, there was an error fetching the image!");
          console.error("Error fetching image:", error);
        } finally {
          setIsLoading(false); // Stop loading whether there was an error or not
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchImageURL();
  }, []);

  async function checkIfPostHasComments() {
    const postRef = doc(db, "posts", postId);
    const commentsDocRef = doc(collection(postRef, "comments"), "commentDoc");

    try {
      const commentsSnapshot = await getDoc(commentsDocRef);

      if (commentsSnapshot.exists()) {
        const commentsData = commentsSnapshot.data();

        if (commentsData && Object.keys(commentsData).length > 0) {
          setCheckCommentsExist("See comments...");
        } else {
          setCheckCommentsExist("0 Comments");
        }
      } else {
        setCheckCommentsExist("0 Comments");
      }
    } catch (error) {
      toast.error("Oops, checkIfPostHasComments has an error!");
      console.error("Error checking for comments:", error);
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function getPostAppreciations() {
    const postRef = doc(db, "posts", postId);
    const appreciationsDocRef = doc(
      collection(postRef, "appreciations"),
      "appreciationsDoc"
    );

    getDoc(appreciationsDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const appreciationsData = [];
          let appreciationsCounter = 0;
          const appreciationData = docSnapshot.data();

          for (const field in appreciationData) {
            const fieldValue = appreciationData[field];
            appreciationsData.push(fieldValue);
            appreciationsCounter = +1;

            if (field === currentUser.uid) {
              setPostAppreciationStatus(true);
            }
          }
          appreciationsData.sort(
            (a, b) => a.timestamp.toMillis() - b.timestamp.toMillis()
          );
          setPostAppreciationsNumber(appreciationsCounter);
          setPostAppreciations(appreciationsData);
        } else {
          setPostAppreciations([]);
        }
      })
      .catch((error) => {
        toast.error("There was an error getting the appreciations...");
        console.error("Error getting appreciations document:", error);
        setPostAppreciations([]);
      });
  }

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

          setComments(commentsData);
        } else {
          setComments([]);
        }
      })
      .catch((error) => {
        toast.error("There was an error getting the comments...");
        console.error("Error getting comments document:", error);
        setComments([]);
      });
  }

  function addComment() {
    if (currentUser.isAnonymous === true) {
      setGuestProfileModalOpen(true);
      return;
    }

    if (currentUser.emailVerified === false) {
      toast("You need to verify your email first!");
      return;
    }

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
      const action = "added a new comment to your post!";
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
          setCommentText(""); // Clear the comment text
          getPostComments();
          if (postUserId !== currentUser.uid) {
            addNotificationEntry(
              postUserId,
              action,
              currentUser.uid,
              currentUserData.name,
              currentUserData.surname,
              postId,
              currentUserData.profileImage
            );
          }
        })
        .catch((error) => {
          // Error occurred while adding comment
          toast.error("There was an error adding your comment...");
          console.error("Error adding comment:", error);
        });
    }
  }

  async function deleteFollowersFeedEntry() {
    try {
      // Remove the object from the recentPosts array in the followers collection
      const followersRef = doc(db, "followers-feed", currentUser.uid);
      const followersDoc = await getDoc(followersRef);
      if (followersDoc.exists()) {
        const followersData = followersDoc.data();
        const recentPosts = followersData.recentPosts;

        // Filter out the object with the matching postId
        const updatedPosts = recentPosts.filter(
          (post: any) => post.postId !== postId
        );
        // Update the followers collection document with the modified recentPosts array
        await updateDoc(followersRef, { recentPosts: updatedPosts });
      }
    } catch (error) {
      toast.error("Oops, deleteFollowersFeedEntry has an error!");
      // Handle the error here
      console.error("Error deleting followers feed entry:", error);
      // You can also show a user-friendly error message to the user
      // For example: setErrorState("Failed to delete entry. Please try again later.");
    }
  }

  async function deletePost() {
    await deleteFollowersFeedEntry();

    try {

      const postRef = doc(db, "posts", postId);
      await deleteDoc(postRef);
      setPostDeleteTrigger((prevTrigger) => prevTrigger + 1);

      //navigate("/home/friends");
      setDeletePostModalOpen(false);
      toast.success("Your post was successfully deleted!");
    } catch (error) {
      toast.error("There was an error deleting the post...");
      console.error("Error deleting post:", error);
    }
  }

  function handleDeletePostClick() {
    setDeletePostModalOpen(!deletePostModalOpen);
  }

  function removePostAppreciation() {
    if (currentUser.isAnonymous === true) {
      setGuestProfileModalOpen(true);
      return;
    }

    const postRef = doc(db, "posts", postId);
    const apprecationsCollectionRef = collection(postRef, "appreciations");

    const serverTimestampObj = serverTimestamp();
    const timestamp = Timestamp.fromMillis(Date.now());

    const appreciationId = currentUser.uid; // Generate a unique identifier for the appreciation

    const appreciationsDocRef = doc(
      apprecationsCollectionRef,
      "appreciationsDoc"
    ); // Provide the desired ID for the appreciation document

    updateDoc(appreciationsDocRef, {
      [appreciationId]: deleteField(),
    })
      .then(() => {
        setPostAppreciationsNumber(postAppreciationsNumber - 1);
        setPostAppreciationStatus(false);
      })
      .catch((error) => {
        // Handle the error here
        toast.error("We couldn't remove the appreciation...");
        console.error("Error removing post appreciation:", error);
        // You can also show a user-friendly error message to the user
        // For example: setErrorState("Failed to remove appreciation. Please try again later.");
      });
  }

  function appreciatePost() {
    if (currentUser.isAnonymous === true) {
      setGuestProfileModalOpen(true);
      return;
    }

    if (currentUser.emailVerified === false) {
      toast("You need to verify your email first!");
      return;
    }

    const postRef = doc(db, "posts", postId);
    const apprecationsCollectionRef = collection(postRef, "appreciations");

    const serverTimestampObj = serverTimestamp();
    const timestamp = Timestamp.fromMillis(Date.now());

    const appreciationId = currentUser.uid; // Generate a unique identifier for the comment

    const appreciationData = {
      userId: currentUser.uid,
      timestamp: timestamp,
      name: currentUserData.name,
      surname: currentUserData.surname,
      profileImage: currentUserData.profileImage,
    };

    const appreciationsDocRef = doc(
      apprecationsCollectionRef,
      "appreciationsDoc"
    ); // Provide the desired ID for the comment document

    getDoc(appreciationsDocRef)
      .then((doc) => {
        if (doc.exists()) {
          // Comment document already exists, update the document
          setPostAppreciationsNumber(postAppreciationsNumber + 1);
          setPostAppreciationStatus(true);
          return updateDoc(appreciationsDocRef, {
            [appreciationId]: appreciationData, // Use the comment ID as the field name within the document
          });
        } else {
          setPostAppreciationsNumber(postAppreciationsNumber + 1);
          setPostAppreciationStatus(true);
          // Comment document doesn't exist, create a new document
          return setDoc(appreciationsDocRef, {
            [appreciationId]: appreciationData, // Use the comment ID as the field name within the document
          });
        }
      })
      .catch((error) => {
        // Error occurred while adding comment
        toast.error("There was an error adding your comment...");
        console.error("Error adding comment:", error);
      });
  }

  function handlePostAppreciation() {
    if (postAppreciationStatus) {
      removePostAppreciation();
    } else {
      appreciatePost();
    }
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
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="profile"
                src={currentUserDataImage}
                sx={{ width: 48, height: 48 }}
              />
            </Stack>
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
              style={{ textDecoration: "none", color: "black" }}
            >
              <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                {currentUserDataName}
                {userVerified && (
                  <VerifiedIcon
                    sx={{ color: "#3f51b5", width: "1rem", height: "1rem" }}
                  />
                )}
              </Box>
            </Link>
          }
          subheader={getTimeDifference(postCreatedAt)}
        />
        <Box >
          {postImage !== null && isLoading  ? (
              <Stack spacing={1} height="100%" width="100%">
              <Skeleton variant="rounded" width="auto" height="350px" />
            </Stack>
          
          ) : postImage !== null && isLoading === false ? (
          <Box height="100%" width="100%" minHeight="350px">
          <img
            src={imageURL}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
          ) : null}
        </Box>
        <CardContent>
          <Typography

            variant="secondary" fontWeight={500}
            color="text.secondary"
            
            sx={{ whiteSpace: "pre-line" }}
          >
            {postText}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handlePostAppreciation}
            style={{ color: postAppreciationStatus ? "red" : undefined }}
          >
            <FavoriteIcon />
          </IconButton>
          {postAppreciation && ( // Add conditional check
            <Typography>{postAppreciationsNumber}</Typography>
          )}

          <ExpandMoreComment
            expandComment={commentExpanded}
            onClick={handleCommentExpandClick}
            aria-expanded={commentExpanded}
            aria-label="show more"
          >
            <InsertCommentIcon />
          </ExpandMoreComment>

          <Typography sx={{ fontSize: "small" }}>
            {checkCommentsExist}
          </Typography>

          <ExpandMore
            expand={expanded}
            onClick={
              workoutData.length > 0 && showWorkout
                ? handleExpandClick
                : undefined
            }
            aria-expanded={expanded}
            aria-label="show more"
          >
            {workoutData.length > 0 && showWorkout ? (
              <FitnessCenterIcon />
            ) : (
              <FitnessCenterIcon sx={{ opacity: "25%", color: "gray" }} />
            )}
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider sx={{ width: "100%" }} />
          <CardContent sx={{}}>
            <Box sx={{}}>
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
                        marginTop: "8px",
                        marginBottom: "16px",
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
                              padding: "0",
                              margin: "0",
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
                                borderLeft: exercise.dropset
                                  ? "5px solid red"
                                  : "5px solid transparent",
                              }}
                            >
                              {exercise.weight !== 0 && (
                                <Typography sx={{ fontSize: "small" }}>
                                  {`${exercise.weight.toFixed(2)} ${
                                    unitsSystem === "metric" ? "kg" : "lbs"
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
                className="dbz-subvariant"
                size="small"
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
