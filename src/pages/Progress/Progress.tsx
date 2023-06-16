import React,{useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Routes, Route } from "react-router-dom";
import ProgressLevel from "./ProgressLevel";
import ProgressPath from "./ProgressPath";
import ProgressGraph from "./ProgressGraph";
import { useNavigate } from "react-router-dom";

function Progress() {

  const [powerLevel, setPowerLevel] = useState<number>(0);
  const [strengthPowerLevel, setStrengthPowerLevel] = useState<number>(0);
  const [experiencePowerLevel, setExperiencePowerLevel] = useState<number>(0);

  const navigate = useNavigate();

  const handleNavigateLevel = () => {
    navigate("");
  };

  const handleNavigatePath = () => {
    navigate("path");
  };

  const handleNavigateProgressGraph = () => {
    navigate("progress-graph");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height:"100%",
        backgroundColor: "#F0F2F5"
      }}
    >
      <AppBar elevation={0} position="fixed" style={{ top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <QueryStatsIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <QueryStatsIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Progress
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "32px",
          width: "100vw",
          backgroundColor: "#FF8C00",
          borderBottom:"2px black solid"
        }}
      >
        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            width: "100%",
          }}
          onClick={handleNavigateLevel}
        >
          LEVEL
        </Button>

        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            width: "100%",
          }}
          onClick={handleNavigatePath}
        >
          PATH
        </Button>
        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            width: "100%",
          }}
          onClick={handleNavigateProgressGraph}
        >
          GRAPH
        </Button>
      </Box>

      <Routes>
        <Route path="" element={<ProgressLevel powerLevel={powerLevel} setPowerLevel={setPowerLevel} setStrengthPowerLevel={setStrengthPowerLevel} strengthPowerLevel={strengthPowerLevel} experiencePowerLevel={experiencePowerLevel} setExperiencePowerLevel={setExperiencePowerLevel}/>} />
        <Route path="path" element={<ProgressPath powerLevel={powerLevel} setPowerLevel={setPowerLevel} />} />
        <Route path="progress-graph" element={<ProgressGraph />} />
      </Routes>

    </Box>
  );
}

export default Progress;
