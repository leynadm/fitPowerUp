import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 1,
  broderRadius: 1,
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems:"center"
};

function RestTimer() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography sx={{fontSize:"larger"}}>Rest Timer</Typography>
          <Box sx={{ display: "flex", justifyContent:"center", textAlign:"center"}}>
            <Button variant="outlined">
              <RemoveIcon />
            </Button>

            <TextField
              id="filled-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{textAlign:"center"}}
              variant="filled"
            />
            <Button variant="outlined">
              <AddIcon />
            </Button>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="AUTO START"
            />
          </FormGroup>
          <Box sx={{width:"100%"}}>
          <Button
          variant="contained"
          color="success"
          sx={{ width: "100%", margin: "0.25rem" }}
        >
          START
        </Button>

          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default RestTimer;
