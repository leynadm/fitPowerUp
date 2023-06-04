import React, { useState, useRef } from "react";
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
  const handleClose = () => setEditProfileModalOpen(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileSource, setFileSource] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  return (
    <div>
      <Modal
        open={editProfileModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Profile
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src={fileSource || "/static/images/avatar/1.jpg"} // Render the selected image or the default avatar image
                sx={{ width: 56, height: 56, alignSelf: "center" }}
              />
            </Stack>

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
                Leynad
              </Typography>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white", color: "black", width: "100%" }}
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
              defaultValue="Hello World"
              variant="filled"
              sx={{ width: "100%", marginBottom: "8px" }}
            />

            <TextField
              required
              id="filled-required"
              label="Last Name"
              defaultValue="Hello World"
              variant="filled"
              sx={{ width: "100%", marginBottom: "8px" }}
            />
          </Box>
          <Box>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="male"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
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
      </Modal>
    </div>
  );
}

export default EditUserProfileModal;
