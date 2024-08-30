import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import createUserDoc from "../../utils/accountSetupFunctions/createUserDoc";
import toast from "react-hot-toast";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";

function Copyright() {
  const navigate = useNavigate();
  function TermsAndConditionsClick() {
    navigate("/terms-and-conditions");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 2,
        pb: 2,
      }}
    >
      <Typography variant="body2" color="text.primary" align="center">
        {/*         <Link href="https://mateidaniel.com" target="_blank">
          Developed by Daniel Matei {new Date().getFullYear()}
        </Link> */}
      </Typography>

      <Typography
        onClick={TermsAndConditionsClick}
        sx={{
          fontSize: "small",
          marginTop: "1rem",
          textDecoration: "underline",
        }}
      >
        Terms and Conditions Apply
      </Typography>
    </Box>
  );
}

export default function SignIn() {
  const navigate = useNavigate();
  const userAuth = getAuth();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  async function SignInWithGoogle() {
    signInWithPopup(userAuth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          const newUserCheck = getAdditionalUserInfo(result);
          if (newUserCheck?.isNewUser) {
            createUserDoc(user.uid, user.displayName);
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error("Oops, we couldn't log you in. Try again later", errorCode);
        // ...
      });
  }

  function handleLogIn(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/invalid-email"
        ) {
          toast.error(
            "Incorrect email or password. Please try again.",
            errorCode
          );
        } else {
          toast.error(
            "Oops, we couldn't log you in. Try again later.",
            errorCode
          );
        }
      });
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{ minHeight: "17.5rem", width: "17.5rem", height: "17.5rem" }}
        >
          <img
            style={{
              width: "100%",
              WebkitMaskImage: "linear-gradient(#fff,rgba(255,255,255,1))",
              maskImage: "linear-gradient(#fff,rgba(255,255,255,1))",
            }}
            src="/images/dbz-sign-in.webp"
            alt=""
            onClick={() => navigate("/")}
            loading="lazy"
          ></img>
        </div>
        <Typography component="h1" variant="h5" autoFocus>
          Welcome to fitPowerUp!
        </Typography>

        <Box component="form" onSubmit={handleLogIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="dbz"
            sx={{
              mt: 1,
              mb: 2,
              gap: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoginIcon sx={{ marginRight: "8px" }} />
            Sign In
          </Button>

          <Button
            type="button"
            fullWidth
            variant="contained"
            className="secondary-font"
            sx={{
              mb: 2,
              gap: 1,
              fontSize: "1.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={SignInWithGoogle}
          >
            <GoogleIcon fontSize="large" />
            <span style={{ textAlign: "center" }}>LOG IN WITH GOOGLE</span>
          </Button>

          <Grid container>
            <Grid item xs>
              <Link variant="body2" onClick={handleForgotPasswordClick}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" onClick={handleSignUpClick}>
                {"Need an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}
