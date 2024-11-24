import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IChallengeObj from "../../utils/interfaces/IChallengeObj";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { IUpdatedUserExercisesLibrary } from "./CreateFitWorlGoal";
import { LinearProgressWithLabel } from "./ActiveChallengeCard";
import Divider from "@mui/material/Divider";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import formatTime from "../../utils/formatTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import deleteChallenge from "../../utils/socialFunctions/zenkaiChallenges/deleteChallenge";
import { UserChallengesContext } from "../../context/UserChallenges";
import toast from "react-hot-toast";
function CompleteChallengeCard({
  completeChallengeEntry,
}: {
  completeChallengeEntry: IChallengeObj;
}) {
  const {currentUser, currentUserData } = useContext(AuthContext);
  const {userChallengesData,refetchUserChallengesData} = useContext(UserChallengesContext)
  const normaliseWorkouts = (value: number) =>
    ((value - 0) * 100) /
    (completeChallengeEntry.goals.saiyanTrainingSchedule
      .targetNumberOfWorkouts -
      0);

  const calculateTotalDays = (endDate: string, startDate: string) => {
    const end = new Date(endDate);
    const start = new Date(startDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  };

  const totalDays = calculateTotalDays(
    completeChallengeEntry.endDate,
    completeChallengeEntry.startDate
  );

  const normaliseCalories = (value: number) =>
    ((value - 0) * 100) / (totalDays - 0);

  const normaliseSleepHours = (value: number) =>
    ((value - 0) * 100) / (totalDays - 0);

    async function handleDeleteChallenge() {
      await deleteChallenge(
        currentUser.uid,
        userChallengesData,
        completeChallengeEntry.id
      );
      await refetchUserChallengesData();
      toast.success("Challenge successfully deleted!");
    }

  return (
    <Paper
      sx={{
        padding: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
        width: "100%",
      }}
      variant="outlined"
    >
      <Typography variant="h6" color="#1c4595" align="center">
        {completeChallengeEntry.name}
      </Typography>
      <Typography variant="caption" fontSize="1rem" color="text.secondary" align="left" width="100%">
        Your Challenge Interval
      </Typography>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
      >
        <Box display="flex" gap={1} justifyContent="center" alignItems="center">
          <EventAvailableIcon />
          <Typography> {completeChallengeEntry.startDate}</Typography>
        </Box>
        <Box display="flex" gap={1} justifyContent="center" alignItems="center">
          <EventBusyIcon />
          <Typography> {completeChallengeEntry.endDate}</Typography>
        </Box>
      </Box>

      <Typography variant="caption" fontSize="1rem" color="text.secondary" align="left" width="100%">
        Your Challenge Final Result
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        width="100%"
      >
        <Typography variant="h6" align="center" width="100%">
          {`${completeChallengeEntry.finalResult} / ${completeChallengeEntry.totalChallenges}`}
        </Typography>
      </Box>

      <Typography variant="caption" fontSize="1rem" color="text.secondary" align="left" width="100%">
        Your Chosen Challenges
      </Typography>

      <Box width="100%" display="flex" flexDirection="column">
        {completeChallengeEntry.goals.saiyanTrainingSchedule.isActive && (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="overline" fontSize="1rem">
              Workouts Objective:{" "}
              {
                completeChallengeEntry.goals.saiyanTrainingSchedule
                  .targetNumberOfWorkouts
              }{" "}
              workouts
            </Typography>
            {completeChallengeEntry.goals.saiyanTrainingSchedule
              .resultStatus === "success" ? (
              <CheckCircleIcon fontSize="small" />
            ) : (
              <DisabledByDefaultIcon fontSize="small" />
            )}
          </Box>
        )}
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel
            value={normaliseWorkouts(
              completeChallengeEntry.goals.saiyanTrainingSchedule
                .daysTargetReached
            )}
          />
        </Box>
      </Box>

      <Box width="100%" display="flex" flexDirection="column">
        {completeChallengeEntry.goals.majinMetabolism.isActive && (
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="overline">
                Daily Caloric Objective:{" "}
                {completeChallengeEntry.goals.majinMetabolism.dailyCalorieGoal}{" "}
                kcal
              </Typography>
              {completeChallengeEntry.goals.majinMetabolism.resultStatus ===
              "success" ? (
                <CheckCircleIcon fontSize="small" />
              ) : (
                <DisabledByDefaultIcon fontSize="small" />
              )}
            </Box>
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel
                value={normaliseCalories(
                  completeChallengeEntry.goals.majinMetabolism.daysGoalReached
                )}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Box width="100%" display="flex" flexDirection="column">
        {completeChallengeEntry.goals.namekianNightRest.isActive && (
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="overline">
                Daily Sleep Hours Objective:{" "}
                {completeChallengeEntry.goals.namekianNightRest.targetHours}{" "}
                HOURS
              </Typography>
              {completeChallengeEntry.goals.namekianNightRest.resultStatus ===
              "success" ? (
                <CheckCircleIcon fontSize="small" />
              ) : (
                <DisabledByDefaultIcon fontSize="small" />
              )}
            </Box>

            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel
                value={normaliseSleepHours(
                  completeChallengeEntry.goals.namekianNightRest.daysGoalReached
                )}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Box width="100%">
        {completeChallengeEntry.goals.gravityChamberGains.isActive && (
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="overline" fontSize="1rem" align="left">
                Your Exercises Objectives
              </Typography>
              {completeChallengeEntry.goals.gravityChamberGains.resultStatus ===
              "success" ? (
                <CheckCircleIcon fontSize="small" />
              ) : (
                <DisabledByDefaultIcon fontSize="small" />
              )}
            </Box>

            <Box display="flex" flexDirection="column">
              <Typography>
                {completeChallengeEntry.goals.gravityChamberGains.exercises.map(
                  (
                    exercise: IUpdatedUserExercisesLibrary,
                    exerciseIndex: number
                  ) => (
                    <Box display="flex" flexDirection="column">
                      <Divider />
                      <Typography align="left" variant="button">
                        {exercise.name}
                      </Typography>

                      <Box display="flex" gap={1}>
                        <Typography>Goals:</Typography>
                        <Box
                          key={exerciseIndex}
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            justifyItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            borderLeft: exercise.dropset
                              ? "5px solid red"
                              : "5px solid transparent",
                          }}
                        >
                          {exercise.weight && (
                            <Typography>
                              {`${exercise.weight.toFixed(2)} ${
                                currentUserData.unitsSystem === "metric"
                                  ? "kg"
                                  : "lbs"
                              }`}
                            </Typography>
                          )}

                          {exercise.reps && (
                            <Typography align="left">
                              {exercise.reps} reps
                            </Typography>
                          )}

                          {exercise.distance && (
                            <Typography align="left">{`${exercise.distance} ${exercise.distanceUnit}`}</Typography>
                          )}

                          {exercise.time && (
                            <Typography align="left">
                              {exercise.time
                                ? formatTime(Number(exercise.time))
                                : ""}
                            </Typography>
                          )}
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          {exercise.goalComplete ? (
                            <CheckCircleOutlineIcon fontSize="small" />
                          ) : (
                            <CloseIcon fontSize="small" />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  )
                )}
                <Divider />
              </Typography>
            </Box>
          </Box>
        )}
        <Box display="flex" flexDirection="column" pt={1}>
          <Typography variant="caption" fontSize="1rem" color="text.secondary" align="left" width="100%">
            Your Challenge's Comment
          </Typography>
          <Typography textAlign="center" pt={1} pb={1}>
            "{completeChallengeEntry.challengeComment}"
          </Typography>
        </Box>
      </Box>
      <Box display="flex" width="100%" justifyContent="space-around" gap={1}>
      <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  sx={{ display: "flex", flexDirection: "column", p: 0 }}
                  onClick={handleDeleteChallenge}
                >
                  <DeleteIcon
                    sx={{
                      zIndex: 0,
                    }}
                  />
                  <Typography variant="caption" fontSize="1rem" color="text.secondary">Delete</Typography>
                </IconButton>
      </Box>
    </Paper>
  );
}

function CompleteChallenges({
  completeChallenges,
}: {
  completeChallenges: IChallengeObj[];
}) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {completeChallenges.length > 0 ? (
        completeChallenges.map(
          (challenge: IChallengeObj, challengeIndex: number) => (
            <CompleteChallengeCard completeChallengeEntry={challenge} />
          )
        )
      ) : (
        <Typography align="center">
          We couldn't find any complete challenges.
        </Typography>
      )}
    </Box>
  );
}

export default CompleteChallenges;
