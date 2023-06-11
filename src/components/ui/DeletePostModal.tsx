import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import WarningIcon from "@mui/icons-material/Warning";

interface ParentProps {
  deletePostModalOpen: boolean;
  setDeletePostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deletePost:()=>void
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

export default function DeletePostModal({
  deletePostModalOpen,
  setDeletePostModalOpen,
  deletePost
}: ParentProps) {

  const handleClose = () => setDeletePostModalOpen(false);
  

  return (
    <div>
      <Modal
        open={deletePostModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <WarningIcon /> Warning
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You are about to delete your post, which is an irreversible
            action.<br></br> Once the post is deleted, it cannot be recovered.<br></br> Please
            ensure that you want to proceed with deleting your comment before
            taking this action!
          </Typography>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
                onClick={deletePost}
            >
              DELETE
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
