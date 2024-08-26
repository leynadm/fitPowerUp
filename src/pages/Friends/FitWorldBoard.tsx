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
    <Box
      sx={{
        pb: "64px",
      }}
    >
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
            height: "calc(100svh - 180px)",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography align="center" fontSize="1.25rem">
            Here you can create your own unique<br></br> Zenkai Challenges!
          </Typography>
          <IconButton
            aria-label="add workout"
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column"
            }}
            onClick={() => navigate("new-z-fighter-challenge")}
          >
            <AddCircleIcon fontSize="medium" />
            <Typography fontSize="1.25rem">Create Zenkai challenge</Typography>
          </IconButton>
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
              height: "calc(100svh - 180px)",
              flexDirection: "column",
              gap: 1,
            }}
          >
            You haven't completed any challenges yet.
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default FitWorldBoard;
