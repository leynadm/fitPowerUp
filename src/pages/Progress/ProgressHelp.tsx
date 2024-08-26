import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { ReactComponent as StrengthIcon } from "../../assets/strength.svg";
import { ReactComponent as ExperienceIcon } from "../../assets/gym.svg";
import { ReactComponent as PowerLevelIcon } from "../../assets/powerlevel.svg";
import Box from "@mui/material/Box";
function ProgressHelp() {
  return (
    <Container
      sx={{
        width: "100%",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "56px",
      }}
    >
      <Typography sx={{ textAlign: "center", marginTop: "1rem" }}>
        The flavour of fitPowerUp is its Dragon Ball Z inspired progress system.
      </Typography>
      <br></br>
      <Typography sx={{ textAlign: "center" }}>
        Get started by selecting three different exercises you excel at the
        most, like the Deadlift, Squat, and Bench.
      </Typography>
      <br></br>
      <Typography sx={{ textAlign: "center" }}>
        Using the trusted DOTS coefficient for powerlifting, the app will crunch
        the numbers and reveal your power level. Based on your results, you'll
        then be matched with a Dragon Ball Z character who shares your strength.
      </Typography>
      <br></br>
      <Typography sx={{ textAlign: "center" }}>
        You'll discover 3 values:
      </Typography>
      <br></br>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <PowerLevelIcon width="1.5rem" height="1.5rem" />
        <Typography >Power Level:</Typography>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        The sum of your experience level and pure strength level, showcasing
        your overall fitness prowess.
      </Typography>
      <br></br>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <StrengthIcon width="1rem" height="1rem" />
        <Typography >
          Pure Strength Level:
        </Typography>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        Calculated using the DOTS function, representing your raw physical
        strength based on specific exercises and weight.
      </Typography>
      <br></br>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <ExperienceIcon width="1rem" height="1rem" />
        <Typography >Experience Level:</Typography>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        Tracks your dedication and consistency by counting the total logged
        workouts in the app.
      </Typography>
      <br></br>

      <Typography sx={{ textAlign: "center", marginBottom: "1rem" }}>
        Keep in mind that every workout you complete, regardless of strength
        gains, will contribute to progressing your power level, so you should
        calculate your power level after each workout!<br></br> Each session
        earns you valuable experience points that accumulate over time,
        reflecting your dedication and commitment to becoming a true fitness
        warrior. <br></br>
        <br></br>Keep pushing forward, and watch your power level soar as you
        journey towards greatness!
      </Typography>
    </Container>
  );
}

export default ProgressHelp;
