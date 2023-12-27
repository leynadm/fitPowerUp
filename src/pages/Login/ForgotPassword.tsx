import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import toast from "react-hot-toast";
// TODO remove, this demo shouldn't need to reset the theme.

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  async function sendEmailReset() {
    try {
      await sendPasswordResetEmail(auth, email);
      setIsEmailSent(true);
    } catch (error) {
      toast.error("Oops, sendEmailReset has an issue!");
      // Handle the error here
      console.error("Error sending password reset email:", error);
      // You can also show a user-friendly error message to the user
      // For example: setErrorState("Failed to send password reset email. Please try again later.");
    }
  }

  return (
    <>
      {isEmailSent ? ( // Conditional rendering of the Container component
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{ minHeight: "15rem", width: "15rem", height: "15rem" }}
            >
              <img
                style={{
                  width: "100%",
                  WebkitMaskImage: "linear-gradient(#fff,rgba(255,255,255,1))",
                  maskImage: "linear-gradient(#fff,rgba(255,255,255,1))",
                }}
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8-posts/o/assets%2Fapp-images%2Fvegeta_register_512x512.png?alt=media&token=0ff23098-7abc-4160-8683-a25b6fbc73f0&_gl=1*1f4jiyl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODMyNjQyNC45My4xLjE2OTgzMjg0ODAuMzMuMC4w"
                alt=""
                loading="lazy"
              ></img>
            </div>
            <Typography component="h1" variant="h5">
              Forgotten Password
            </Typography>
            <Typography
              variant="body2"
              sx={{ padding: "8px", textAlign: "center" }}
            >
              An email has been sent to {email}. Please check your inbox,
              including your spam folder, for instructions on how to reset your
              password.
            </Typography>
            <Grid container justifyContent="flex-end">
              <Grid item sx={{ padding: "8px" }}>
                <Link variant="body2" onClick={handleSignInClick}>
                  Do you remember your password? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      ) : (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{ minHeight: "15rem", width: "15rem", height: "15rem" }}
            >
              <img
                style={{
                  width: "100%",
                  WebkitMaskImage: "linear-gradient(#fff,rgba(255,255,255,1))",
                  maskImage: "linear-gradient(#fff,rgba(255,255,255,1))",
                }}
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8-posts/o/assets%2Fapp-images%2Fnew-password.jpeg?alt=media&token=82a007d6-1a60-49da-9bfd-3fcf22f92acb"
                alt=""
                loading="lazy"
              ></img>
            </div>

            <Typography component="h1" variant="h5">
              Reset your password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    Lost your password?<br></br> Please enter your email
                    address. You will receive a link to create a new password
                    via email.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="dbz"
                sx={{ mt: 3, mb: 2 }}
                onClick={sendEmailReset}
              >
                Reset Password
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link variant="body2" onClick={handleSignInClick}>
                    Remember your password? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
