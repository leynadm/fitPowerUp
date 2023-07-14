import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

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
  openCommentModal: boolean;
  setOpenCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDropset: boolean;
  setIsDropset: React.Dispatch<React.SetStateAction<boolean>>;
  commentValue: string;
  setCommentValue: React.Dispatch<React.SetStateAction<string>>;
  exerciseCommentId: number;
  setDropsetRenderTrigger: React.Dispatch<React.SetStateAction<number>>;
}

function CommentModal({
  openCommentModal,
  setOpenCommentModal,
  commentValue,
  setCommentValue,
  exerciseCommentId,
  isDropset,
  setIsDropset,
  setDropsetRenderTrigger,
}: ParentComponentProps) {


  function handleClose() {
    setCommentValue("");
    setOpenCommentModal(false);
  }

  function saveComment() {
    const request = window.indexedDB.open("fitScouterDb");
    request.onsuccess = function (event: any) {
      const db = event.target.result;
      const transaction = db.transaction("user-exercises-entries", "readwrite");
      const objectStore = transaction.objectStore("user-exercises-entries");

      const getRequest = objectStore.get(exerciseCommentId);

      getRequest.onsuccess = function (event: any) {
        const data = event.target.result;
        if (data) {
          data.comment = commentValue;
          data.dropset = isDropset;
          const updateRequest = objectStore.put(data);
          updateRequest.onsuccess = function () {
            console.log("Record updated successfully");
          };
          updateRequest.onerror = function () {
            console.log("Error updating record");
          };
        } else {
          console.log("Record not found");
        }
      };

      transaction.oncomplete = function () {
        console.log("Transaction completed");
        setCommentValue("");
        setOpenCommentModal(false);
      };
      transaction.onerror = function () {
        console.log("Transaction error");
      };
    };

    request.onerror = function () {
      console.log("Error opening database");
    };

    setDropsetRenderTrigger((prev) => prev + 1);
  }

  function markEntryAsDropset() {
    setIsDropset(!isDropset);
  }

  return (
    <div>
      <Modal
        open={openCommentModal}
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
            sx={{
              width: "100%",
            }}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />

          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Add the entry as a dropset"
            checked={isDropset}
            onClick={markEntryAsDropset}
          />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
              onClick={saveComment}
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

export default CommentModal;
