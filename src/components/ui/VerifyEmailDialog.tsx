import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ParentProps {
  verifyEmailModalOpen: boolean;
  setVerifyEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VerifyEmailDialog({
  verifyEmailModalOpen,
  setVerifyEmailModalOpen,
}: ParentProps) {
  const handleClose = () => {
    setVerifyEmailModalOpen(false);
  };

  return (
    <div>
      <Dialog
        open={verifyEmailModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Email Verification"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Greetings! 
            <br></br>
            <br></br>
            Ready to go Super Saiyan? 

            <br></br>Well too bad, because before you can do that you need to verify your email. That's the rule.
            <br></br><br></br>
            If you can't find it, check your spam folder. Or you can request another from your account settings.
            <br></br>
            <br></br>
            OK, thanks! Bye!
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Sure, I'll check it</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
