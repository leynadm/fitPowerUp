import { useContext, useEffect } from "react";
import { UserTrainingDataContext } from "../../context/UserTrainingData";
import Container from "@mui/material/Container";
import { Select, MenuItem } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import NoAvailableDataBox from "../../components/ui/NoAvailableDataBox";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
import {
  timeframeOptions,
  intervalOptions,
  statisticsOptionsMuscleGroups,
} from "../../utils/completedWorkoutsChartFunctions/statisticsOptions";
import { SelectChangeEvent } from "@mui/material";
import fetchModeledData from "../../utils/completedWorkoutsChartFunctions/muscleGroupsFunctions/utility/fetchModeledData";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
import getExercisesMuscleGroups from "../../utils/firebaseDataFunctions/getExercisesMuscleGroups";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../context/Auth";
function MuscleGroupsAnalysis() {
  const { userTrainingData,refetchUserTrainingData } = useContext(UserTrainingDataContext);

  const { userExercisesLibrary,refetchUserExercisesLibrary } = useContext(UserExercisesLibraryContext);

  const { currentUserData } = useContext(AuthContext);

  const [exercisesMuscleGroupsArr,setExercisesMuscleGroupsArr] = useState<string[]>(getExercisesMuscleGroups(userExercisesLibrary))
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(
    exercisesMuscleGroupsArr[0]
  );
  const [selectedKPI, setSelectedKPI] = useState(
    statisticsOptionsMuscleGroups[0].label
  );
  const [selectedDataGroup, setSelectedDataGroup] = useState("day");
  const [modeledData, setModeledData] = useState<
    { exerciseDate: string; value: number }[] | undefined | []
  >([]);

  useEffect(() => { 

    if(userExercisesLibrary.length>0){
      const tempExercisesMuscleGroupsArr = getExercisesMuscleGroups(userExercisesLibrary)
      tempExercisesMuscleGroupsArr.push("Total")
      setExercisesMuscleGroupsArr(tempExercisesMuscleGroupsArr)
      setSelectedMuscleGroup(tempExercisesMuscleGroupsArr[0])
    } else {
      const fetchData = async () => {
        await refetchUserExercisesLibrary();
        await refetchUserTrainingData();
      };
      fetchData();
    }

    setModeledData(
      fetchModeledData(
        userTrainingData,
        exercisesMuscleGroupsArr[0],
        selectedKPI,
        selectedTimeframe,
        selectedDataGroup
      )
    );

  }, [userExercisesLibrary,userTrainingData]);
  

  const handleMuscleGroupSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedMuscleGroup = event.target.value;
    setSelectedMuscleGroup(selectedMuscleGroup);
    setModeledData(
      fetchModeledData(
        userTrainingData,
        selectedMuscleGroup,
        selectedKPI,
        selectedTimeframe,
        selectedDataGroup
      )
    );
  };

  const handleKPISelectChange = (event: SelectChangeEvent<string>) => {
    const selectedKPI = event.target.value;
    setSelectedKPI(selectedKPI);
    setModeledData(
      fetchModeledData(
        userTrainingData,
        selectedMuscleGroup,
        selectedKPI,
        selectedTimeframe,
        selectedDataGroup
      )
    );
  };

  const handleStandardTimeframeChange = (option: any) => {
    const clickedTimeframe = option;
    setSelectedTimeframe(clickedTimeframe); // Update the selected timeframe
    setModeledData(
      fetchModeledData(
        userTrainingData,
        selectedMuscleGroup,
        selectedKPI,
        clickedTimeframe,
        selectedDataGroup
      )
    );
  };

  const handleDataGroupChange = (option: any) => {
    const clickedDataGroup = option;
    setSelectedDataGroup(clickedDataGroup); // Update the selected timeframe
    setModeledData(
      fetchModeledData(
        userTrainingData,
        selectedMuscleGroup,
        selectedKPI,
        selectedTimeframe,
        clickedDataGroup
      )
    );
  };

  if(exercisesMuscleGroupsArr.length===0){
    return(
      <LoadingScreenCircle text="Please wait while we're charging up the Spirit Bomb..."/>
    )
  }

  const valueToDisplay = (clickedKPI: string) => {
    const unitBasedKPIs = ["Total Volume"];
    const repBasedKPIs = ["Total Reps"];
    const workoutsKPIs = ["Total Workouts"];
    const setsKPIs = ["Total Sets"];
    if (unitBasedKPIs.includes(clickedKPI)) {
      return currentUserData.unitsSystem === "metric" ? "kg" : "lbs";
    } else if (repBasedKPIs.includes(clickedKPI)) {
      return "reps";
    } else if (workoutsKPIs.includes(clickedKPI)) {
      return "workouts";
    } else if (setsKPIs.includes(clickedKPI)) {
      return "sets";
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ height: "100%", width: "100%", paddingBottom: "64px" }}
    >
      <Box paddingBottom="16px" display="flex" flexDirection="column">
        <Select
          sx={{
            width: "100%",
            marginTop: "8px",
          }}
          onChange={handleMuscleGroupSelectChange}
          value={selectedMuscleGroup}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 450, // Set the maximum height here
              },
            },
          }}
        >
          {exercisesMuscleGroupsArr.length>0 &&
            exercisesMuscleGroupsArr.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
              </MenuItem>
            ))}
        </Select>

        <Select
          sx={{
            width: "100%",
            marginTop: "8px",
          }}
          onChange={handleKPISelectChange}
          value={selectedKPI}
        >
          {statisticsOptionsMuscleGroups &&
            statisticsOptionsMuscleGroups.map((option: { label: string }) => (
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

        <Typography variant="subtitle1">Interval grouped data ({selectedDataGroup}) </Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined secondary button group"
          fullWidth={true}
        >
          {intervalOptions.map((option) => (
            <Button
              key={option.label}
              style={{ flexGrow: 1 }}
              onClick={() => handleDataGroupChange(option.value)}
              sx={{ backgroundColor: "#FFA500" }}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <ResponsiveContainer minHeight="500px">
        {modeledData && modeledData?.length > 0 ? (
          <LineChart
            width={500}
            height={500}
            data={modeledData}
            margin={{
              top: 10,
              right: 10,
              left: 15,
              bottom: 1,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="exerciseDate" fontSize={12} />
            <YAxis
              width={25}
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
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <NoAvailableDataBox />
          </Box>
        )}
      </ResponsiveContainer>
    </Container>
  );
}

export default MuscleGroupsAnalysis;
