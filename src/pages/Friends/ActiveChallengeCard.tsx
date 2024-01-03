import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import IChallengeObj from "../../utils/interfaces/IChallengeObj";
import { UserTrainingDataContext } from "../../context/UserTrainingData";
import { useContext } from "react";
import calculateChallengeWorkouts from "../../utils/socialFunctions/zenkaiChallenges/calculateChallengeWorkouts";
import calculateChallengeSleepHours from "../../utils/socialFunctions/zenkaiChallenges/calculateChallengeSleepHours";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import calculateChallengeCalories from "../../utils/socialFunctions/zenkaiChallenges/calculateChallengeCalories";
import { BodyTrackerDataContext } from "../../context/BodyTrackerData";
import calculateChallengeExercises from "../../utils/socialFunctions/zenkaiChallenges/calculateChallengeExercises";
import { IUpdatedUserExercisesLibrary } from "./CreateFitWorlGoal";
import formatTime from "../../utils/formatTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/Auth";
import { Divider } from "@mui/material";
import ChallengeStatus from "../../components/ui/ChallengeStatus";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import deleteChallenge from "../../utils/socialFunctions/zenkaiChallenges/deleteChallenge";
import { UserChallengesContext } from "../../context/UserChallenges";
import toast from "react-hot-toast";
import completeChallenge from "../../utils/socialFunctions/zenkaiChallenges/completeChallenge";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
export function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            borderRadius: 5,
            height: "15px", // Increase the height for thickness
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#520975",
              borderRadius: 5,
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function ActiveChallengeCard({
  activeChallenge,
}: {
  activeChallenge: IChallengeObj;
}) {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const calculateRemainingDays = (endDate: string, startDate: string) => {
    const end = new Date(endDate);
    const start = new Date(startDate);
    const today = new Date();

    if (today >= start) {
      return Math.floor(
        (today.getTime() - start.getTime()) / (1000 * 3600 * 24)
      );
    } else {
      return Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    }
  };

  console.log(activeChallenge);
  const calculateStatus = (endDate: string, startDate: string) => {
    const end = new Date(endDate);
    const start = new Date(startDate);
    const today = new Date();

    if (today > start) {
      return "in progress";
    } else if (today < start) {
      return "not started";
    } else if (today > end) {
      return "finished";
    }
  };
  const { userTrainingData } = useContext(UserTrainingDataContext);
  const { userBodyTrackerData } = useContext(BodyTrackerDataContext);
  const { userChallengesData, refetchUserChallengesData } = useContext(
    UserChallengesContext
  );

  const checkActiveChallengeStatus = calculateStatus(
    activeChallenge.endDate,
    activeChallenge.startDate
  );

  const calculateTotalDays = (endDate: string, startDate: string) => {
    const end = new Date(endDate);
    const start = new Date(startDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  };

  const remainingDays = calculateRemainingDays(
    activeChallenge.endDate,
    activeChallenge.startDate
  );

  const totalDays = calculateTotalDays(
    activeChallenge.endDate,
    activeChallenge.startDate
  );

  const challengeWorkouts = calculateChallengeWorkouts(
    activeChallenge,
    userTrainingData
  );

  const challengeCalories = calculateChallengeCalories(
    activeChallenge,
    userBodyTrackerData
  );
  const challengeSleepHours = calculateChallengeSleepHours(
    activeChallenge,
    userBodyTrackerData
  );

  const normaliseWorkouts = (value: number) =>
    ((value - 0) * 100) /
    (activeChallenge.goals.saiyanTrainingSchedule.targetNumberOfWorkouts - 0);

  const normaliseCalories = (value: number) =>
    ((value - 0) * 100) / (totalDays - 0);

  const normaliseSleepHours = (value: number) =>
    ((value - 0) * 100) / (totalDays - 0);

  async function handleDeleteChallenge() {
    await deleteChallenge(
      currentUser.uid,
      userChallengesData,
      activeChallenge.id
    );
    await refetchUserChallengesData();
    toast.success("Challenge successfully deleted!");
  }

  async function handleCompleteChallenge() {
    console.log(activeChallenge);

    const updatedGoals = activeChallenge.goals;

    if (updatedGoals.gravityChamberGains.isActive) {
      // Iterate over exercises and update their goalComplete status
      updatedGoals.gravityChamberGains.exercises =
        updatedGoals.gravityChamberGains.exercises.map((exerciseEntry) => ({
          ...exerciseEntry,
          goalComplete: calculateChallengeExercises(
            activeChallenge,
            userTrainingData,
            exerciseEntry.name
          ),
        }));

      const allGoalsCompleted =
        updatedGoals.gravityChamberGains.exercises.every(
          (exercise) => exercise.goalComplete
        );

      updatedGoals.gravityChamberGains.resultStatus = allGoalsCompleted
        ? "success"
        : "failed";
    }

    if (updatedGoals.majinMetabolism.isActive) {
      updatedGoals.majinMetabolism.resultStatus =
        totalDays - challengeCalories === 0 ? "success" : "failed";
      updatedGoals.majinMetabolism.daysGoalReached = challengeCalories;
    }

    if (updatedGoals.namekianNightRest.isActive) {
      updatedGoals.namekianNightRest.resultStatus =
        totalDays - challengeSleepHours === 0 ? "success" : "failed";
      updatedGoals.namekianNightRest.daysGoalReached = challengeSleepHours;
    }

    if (updatedGoals.saiyanTrainingSchedule.isActive) {
      updatedGoals.saiyanTrainingSchedule.resultStatus =
        updatedGoals.saiyanTrainingSchedule.targetNumberOfWorkouts -
          challengeWorkouts ===
        0
          ? "success"
          : "failed";
      updatedGoals.saiyanTrainingSchedule.daysTargetReached = challengeWorkouts;
    }

    let successCount = 0;
    /* let failureCount = 0; */
    let totalChallenges = 0;
    Object.values(updatedGoals).forEach((goal) => {
      if (goal.isActive) {
        totalChallenges++;
        if (goal.resultStatus === "success") {
          successCount++;
        } /*  else if (goal.resultStatus === 'failed') {
          failureCount++;
        } */
      }
    });

    const completeActiveChallenge = {
      id: activeChallenge.id,
      challengeComment: activeChallenge.challengeComment,
      endDate: activeChallenge.endDate,
      finalResult: successCount,
      name: activeChallenge.name,
      startDate: activeChallenge.startDate,
      status: "complete",
      totalChallenges: totalChallenges,
      goals: updatedGoals,
    };

    await completeChallenge(
      currentUser.uid,
      userChallengesData,
      completeActiveChallenge
    );
    await refetchUserChallengesData();
    toast.success("Challenge updated!");
  }

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 1,
        }}
      >
        <Typography variant="h6" align="center">
          {activeChallenge.name}
        </Typography>
        <Typography variant="caption" align="left" width="100%">
          Your Challenge Interval
        </Typography>
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          width="100%"
        >
          <Box
            display="flex"
            gap={1}
            justifyContent="center"
            alignItems="center"
          >
            <EventAvailableIcon />
            <Typography> {activeChallenge.startDate}</Typography>
          </Box>
          <Box
            display="flex"
            gap={1}
            justifyContent="center"
            alignItems="center"
          >
            <EventBusyIcon />
            <Typography> {activeChallenge.endDate}</Typography>
          </Box>
        </Box>

        <Typography variant="caption" align="left" width="100%">
          Your Challenge's Status
        </Typography>
        <Box display="grid" gridTemplateColumns="1fr 1fr" width="100%">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            width="100%"
          >
            <ChallengeStatus status={checkActiveChallengeStatus} />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            width="100%"
          >
            <Typography>{remainingDays} days pending</Typography>

            <QueryBuilderIcon fontSize="small" />
          </Box>
        </Box>
      </Box>
      <Typography variant="caption" align="left" width="100%">
        Your Chosen Challenges
      </Typography>

      <Box width="100%">
        {activeChallenge.goals.saiyanTrainingSchedule.isActive && (
          <Box>
            <Box>
              <Typography variant="overline">
                Workouts Objective:{" "}
                {
                  activeChallenge.goals.saiyanTrainingSchedule
                    .targetNumberOfWorkouts
                }
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel
                value={normaliseWorkouts(challengeWorkouts)}
              />
              {activeChallenge.goals.saiyanTrainingSchedule
                .targetNumberOfWorkouts -
                challengeWorkouts ===
              0 ? (
                <Typography align="center">
                  Congratulations, challenge completed!
                </Typography>
              ) : (
                <Typography align="center">
                  You need{" "}
                  {activeChallenge.goals.saiyanTrainingSchedule
                    .targetNumberOfWorkouts - challengeWorkouts}{" "}
                  more workouts to complete the challenge!
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>

      <Box width="100%">
        {activeChallenge.goals.majinMetabolism.isActive && (
          <Box>
            <Box>
              <Typography variant="overline">
                Daily Caloric Objective:{" "}
                {activeChallenge.goals.majinMetabolism.dailyCalorieGoal} kcal
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel
                value={normaliseCalories(challengeCalories)}
              />
              {totalDays - challengeCalories === 0 ? (
                <Typography align="center" variant="body2">
                  Congratulations, objective reached!
                </Typography>
              ) : (
                <Typography align="center" variant="body2">
                  You need to meet your daily kcal intake{" "}
                  {totalDays - challengeCalories} more days to complete the
                  challenge!
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>

      <Box width="100%">
        {activeChallenge.goals.namekianNightRest.isActive && (
          <Box>
            <Box>
              <Typography variant="overline">
                Daily Sleep Hours Objective:{" "}
                {activeChallenge.goals.namekianNightRest.targetHours} HOURS
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel
                value={normaliseSleepHours(challengeSleepHours)}
              />
              {totalDays - challengeSleepHours === 0 ? (
                <Typography align="center" variant="body2">
                  Congratulations, objective reached!
                </Typography>
              ) : (
                <Typography align="center" variant="body2">
                  You need to meet your daily sleep hours target{" "}
                  {totalDays - challengeSleepHours} more days to complete the
                  challenge!
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>

      <Box width="100%">
        {activeChallenge.goals.gravityChamberGains.isActive && (
          <Box>
            <Typography variant="overline" align="left">
              Your Exercises Objectives
            </Typography>

            <Typography>
              {activeChallenge.goals.gravityChamberGains.exercises.map(
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
                        {calculateChallengeExercises(
                          activeChallenge,
                          userTrainingData,
                          exercise.name
                        ) ? (
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
        )}
        <Box display="flex" flexDirection="column" pt={1}>
          <Typography variant="caption" align="left" width="100%">
            Your Challenge's Comment
          </Typography>
          <Typography textAlign="center" pt={1} pb={1}>
            "{activeChallenge.challengeComment}"
          </Typography>
        </Box>
      </Box>

      <Box display="flex" width="100%" justifyContent="space-around" gap={1}>
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Challenge Options</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ p: 0, m: 0 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {checkActiveChallengeStatus === "in progress" ? (
              <Box display="flex" width="100%" justifyContent="space-around">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  sx={{ display: "flex", flexDirection: "column", p: 0 }}
                  onClick={handleCompleteChallenge}
                >
                  <SaveIcon
                    sx={{
                      zIndex: 0,
                    }}
                  />
                  <Typography variant="caption">Complete Early</Typography>
                </IconButton>
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
                  <Typography variant="caption">Delete</Typography>
                </IconButton>
              </Box>
            ) : checkActiveChallengeStatus === "not started" ? (
              <Box>
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
                  <Typography variant="caption">Delete</Typography>
                </IconButton>
              </Box>
            ) : checkActiveChallengeStatus === "finished" ? (
              <Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  sx={{ display: "flex", flexDirection: "column", p: 0 }}
                  onClick={handleCompleteChallenge}
                >
                  <SaveIcon
                    sx={{
                      zIndex: 0,
                    }}
                  />
                  <Typography variant="caption">Complete</Typography>
                </IconButton>
              </Box>
            ) : null}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
}

export default ActiveChallengeCard;
