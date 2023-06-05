import React, {
  useState,
  useRef,
  useContext,
  ChangeEvent,
  useEffect,
} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../context/Auth";
import {
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import uuid from "react-uuid";
import User from "../../utils/interfaces/User";
interface UserProfilePosts {
  editProfileModalOpen: boolean;
  setEditProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};

function EditUserProfileModal({
  editProfileModalOpen,
  setEditProfileModalOpen,
}: UserProfilePosts) {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const handleClose = () => setEditProfileModalOpen(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSource, setFileSource] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState(currentUserData.name);
  const [lastName, setLastName] = useState(currentUserData.surname);
  const [sex, setSex] = useState(currentUserData.sex);
  const [profileImage, setProfileImage] = useState(
    currentUserData.profileImage
  );

  async function getUserData() {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data() as User;
      setFirstName(userData.name);
      setLastName(userData.surname);
      setSex(userData.sex);
      setProfileImage(userData.profileImage);

      currentUserData.name = userData.name;
      currentUserData.surname = userData.surname;
      currentUserData.profileImage = userData.profileImage;
      currentUserData.sex = userData.sex;
      currentUserData.fullname = userData.fullname;
    }
  }

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

  function handleProfilePhotoChange() {
    fileInputRef.current?.click();
  }

  const handleSexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSex(e.target.value);
  };

  async function updateUserData() {
    let imageUrl: string | null = null;
    let imageRef = null;
    console.log("logging selected file:");
    console.log(selectedFile);
    if (selectedFile) {
      imageRef = ref(
        storage,
        `profile-images/${currentUser.uid}/preview/${currentUser.uid}_profile_image_450x450`
      );
      await uploadBytes(imageRef, selectedFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const docRef = doc(db, "users", currentUser.uid);

    await updateDoc(docRef, {
      name: firstName,
      surname: lastName,
      sex: sex,
      fullname: [firstName, lastName, `${firstName} ${lastName}`],
      profileImage: imageUrl,
    });

    getUserData().then(() => {
      handleClose();
    });
  }

  return (
    <div>
      <Modal
        open={editProfileModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {currentUser.isAnonymous === false ? (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Profile
            </Typography>

            <Box sx={{ display: "flex" }}>
              {currentUserData.profileImage !== "" ? (
                <Stack direction="row" spacing={2}>
                  <Avatar
                    alt="Remy Sharp"
                    src={fileSource || currentUserData.profileImage}
                    sx={{ width: 56, height: 56, alignSelf: "center" }}
                  />
                </Stack>
              ) : (
                <Stack direction="row" spacing={2}>
                  <Avatar
                    alt="Remy Sharp"
                    src={fileSource || "/static/images/avatar/1.jpg"}
                    sx={{ width: 56, height: 56, alignSelf: "center" }}
                  />
                </Stack>
              )}

              <Box
                sx={{
                  marginLeft: "8px",
                  marginTop: "8px",
                  marginBottom: "8px",
                  width: "100%",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <Typography
                  sx={{
                    justifySelf: "start",
                    width: "100%",
                    alignSelf: "center",
                    fontSize: "large",
                  }}
                >
                  {currentUserData.fullname[2]}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    width: "100%",
                  }}
                  onClick={handleProfilePhotoChange} // Handle the click event to trigger file input click
                >
                  Change profile photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  hidden
                  onChange={handleFileChange}
                />
              </Box>
            </Box>
            <Box>
              <TextField
                required
                id="filled-required"
                label="First Name"
                value={firstName}
                variant="filled"
                sx={{ width: "100%", marginBottom: "8px" }}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <TextField
                required
                id="filled-required"
                label="Last Name"
                value={lastName}
                variant="filled"
                sx={{ width: "100%", marginBottom: "8px" }}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
            <Box>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  /* 
                defaultValue="male"
                 */
                  name="radio-buttons-group"
                  row
                  onChange={handleSexChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    checked={sex === "female"}
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    checked={sex === "male"}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
              }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
                onClick={updateUserData}
              >
                Save
              </Button>
              <Button
                variant="contained"
                sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box


            sx={style}
          >
            <IconButton>
              <InfoIcon />
              Info
            </IconButton>
            <Typography sx={{ padding: "8px" }}>
              As a guest, you are welcome to use all workout log features, but
              editing the guest profile is restricted.
              <br></br>
              To access your profile features, please create an account or
              authenticate using Google Login.
              <br></br>
              Once authenticated, you can proceed to edit your post.
            </Typography>
          </Box>
          
        )}
      </Modal>
    </div>
  );
}

export default EditUserProfileModal;
