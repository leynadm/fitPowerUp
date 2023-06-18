import './App.css';
import Login from "./pages/Login/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth"
import AuthRoute from './context/AuthRoute';
import SignUp from './pages/Signup/SignUp';
import Home from './pages/Home/Home';
import LandingPage from './pages/Home/LandingPage';
import { IndexedDBProvider } from './context/IndexedDB';
function App() {  

  return (
    <div className="App">
      <AuthProvider>

        <IndexedDBProvider>

        <Router>
          <Routes>

          <Route element={<AuthRoute type="/" />}>
            <Route path="/" element={<LandingPage />} />
            </Route>

{/* 
            <Route path="/" element={<LandingPage/>}/>
 */}
            {/* If the user is signed in and tries to access login, reroute him to home */}
            <Route element={<AuthRoute type="home" />}>
            <Route path="/home/*" element={<Home />} />
            </Route>

            {/* If the user is signed in and tries to access signup, reroute him to home */}
            <Route element={<AuthRoute type="signup" />}>
              <Route element={<SignUp />} path="/signup" />
            </Route>

            {/* If the user isn't signed him, reroute him to login */}
            <Route element={<AuthRoute type="login" />}>
              <Route element={<Login />} path="/login" />
            </Route>
          
          </Routes>
        </Router>
        
        </IndexedDBProvider>
        
        </AuthProvider>

    </div>
  
);
}

export default App;
