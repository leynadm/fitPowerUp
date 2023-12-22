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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import User from "../../utils/interfaces/User";
import Switch from "@mui/material/Switch";
import toast from "react-hot-toast";
import LinearWithValueLabel from "../../components/ui/LinearWithValueLabel";
import capitalizeWords from "../../utils/capitalizeWords";
interface UserProfilePosts {
  editProfileModalOpen: boolean;
  setEditProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateCount: React.Dispatch<React.SetStateAction<number>>;
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
  setUpdateCount,
}: UserProfilePosts) {
  const { currentUser, currentUserData, setCurrentUserData } =
    useContext(AuthContext);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSource, setFileSource] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState(currentUserData.name);
  const [lastName, setLastName] = useState(currentUserData.surname);
  const [sex, setSex] = useState(currentUserData.sex);
  /* 
    const [powerLevel,setPowerLevel] = useState(currentUserData.powerLevel)
    const [strengthLevel, setStrengthLevel] = useState(currentUserData.strengthLevel)
    const [experienceLevel, setExperienceLevel] = useState(currentUserData.experienceLevel)
    const [firstPowerExercise, setFirstPowerExercise] = useState(currentUserData.firstPowerExercise)
    const [secondPowerExercise, setSecondPowerExercise] = useState(currentUserData.secondPowerExercise)
    const [thirdPowerExercise, setThirdPowerExercise] = useState(currentUserData.thirdPowerExercise)
    const [weight,setWeight] = useState(currentUserData.weight)
  */
  const [profileImageURL, setProfileImageURL] = useState("");
  const [saving, setSaving] = useState(false);

  const [profileImage, setProfileImage] = useState(
    currentUserData.profileImage
  );
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
      currentUserData.powerLevel = userData.powerLevel;
      currentUserData.strengthLevel = userData.strengthLevel;
      currentUserData.experienceLevel = userData.experienceLevel;
      currentUserData.firstPowerExercise = userData.firstPowerExercise;
      currentUserData.secondPowerExercise = userData.secondPowerExercise;
      currentUserData.thirdPowerExercise = userData.thirdPowerExercise;
      currentUserData.weight = userData.weight;

      const profileImageRef = ref(
        storage,
        `profile-images/${currentUser.uid}/preview/${currentUser.uid}_profile_image_128x128`
      );

      try {
        const retrievedProfileImageURL = await getDownloadURL(profileImageRef);
        setProfileImageURL(retrievedProfileImageURL);
      } catch (error) {
        toast.error("Oops, getUserData has an error!")
        console.error("Error fetching profile image:", error);
        if (userData.profileImage) {
          setProfileImageURL(userData.profileImage);
        }
      }
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
    let imageUrlResized: string | null = null;

    if (selectedFile) {
      setSaving(true);
      imageRef = ref(
        storage,
        `profile-images/${currentUser.uid}/preview/${currentUser.uid}_profile_image`
      );

      await uploadBytes(imageRef, selectedFile);
      imageUrl = await getDownloadURL(imageRef);

      const imageRefResized = ref(
        storage,
        `profile-images/${currentUser.uid}/preview/${currentUser.uid}_profile_image_128x128`
      );
      try {
        imageUrlResized = await getDownloadURL(imageRefResized);
        setCurrentUserData((prevData: any) => ({
          ...prevData,
          profileImage: imageUrlResized,
        }));
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

    // Check if any of the hide options have been changed
    const hideOptionsChanged =
      hideProfile !== currentUserData.hideProfile ||
      hidePowerLevel !== currentUserData.hidePowerLevel ||
      hideFollowers !== currentUserData.hideFollowers ||
      hideFollowing !== currentUserData.hideFollowing;

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

        profileImage: imageUrlResized,

        hideProfile: hideProfile,
        hidePowerLevel: hidePowerLevel,
        hideFollowers: hideFollowers,
        hideFollowing: hideFollowing,
      });
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

    // If hide options changed, show the note and log out the user
    if (hideOptionsChanged) {

      auth.signOut();

      return;
    }

    getUserData().then(() => {
      handleClose();
    });

    setUpdateCount((prevCount) => prevCount + 1);

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
