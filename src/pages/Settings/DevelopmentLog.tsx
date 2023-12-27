import React from "react";
import Box from "@mui/material/Box";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CodeIcon from '@mui/icons-material/Code';
function DevelopmentLog() {
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
            <CodeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="text"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Development Log
            </Typography>

            <CodeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="text"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,

                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Development Log
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

    <Box pb="56px">
      <Typography variant="h5" gutterBottom>
        Development Log
      </Typography>

      <Typography variant="h6">Version 2 - Release 27/12/2023</Typography>
      <Typography>
        - Moved default data saving to the cloud, so data can persists across various supported device.
      </Typography>
      <Typography>
        - Add ability to import fitNotes app for android datasets.
      </Typography>
      <Typography>
        - Provide users with the possibility to preload their own routines/workouts, in addition to providing default routines.
      </Typography>
      <Typography>
        - Add the ability to copy a previous workout when starting a new session.
      </Typography>
      <Typography>
        - Add a body tracker menu, users can now save various measurements for their bodies.
      </Typography>
      <Typography>
        - Add a "feats" menu, where users can unlock various achievements for specific gym metrics.
      </Typography>
      <Typography>
        - Add a "path" menu, where users can unlock Dragon Ball Z characters for additional motivation.
      </Typography>
      <Typography>
        - Improve the calendar's ease of us.
      </Typography>
      <Typography>
        - Improve the landing page showcasing various app features.
      </Typography>
      <Typography>
        - Overhaul the UI, add new button styling and theme.
      </Typography>
      


      <Typography variant="h6">Version 1 - Release 31/06/2023</Typography>
      <Typography>
        - Implement the ability to save exercises and workouts in phone's local storage.
      </Typography>
      <Typography>
        - Provide a user profile creation feature, enabling users to build and
        display their social profiles.
      </Typography>
      <Typography>
        - Implement initial feature to highlight exercises when users achieve a
        new personal record (PR).
      </Typography>
      <Typography>
        - Integrated a power level calculator using the DOTS coefficient in
        powerlifting, allowing users to measure their strength progress.
      </Typography>


      </Box>
    </Container>
  );
}

export default DevelopmentLog;
