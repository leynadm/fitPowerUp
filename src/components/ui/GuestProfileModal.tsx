import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { auth } from "../../config/firebase";
interface UserWorkoutCardProps {
  guestProfileModalOpen: boolean;
  setGuestProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

export default function GuestProfileModal({
  guestProfileModalOpen,
  setGuestProfileModalOpen,
}: UserWorkoutCardProps) {
  const handleClose = () => setGuestProfileModalOpen(false);

  return (
    <div>
      <Modal
        open={guestProfileModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={{display:"flex", gap:1}}>
            <InfoIcon />
            Info
          </IconButton>
          <Typography sx={{ padding: "8px" }}>
            As a guest, you are welcome to use all workout log features, but
            interacting with authenticated users is restricted.
            <br></br>
            To access your full profile features, please create an account or
            authenticate using Google Login.
            <br></br>
            Once authenticated, you can proceed with all social functionalities.
          </Typography>
        
          <Box
              sx={{
                display: "flex",
              }}
            >
              <Button
                variant="contained"
                sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
                onClick={()=> auth.signOut()}
              >
                Log out
              </Button>
            </Box>        
        </Box>


      </Modal>
    </div>
  );
}
