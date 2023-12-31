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

interface ISavedZenkaiExercise {
  name: string;
  measurement: string[];
  group: string;
  type: string;
  reps: number;
  weight: number;
  distance: number;
  time: number;
  distanceUnit: string;
}

interface IUpdatedUserExercisesLibrary extends IUserExercisesLibrary {
  reps?: number;
  weight?: number;
  distance?: number;
  time?: number;
  distanceUnit?: string;
  [key: string]: any;
}

function CreateFitWorldGoal() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { userExercisesLibrary } = useContext(UserExercisesLibraryContext);
  const initialExercises = getListOfExercises(); // Direct call to the function
  const [userExercisesLibraryStrArr, setUserExercisesLibraryStrArr] =
    useState<string[]>(initialExercises);

  const [exerciseSelected, setExerciseSelected] =
    useState<IUserExercisesLibrary | null>(null);
  const [gravityChamberExercises, setGravityChamberExercises] = useState<
    IUpdatedUserExercisesLibrary[] | []
  >([]);
  const [updatedGravityChamberExercises, setUpdatedGravityChamberExercises] =
    useState<IUpdatedUserExercisesLibrary[] | []>([]);
  const [savedZenkaiExercises, setSavedZenkaiExercise] = useState<
    ISavedZenkaiExercise[] | []
  >([]);

  console.log(savedZenkaiExercises);
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
    updatedExerciseEntry[measurement] = parseInt(value);
    updatedExercises[exerciseIndex] = updatedExerciseEntry;
    setGravityChamberExercises(updatedExercises);
  };

  function handleSaveExercise(
    exercise: IUserExercisesLibrary,
    exerciseIndex: number
  ) {
    const savedExercise = gravityChamberExercises[exerciseIndex];

    const savedExerciseValidationCheck = exerciseFieldValidation(savedExercise);

    if (savedExerciseValidationCheck) {
      console.log(savedExercise);
      toast.error("Please fill in all the fields!");
      return;
    }

    const goalExercise = {
      name: savedExercise.name,
      measurement: savedExercise.measurement,
      group: savedExercise.group,
      type: savedExercise.type,
      reps: 0,
      weight: 0,
      distance: 0,
      time: 0,
      distanceUnit: 0,
    };
    console.log(savedExercise);
  }

  function exerciseFieldValidation(exercise: IUpdatedUserExercisesLibrary) {
    if (
      exercise.measurement.includes("weight") &&
      exercise.measurement.includes("reps") &&
      exercise.measurement.length > 0
    ) {
      if (
        exercise.reps === 0 ||
        exercise.reps === null ||
        exercise.weight === null ||
        exercise.weight === undefined ||
        isNaN(exercise.weight)
      ) {
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("weight") &&
      exercise.measurement.includes("distance") &&
      exercise.measurement.length > 0
    ) {
      if (
        (exercise.weight === null || exercise.weight === undefined) &&
        exercise.distance === 0
      ) {
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("weight") &&
      exercise.measurement.includes("time") &&
      exercise.measurement.length > 0
    ) {
      if (
        (exercise.weight === null || exercise.weight === undefined) &&
        exercise.time === 0
      ) {
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("reps") &&
      exercise.measurement.includes("distance") &&
      exercise.measurement.length > 0
    ) {
      if (
        (exercise.reps === 0 || exercise.reps === null) &&
        exercise.distance === 0
      ) {
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("reps") &&
      exercise.measurement.includes("time") &&
      exercise.measurement.length > 0
    ) {
      if (
        (exercise.reps === 0 || exercise.reps === null) &&
        exercise.time === 0
      ) {
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("distance") &&
      exercise.measurement.includes("time") &&
      exercise.measurement.length > 0
    ) {
      if (exercise.distance === 0 && exercise.time === 0) {
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("weight") &&
      exercise.measurement.length === 1
    ) {
      if (exercise.weight === null || exercise.weight === undefined) {
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("reps") &&
      exercise.measurement.length === 1
    ) {
      if (exercise.reps === 0 || exercise.reps === null) {
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("distance") &&
      exercise.measurement.length === 1
    ) {
      if (exercise.distance === 0) {
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("time") &&
      exercise.measurement.length === 1
    ) {
      if (exercise.time === 0) {
        return "invalid";
      }
    }
  }

  return (
    <Box
      sx={{
        paddingBottom: "64px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography variant="h6">New Zenkai Challenge</Typography>
      <TextField
        id="outlined-basic"
        label="Zenkai Challenge Name"
        variant="outlined"
        fullWidth
        placeholder="Add the name of your challenge"
      />
      <Typography variant="caption" align="left" width="100%">
        Choose the time interval to complete your challenge
      </Typography>
      <Box display="flex" justifyContent="space-evenly" gap={1} width="100%">
        <TextField
          type="date"
          label="Start Date"
          fullWidth
          value={startDate}
          size="small"
        ></TextField>
        <TextField
          type="date"
          label="End Date"
          fullWidth
          size="small"
          value={endDate}
        ></TextField>
      </Box>

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        elevation={1}
      >
        <Box display="flex">
          <Typography align="left" fontWeight="900">
            Saiyan Training Schedule
          </Typography>

          <FormGroup>
            <Switch {...label} size="small" />
          </FormGroup>
        </Box>
        <Typography width="100%" align="left" variant="body2">
          Choose your objective for how many workouts you want to complete
          throughout your challenge
        </Typography>

        <Box>
          <TextField
            id="outlined-basic"
            label="Number of workouts"
            variant="outlined"
            fullWidth
            placeholder="Add the number of workouts "
          />
        </Box>
      </Paper>

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        elevation={1}
      >
        <Box display="flex">
          <Typography align="left" fontWeight="900">
            Gravity Chamber Gains
          </Typography>

          <FormGroup>
            <Switch {...label} size="small" />
          </FormGroup>
        </Box>
        <Typography width="100%" align="left" variant="body2">
          Choose your goal for specific exercises you want to progress, you can
          set the goal for weight, reps, etc.
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
            <TextField {...params} label="Exercise Filter" variant="outlined" />
          )}
          onChange={(event, value) => handleAutocompleteChange(value)}
        />

        <Box>
          {gravityChamberExercises.length > 0 &&
            gravityChamberExercises.map(
              (exercise: IUserExercisesLibrary, exerciseIndex: number) => (
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
                                    sx={{ textAlign: "center", width: "100%" }}
                                    variant="outlined"
                                  />

                                  <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={["m", "km", "ft", "mi"]}
                                    disableClearable
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
                                    label="hh"
                                    type="number"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
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
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
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
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
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
                          // Render for "weight" and/or "reps" measurement types
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
                        onClick={(e) =>
                          handleSaveExercise(exercise, exerciseIndex)
                        }
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

        <Box>Exercises</Box>
      </Paper>

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        elevation={1}
      >
        <Box display="flex">
          <Typography align="left" fontWeight="900">
            Majin Metabolism
          </Typography>

          <FormGroup>
            <Switch {...label} size="small" />
          </FormGroup>
        </Box>
        <Typography width="100%" align="left" variant="body2">
          Choose your objective for how many total calories you want to consume
          throughout your challenge
        </Typography>

        <Box>
          <TextField
            id="outlined-basic"
            label="Total number of calories"
            variant="outlined"
            type="number"
            fullWidth
            placeholder="Add the total number of kcal"
          />
        </Box>
      </Paper>

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        elevation={1}
      >
        <Box display="flex">
          <Typography align="left" fontWeight="900">
            Namekian Night's Rest
          </Typography>

          <FormGroup>
            <Switch {...label} size="small" />
          </FormGroup>
        </Box>
        <Typography width="100%" align="left" variant="body2">
          Choose your objective for how many hours per night you want to sleep
        </Typography>

        <Box>
          <TextField
            id="outlined-basic"
            label="Hours per Night"
            variant="outlined"
            type="number"
            fullWidth
            placeholder="7.5 hours per night"
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default CreateFitWorldGoal;
