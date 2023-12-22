import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
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
          <IconButton sx={{ display: "flex", gap: 1 }}>
            <InfoIcon />
            Info
          </IconButton>
          <Typography sx={{ padding: "8px" }}>
            Scalability Testing Limitation.
            <br></br>
            In the spirit of fostering a close community and deeper
            connections, our 'Spotting' feature allows you to follow and stay
            connected with up to 10 fellow warriors.
            <br></br>
            By limiting to 10 'Spotted'
            users, we encourage meaningful interactions and focused support,
            mirroring the close camaraderie seen in the world of Dragon Ball Z.
            <br></br>
            Choose wisely those who inspire and motivate you in your fitness
            journey, and together, push beyond your limits!
            <br></br>
            Thank you!"
          </Typography>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              variant="dbz_mini"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
              onClick={() =>
                setFollowersLimitModalOpen(!followersLimitModalOpen)
              }
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
