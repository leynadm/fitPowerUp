import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
function Progress() {
  return (
    <Box  sx={{display: "grid", gridTemplateRows: "auto 1fr", height: "100vh"}}>
    <AppBar elevation={0} position="fixed" style={{ top: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <QueryStatsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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

          <QueryStatsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

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
    
    <Box sx={{ overflow: "auto" }}>
        <Typography sx={{alignSelf:"center",justifySelf:"center"}}>My text</Typography>
    </Box>
    
    
    </Box>
  );
}

export default Progress;
