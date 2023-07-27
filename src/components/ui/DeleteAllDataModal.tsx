import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WarningIcon from "@mui/icons-material/Warning";

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
  openDeleteAllData: boolean;
  setOpenDeleteAllData: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteAllEntries: () => void;
}

function DeleteAllDataModal({
  openDeleteAllData,
  setOpenDeleteAllData,
  handleDeleteAllEntries,
}: ParentComponentProps) {
  const handleClose = () => setOpenDeleteAllData(false);

  return (
    <div>
      <Modal
        open={openDeleteAllData}
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
            You are about to delete <strong>ALL</strong> your exercise data!
            <br></br>The data will be exported before being erased, and a file
            will be saved on your device.<br></br>
            Please ensure that you want to proceed with the deletion process
            before taking this action!
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
              onClick={handleDeleteAllEntries}
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

export default DeleteAllDataModal;
