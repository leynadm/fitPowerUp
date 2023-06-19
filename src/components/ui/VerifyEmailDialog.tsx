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
          {"Please verify your email"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hey, you should have received an email with a verification link.{" "}
            <br></br>
            <br></br>Please click the link to verify your email and unlock the
            full app experience. If you haven't received the email, please check
            your spam folder or request a new verification email through your
            account settings. <br></br>
            <br></br>Once your email is verified, you'll have access to all the
            app's features and benefits. Thank you!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Sure, I'll check it</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
