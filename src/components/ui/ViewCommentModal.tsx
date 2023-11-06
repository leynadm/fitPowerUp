import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

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

interface ParentComponentProps {
  openViewCommentModal: boolean;
  setOpenViewCommentModal: Dispatch<SetStateAction<boolean>>;
  exerciseComment: string;
}

function ViewCommentModal({
  openViewCommentModal,
  setOpenViewCommentModal,
  exerciseComment,
}: ParentComponentProps) {
  const handleClose = () => setOpenViewCommentModal(false);

  return (
    <div>
      <Modal
        open={openViewCommentModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="outlined-multiline-flexible"
            label="You made this comment..."
            multiline
            maxRows={4}
            disabled
            value={exerciseComment}
            sx={{
              width: "100%",
            }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          ></Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ViewCommentModal;
