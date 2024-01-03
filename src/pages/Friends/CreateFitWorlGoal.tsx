import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useContext, useState, useEffect, ChangeEvent } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Autocomplete from "@mui/material/Autocomplete";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
import { IUserExercisesLibrary } from "../../utils/interfaces/IUserExercisesLibrary";
import capitalizeWords from "../../utils/capitalizeWords";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/Auth";
import formatTime from "../../utils/formatTime";
import { Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import zenkaiExerciseFieldValidation from "../../utils/socialFunctions/zenkaiChallenges/zenkaiExerciseFieldValidation";
import saveChallenge from "../../utils/socialFunctions/zenkaiChallenges/saveChallenge";
import uuid from "react-uuid";
import { UserChallengesContext } from "../../context/UserChallenges";
export interface IUpdatedUserExercisesLibrary extends IUserExercisesLibrary {
  reps?: number;
  weight?: number;
  distance?: number;
  time?: number;
  distanceUnit?: string;
  goalComplete?: boolean;
  [key: string]: any;
}

function CreateFitWorldGoal() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { refetchUserChallengesData } = useContext(UserChallengesContext);
  const { currentUser, currentUserData } = useContext(AuthContext);
  const { userExercisesLibrary } = useContext(UserExercisesLibraryContext);
  const initialExercises = getListOfExercises(); // Direct call to the function
  const [userExercisesLibraryStrArr, setUserExercisesLibraryStrArr] =
    useState<string[]>(initialExercises);
  const [numberOfWorkouts, setNumberOfWorkouts] = useState<number | null>(null);
  const [majinMetabolismCalories, setMajinMetabolismCalories] = useState<
    number | null
  >(null);
  const [namekianNightRestHours, setNamekianNightRestHours] = useState<
    number | null
  >(null);
  const [zenkaiChallengeName, setZenkaiChallengeName] = useState("");
  const [distanceUnitValue, setDistanceUnitValue] = useState("m");
  const [zenkaiChallengeComment, setZenkaiChallengeComment] = useState("");
  const [saiyanTrainingScheduleCheck, setSaiyanTrainingScheduleCheck] =
    useState(false);
  const [gravityChamberGainsCheck, setGravityChamberGainsCheck] =
    useState(false);
  const [majinMetabolismCheck, setMajinMetabolismCheck] = useState(false);
  const [namekianNightRestCheck, setNamekianNightRestCheck] = useState(false);

  const [exerciseSelected, setExerciseSelected] =
    useState<IUserExercisesLibrary | null>(null);
  const [gravityChamberExercises, setGravityChamberExercises] = useState<
    IUpdatedUserExercisesLibrary[] | []
  >([]);

  const [savedZenkaiExercises, setSavedZenkaiExercise] = useState<
    IUpdatedUserExercisesLibrary[] | []
  >([]);

  useEffect(() => {
    const exercises = getListOfExercises();
    setUserExercisesLibraryStrArr(exercises);
  }, [userExercisesLibrary]); // Empty dependency array means this runs on mount only

  function getListOfExercises() {
    if (userExercisesLibrary.length > 0) {
      const tempUserExercisesLibraryStrArr = userExercisesLibrary[0].exercises
        .map((userExercise: IUserExercisesLibrary) =>
          capitalizeWords(userExercise.name)
        )
        .sort((a: string, b: string) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        );
      return tempUserExercisesLibraryStrArr;
    } else {
      return [];
    }
  }

  const findExerciseByName = (name: string) => {
    return userExercisesLibrary[0].exercises.find(
      (exercise: IUserExercisesLibrary) =>
        exercise.name.toLocaleUpperCase() === name.toLocaleUpperCase()
    );
  };

  const handleAutocompleteChange = (newValue: string | null) => {
    if (newValue) {
      const exercise = findExerciseByName(newValue);

      setExerciseSelected(exercise);
      setGravityChamberExercises([...gravityChamberExercises, exercise]);
    }
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleExerciseValueChange = (
    exerciseIndex: number,
    measurement: string,
    value: string
  ) => {
    const updatedExercises = [...gravityChamberExercises];
    const updatedExerciseEntry = { ...updatedExercises[exerciseIndex] };
    updatedExerciseEntry[measurement] = value === "" ? 0 : parseInt(value);
    updatedExerciseEntry.distanceUnit = distanceUnitValue;

    updatedExercises[exerciseIndex] = updatedExerciseEntry;

    setGravityChamberExercises(updatedExercises);
  };

  const handleTimeFieldsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    exerciseIndex: number
  ) => {
    const { id, value } = event.target;

    let inputValue = Math.max(0, Number(value));

    const updatedExercises = [...gravityChamberExercises];
    const updatedExerciseEntry = { ...updatedExercises[exerciseIndex] };

    // Initialize time if it doesn't exist
    if (!updatedExerciseEntry.hasOwnProperty("time")) {
      updatedExerciseEntry.time = 0; // Default to 0 seconds
    }

    let hours = 0,
      minutes = 0,
      seconds = 0;

    if (updatedExerciseEntry.time && updatedExerciseEntry.time > 0) {
      hours = Math.floor(updatedExerciseEntry.time / 3600);
      minutes = Math.floor((updatedExerciseEntry.time % 3600) / 60);
      seconds = updatedExerciseEntry.time % 60;
    }

    // Update the relevant time component based on input field
    if (id === "hh") {
      hours = inputValue;
    } else if (id === "mm") {
      minutes = inputValue;
    } else if (id === "ss") {
      seconds = inputValue;
    }

    // Calculate the total time in seconds and update the exercise
    updatedExerciseEntry.time = hours * 3600 + minutes * 60 + seconds;
    updatedExercises[exerciseIndex] = updatedExerciseEntry;
    setGravityChamberExercises(updatedExercises);
  };

  function handleSaveExercise(exerciseIndex: number) {
    const savedExercise = gravityChamberExercises[exerciseIndex];

    const savedExerciseValidationCheck =
      zenkaiExerciseFieldValidation(savedExercise);

    if (savedExerciseValidationCheck) {
      return;
    }
    savedExercise.goalComplete = false;

    setSavedZenkaiExercise([...savedZenkaiExercises, savedExercise]);
    handleDiscardExercise(exerciseIndex);
    setGravityChamberExercises([]);
  }

  function handleDiscardExercise(exerciseIndex: number) {
    const gravityChamberExercisesRemoved = gravityChamberExercises.filter(
      (_, index) => index !== exerciseIndex
    );
    setGravityChamberExercises(gravityChamberExercisesRemoved);
  }

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newStartDate = event.target.value;

    if (startDate > endDate && startDate !== "" && endDate !== "") {
      //toast.error('The end date has to be later than the starting date!')
    } else {
      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newEndDate = event.target.value;
    if (newEndDate <= startDate || startDate === "") {
      //toast.error('The end date has to be later than the starting date!')
    } else {
      setEndDate(newEndDate);
    }
  };

  async function handleSaveZenkaiChallenge() {
    const validationCheck = validateZenkai();

    if (!validationCheck) {
      return;
    }

    const zenkaiChallengeObj = {
      id: uuid(),
      status: "in progress",
      name: zenkaiChallengeName,
      startDate: startDate,
      endDate: endDate,
      goals: {
        saiyanTrainingSchedule: {
          isActive: saiyanTrainingScheduleCheck,
          resultStatus: "pending",
          targetNumberOfWorkouts: numberOfWorkouts ? numberOfWorkouts : 0,
          daysTargetReached:0
        },
        gravityChamberGains: {
          isActive: gravityChamberGainsCheck,
          resultStatus: "pending",
          exercises: savedZenkaiExercises,
        },
        majinMetabolism: {
          isActive: majinMetabolismCheck,
          resultStatus: "pending",
          dailyCalorieGoal: majinMetabolismCalories
            ? majinMetabolismCalories
            : 0,
            daysGoalReached:0
        },
        namekianNightRest: {
          isActive: namekianNightRestCheck,
          resultStatus: "pending",
          targetHours: namekianNightRestHours ? namekianNightRestHours : 0,
          daysGoalReached:0
        },
      },
      challengeComment: zenkaiChallengeComment,
      finalResult: 0,
      totalChallenges: 0,
    };

    await saveChallenge(currentUser.uid, zenkaiChallengeObj);
    await refetchUserChallengesData();
    toast.success("Your Zenkai Challenge was saved!");
    navigate("/home/friends");
  }

  function validateZenkai() {
    if (zenkaiChallengeName === "") {
      toast.error("Please add a name for your challenge.");
      console.log({ zenkaiChallengeName });
      return false;
    }

    if (startDate === "") {
      toast.error("Please choose a start date.");
      console.log({ startDate });
      return false;
    }

    if (endDate === "") {
      toast.error("Please choose a start date.");
      console.log({ endDate });
      return false;
    }

    if (saiyanTrainingScheduleCheck) {
      if (
        numberOfWorkouts === null ||
        isNaN(numberOfWorkouts) ||
        numberOfWorkouts < 0
      ) {
        toast.error("Please fill in the number of workouts.");
        return false;
      } else if (numberOfWorkouts === 0) {
        toast.error("The number of workouts cannot be 0.");
        return false;
      }
    }

    if (gravityChamberGainsCheck) {
      if (savedZenkaiExercises.length === 0) {
        toast.error("Please choose a goal exercise.");
        console.log({ savedZenkaiExercises });
        return false;
      }
    }

    if (majinMetabolismCheck) {
      if (majinMetabolismCalories === null) {
        toast.error("Please add a calories goal.");
        console.log(majinMetabolismCalories);
        return false;
      }
    }

    if (namekianNightRestCheck) {
      if (namekianNightRestHours === null) {
        toast.error("Please add a sleep hours goal.");
        console.log({ namekianNightRestHours });
        return false;
      }
    }
    return true;
  }

  return (
    <Box
      sx={{
        paddingBottom: "72px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box display="flex" justifyContent="center" gap={1} width="100%">
        <Typography variant="h6">New Zenkai Challenge</Typography>
        <IconButton
          aria-label="add workout"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 0,
          }}
        >{/* 
          <InfoIcon fontSize="medium" />
         */}
          </IconButton>
      </Box>

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#fafafa",
        }}
        elevation={4}
      >
        <TextField
          id="outlined-basic"
          required
          label="Zenkai Challenge Name"
          variant="outlined"
          type="text"
          fullWidth
          onChange={(e) => setZenkaiChallengeName(e.target.value)}
          placeholder="Add the name of your challenge"
        />
        <Typography variant="caption" align="left" width="100%">
          Choose the time duration of your challenge
        </Typography>
        <Box display="flex" justifyContent="space-evenly" gap={1} width="100%">
          <TextField
            type="date"
            label="Start Date"
            fullWidth
            value={startDate}
            onChange={handleStartDateChange}
            size="small"
          ></TextField>
          <TextField
            type="date"
            label="End Date"
            fullWidth
            size="small"
            value={endDate}
            onChange={handleEndDateChange}
          ></TextField>
        </Box>
      </Paper>

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#fafafa",
        }}
        elevation={4}
      >
        <Box display="flex">
          <Typography align="left" fontWeight="900">
            Saiyan Training Schedule
          </Typography>

          <FormGroup>
            <Switch
              {...label}
              size="small"
              checked={saiyanTrainingScheduleCheck}
              onChange={() =>
                setSaiyanTrainingScheduleCheck(!saiyanTrainingScheduleCheck)
              }
            />
          </FormGroup>
        </Box>
        {saiyanTrainingScheduleCheck ? (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography width="100%" align="left" variant="body2">
              Choose your objective for how many workouts you want to complete
              throughout your challenge
            </Typography>

            <Box>
              <TextField
                id="outlined-basic"
                type="number"
                label="Number of workouts"
                variant="outlined"
                value={numberOfWorkouts}
                fullWidth
                onChange={(e) => setNumberOfWorkouts(parseInt(e.target.value))}
                placeholder="Add the number of workouts "
              />
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography width="100%" align="left" variant="body2">
              The Saiyan Training Schedule is a feature designed to help you set
              specific goals for the number of training sessions you aim to
              complete within your challenge's timeframe. It's ideal for
              maintaining and increasing discipline and consistency in your
              training regimen.
            </Typography>
          </Box>
        )}
      </Paper>

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#fafafa",
        }}
        elevation={4}
      >
        <Box display="flex">
          <Typography align="left" fontWeight="900">
            Gravity Chamber Gains
          </Typography>

          <FormGroup>
            <Switch
              {...label}
              size="small"
              checked={gravityChamberGainsCheck}
              onChange={() =>
                setGravityChamberGainsCheck(!gravityChamberGainsCheck)
              }
            />
          </FormGroup>
        </Box>

        {gravityChamberGainsCheck ? (
          <Box>
            <Typography width="100%" align="left" variant="body2">
              Choose your goal for specific exercises you want to progress, you
              can set the goal for weight, reps, etc.
            </Typography>
            <Autocomplete
              sx={{ paddingTop: "8px" }}
              disableClearable
              options={userExercisesLibraryStrArr}
              value={
                exerciseSelected
                  ? capitalizeWords(exerciseSelected.name)
                  : undefined
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Exercise Filter"
                  variant="outlined"
                />
              )}
              onChange={(event, value) => handleAutocompleteChange(value)}
            />

            <Box>
              {gravityChamberExercises.length > 0 &&
                gravityChamberExercises.map(
                  (
                    exercise: IUpdatedUserExercisesLibrary,
                    exerciseIndex: number
                  ) => (
                    <Box display="flex" flexDirection="column" width="100%">
                      <Typography align="left" pb={1} pt={1}>
                        {capitalizeWords(exercise.name)}
                      </Typography>

                      <Box display="flex" gap={1} alignItems="center">
                        <Box display="flex" gap={1} flexDirection="column">
                          {exercise.measurement.map(
                            (measurement: string, index: number) => {
                              if (measurement === "distance") {
                                return (
                                  <Box
                                    key={index}
                                    sx={{
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
                                        gap: "8px",
                                        width: "100%",
                                        height: "100%",
                                      }}
                                    >
                                      <TextField
                                        id={measurement}
                                        label="Distance"
                                        type="number"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          style: {
                                            fontSize: "1.5rem",
                                            textAlign: "center",
                                            padding: "10px",
                                          },
                                        }}
                                        sx={{
                                          textAlign: "center",
                                          width: "100%",
                                        }}
                                        variant="outlined"
                                        onChange={(e) =>
                                          handleExerciseValueChange(
                                            exerciseIndex,
                                            measurement,
                                            e.target.value
                                          )
                                        }
                                      />

                                      <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={["m", "km", "ft", "mi"]}
                                        disableClearable
                                        value={distanceUnitValue.toString()}
                                        onChange={(event, newValue) => {
                                          setDistanceUnitValue(newValue || "m");
                                        }}
                                        renderInput={(params) => (
                                          <TextField {...params} />
                                        )}
                                      />
                                    </Box>
                                  </Box>
                                );
                              }

                              if (measurement === "time") {
                                return (
                                  <Box
                                    key={index}
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Box sx={{ display: "flex", gap: "8px" }}>
                                      <TextField
                                        id="hh"
                                        value={
                                          exercise.time &&
                                          Math.floor(exercise.time / 3600)
                                        }
                                        onChange={(event) =>
                                          handleTimeFieldsChange(
                                            event,
                                            exerciseIndex
                                          )
                                        }
                                        label="hh"
                                        type="number"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          min: 0,
                                          max: 99,
                                          style: {
                                            fontSize: "1.5rem",
                                            textAlign: "center",
                                            padding: "8px",
                                          },
                                        }}
                                        sx={{ textAlign: "center" }}
                                        variant="outlined"
                                      />
                                      <TextField
                                        id="mm"
                                        label="mm"
                                        type="number"
                                        value={
                                          exercise.time &&
                                          Math.floor(
                                            (exercise.time % 3600) / 60
                                          )
                                        }
                                        onChange={(event) =>
                                          handleTimeFieldsChange(
                                            event,
                                            exerciseIndex
                                          )
                                        }
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          min: 0,
                                          max: 59,
                                          style: {
                                            fontSize: "1.5rem",
                                            textAlign: "center",
                                            padding: "8px",
                                          },
                                        }}
                                        sx={{ textAlign: "center" }}
                                        variant="outlined"
                                      />
                                      <TextField
                                        id="ss"
                                        label="ss"
                                        type="number"
                                        value={
                                          exercise.time && exercise.time % 60
                                        }
                                        onChange={(event) =>
                                          handleTimeFieldsChange(
                                            event,
                                            exerciseIndex
                                          )
                                        }
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          min: 0,
                                          max: 59,
                                          style: {
                                            fontSize: "1.5rem",
                                            textAlign: "center",
                                            padding: "8px",
                                          },
                                        }}
                                        sx={{ textAlign: "center" }}
                                        variant="outlined"
                                      />
                                    </Box>
                                  </Box>
                                );
                              }
                              return (
                                <Box key={index}>
                                  <TextField
                                    type="number"
                                    id={`${measurement}-${index}`}
                                    variant="outlined"
                                    onChange={(e) =>
                                      handleExerciseValueChange(
                                        exerciseIndex,
                                        measurement,
                                        e.target.value
                                      )
                                    }
                                    label={capitalizeWords(measurement)}
                                    inputProps={{
                                      style: {
                                        fontSize: "1.5rem",
                                        textAlign: "center",
                                        height: "100%",
                                        padding: "8px",
                                        width: "100%",
                                      },
                                      inputMode: "decimal",
                                    }}
                                    /*                   value={measurement === "weight" ? weightValue : repsValue} */
                                  />
                                </Box>
                              );
                            }
                          )}
                        </Box>

                        <Box display="flex" flexDirection="column" gap={1}>
                          <IconButton
                            aria-label="add workout"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              padding: 0,
                            }}
                            onClick={(e) => handleSaveExercise(exerciseIndex)}
                          >
                            <SaveIcon fontSize="medium" />
                            <Typography variant="caption">Save</Typography>
                          </IconButton>

                          <IconButton
                            aria-label="add workout"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              padding: 0,
                            }}
                            onClick={() => handleDiscardExercise(exerciseIndex)}
                          >
                            <DeleteIcon fontSize="medium" />
                            <Typography variant="caption">Discard</Typography>
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  )
                )}
            </Box>

            {savedZenkaiExercises.length > 0 && (
              <Box display="flex" gap={1} flexDirection="column">
                {savedZenkaiExercises.map(
                  (
                    exercise: IUpdatedUserExercisesLibrary,
                    exerciseIndex: number
                  ) => (
                    <Box display="flex" flexDirection="column">
                      <Typography align="left" variant="button">
                        {exercise.name}
                      </Typography>

                      <Box display="flex">
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
                            <Typography align="left">
                              {`${
                                exercise.weight && exercise.weight.toFixed(2)
                              } ${
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
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            )}
          </Box>
        ) : (
          <Typography align="left" variant="body2">
            The Gravity Chamber is your go-to place for setting and pursuing new
            personal records in specific exercises. It's designed to challenge
            and push your limits, helping you strive for higher strength, speed,
            and endurance in your fitness journey.
          </Typography>
        )}
      </Paper>

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#fafafa",
        }}
        elevation={4}
      >
        <Box display="flex">
          <Typography align="left" fontWeight="900">
            Majin Metabolism
          </Typography>

          <FormGroup>
            <Switch
              {...label}
              size="small"
              checked={majinMetabolismCheck}
              onChange={() => setMajinMetabolismCheck(!majinMetabolismCheck)}
            />
          </FormGroup>
        </Box>

        {majinMetabolismCheck ? (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography width="100%" align="left" variant="body2">
              Choose your objective for how many total calories you want to
              consume throughout your challenge
            </Typography>

            <TextField
              id="outlined-basic"
              label="Target for calories consumed per day"
              variant="outlined"
              type="number"
              fullWidth
              value={majinMetabolismCalories}
              placeholder="Add the total number of kcal"
              onChange={(e) =>
                setMajinMetabolismCalories(parseInt(e.target.value))
              }
            />
          </Box>
        ) : (
          <Typography align="left" variant="body2">
            Majin Metabolism offers a straightforward way to monitor your
            consistency in caloric intake. It's designed to help you maintain a
            steady and balanced caloric intake, tracking how closely you adhere
            to your daily calorie goals.
          </Typography>
        )}
      </Paper>

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#fafafa",
        }}
        elevation={4}
      >
        <Box display="flex">
          <Typography align="left" fontWeight="900">
            Namekian Night's Rest
          </Typography>

          <FormGroup>
            <Switch
              {...label}
              size="small"
              checked={namekianNightRestCheck}
              onChange={() =>
                setNamekianNightRestCheck(!namekianNightRestCheck)
              }
            />
          </FormGroup>
        </Box>

        {namekianNightRestCheck ? (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography width="100%" align="left" variant="body2">
              Choose your objective for how many hours per night you want to
              sleep
            </Typography>

            <Box>
              <TextField
                id="outlined-basic"
                label="Target for hours of sleep per night"
                variant="outlined"
                type="number"
                fullWidth
                value={namekianNightRestHours}
                placeholder="7.5"
                onChange={(e) =>
                  setNamekianNightRestHours(parseFloat(e.target.value))
                }
              />
            </Box>
          </Box>
        ) : (
          <Typography align="left" variant="body2">
            Namekian Night's Rest is meant to help track and achieve consistent,
            restful sleep patterns. This feature helps you set and stick to your
            sleep goals for every night, ensuring that you get the rejuvenating
            rest needed for optimal health and fitness performance.
          </Typography>
        )}
      </Paper>

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#fafafa",
        }}
        elevation={4}
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Challenge Comment"
          multiline
          maxRows={6}
          minRows={2}
          size="small"
          inputProps={{ maxLength: 1024 }}
          variant="outlined"
          sx={{
            width: "100%",
          }}
          value={zenkaiChallengeComment}
          onChange={(e) => setZenkaiChallengeComment(e.target.value)}
        />
      </Paper>

      <Button variant="dbz_mini" onClick={handleSaveZenkaiChallenge}>
        Save Zenkai Challenge
      </Button>
    </Box>
  );
}

export default CreateFitWorldGoal;
