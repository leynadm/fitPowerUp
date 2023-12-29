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
import createUserDoc from "../../utils/accountSetupFunctions/createUserDoc";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import toast from "react-hot-toast";

interface ValidationErrors {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  terms?: string;
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();
  const [agreeTermsAndConditions, setAgreeTermsAndConditions] = useState(false);
  const fullName = name + " "+ surname;


  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateLettersAndNumbers = (input: string) => {
    const regex = /^[A-Za-z0-9]+$/;
    return regex.test(input);
  };

  const validate = (): boolean => {
    const errors: ValidationErrors = {};
    if (!name.trim()) errors.name = "First Name is required";
    if (!surname.trim()) errors.surname = "Last Name is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (!password) errors.password = "Password is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await createUserDoc(user.uid, fullName);
      await sendEmailVerification(user);
    } catch (error) {
      if (isFirebaseError(error)) {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/email-already-in-use":
            toast.error("This email is already in use.");
            break;
          case "auth/invalid-email":
            toast.error("The email address is not valid.");
            break;
          case "auth/operation-not-allowed":
            toast.error("Email/password accounts are not enabled.");
            break;
          case "auth/weak-password":
            toast.error("The password is not strong enough.");
            break;
          case "auth/network-request-failed":
            toast.error("Network error occurred. Please try again.");
            break;
          case "auth/too-many-requests":
            toast.error("Too many requests. Please try again later.");
            break;
          case "auth/user-disabled":
            toast.error("This user account has been disabled.");
            break;
          case "auth/user-not-found":
            toast.error("User not found.");
            break;
          case "auth/wrong-password":
            toast.error("Wrong password. Please try again.");
            break;
          case "auth/internal-error":
            toast.error("An internal error occurred. Please try again.");
            break;
          default:
            toast.error("An unknown error occurred. Please try again.");
            break;
        }
      } else {
        toast.error("An unknown error occurred");
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

  function handleTermsAndConditionsClick() {
    setAgreeTermsAndConditions(!agreeTermsAndConditions);
  }
  return (
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
        <div style={{ minHeight: "15rem", width: "15rem", height: "15rem" }}>
          <img
            style={{
              width: "100%",
              WebkitMaskImage: "linear-gradient(#fff,rgba(255,255,255,1))",
              maskImage: "linear-gradient(#fff,rgba(255,255,255,1))",
            }}
            src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8-posts/o/assets%2Fapp-images%2Fvegeta_sign_up_512%20(1).jpg?alt=media&token=dd6eb535-adb9-4b78-b3b1-31fb4b4e51ae"
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
                error={name !== '' && !validateLettersAndNumbers(name)}
                helperText={name !== '' && !validateLettersAndNumbers(name) ? "Only letters and numbers are allowed." : ""}
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
                error={surname !== '' && !validateLettersAndNumbers(surname)}
        helperText={surname !== '' && !validateLettersAndNumbers(surname) ? "Only letters and numbers are allowed." : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                error={!!validationErrors.email}
                helperText={validationErrors.email}
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
                error={!!validationErrors.password}
                helperText={validationErrors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                onClick={() => navigate("/terms-and-conditions")}
                sx={{
                  textDecoration: "underline",
                }}
              >
                Click here to read the Terms and Conditions
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeTermsAndConditions}
                    value="allowExtraEmails"
                    color="primary"
                  />
                }
                label="Agree with the terms and conditions."
                onClick={handleTermsAndConditionsClick}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="dbz"
            sx={{ mt: 3, mb: 2 }}
            disabled={!agreeTermsAndConditions}
          >
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
    </Container>
  );
}
