import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { UserPresetWorkoutsDataContext } from "../../../context/UserPresetWorkouts";
import { useContext, useState } from "react";
import IPresetWorkoutData from "../../../utils/interfaces/IPresetWorkoutsData";
import WorkoutCard from "./WorkoutCard";
import IconButton from "@mui/material/IconButton";
import DeleteRoutineOrWorkoutModal from "../../../components/ui/DeleteRoutineOrWorkoutModal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useLocation, useNavigate } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { TextField } from "@mui/material";

function RoutineCardDetails() {
  const location = useLocation();

  const routine = location.state.routine;

  const navigate = useNavigate();

  const { presetWorkoutsData } = useContext(UserPresetWorkoutsDataContext);

  const [openDeleteRoutineOrWorkoutModal, setOpenDeleteRoutineOrWorkoutModal] =
    useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DeleteRoutineOrWorkoutModal
        openDeleteRoutineOrWorkoutModal={openDeleteRoutineOrWorkoutModal}
        setOpenDeleteRoutineOrWorkoutModal={setOpenDeleteRoutineOrWorkoutModal}
        routineOrWorkout="routine"
        presetWorkoutData={presetWorkoutsData}
        routineOrWorkoutName={routine.rName}
        isValid={false}
      />

      <Box position="fixed" sx={{ width: "100%", zIndex: 1 }}>
        <AppBar
          elevation={2}
          style={{
            top: 0,
            width: "100%",
            height: "56px",
            background:
              "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
          }}
        >
          <Container maxWidth="md">
            <Toolbar disableGutters>
              {/* 
              <FormatListNumberedIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              /> */}

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Routine Details
              </Typography>
              {/* 
              <FormatListNumberedIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              /> */}

              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Routine Details
              </Typography>

              {/* {!individualRoutineIsEmptyCheck &&
                routineData.routineDetails &&
                routineData.routineDetails.delete && (
                  <Box sx={{ flexGrow: 1, display: "flex" }}>
                    <Box sx={{ marginLeft: "auto" }}>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleDeleteRoutineOrWorkoutModal}
                      >
                        <DeleteForeverIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Box>
                  </Box>
                )} */}

              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() =>
                    navigate("new-preset-workout", { state: { routine } })
                  }
                >
                  <AddOutlinedIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Typography fontSize={24} textAlign="center">
        {routine.rName}
      </Typography>
      <Typography fontSize={18} textAlign="right">
        {routine.rBy}
      </Typography>
      <TextField
        variant="outlined"
        disabled
        value={routine.rDesc}
        size="small"
      />
     {/*  {true && (
        <Box>
          <Box width="100%" display="flex" overflow="auto" p={1}>
            <ToggleButtonGroup
              value={true}
              exclusive
              onChange={() => console.log("yes")}
              aria-label="text alignment"
            >
              <ToggleButton
                fullWidth
                value="left"
                aria-label="left aligned"
                size="small"
                sx={{ whiteSpace: "nowrap" }}
              >
                WeeK 12
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box display="flex" flexDirection="column" gap={1} pb="64px">
            {presetWorkoutsData.length > 0 &&
              routine.rWorkouts.map(
                (workout: IPresetWorkoutData, index: number) => (
                  <WorkoutCard key={index} workoutData={workout} />
                )
              )}

            {routine && routine.rLink !== "" && (
              <Box>
                <Typography variant="caption">Routine Description</Typography>
                <Typography variant="body2">{routine.rDesc}</Typography>
              </Box>
            )}

            {routine && routine.rLink !== "" && (
              <Box>
                <Typography variant="caption">Link Reference</Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  width="100%"
                  sx={{ wordWrap: "break-word" }}
                >
                  <a
                    href={routine.rLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {routine.rLink}
                  </a>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )} */}


      
    </Box>
  );
}

export default RoutineCardDetails;
