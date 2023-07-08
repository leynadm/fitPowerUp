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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  async function sendEmailReset() {
    await sendPasswordResetEmail(auth, email);
    setIsEmailSent(true);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      {isEmailSent ? ( // Conditional rendering of the Container component
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgotten Password
            </Typography>
            <Typography variant="body2" sx={{padding:"8px"}}>
            An email has been sent to {email}. Please check your inbox, including your spam folder, for instructions on how to reset your password.
            </Typography>
            <Grid container justifyContent="flex-end">
              <Grid item sx={{padding:"8px"}}>
                <Link variant="body2" onClick={handleSignInClick}>
                  Do you remember your password? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgotten Password
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
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
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
    </ThemeProvider>
  );
}
