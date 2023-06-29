import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { AuthContext } from "../../context/Auth";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import ImageIcon from "@mui/icons-material/Image";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import InfoIcon from "@mui/icons-material/Info";
import Exercise from "../../utils/interfaces/Exercise";
import formatTime from "../../utils/formatTime";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Divider from "@mui/material/Divider";
import CommentIcon from "@mui/icons-material/Comment";
import LinearWithValueLabel from "../../components/ui/LinearWithValueLabel";
import { getApp } from "firebase/app";
import CircularIndeterminate from "../../components/ui/CircularIndeterminate";
import {
  collection,
  setDoc,
  doc,
  Timestamp,
  serverTimestamp,
  arrayUnion,
  updateDoc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import uuid from "react-uuid";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  borderRadius: 1,
  width: "100%",
};

interface FriendsProps {
  addContentModalOpen: boolean;
  setAddContentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  existingExercises: { name: string; exercises: Exercise[] }[];
  unitsSystem: string;
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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

function AddContentModal({
  addContentModalOpen,
  setAddContentModalOpen,
  existingExercises,
  unitsSystem,
}: FriendsProps) {
  const [postDate, setPostDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSource, setFileSource] = useState<string | null>(null);
  const [expanded, setExpanded] = React.useState(false);
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [postText, setPostText] = useState("");
  const [addWorkout, setAddWorkout] = useState(false);
  const [limitInfo, setLimitInfo] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const firebaseApp = getApp();
  const postsStorage = getStorage(firebaseApp, "gs://fitpowerup-2bbc8-posts");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const fileSource = e.target?.result as string;
        setFileSource(fileSource);
      };
    }
  }

  async function checkUserPosts() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("userId", "==", currentUser.uid),
      where("createdAt", ">=", Timestamp.fromDate(today))
    );

    const querySnapshot = await getDocs(q);
    const postCount = querySnapshot.size;

    return postCount >= 3;
  }

  function handleClose() {
    setSaving(false);
    setAddContentModalOpen(false);
  }

  async function addPost() {
    const hasThreePosts = await checkUserPosts();
    if (hasThreePosts) {
      setLimitInfo(
        "You've reach the current daily limit of 3 new posts a day. "
      );
      return;
    }

    if (postText !== "" || fileSource !== "") {
      setSaving(true);
      let imageUrl = null;
      let imageRef = null;
      let imageUrlResized = null;
      const uniqueImageId = uuid();
      if (selectedFile) {
        imageRef = ref(
          postsStorage,
          `images/${currentUser.uid}/preview/${currentUser.uid}_${uniqueImageId}`
        );
        await uploadBytes(imageRef, selectedFile);
      
      
        imageUrl = await getDownloadURL(imageRef);
        
         const imageRefResized = ref(
          postsStorage,
          `images/${currentUser.uid}/preview/${currentUser.uid}_${uniqueImageId}_1024x1024`
        );

        try {
          imageUrlResized = await getDownloadURL(imageRefResized);
        } catch (error) {
          console.error("Error fetching resized image:", error);

          // Retry logic
          let retryAttempts = 9;
          while (retryAttempts > 0) {
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds

            try {
              imageUrlResized = await getDownloadURL(imageRefResized);
              break; // If successful, break out of the loop
            } catch (error) {
              console.error("Error fetching resized image after retry:", error);
              retryAttempts--;
            }
          }

          if (retryAttempts === 0) {
            console.error("Retries exhausted. Unable to fetch resized image.");
            // Handle the error and display an error message to the user
          }
        }

      }

      const newPostRef = doc(collection(db, "posts"));

      const serverTimestampObj = serverTimestamp();
      const timestamp = Timestamp.fromMillis(Date.now());

      await setDoc(newPostRef, {
        createdAt: serverTimestampObj,
        postText: postText,
        userId: currentUser.uid,
        postImage: imageUrlResized, 
        timestamp: timestamp,
        commentsCount: 0,
        showWorkout: addWorkout,
        workoutData: existingExercises,
        unitsSystem: unitsSystem,
        documentId: newPostRef.id,
        postAppreciation: [],
      });

      const newFollowersFeedRef = doc(
        collection(db, "followers-feed"),
        currentUser.uid
      );

      const followersFeedDoc = await getDoc(newFollowersFeedRef);

      const recentPosts = {
        postId: newPostRef.id,
        published: timestamp,
        postText: postText,
      };

      if (!followersFeedDoc.exists()) {
        // create the document if it doesn't exist
        await setDoc(newFollowersFeedRef, {
          lastPost: serverTimestampObj,
          recentPosts: arrayUnion(recentPosts),
          users: [],
        });
      } else {
        await updateDoc(newFollowersFeedRef, {
          lastPost: serverTimestampObj,
          recentPosts: arrayUnion(recentPosts),
        });
      }
    }
    setPostText("");
    setSelectedFile(null);
    setFileSource(null);
    setSaving(false);
    handleClose();
    navigate("profile");
  }

  function removeFile() {
    setSelectedFile(null);
    setFileSource(null);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Dialog
        open={addContentModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth
        sx={{
          height: "100%",
          paddingBottom: "56px",
          marginBottom: "56px",
        }}
      >
        {currentUser.isAnonymous === false ? (
          <Box sx={style}>
            <CardHeader
              avatar={
                <Avatar
                  alt="Remy Sharp"
                  src={currentUserData.profileImage}
                  sx={{ width: 48, height: 48, alignSelf: "center" }}
                />
              }
              title={currentUserData.fullname[2]}
              titleTypographyProps={{ variant: "h6", padding: 0, margin: 0 }}
              subheader={postDate.toDateString()}
            />

            {fileSource && (
              <CardMedia
                component="img"
                height="50%"
                image={fileSource}
                alt="Uploaded image"
                sx={{ borderRadius: 1 }}
              />
            )}

            <TextField
              id="standard-textarea"
              label="Share your thoughts..."
              multiline
              variant="filled"
              rows={2}
              sx={{ width: "100%", marginTop: "8px" }}
              onChange={(event) => setPostText(event.target.value)}
            />

            <Box
              sx={{
                width: "100%",
                display: "flex",
                paddingLeft: "0",
                paddingTop: "8px",
                paddingBottom: "8px",
              }}
            >
              <Button
                component="label"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0",
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <ImageIcon sx={{ margin: 0, padding: 0 }} />
                  <p>Add a photo to your post</p>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    hidden
                    onChange={handleFileChange}
                  />
                </Box>
              </Button>

              <Box>
                {fileSource && (
                  <IconButton onClick={removeFile}>
                    <DeleteForeverIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box>
              <FormControl component="fieldset">
                <FormGroup
                  aria-label="position"
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="end"
                    control={
                      <Checkbox
                        value={addWorkout}
                        onChange={() => setAddWorkout(!addWorkout)}
                      />
                    }
                    label="Show workout in post"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                color="success"
                sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
                onClick={addPost}
              >
                POST
              </Button>
              <Button
                variant="contained"
                sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
            <Box
              sx={{ padding: "8px", display: "flex", justifyContent: "center" }}
            >
              {saving && <LinearWithValueLabel/>}
            </Box>
            <Typography
              sx={{
                fontSize: "small",
                textAlign: "center",
                paddingTop: "0.25rem",
              }}
            >
              {limitInfo}
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Box>
                  {existingExercises
                    /* 
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              ) */
                    .map((group, index) => (
                      <Box
                        key={index}
                        sx={{
                          borderRadius: "4px",
                          boxShadow: 1,
                          margin: "16px",
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
                        {group.exercises.map((exercise, exerciseIndex) => (
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
                        ))}
                      </Box>
                    ))}
                </Box>
              </CardContent>
            </Collapse>
          </Box>
        ) : (
          <Box
            sx={{
              style,
            }}
          >
            <IconButton>
              <InfoIcon />
              Info
            </IconButton>
            <Typography sx={{ padding: "8px" }}>
              As a guest, you are welcome to use all workout log features, but
              posting is restricted.
              <br></br>
              To access posting capabilities, please create an account or
              authenticate using Google Login.
              <br></br>
              Once authenticated, you can proceed to create a post.
            </Typography>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}

export default AddContentModal;
