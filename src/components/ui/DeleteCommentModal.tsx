import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import WarningIcon from "@mui/icons-material/Warning";
interface ParentProps {
  deleteCommentModalOpen: boolean;
  setDeleteCommentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteComment:()=>void
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

export default function DeleteCommentModal({
  deleteCommentModalOpen,
  setDeleteCommentModalOpen,
  deleteComment
}: ParentProps) {

  const handleClose = () => setDeleteCommentModalOpen(false);

  return (
    <div>
      <Modal
        open={deleteCommentModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <WarningIcon style={{color:"red"}} /> Warning
          </Typography>
          <Typography align="center" id="modal-modal-description" >
            Are you sure you want to delete this comment?
          </Typography>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              variant="dbz_save"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
                onClick={deleteComment}
            >
              DELETE
            </Button>
            <Button
              variant="dbz_clear"
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
