import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  p: 2,
};

interface ParentComponentProps {
  openViewCommentModal: boolean;
  setOpenViewCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  exerciseCommentId: number;
}

function ViewCommentModal({
  openViewCommentModal,
  setOpenViewCommentModal,
  exerciseCommentId,
}: ParentComponentProps) {
  useEffect(() => {
    getComment()
  }, [openViewCommentModal]);

  const handleClose = () => setOpenViewCommentModal(false);
  const [commentText, setCommentText] = useState<string>("");

  function getComment() {
    // Open IndexedDB database connection
    const request = window.indexedDB.open("fitScouterDb");

    request.onsuccess = function (event: any) {
      const db = event.target.result;

      // Open transaction to access the object store
      const transaction = db.transaction(["user-exercises-entries"], "readonly");
      const objectStore = transaction.objectStore("user-exercises-entries");

      // Get the comment based on exerciseCommentId
      const getRequest = objectStore.get(exerciseCommentId);
      getRequest.onsuccess = function (event: any) {
        const comment = event.target.result?.comment || "";
        setCommentText(comment);
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

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
            label="Add your comment"
            multiline
            maxRows={4}
            disabled
            value={commentText}
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
