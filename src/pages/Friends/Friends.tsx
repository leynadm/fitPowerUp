import React, {
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import AddContentModal from "./AddContentModal";
import UserProfile from "./UserProfile";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Newsfeed from "./Newsfeed";
import Container from "@mui/material/Container";
import Exercise from "../../utils/interfaces/Exercise";
import SocialSearchBar from "./SocialSearchBar";
import SocialSearchResults from "./SocialSearchResults";
import SearchUserProfile from "./SearchUserProfile";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Account from "./Account";
import Notifications from "./Notifications";
import SearchPost from "./SearchPost";
import { AuthContext } from "../../context/Auth";
import { Toaster } from "react-hot-toast";
import BlockedUsers from "./BlockedUsers";
interface HomeProps {
  existingExercises: { name: string; exercises: Exercise[] }[];
}

function Friends({
  existingExercises
}: HomeProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [notificationsNumber, setNotificationsNumber] = useState(0);

  const { currentUserData } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfile = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("profile");
  };

  const handleAccount = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("account");
  };

  const handleNotifications = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("notifications");
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [addContentModalOpen, setAddContentModalOpen] = useState(false);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleAccount}>Account</MenuItem>
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNotifications}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge variant="dot" badgeContent={notificationsNumber} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleAccount}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <ManageAccountsIcon />
        </IconButton>
        <p>Account</p>
      </MenuItem>

      <MenuItem onClick={handleProfile}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  function handleAddContentModal() {
    setAddContentModalOpen(true);
  }

  if (currentUserData === undefined) {
    return (
      <div>
        We couldn't connect right now, please refresh the app or try later.
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        position="fixed"
        elevation={0}
        style={{ top: 0, width: "100%", height: "56px" }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              color: "#FF8C00",
              fontFamily: "Voltaire",
              display: { xs: "none", sm: "block" },
            }}
          >
            fit<span style={{ color: "white" }}>PowerUp!</span>
          </Typography>

          <SocialSearchBar />

          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={handleAddContentModal}
          >
            <AddIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotifications}
            >
              <NotificationsIcon />
              {/* 
              <Badge badgeContent={17} color="error">
              
              
              </Badge>
               */}
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      {currentUserData.name !== undefined && (
        <AddContentModal
          addContentModalOpen={addContentModalOpen}
          setAddContentModalOpen={setAddContentModalOpen}
          existingExercises={existingExercises}
          unitsSystem={currentUserData.unitsSystem}
        />
      )}

      {/* This is the container that I might have to check if it reached to bottom */}
      <Container sx={{ height: "100%" }}>
        <Routes>
          <Route path="" element={<Newsfeed />} />
          <Route path="results/*" element={<SocialSearchResults />} />
          <Route path="profile/*" element={<UserProfile />} />
          <Route path="results/u/:id/*" element={<SearchUserProfile />} />
          <Route path="posts/p/:id/*" element={<SearchPost />} />
          <Route path="account" element={<Account />} />
          <Route path="account/blocked-users" element={<BlockedUsers />} />
          <Route path="notifications" element={<Notifications />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default Friends;
