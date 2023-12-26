import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import createFollowersFeedDoc from "../../utils/socialFunctions/createFollowersFeedDoc";
import createUserDoc from "../../utils/accountSetupFunctions/createUserDoc";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import toast from "react-hot-toast";
import { setDoc, doc, arrayUnion } from "firebase/firestore";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();

  const fullName = name+surname
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await createUserDoc(user.uid,fullName)

      await sendEmailVerification(user);
    } catch (error) {
      toast.error("Oops, handleSignUp has an error!")
      if (isFirebaseError(error)) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Oops, handleSignUp has an error!")
      } else {
        toast.error("An unknown error occurred")
      }
    }
  };

  function isFirebaseError(
    error: unknown
  ): error is { code: string; message: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      "message" in error &&
      typeof (error as any).code === "string" &&
      typeof (error as any).message === "string"
    );
  }

  return (
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
        <div style={{ minHeight: "15rem", width: "15rem", height: "15rem" }}>
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
          Sign up to join!
        </Typography>
        <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setSurname(e.target.value)}
              />
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Agree with the terms and conditions."
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="dbz" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={handleLoginClick}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* 
        <Copyright sx={{ mt: 5 }} />
         */}
    </Container>
  );
}
