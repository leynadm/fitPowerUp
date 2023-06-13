import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { auth } from "../../config/firebase";
interface UserWorkoutCardProps {
  followersLimitModalOpen: boolean;
  setFollowersLimitModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

export default function FollowersLimitModal({
  followersLimitModalOpen,
  setFollowersLimitModalOpen,
}: UserWorkoutCardProps) {

  const handleClose = () => setFollowersLimitModalOpen(false);

  return (
    <div>
      <Modal
        open={followersLimitModalOpen}
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
          Scalability Testing Limitation. 
            <br></br>
            Please note that for scalability testing reasons, there is a temporary maximum limit of 50 followed users per account. 
            <br></br>
            Thank you for your cooperation and understanding during this phase.<br></br> 
            There will be further updates in order to enhance the platform for a better user experience. 
            <br></br>
            Thank you!"
          </Typography>
        
          <Box
              sx={{
                display: "flex",
              }}
            >
              <Button
                variant="contained"
                sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
                onClick={()=>setFollowersLimitModalOpen(!followersLimitModalOpen)}
              >
                Cancel
              </Button>
            </Box>        
        </Box>


      </Modal>
    </div>
  );
}
