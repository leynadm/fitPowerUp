import React from "react";
import Box from "@mui/material/Box";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CodeIcon from "@mui/icons-material/Code";
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
        position="fixed"
        style={{
          top: 0,
          height: "56px"
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
                color:"#FFA500",
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
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              Development Log
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Typography variant="h5" gutterBottom>
          Development Log
        </Typography>


        <Typography variant="h6">Version 3.0 - Release 30/08/2024</Typography>
        <Typography variant="button">
          - Switched the font to LuckiestGuy
          <br />
          - Overhaul the landing page with new graphics and background image
          <br />
          - Improve the preset workouts implementation and data structure
          <br />
          - Redo the UI implementation across all apps and menus, changing colours and positioning
          <br/>
          - Fix a bug where some dropdowns would have their options hidden when they would have too many items
        </Typography>


        <Typography variant="h6">Version 2.1.0 - Release 30/12/2023</Typography>
        <Typography variant="button">
          - Added a loading spinner when completing a new workout, deleting a
          completed workout, importing or reseting data
          <br />
          - Fixed a bug that wouldn't allow newly created accounts to save their
          power level the same day the account was created
          <br />
          - Fixed a bug that would log out the user upon changing their privacy
          account settings
          <br />
          - Fixed a UI bug on the landing page where images would overlap with
          the 'Get Started' button
          <br />- Improved the layout in the Feats menu, switching the achievement
          boxes to an 'outlined' style
        </Typography>

        <Typography variant="h6">Version 2 - Release 27/12/2023</Typography>
        <Typography variant="button">
          - Moved default data saving to the cloud, so data can persists across
          various supported device.
          <br />
          - Add ability to import fitNotes app for android datasets.
          <br />
          - Provide users with the possibility to preload their own
          routines/workouts, in addition to providing default routines.
          <br />
          - Add the ability to copy a previous workout when starting a new
          session.
          <br />
          - Add a body tracker menu, users can now save various measurements for
          their bodies.
          <br />
          - Add a "feats" menu, where users can unlock various achievements for
          specific gym metrics.
          <br />
          - Add a "path" menu, where users can unlock Dragon Ball Z characters
          for additional motivation.
          <br />
          - Improve the calendar's ease of us.
          <br />
          - Improve the landing page showcasing various app features.
          <br />- Overhaul the UI, add new button styling and theme.
        </Typography>

        <Typography variant="h6">Version 1 - Release 31/06/2023</Typography>
        
        <Typography variant="button">
          - Implement the ability to save exercises and workouts in phone's
          local storage.
          <br />
          - Provide a user profile creation feature, enabling users to build and
          display their social profiles.
          <br />
          - Implement initial feature to highlight exercises when users achieve
          a new personal record (PR).
          <br />- Integrated a power level calculator using the DOTS coefficient
          in powerlifting, allowing users to measure their strength progress.
        </Typography>
      </Box>
    </Container>
  );
}

export default DevelopmentLog;
