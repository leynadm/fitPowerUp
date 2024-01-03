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
import LinearWithValueLabel from "../../components/ui/LinearWithValueLabel";
import { storage } from "../../config/firebase";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { filterUserTrainingsPerDay } from "../Workout/CompletedWorkouts";
import { IWorkoutData } from "../../utils/interfaces/IUserTrainingData";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import { useEffect } from "react";
import {
  collection,
  setDoc,
  doc,
  Timestamp,
  serverTimestamp,
  arrayUnion,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import uuid from "react-uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);
  const resizedImgRef = useRef<HTMLImageElement>(null);
  const imgCanvasRef = useRef<HTMLCanvasElement>(null);
  const [resizedImageDataUrl, setResizedImageDataUrl] = useState("");

  const { currentUser, currentUserData } = useContext(AuthContext);

  const { userTrainingData } = useContext(UserTrainingDataContext);

  const [filteredUserTrainingData, setFilteredUserTrainingData] = useState<
    IWorkoutData[]
  >([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (fileSource && imgRef.current) {
      imgRef.current.src = fileSource;

      imgRef.current.onload = () => {
        if (imgRef.current === null) {
          return;
        }

        if (imgCanvasRef.current) {
          const ctx = imgCanvasRef.current.getContext("2d");
          if (ctx) {
            let ratio = 800 / imgRef.current.width;
            imgCanvasRef.current.width = 800;
            imgCanvasRef.current.height = imgRef.current.height * ratio;

            ctx.drawImage(
              imgRef.current,
              0,
              0,
              imgCanvasRef.current.width,
              imgCanvasRef.current.height
            );

            let new_image_url = ctx.canvas.toDataURL("image/jpeg", 0.8);
            setResizedImageDataUrl(new_image_url);

            if (resizedImgRef.current) {
              resizedImgRef.current.src = new_image_url;
            }
          }
        }
      };
    }
  }, [fileSource]); // Only re-run the effect if fileSource chang

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        // Just set the file source state here
        const fileSource = e.target?.result as string;
        setFileSource(fileSource);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
    }
  }

  function dataURLtoBlob(dataurl: string): Blob | null {
    const arr = dataurl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);

    if (!mimeMatch) {
      // No MIME type match found in the data URL
      console.error("Invalid data URL");
      return null;
    }

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
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
      setFilteredUserTrainingData([]);
    }
  };

  async function addPost() {
    if (postText !== "" || resizedImageDataUrl !== "") {
      setSaving(true);

      let uniqueImageId = null;

      if (resizedImageDataUrl) {
        // Convert resized image data URL to a blob
        const resizedImageBlob = dataURLtoBlob(resizedImageDataUrl);

        if (resizedImageBlob) {
          uniqueImageId = uuid(); // Ensure you have a UUID function

          // Define the reference to your storage location
          const imageRef = ref(
            storage,
            `posts/images/${currentUser.uid}/${currentUser.uid}_${uniqueImageId}`
          );

          // Upload the blob to Firebase Storage
          await uploadBytes(imageRef, resizedImageBlob);
        } else {
          console.error("No resized image data URL available.");
        }
      }

      // Create a new document reference for your post
      const newPostRef = doc(collection(db, "posts"));
      const serverTimestampObj = serverTimestamp();
      const timestamp = Timestamp.fromMillis(Date.now());

      // Set the document with your post data
      await setDoc(newPostRef, {
        createdAt: serverTimestampObj,
        postText: postText,
        userId: currentUser.uid,
        postImage: uniqueImageId,
        timestamp: timestamp,
        commentsCount: 0,
        showWorkout: addWorkout,
        workoutData:
          filteredUserTrainingData.length > 0
            ? filteredUserTrainingData[0].wExercises
            : [],
        unitsSystem: currentUserData.unitsSystem,
        documentId: newPostRef.id,
        postAppreciation: [],
      });

      // Update the followers feed with the new post
      const newFollowersFeedRef = doc(
        collection(db, "followers-feed"),
        currentUser.uid
      );
      const recentPosts = {
        postId: newPostRef.id,
        published: timestamp,
        postText: postText,
      };

      await setDoc(
        newFollowersFeedRef,
        {
          lastPost: serverTimestampObj,
          recentPosts: arrayUnion(recentPosts),
        },
        { merge: true }
      );
    }
    setPostText("");
    setSelectedFile(null);
    setFileSource(null);
    setSaving(false);
    handleClose();
    navigate("/home/friends")
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
            </Button>
          </Box>

          <Box>
            <img
              ref={imgRef}
              height="100%"
              width="100%"
              alt=""
              style={{ display: "none" }}
            />
            <canvas ref={imgCanvasRef} style={{ display: "none" }} />
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

          <Box sx={{ display: "flex" }}>
            <Button
              variant="dbz_save"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
              onClick={addPost}
              disabled={!isOnline}
            >
              {isOnline ? "POST" : "Reconnecting..."}
            </Button>
            <Button
              variant="dbz_clear"
              sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
          {saving && (
            <Box
              sx={{
                padding: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LinearWithValueLabel />
            </Box>
          )}

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
