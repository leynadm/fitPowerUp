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
import MentorsOverview from "./Mentor/MentorsOverview";
import MentorSkillTree from "./Mentor/MentorSkillTree";
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

  const handleNavigateMentor = () => {
    navigate("mentor");
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
        position="fixed"
        style={{
          top: 0,
          height: "56px",
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
                color: "#FFA500",
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
                color: "#FFA500",
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
        sx={{
          width: "100%",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        }}
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

        <Button
          sx={{
            width:
              "100%" /* marginTop:"2px", marginRight:"2px",backgroundColor:"#520975" */,
          }}
          onClick={handleNavigateMentor}
        >
          Mentor
        </Button>
      </ButtonGroup>

      <Routes>
        <Route path="" element={<ProgressLevel />} />
        <Route path="path" element={<ProgressPath />} />
        <Route path="path/hero/:id" element={<ProgressHero />} />
        <Route path="feats" element={<ProgressFeats />} />
        <Route path="mentor" element={<MentorsOverview />} />
        <Route path="mentor/:id" element={<MentorSkillTree />} />
      </Routes>
    </Container>
  );
}

export default Progress;
