import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserTrainingDataContext } from "../../context/UserTrainingData";
import Container from "@mui/material/Container";
import { IUserExercisesLibrary } from "../../utils/interfaces/IUserExercisesLibrary";
import { Select, MenuItem } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import fetchModeledDataForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/utility/fetchModeledDataForExercise";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import capitalizeWords from "../../utils/capitalizeWords";
import NoAvailableDataBox from "../../components/ui/NoAvailableDataBox";
import { AuthContext } from "../../context/Auth";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
import getStatisticOptions from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/utility/getStatisticsOptions";
import {
  timeframeOptions,
  intervalOptions,
} from "../../utils/completedWorkoutsChartFunctions/statisticsOptions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
function ExerciseDetailsGraph() {
  const { exerciseName } = useParams();
  const { currentUserData } = useContext(AuthContext);
  const { userTrainingData, refetchUserTrainingData } = useContext(
    UserTrainingDataContext
  );
  const { userExercisesLibrary, refetchUserExercisesLibrary } = useContext(
    UserExercisesLibraryContext
  );

  const [userExercisesLibraryStrArr, setUserExercisesLibraryStrArr] = useState<
    string[]
  >([]);

  const [exerciseSelected, setExerciseSelected] = useState(() => {
    if (userExercisesLibrary.length > 0) {
      if (exerciseName) {
        return userExercisesLibrary[0].exercises.find(
          (exercise: IUserExercisesLibrary) =>
            exercise.name.toLocaleUpperCase() ===
            exerciseName.toLocaleUpperCase()
        );
      } else {
        return userExercisesLibrary[0].exercises[0];
      }
    }
    return null; // Or some default value
  });

  const [statisticsOptions, setStatisticsOptions] = useState(() => {
    return getStatisticOptions(exerciseSelected) || null;
  });

  const [selectedKPI, setSelectedKPI] = useState(() => {
    if (statisticsOptions && statisticsOptions.length > 0) {
      return statisticsOptions[0].label;
    }
    return ""; // Or some default/fallback value
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const [selectedDataGroup, setSelectedDataGroup] = useState("day");

  const [modeledData, setModeledData] = useState<
    { exerciseDate: string; value: number }[]
  >([{ exerciseDate: "2023-12-12", value: 5 }]);

  const [weightForRepsModeledData, setWeightForRepsModeledData] = useState<
    { date: string; reps6: number; reps8: number; reps12: number }[]
  >([{ date: "2023-11-7", reps6: 20, reps8: 15, reps12: 10 }]);

  useEffect(() => {
    if (userExercisesLibrary.length === 0) {
      const fetchData = async () => {
        await refetchUserExercisesLibrary();
        await refetchUserTrainingData();
      };

      fetchData();
    } else {
      const userExercisesLibraryStrArr = userExercisesLibrary[0].exercises
        .map((userExercise: IUserExercisesLibrary) =>
          capitalizeWords(userExercise.name)
        )
        .sort((a: string, b: string) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        );

      const tempSelectedExercise = exerciseName
        ? userExercisesLibrary[0].exercises.find(
            (exercise: IUserExercisesLibrary) =>
              exercise.name.toLocaleUpperCase() ===
              exerciseName.toLocaleUpperCase()
          )
        : userExercisesLibrary[0].exercises[0];

      setExerciseSelected(tempSelectedExercise);

      setUserExercisesLibraryStrArr(userExercisesLibraryStrArr);

      const tempStatisticsOptions = getStatisticOptions(tempSelectedExercise);

      setStatisticsOptions(tempStatisticsOptions);

      setSelectedKPI(tempStatisticsOptions[0].label);

      const modeledDataResult = fetchModeledDataForExercise(
        userTrainingData,
        userExercisesLibraryStrArr[0],
        selectedKPI,
        selectedTimeframe,
        selectedDataGroup
      );

      if (!modeledDataResult) {
        return;
      }

      // Check the dataType to determine how to handle the result
      if (
        modeledDataResult.dataType === "default" &&
        modeledDataResult?.standardData
      ) {
        setModeledData(modeledDataResult.standardData);
      } else if (
        modeledDataResult.dataType === "weightReps" &&
        modeledDataResult.weightRepsData
      ) {
        setWeightForRepsModeledData(modeledDataResult?.weightRepsData);
      }
    }
  }, [userExercisesLibrary, userTrainingData]);

  if (userExercisesLibrary.length === 0) {
    return (
      <LoadingScreenCircle text="Please wait, Vegeta is still shouting about being the Prince of all 2 Saiyans..." />
    );
  }

  const handleAutocompleteChange = (newValue: string | null) => {
    if (newValue) {
      const exercise = findExerciseByName(newValue);
      const newStatisticOptions = getStatisticOptions(exercise);
      setStatisticsOptions(newStatisticOptions);
      const newStatisticKPI = newStatisticOptions[0].label;
      setSelectedKPI(newStatisticKPI);

      setExerciseSelected(exercise);

      const modeledDataResult = fetchModeledDataForExercise(
        userTrainingData,
        newValue,
        newStatisticKPI,
        selectedTimeframe,
        selectedDataGroup
      );

      if (!modeledDataResult) {
        return;
      }

      // Check the dataType to determine how to handle the result
      if (
        modeledDataResult.dataType === "default" &&
        modeledDataResult?.standardData
      ) {
        setModeledData(modeledDataResult.standardData);
      } else if (
        modeledDataResult.dataType === "weightReps" &&
        modeledDataResult.weightRepsData
      ) {
        setWeightForRepsModeledData(modeledDataResult?.weightRepsData);
      }
    }
  };

  const handleKPISelectChange = (event: SelectChangeEvent<string>) => {
    const clickedKPI = event.target.value;
    setSelectedKPI(clickedKPI);

    const modeledDataResult = fetchModeledDataForExercise(
      userTrainingData,
      exerciseSelected.name,
      clickedKPI,
      selectedTimeframe,
      selectedDataGroup
    );

    if (!modeledDataResult) {
      return;
    }

    // Check the dataType to determine how to handle the result
    if (
      modeledDataResult.dataType === "default" &&
      modeledDataResult?.standardData
    ) {
      setModeledData(modeledDataResult.standardData);
    } else if (
      modeledDataResult.dataType === "weightReps" &&
      modeledDataResult.weightRepsData
    ) {
      setWeightForRepsModeledData(modeledDataResult?.weightRepsData);
    }
  };

  const valueToDisplay = (clickedKPI: string) => {
    const unitBasedKPIs = [
      "Estimated 1RM",
      "Max Weight",
      "Max Volume",
      "Max Weight For Reps",
      "Workout Volume",
      "Max Weight for Reps",
    ];
    const repBasedKPIs = ["Max Reps", "Workout Reps"];

    if (unitBasedKPIs.includes(clickedKPI)) {
      return currentUserData.unitsSystem === "metric" ? "kg" : "lbs";
    } else if (repBasedKPIs.includes(clickedKPI)) {
      return "reps";
    }
  };

  const handleStandardTimeframeChange = (option: any) => {
    const clickedTimeframe = option;
    setSelectedTimeframe(clickedTimeframe); // Update the selected timeframe

    const modeledDataResult = fetchModeledDataForExercise(
      userTrainingData,
      exerciseSelected.name,
      selectedKPI,
      clickedTimeframe,
      selectedDataGroup
    );

    if (!modeledDataResult) {
      return;
    }

    // Check the dataType to determine how to handle the result
    if (
      modeledDataResult.dataType === "default" &&
      modeledDataResult?.standardData
    ) {
      setModeledData(modeledDataResult.standardData);
    } else if (
      modeledDataResult.dataType === "weightReps" &&
      modeledDataResult.weightRepsData
    ) {
      setWeightForRepsModeledData(modeledDataResult?.weightRepsData);
    }
  };

  const handleSelectedDataGroupChange = (option: any) => {
    const clickedDataGroup = option;
    setSelectedDataGroup(clickedDataGroup); // Update the selected timeframe

    const modeledDataResult = fetchModeledDataForExercise(
      userTrainingData,
      exerciseSelected.name,
      selectedKPI,
      selectedTimeframe,
      clickedDataGroup
    );

    if (!modeledDataResult) {
      return;
    }

    // Check the dataType to determine how to handle the result
    if (
      modeledDataResult.dataType === "default" &&
      modeledDataResult?.standardData
    ) {
      setModeledData(modeledDataResult.standardData);
    } else if (
      modeledDataResult.dataType === "weightReps" &&
      modeledDataResult.weightRepsData
    ) {
      setWeightForRepsModeledData(modeledDataResult?.weightRepsData);
    }
  };

  const findExerciseByName = (name: string) => {
    return userExercisesLibrary[0].exercises.find(
      (exercise: IUserExercisesLibrary) =>
        exercise.name.toLocaleUpperCase() === name.toLocaleUpperCase()
    );
  };

  return (
    <Container
      maxWidth="md"
      sx={{ height: "100%", width: "100%", paddingBottom: "64px" }}
    >
      <Box paddingBottom="16px" display="flex" flexDirection="column">
        {!exerciseName && (
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
        )}

        <Select
          sx={{
            width: "100%",
            marginTop: "8px",
          }}
          onChange={handleKPISelectChange}
          value={selectedKPI}
        >
          {statisticsOptions &&
            statisticsOptions.map((option: { label: string }) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
        </Select>

        <Typography variant="subtitle1">Select timeframe ({selectedTimeframe})</Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          fullWidth={true}
        >
          {timeframeOptions.map((option) => (
            <Button
              key={option.label}
              style={{ flexGrow: 1 }}
              onClick={() => handleStandardTimeframeChange(option.value)}
              sx={{ backgroundColor: "#520975" }}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>

        <Typography variant="subtitle1">Interval grouped data ({selectedDataGroup})</Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined secondary button group"
          fullWidth={true}
        >
          {intervalOptions.map((option) => (
            <Button
              key={option.label}
              style={{ flexGrow: 1 }}
              onClick={() => handleSelectedDataGroupChange(option.value)}
              sx={{ backgroundColor: "#FFA500" }}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {modeledData?.length === 0 ? (
        <Box
          display="flex"
          minHeight="500px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <NoAvailableDataBox />
        </Box>
      ) : selectedKPI !== "Max Weight for Reps" ? (
        <ResponsiveContainer minHeight="500px">
          <LineChart
            width={500}
            height={500}
            data={modeledData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 1,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="exerciseDate" />
            <YAxis
              width={25}
              fontSize={12}
              label={{
                value: valueToDisplay(selectedKPI),
                angle: -90,
                position: "insideBottomLeft",
              }}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
            />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#520975"
              strokeWidth="4"
              dot={{ fill: "#2e4355", stroke: "#520975", strokeWidth: 2, r: 4 }}
              activeDot={{
                fill: "#2e4355",
                stroke: "#8884d8",
                strokeWidth: 5,
                r: 10,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer minHeight="500px">
          <LineChart
            width={500}
            height={500}
            data={weightForRepsModeledData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 1,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              width={30}
              fontSize={12}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
              label={{
                value: valueToDisplay(selectedKPI),
                angle: -90,
                position: "insideBottomLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="reps6"
              stroke="#520975"
              strokeWidth="4"
              dot={{ fill: "#2e4355", stroke: "#520975", strokeWidth: 2, r: 5 }}
              activeDot={{
                fill: "#2e4355",
                stroke: "#8884d8",
                strokeWidth: 5,
                r: 10,
              }}
            />
            <Line
              type="monotone"
              dataKey="reps8"
              stroke="#000000"
              strokeWidth="4"
              dot={{ fill: "#2e4355", stroke: "#520975", strokeWidth: 2, r: 5 }}
              activeDot={{
                fill: "#2e4355",
                stroke: "#8884d8",
                strokeWidth: 5,
                r: 10,
              }}
            />
            <Line
              type="monotone"
              dataKey="reps12"
              stroke="#FFA500"
              strokeWidth="4"
              dot={{ fill: "#2e4355", stroke: "#520975", strokeWidth: 2, r: 5 }}
              activeDot={{
                fill: "#2e4355",
                stroke: "#8884d8",
                strokeWidth: 5,
                r: 10,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
}

export default ExerciseDetailsGraph;
