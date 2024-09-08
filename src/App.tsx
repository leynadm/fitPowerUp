import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import AuthRoute from "./context/AuthRoute";
import SignUp from "./pages/Signup/SignUp";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/Home/LandingPage";
import ForgotPassword from "./pages/Login/ForgotPassword";
import TermsAndConditions from "./pages/Login/TermsAndConditions";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CustomThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <CustomThemeProvider>
    <ThemeProvider theme={theme}>
      <div className="App">
        <Toaster
          toastOptions={{
            style: {
              fontFamily: "LuckiestGuy",
              textAlign: "center",
            },
          }}
          position="top-center"
        />
        <AuthProvider>
          <Router>
            <Routes>
              <Route element={<AuthRoute type="signup" />}>
                <Route element={<SignUp />} path="/signup" />
              </Route>
              <Route element={<AuthRoute type="login" />}>
                <Route element={<Login />} path="/login" />
              </Route>
              <Route element={<ForgotPassword />} path="/forgot-password" />
              <Route
                element={<TermsAndConditions />}
                path="/terms-and-conditions"
              />
              <Route element={<AuthRoute type="home" />}>
                <Route index path="/home/*" element={<Home />} />
              </Route>
              <Route element={<AuthRoute type="/" />}>
                <Route path="/" element={<LandingPage />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </ThemeProvider>
    </CustomThemeProvider>
  );
}

export default App;
