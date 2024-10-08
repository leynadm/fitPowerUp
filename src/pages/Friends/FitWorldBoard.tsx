import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, MouseEvent, useContext } from "react";
import { UserChallengesContext } from "../../context/UserChallenges";
import IChallengeObj from "../../utils/interfaces/IChallengeObj";
import ActiveChallengeCard from "./ActiveChallengeCard";
import CompleteChallenges from "./CompleteChallenges";
import { Button } from "@mui/material";
function FitWorldBoard() {
  const [selectedZenkai, setSelectedZenkai] = useState("in progress"); // default value
  const { userChallengesData } = useContext(UserChallengesContext);
  const navigate = useNavigate();

  const activeZenkaiChallenge = getActiveZenkaiChallenge();
  const completeZenkaiChallenges = getCompleteZenkaiChallenges();
  const handleZenkai = (
    event: MouseEvent<HTMLElement>,
    newCategory: string | null
  ) => {
    if (newCategory === "in progress") {
      setSelectedZenkai(newCategory || "complete"); // default to 'routines' for example
    } else if (newCategory === "complete") {
      setSelectedZenkai(newCategory || "in progress"); // default to 'routines' for example
    }
  };

  function getActiveZenkaiChallenge() {
    if (userChallengesData.length > 0) {
      const activeZenkaiChallenge = userChallengesData.filter(
        (zenkaiChallenge: IChallengeObj) =>
          zenkaiChallenge.status === "in progress"
      );

      if (activeZenkaiChallenge.length > 0) {
        return activeZenkaiChallenge[0];
      } else {
        return false;
      }
    }
  }

  function getCompleteZenkaiChallenges() {
    if (userChallengesData.length > 0) {
      const completeZenakiChallenges = userChallengesData.filter(
        (zenkaiChallenge: IChallengeObj) =>
          zenkaiChallenge.status === "complete"
      );

      if (completeZenakiChallenges.length > 0) {
        return completeZenakiChallenges;
      } else {
        return false;
      }
    }
  }

  return (
    <Box height="100%">
      <ToggleButtonGroup
        value={selectedZenkai}
        onChange={handleZenkai}
        aria-label="text alignment"
        sx={{ p: 1 }}
        fullWidth
        size="small"
        exclusive
      >
        <ToggleButton value="in progress" aria-label="left aligned" fullWidth>
          In progress
        </ToggleButton>
        <ToggleButton value="complete" aria-label="centered" fullWidth>
          Complete
        </ToggleButton>
      </ToggleButtonGroup>

      {activeZenkaiChallenge && selectedZenkai === "in progress" ? (
        <ActiveChallengeCard activeChallenge={activeZenkaiChallenge} />
      ) : !activeZenkaiChallenge && selectedZenkai === "in progress" ? (
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography align="center" fontSize="1.25rem">
            Here you can create your own unique<br></br> Zenkai Challenges!
          </Typography>
          <Button
      variant="outlined"
      startIcon={<AddCircleIcon fontSize="large"  sx={{color:"#FFA500"}} />}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textTransform: "none", // Prevents button text from being uppercase
        mb: 2,
      }}
      onClick={() => navigate("new-z-fighter-challenge")}
    >
      <Typography fontSize="1.25rem" color="text.secondary">Create Zenkai challenge</Typography>
    </Button>
        </Box>
      ) : null}

      <Box>
        {completeZenkaiChallenges && selectedZenkai === "complete" ? (
          <CompleteChallenges completeChallenges={completeZenkaiChallenges} />
        ) : !completeZenkaiChallenges && selectedZenkai === "complete" ? (
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
              height:"calc(100svh - 200px)"
            }}
          >
            <Typography color="text.secondary">
            You haven't completed any challenges yet.
            </Typography>

          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default FitWorldBoard;
