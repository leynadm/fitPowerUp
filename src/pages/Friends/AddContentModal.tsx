import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red, blue } from "@mui/material/colors";
import { AuthContext } from "../../context/Auth";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import genericImage from "../../assets/generic.jpeg";
import ImageIcon from "@mui/icons-material/Image";
import CardContent from "@mui/material/CardContent";

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  borderRadius: 1,
};

interface FriendsProps {
  addContentModalOpen: boolean;
  setAddContentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddContentModal({
  addContentModalOpen,
  setAddContentModalOpen,
}: FriendsProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setAddContentModalOpen(false);
  const handleClose = () => setAddContentModalOpen(false);
  const currentUser = useContext(AuthContext);
  const [postDate, setPostDate] = useState(new Date())
  return (
    <div>
      <Modal
        open={addContentModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "100%" }}
      >
        <Box sx={style}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe"></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader={postDate.toDateString()}
          />
          <Box
            sx={{
              height: "150px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: 1,
              borderRadius: 1,
            }}
          >
            <IconButton aria-label="settings">
              <ImageIcon />
            </IconButton>
          </Box>

          {/* 
          <CardMedia
            component="img"
            height="194"
            image={genericImage}
            alt="Paella dish"
            sx={{ borderRadius: 1 }}
          /> */}
          <TextField
            id="standard-textarea"
            label="Share your thoughts..."
            multiline
            variant="standard"
            rows={2}
            sx={{ width: "100%", marginTop: "8px" }}
          />
          <FormControl component="fieldset" >
            <FormGroup aria-label="position" >
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Add Power Level"
                labelPlacement="end"
                
              />
            <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Add workout"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
            >
              POST
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddContentModal;
