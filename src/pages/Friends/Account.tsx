import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../config/firebase";
import EmailIcon from "@mui/icons-material/Email";
import { AuthContext } from "../../context/Auth";
import CheckIcon from "@mui/icons-material/Check";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import toast from "react-hot-toast";
const defaultTheme = createTheme();

export default function Account() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  async function sendVerificationEmail() {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      }
      setIsEmailSent(true);
    } catch (error) {
      // Handle the error here
      console.error("Error sending verification email:", error);
      toast.error("Oops, sendVerificationEmail has an issue!");
      // You can also show a user-friendly error message to the user
      // For example: setErrorState("Failed to send verification email. Please try again later.");
    }
  }

  function handleBlockUsersClick() {
    navigate("blocked-users");
  }

  if (currentUser.emailVerified) {
    return (
      <Box>
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
              <CheckIcon />
            </Avatar>
            <Typography component="h1" variant="h5" textAlign="center">
              Your email was succesfully verified!
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            ></Box>
            <Button
              variant="outlined"
              sx={{ width: "80%" }}
              onClick={handleBlockUsersClick}
            >
              Check Blocked Users
              <RemoveCircleIcon />
            </Button>
          </Box>
        </Container>
      </Box>
    );
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
              <EmailIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Verify your email
            </Typography>
            <Typography variant="body2" sx={{ padding: "8px" }}>
              An email has been sent to your email address. Please check your
              inbox, including your spam folder, for instructions on how verify
              your email.
            </Typography>
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
              <EmailIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Verify your email
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
                    You didn't get your verification email?<br></br> We'll send
                    you another one so you can complete the process. Don't
                    forget to check your spam folder in case the email ends up
                    there.
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
                onClick={sendVerificationEmail}
              >
                Send me the email
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}
