import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useContext, useState } from "react";
import { ChangeEvent } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useRef } from "react";
import uuid from "react-uuid";
import { exercisesMapObjectArr } from "../../utils/exercisesMapObject";
import { calculateWorkoutPowerLevel } from "../Workout/CompleteWorkoutModal";
import { calculateWorkoutSessionStats } from "../Workout/CompleteWorkoutModal";
import Exercise from "../../utils/interfaces/Exercise";
import uploadImportedData from "../../utils/firebaseDataFunctions/uploadImportedData";
import { AuthContext } from "../../context/Auth";
import { TrainingDataContext } from "../../context/TrainingData";
import { fetchUserTrainingData } from "../../context/TrainingData";
import DangerousIcon from "@mui/icons-material/Dangerous";
import toast from "react-hot-toast";
import TaskIcon from "@mui/icons-material/Task";
import ReportIcon from '@mui/icons-material/Report';
interface fitNotesExercise {
  date: string;
  exercise: string;
  category: string;
  weight: string;
  weightUnit: string;
  reps: string;
  distance: string;
  distanceUnit: string;
  time: string;
  comment: string;
}

function ImportData() {
  const [datasetOrigin, setDatasetOrigin] = useState("FitNotes");
  const { currentUser } = useContext(AuthContext);
  const { userTrainingData, setUserTrainingData } =
    useContext(TrainingDataContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importedFileRows, setImportedFileRows] = useState<string[][]>([]);
  const [missingExercises, setMissingExercises] = useState<string[]>([]);

  const handleDatasetOriginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDatasetOrigin(e.target.value);
  };

  function handleImportFileSelection() {
    fileInputRef.current?.click();
  }

  async function handleImportSelectedData(importedFileRows: string[][]) {
    try {
      const rowsArrOfObjects = importedFileRows.map(
        ([
          date,
          exercise,
          category,
          weight,
          weightUnit,
          reps,
          distance,
          distanceUnit,
          time,
          comment,
        ]) => ({
          date,
          exercise,
          category,
          weight,
          weightUnit,
          reps,
          distance,
          distanceUnit,
          time,
          comment,
        })
      );

      const groupedRowsByDate = groupBy(rowsArrOfObjects, (row) => row.date);
      const entries: { name: string; exercises: Exercise[] }[][] = [];
      // Loop through the keys (they are the dates)
      Object.entries(groupedRowsByDate).forEach(([key, value]) => {
        if (value && key !== "Date") {
          const transformedEntry = getFitNotesWorkoutExercises(value);

          if (transformedEntry !== null) {
            entries.push(transformedEntry.groupedExercises);
          }
        }
      });

      const workoutDataArr = [];

      for (let index = 0; index < entries.length; index++) {
        const convertedFitnotesEntries = entries[index];

        const workoutStatsResults = calculateWorkoutSessionStats(
          convertedFitnotesEntries
        );
        const workoutSessionPowerLevel = calculateWorkoutPowerLevel(
          convertedFitnotesEntries
        );

        const individualSessionWorkoutData = {
          id: uuid(),
          date: convertedFitnotesEntries[0].exercises[0].date,
          wEval: {
            comment: "Imported Entry",
            value: 0,
            feelPain: false,
            warmStretch: false,
            trainHarder: false,
          },
          stats: {
            sets: workoutStatsResults.totalSets,
            reps: workoutStatsResults.totalReps,
            vol: workoutStatsResults.totalVolWeight,
          },
          power: workoutSessionPowerLevel,
          wExercises: convertedFitnotesEntries,
        };

        workoutDataArr.push(individualSessionWorkoutData);
      }

      await uploadImportedData(
        currentUser.uid,
        workoutDataArr,
        userTrainingData
      );

      await fetchUserTrainingData(currentUser, setUserTrainingData);
      toast.success("Your data was imported successfully!");
    
      setImportedFileRows([])
      setMissingExercises([])
    } catch (error) {
      console.log(error);
      toast.error("Oops, handleImportSelectedData had an error!");
    }
  }

  async function importUserData(file: File) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      if (e.target && e.target.result) {
        const result = e.target?.result;

        let text;
        if (result instanceof ArrayBuffer) {
          text = new TextDecoder().decode(new Uint8Array(result));
        } else if (typeof result === "string") {
          text = result;
        } else {
          console.error("Unexpected result type from FileReader");
          return;
        }
        try {
          const rows = text.split("\n").map((row) => row.split(","));
        
          const rowsArrOfObjects = rows.map(
            ([
              date,
              exercise,
              category,
              weight,
              weightUnit,
              reps,
              distance,
              distanceUnit,
              time,
              comment,
            ]) => ({
              date,
              exercise,
              category,
              weight,
              weightUnit,
              reps,
              distance,
              distanceUnit,
              time,
              comment,
            })
          );
    
          const groupedRowsByDate = groupBy(rowsArrOfObjects, (row) => row.date);
          
          const allMissingExercises: string[][] = [];

          Object.entries(groupedRowsByDate).forEach(([key, value]) => {
            if (value && key !== "Date") {
              const transformedEntry = getFitNotesWorkoutExercises(value);
              
              if (transformedEntry.missingExercisesArr.length > 0) {
                allMissingExercises.push(transformedEntry.missingExercisesArr);
              }

            }
          });
    
          const uniqueExercises = getUniqueDates(allMissingExercises);
    
          setImportedFileRows(rows);
          if(uniqueExercises.length>0){
            setMissingExercises(uniqueExercises);
          }


        } catch (error) {
          toast.error("importUserData had an error!");
        }
      }
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: 2,
      }}
    >
      <AppBar
        elevation={3}
        position="fixed"
        style={{
          top: 0,
          height: "56px",
          background:
            "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <UploadFileIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="text"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Import Data
            </Typography>

            <UploadFileIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

            <Typography
              variant="h5"
              noWrap
              component="text"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,

                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Import Data
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Choose the app you want to import from:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={handleDatasetOriginChange}
          >
            <FormControlLabel
              value="FitNotes"
              control={<Radio />}
              label="FitNotes (for Android)"
              checked={datasetOrigin === "FitNotes"}
            />
          </RadioGroup>
        </FormControl>

        {importedFileRows.length === 0 ? (
          <>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
              width="100%"
              padding={1}
              sx={{ borderStyle: "dotted", border: "2px dashed black" }}
              onClick={handleImportFileSelection}
            >
              <Typography variant="h6" align="center">
                Click here to select your <strong>{datasetOrigin}</strong> file
                to import
              </Typography>

              <UploadFileIcon fontSize="large" />
            </Box>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  importUserData(file);
                }
              }}
            />
          </>
        ) : (
          <>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
              width="100%"
              padding={1}
              sx={{ borderStyle: "dotted", border: "2px dashed black" }}
            >
              <TaskIcon fontSize="large" />
              <Typography variant="h6" align="center">
                Awesome!
              </Typography>
              <Typography variant="h6" align="center">
                Have a look if there are any missing exercises, then press
                Complete!
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {importedFileRows.length !== 0 && (
        <Box pt={2} display="flex" flexDirection="column" gap={1}>
          <Button
            variant="dbz_mini"
            onClick={() => handleImportSelectedData(importedFileRows)}
          >
            Complete Data Import
          </Button>
        </Box>
      )}

      {missingExercises.length !== 0 && (
        <Box pt={2}>
          {missingExercises.map(
            (missingExerciseItem: string, index: number) => (
              <Box display="flex" width="100%" justifyContent="space-between">
                <Typography align="center" variant="subtitle2" key={index}>
                  {missingExerciseItem.toLocaleUpperCase()}
                </Typography>
                <DangerousIcon />
              </Box>
            )
          )}
          <Typography>
            <strong>TOTAL MISSING EXERCISES: {missingExercises.length}</strong>
          </Typography>

          <Box display="flex" alignItems="center" gap={1} border="2px solid black" borderRadius="4px">
            <ReportIcon  fontSize="large"/>
            <Typography>
              The exercises above can't be imported into the fitPowerUp app
              because they're not in the app's library. You can either add them
              to the library first and then import, or continue without
              importing them.
            </Typography>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default ImportData;

function groupBy<T>(
  array: T[],
  keyFunction: (item: T) => string
): Record<string, T[]> {
  return array.reduce((grouped: Record<string, T[]>, item: T) => {
    const key = keyFunction(item);
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
    return grouped;
  }, {});
}

function getFitNotesWorkoutExercises(workoutExercises: fitNotesExercise[]) {
  const groupedExercisesByName: { [name: string]: Exercise[] } = {};

  const missingExercisesArr: string[] = [];

  for (let index = 0; index < workoutExercises.length; index++) {
    const exerciseEntry = workoutExercises[index];

    const totalSeconds = convertToSeconds(exerciseEntry.time);

    const mappedExercise = mapFitNotesExercise(
      exerciseEntry.exercise,
      exercisesMapObjectArr
    );

    if (!mappedExercise) {
      missingExercisesArr.push(exerciseEntry.exercise);
      continue;
    }

    const mappedExerciseName = mappedExercise.replaceAll(/-/g, " ");

    const adaptedExerciseEntry: Exercise = {
      exercise: mappedExerciseName,
      date: exerciseEntry.date,
      weight: exerciseEntry.weight ? parseFloat(exerciseEntry.weight) : 0,
      reps: exerciseEntry.reps ? parseFloat(exerciseEntry.reps) : 0,
      distance: exerciseEntry.distance ? parseFloat(exerciseEntry.distance) : 0,
      distance_unit:
        exerciseEntry.distanceUnit !== "" ? exerciseEntry.distanceUnit : "m",
      time: totalSeconds ? totalSeconds : 0,
      group: exerciseEntry.category.toLocaleLowerCase(),
      id: index,
      is_pr: false,
      dropset: false,
    };

    if (exerciseEntry.comment !== "") {
      adaptedExerciseEntry.comment = exerciseEntry.comment;
    }

    const group = groupedExercisesByName[adaptedExerciseEntry.exercise];

    if (group) {
      group.push(adaptedExerciseEntry);
    } else {
      groupedExercisesByName[adaptedExerciseEntry.exercise] = [
        adaptedExerciseEntry,
      ];
    }
  }

  // Convert grouped exercises into an array of objects
  const groupedExercises = Object.keys(groupedExercisesByName).map((name) => ({
    name,
    exercises: groupedExercisesByName[name],
  }));

  return { groupedExercises, missingExercisesArr };
}

function convertToSeconds(timeString: string) {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function mapFitNotesExercise(
  exerciseToMap: string,
  exercisesMapObjectArr: { id: string; fitNotesId: string }[]
) {
  // Iterate through the array

  for (const exerciseMap of exercisesMapObjectArr) {
    // Check if the fitNotesId matches the exerciseToMap
    if (
      exerciseMap.fitNotesId.toLocaleLowerCase() ===
      exerciseToMap.toLocaleLowerCase()
    ) {
      return exerciseMap.id; // Return the corresponding id
    }
  }

  return null;
}

export function getUniqueDates(arrayOfArrays: string[][]) {
  const flattenedArray = arrayOfArrays.flat();
  const uniqueValuesSet = new Set(flattenedArray);
  const uniqueValues = Array.from(uniqueValuesSet);
  return uniqueValues;
}
