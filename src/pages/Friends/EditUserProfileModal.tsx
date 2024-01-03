import React, { useState, useRef, useContext, ChangeEvent } from "react";
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
import { auth } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Switch from "@mui/material/Switch";
import toast from "react-hot-toast";
import LinearWithValueLabel from "../../components/ui/LinearWithValueLabel";
import capitalizeWords from "../../utils/capitalizeWords";
import { useEffect } from "react";

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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSource, setFileSource] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState(currentUserData.name);
  const [lastName, setLastName] = useState(currentUserData.surname);
  const [sex, setSex] = useState(currentUserData.sex);
  const imgRef = useRef<HTMLImageElement>(null);
  const resizedImgRef = useRef<HTMLImageElement>(null);
  const imgCanvasRef = useRef<HTMLCanvasElement>(null);
  const [resizedImageDataUrl, setResizedImageDataUrl] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
            let ratio = 128 / imgRef.current.width;
            imgCanvasRef.current.width = 128;
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

    const fetchImageURL = async () => {
      if (
        currentUserData.profileImage !== "" ||
        currentUserData.profileImage !== null
      ) {
        const exerciseImageRef = ref(
          storage,
          `profile-images/${currentUser.uid}/preview/${currentUser.uid}_profile_image`
        );

        try {
          const url = await getDownloadURL(exerciseImageRef);
          setProfileImageURL(url);
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
  }, [fileSource]); // Only re-run the effect if fileSource chang

  const [saving, setSaving] = useState(false);

  const [hideProfile, setHideProfile] = useState<boolean>(
    currentUserData.hideProfile
  );
  const [hidePowerLevel, setHidePowerLevel] = useState<boolean>(
    currentUserData.hidePowerLevel
  );
  const [hideFollowers, setHideFollowers] = useState<boolean>(
    currentUserData.hideFollowers
  );
  const [hideFollowing, setHideFollowing] = useState<boolean>(
    currentUserData.hideFollowing
  );

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
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

  function handleProfilePhotoChange() {
    fileInputRef.current?.click();
  }

  const handleSexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSex(e.target.value);
  };

  async function updateUserData() {
    if (selectedFile) {
      setSaving(true);

      if (resizedImageDataUrl) {
        // Convert resized image data URL to a blob
        const resizedImageBlob = dataURLtoBlob(resizedImageDataUrl);

        if (resizedImageBlob) {
          // Define the reference to your storage location
          const imageRef = ref(
            storage,
            `profile-images/${currentUser.uid}/preview/${currentUser.uid}_profile_image`
          );
          console.log("inside resized image blob");
          // Upload the blob to Firebase Storage
          await uploadBytes(imageRef, resizedImageBlob);
        } else {
          console.error("No resized image data URL available.");
        }
      }
    }

    console.log(`${currentUser.uid}_profile_image`);
    const docRef = doc(db, "users", currentUser.uid);

    if (selectedFile) {
      await updateDoc(docRef, {
        name: firstName,
        surname: lastName,
        sex: sex,
        fullname: [
          firstName.toLocaleLowerCase(),
          lastName.toLocaleLowerCase(),
          `${firstName.toLocaleLowerCase()} ${lastName.toLocaleLowerCase()}`,
        ],
        profileImage: `${currentUser.uid}_profile_image`,
        hideProfile: hideProfile,
        hidePowerLevel: hidePowerLevel,
        hideFollowers: hideFollowers,
        hideFollowing: hideFollowing,
      });
      toast.success("document updated successfully!");
    } else {
      await updateDoc(docRef, {
        name: firstName,
        surname: lastName,
        sex: sex,
        fullname: [
          firstName.toLocaleLowerCase(),
          lastName.toLocaleLowerCase(),
          `${firstName.toLocaleLowerCase()} ${lastName.toLocaleLowerCase()}`,
        ],
        hideProfile: hideProfile,
        hidePowerLevel: hidePowerLevel,
        hideFollowers: hideFollowers,
        hideFollowing: hideFollowing,
      });
    }

    setSaving(false);
  }

  function hideProfileToggle() {
    setHideProfile((prevHideProfile) => !prevHideProfile);
  }

  function hidePowerLevelToggle() {
    setHidePowerLevel((prevHidePowerLevel) => !prevHidePowerLevel);
  }
  function hideFollowersToggle() {
    setHideFollowers((prevHideFollowers) => !prevHideFollowers);
  }
  function hideFollowingToggle() {
    setHideFollowing((prevHideFollowing) => !prevHideFollowing);
  }

  function handleClose() {
    setSaving(false);
    setEditProfileModalOpen(false);
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
                    src={fileSource || profileImageURL}
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
                  {capitalizeWords(currentUserData.fullname[2])}
                </Typography>
                <Button
                  variant="dbz_mini"
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
            </Box>
            <Box>
              <TextField
                required
                disabled
                id="filled-required"
                label="First Name"
                value={firstName}
                variant="filled"
                sx={{ width: "100%", marginBottom: "8px" }}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <TextField
                required
                disabled
                id="filled-required"
                label="Last Name"
                value={lastName}
                variant="filled"
                sx={{ width: "100%", marginBottom: "8px" }}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>

            <Box>
              <FormControl sx={{ display: "flex", width: "100%" }}>
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
                {/* 
                {noteDisplayStatus && (
                  <Typography sx={{ fontSize: "small", textAlign: "center" }}>
                    Note: Changing the settings below will sign you out. Please
                    log in again to see the updated changes.
                  </Typography>
                )} */}
                <FormControlLabel
                  control={
                    <Switch checked={hideProfile} onClick={hideProfileToggle} />
                  }
                  label="Hide profile from search results"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={hidePowerLevel}
                      onClick={hidePowerLevelToggle}
                    />
                  }
                  label="Hide Power Level"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={hideFollowers}
                      onClick={hideFollowersToggle}
                    />
                  }
                  label="Hide my followers"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={hideFollowing}
                      onClick={hideFollowingToggle}
                    />
                  }
                  label="Hide who I'm following"
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
              }}
            >
              <Button
                variant="dbz_save"
                color="success"
                sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
                onClick={updateUserData}
              >
                Save
              </Button>
              <Button
                variant="dbz_clear"
                sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
            {saving && <LinearWithValueLabel />}
          </Box>
        ) : (
          <Box sx={style}>
            <IconButton>
              <InfoIcon />
              Info
            </IconButton>
            <Typography sx={{ padding: "8px" }}>
              As a guest, you are welcome to use all workout log features, but
              editing the guest profile is restricted.
              <br></br>
              To access your full profile features, please create an account or
              authenticate using Google Login.
              <br></br>
              Once authenticated, you can proceed to edit your post.
            </Typography>

            <Box
              sx={{
                display: "flex",
              }}
            >
              <Button
                variant="contained"
                sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
                onClick={() => auth.signOut()}
              >
                Log out
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
    </div>
  );
}

export default EditUserProfileModal;
