import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
function SendFeedback() {
  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
      }}
    >
      <AppBar position="fixed" style={{ top: 0, height: "56px" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <FeedbackIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              Feedback
            </Typography>

            <FeedbackIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

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
                letterSpacing: ".0rem",
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              Feedback
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          If you encounter any issues, or have an idea or suggestion on how to
          improve the app even further, you can send me an email at:<br></br>
          <br></br>
          <a href="mailto: fitpowerupapp@gmail.com">fitpowerupapp@gmail.com</a>
        </Typography>
      </Container>
    </Container>
  );
}

export default SendFeedback;
