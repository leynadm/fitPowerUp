import React, {
  useContext,
  useState,
  Dispatch,
  useRef,
  SetStateAction,
  ChangeEvent,
} from "react";
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
import { UserTrainingDataContext } from "../../context/UserTrainingData";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import InfoIcon from "@mui/icons-material/Info";
import formatTime from "../../utils/formatTime";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Divider from "@mui/material/Divider";
import CommentIcon from "@mui/icons-material/Comment";
import LinearWithValueLabel from "../../components/ui/LinearWithValueLabel";
import { getApp } from "firebase/app";
import toast from "react-hot-toast";
import Paper from "@mui/material/Paper";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { filterUserTrainingsPerDay } from "../Workout/CompletedWorkouts";
import { IWorkoutData } from "../../utils/interfaces/IUserTrainingData";
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
import { db } from "../../config/firebase";
import uuid from "react-uuid";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import GroupedWorkout from "../../components/ui/GroupedWorkout";

const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  borderRadius: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

interface FriendsProps {
  addContentModalOpen: boolean;
  setAddContentModalOpen: Dispatch<SetStateAction<boolean>>;
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
}: FriendsProps) {
  const [postDate, setPostDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSource, setFileSource] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [postText, setPostText] = useState("");
  const [addWorkout, setAddWorkout] = useState(false);
  const [limitInfo, setLimitInfo] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const firebaseApp = getApp();
  const postsStorage = getStorage(firebaseApp, "gs://fitpowerup-2bbc8-posts");
  const { currentUser, currentUserData } = useContext(AuthContext);

  const { userTrainingData } = useContext(UserTrainingDataContext);

  const [filteredUserTrainingData, setFilteredUserTrainingData] = useState<
    IWorkoutData[]
  >([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fileInputRef = useRef(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
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

  const handleChangeTrainingDate = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    if (event.target.value) {
      filterUserTrainingsPerDay(
        selectedDate,
        userTrainingData,
        setFilteredUserTrainingData
      );
      setExpanded(true);
    } else {
      setExpanded(false);
      setFilteredUserTrainingData([])
    }
  };

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
            toast.error("Oops, we encountered an error! Try again later!");
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
        workoutData: filteredUserTrainingData.length>0?filteredUserTrainingData[0].wExercises:[] ,
        unitsSystem: currentUserData.unitsSystem,
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
        maxWidth="md"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
            },
          },

          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={style}>
          <CardHeader
            avatar={
              <Avatar
                alt="Remy Sharp"
                src={currentUserData.profileImage}
                sx={{ width: 48, height: 48, alignSelf: "center", p: 0, m: 0 }}
              />
            }
            title={`${currentUserData.name} ${currentUserData.surname}`}
            titleTypographyProps={{ variant: "h6", padding: 0, margin: 0 }}
            subheader={postDate.toDateString()}
          />
          <Box position="relative">
            {fileSource && (
              <CardMedia
                component="img"
                height="50%"
                image={fileSource}
                alt="Uploaded image"
                sx={{ borderRadius: 1 }}
              />
            )}

            {fileSource && (
              <IconButton
                onClick={removeFile}
                sx={{
                  position: "absolute",
                  top: 0, // Adjust if necessary
                  right: 0, // Adjust if necessary
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            )}
          </Box>

          <TextField
            id="standard-textarea"
            label="Share your thoughts..."
            multiline
            variant="outlined"
            maxRows={5}
            rows={2}
            inputProps={{ maxLength: 2048 }}
            sx={{ width: "100%", marginTop: "8px" }}
            onChange={(event) => setPostText(event.target.value)}
          />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              component="label"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                justifyContent: "space-between",
                padding: "0",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "8fr 2fr",
                  width: "100%",
                  p: 1,
                  border: "1px black solid",
                }}
              >
                <Typography variant="subtitle2" flexGrow={1}>
                  Add a picture to your post
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-evenly"
                  flexGrow={1}
                >
                  <ImageIcon fontSize="medium" />

                  <input
                    style={{ width: "100%" }}
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    hidden
                    onChange={handleFileChange}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "8fr 2fr",
                  width: "100%",
                  pl: 1,
                  pr: 1,
                  border: "1px black solid",
                }}
              >
                <TextField
                  size="small"
                  type="date"
                  required
                  onChange={handleChangeTrainingDate}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-evenly"
                  flexGrow={1}
                >
                  <FitnessCenterIcon fontSize="medium" />
                </Box>
              </Box>
            </Button>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Button
              variant="dbz_save"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
              onClick={addPost}
            >
              POST
            </Button>
            <Button
              variant="dbz_clear"
              sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
          {saving &&
          <Box
                sx={{
                  padding: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                 <LinearWithValueLabel />
              </Box>}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ p: 0, m: 0 }}>
              <Box>
                {filteredUserTrainingData.length > 0 && (
                  <GroupedWorkout
                    workoutExercises={filteredUserTrainingData[0].wExercises}
                  />
                )}
              </Box>
            </CardContent>
          </Collapse>
        </Box>
      </Dialog>
    </Box>
  );
}

export default AddContentModal;
