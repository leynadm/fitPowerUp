import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressLevel from "./ProgressLevel";
import ProgressPath from "./ProgressPath";
import ProgressFeats from "./ProgressFeats";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ProgressHero from "./ProgressHero";
function Progress() {
  const navigate = useNavigate();

  const handleNavigateTrack = () => {
    navigate("");
  };

  const handleNavigateHistory = () => {
    navigate("path");
  };

  const handleNavigateFeats = () => {
    navigate("feats");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        elevation={3}
        position="fixed"
        style={{
          top: 0,
          height: "56px",
          background:
            "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            {/* 
            <QueryStatsIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            /> */}
            <Typography
              variant="h6"
              noWrap
              component="text"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Progress
            </Typography>
            {/* 
            <QueryStatsIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            /> */}

            <Typography
              variant="h5"
              noWrap
              component="text"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,

                letterSpacing: ".0rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Progress
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <ButtonGroup
        aria-label="outlined button group"
        sx={{ width: "100%" }}
        variant="text"
      >
        <Button
          sx={{
            width:
              "100%" /*  marginTop:"2px",marginLeft:"2px", backgroundColor:"#520975" */,
          }}
          onClick={handleNavigateTrack}
        >
          Level
        </Button>
        <Button
          sx={{
            width: "100%" /*  marginTop:"2px",backgroundColor:"#520975" */,
          }}
          onClick={handleNavigateHistory}
        >
          Path
        </Button>
        <Button
          sx={{
            width:
              "100%" /* marginTop:"2px", marginRight:"2px",backgroundColor:"#520975" */,
          }}
          onClick={handleNavigateFeats}
        >
          Feats
        </Button>
      </ButtonGroup>

      <Routes>
        <Route path="" element={<ProgressLevel />} />
        <Route path="path" element={<ProgressPath />} />
        <Route path="path/hero/:id" element={<ProgressHero />} />
        <Route path="feats" element={<ProgressFeats />} />
      </Routes>
    </Container>
  );
}

export default Progress;
