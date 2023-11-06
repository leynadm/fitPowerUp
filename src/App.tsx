import "./App.css";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import AuthRoute from "./context/AuthRoute";
import SignUp from "./pages/Signup/SignUp";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/Home/LandingPage";
import React, { useState } from "react";
import ForgotPassword from "./pages/Login/ForgotPassword";
import TermsAndConditions from "./pages/Login/TermsAndConditions";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dbz: true;
    dbz_save:true;
    dbz_clear:true
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsVariantOverrides {
    dbz: true;
  }
}

function App() {
  const [sessionVerificationEmailCheck, setSessionVerificationEmailCheck] =
    useState(true);

    let DBZTheme = createTheme({
    
      components:{
        MuiButton:{
          variants:[
            {
              props:{variant:'dbz'},
              style:{
                backgroundColor: '#FFA500',
                border: '2px solid #422800',
                borderRadius: '30px',
                boxShadow: '4px 4px 0 0 #422800',
                color: '#422800',
                cursor: 'pointer',
                display: 'inline-block',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '0 18px',
                lineHeight: '50px',
                textAlign: 'center',
                textDecoration: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                touchAction: 'manipulation',
                
                '&:hover': {
                  backgroundColor: '#520975',
                  color:"#FFFFFF"
                },
                '&:active': {
                  boxShadow: '2px 2px 0 0 #422800',
                  transform: 'translate(2px, 2px)',
                },
              }
            },
            {
              props:{variant:'dbz_save'},
              style:{
                backgroundColor: '#228B22',
                border: '2px solid #422800',
                borderRadius: '30px',
                boxShadow: '4px 4px 0 0 #422800',
                color: 'white',
                cursor: 'pointer',
                display: 'inline-block',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '0 8px',
                textAlign: 'center',
                textDecoration: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                touchAction: 'manipulation',
                
                '&:hover': {
                  backgroundColor: '#520975',
                  color:"#FFFFFF"
                },
                '&:active': {
                  boxShadow: '2px 2px 0 0 #422800',
                  transform: 'translate(2px, 2px)',
                },
              }
            },
            {
              props:{variant:'dbz_clear'},
              style:{
                backgroundColor: '#808080',
                border: '2px solid #422800',
                borderRadius: '30px',
                boxShadow: '4px 4px 0 0 #422800',
                color: 'white',
                cursor: 'pointer',
                display: 'inline-block',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '0 8px',
                textAlign: 'center',
                textDecoration: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                touchAction: 'manipulation',
                
                '&:hover': {
                  backgroundColor: '#ff0000',
                  color:"#FFFFFF"
                },
                '&:active': {
                  boxShadow: '2px 2px 0 0 #422800',
                  transform: 'translate(2px, 2px)',
                },
              }
            },
          ]
        },
        MuiTextField:{
          styleOverrides:{
            root: {
              '& label.Mui-focused': {
                color: '#520975',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#520975',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#520975',
                },
                '&:hover fieldset': {
                  borderColor: '#520975',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#520975',
                },
              },
            }
            }
        }     
      },
    
      palette: {
        primary: {
          main: "#000000",
        },
        secondary: {
          main: "#808080",
        },
        
        success: {
          main: "#FF8C00",
        },
      },
      
      typography: {  
        
        button: {
          // Here is where you can customise the button
          fontWeight: "bold"
        },
        fontFamily:"Kanit"
      },
  
      shape: {},
    });

  return (
    <ThemeProvider theme={DBZTheme}>
<div className="App">

    <Toaster position="top-center" />

      <AuthProvider>

          <Router>
            <Routes>
              {/* If the user is signed in and tries to access signup, reroute him to home */}
              <Route element={<AuthRoute type="signup" />}>
                <Route element={<SignUp />} path="/signup" />
              </Route>

              {/* If the user isn't signed him, reroute him to login */}
              <Route element={<AuthRoute type="login" />}>
                <Route element={<Login />} path="/login" />
              </Route>

              <Route element={<ForgotPassword />} path="/forgot-password" />

              <Route
                element={<TermsAndConditions />}
                path="/terms-and-conditions"
              />

              {/* If the user is signed in and tries to access login, reroute him to home */}
              <Route element={<AuthRoute type="home" />}>
                <Route
                  path="/home/*"
                  element={
                    <Home
                      sessionVerificationEmailCheck={
                        sessionVerificationEmailCheck
                      }
                      setSessionVerificationEmailCheck={
                        setSessionVerificationEmailCheck
                      }
                    />
                  }
                />
              </Route>

              <Route element={<AuthRoute type="/" />}>
                <Route path="/" element={<LandingPage />} />
              </Route>
            </Routes>
          </Router>

      </AuthProvider>
    </div>
    </ThemeProvider>
  );
}

export default App;
