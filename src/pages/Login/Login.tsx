import React, {useState, ChangeEvent,useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import createFollowersFeedDoc from "../../utils/socialFunctions/createFollowersFeedDoc";
import createNotificationsDoc from "../../utils/socialFunctions/createNotificationsDoc";
import User from "../../utils/interfaces/User";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
  signInAnonymously
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase"
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import createUserDoc from "../../utils/socialFunctions/createUserDoc";
import { AuthContext } from "../../context/Auth";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {/* {"Copyright © "} */}
      <Link color="inherit" href="https://mui.com/">
        Developed by Daniel Matei
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function SignIn() {
  
  const navigate = useNavigate();
  const userAuth = getAuth();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {currentUser, setCurrentUserData} = useContext(AuthContext)

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

    function SignInWithGoogle() {
    
    signInWithPopup(userAuth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log('logging credential')
        console.log(credential)
        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user)
          const newUserCheck = getAdditionalUserInfo(result);
          console.log(newUserCheck)
          console.log('about to create new user:')
          if (newUserCheck?.isNewUser) {
            createUserDoc(user.uid, user.displayName);
            createFollowersFeedDoc(user.uid)
            createNotificationsDoc(user.uid)
          }

          // Query the users collection to retrieve the document with the given userID

          // IdP data available using getAdditionalUserInfo(result)
          // ...
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
        // ...
      });
  }

  function signInAsGuest() {
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }


  function handleLogIn(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('clicking log in:')
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline  />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogIn}
            noValidate
            sx={{ mt: 1 }}
          >

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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,gap:1, backgroundColor:"black" }}
                            
            >
              <LoginIcon sx={{marginRight:"8px"}}/> Sign In
            </Button>

            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mb: 2,gap:1 }}
              onClick={SignInWithGoogle}
              
            >
              <GoogleIcon/>LOG IN WITH GOOGLE
            </Button>

            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mb: 2, color:"black",gap:1}}
              onClick={signInAsGuest}
            >
              <PersonIcon/>LOG IN AS GUEST ONLY
            </Button>

            <Grid container>
              <Grid item xs>
                <Link variant="body2" onClick={handleForgotPasswordClick}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={handleSignUpClick}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
