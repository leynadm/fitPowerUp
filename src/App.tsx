import "./App.css";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import AuthRoute from "./context/AuthRoute";
import SignUp from "./pages/Signup/SignUp";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/Home/LandingPage";
import { IndexedDBProvider } from "./context/IndexedDB";
import React, { useState } from "react";
import ForgotPassword from "./pages/Login/ForgotPassword";
import TermsAndConditions from "./pages/Login/TermsAndConditions";
import { Toaster } from "react-hot-toast";

function App() {
  const [sessionVerificationEmailCheck, setSessionVerificationEmailCheck] =
    useState(true);

  return (
    <div className="App">

    <Toaster position="top-center" />

      <AuthProvider>
        <IndexedDBProvider>
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
        </IndexedDBProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
