import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  AreaChart,
  Area, 
  LabelList,
} from "recharts";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import { useContext } from "react";
import { BodyTrackerDataContext } from "../../context/BodyTrackerData";
import { IUserBodyTrackerDataEntry } from "../../utils/interfaces/IBodyTracker";
import { Select, MenuItem } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { timeframeOptions } from "../../utils/completedWorkoutsChartFunctions/statisticsOptions";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { IBodyTrackerGroupedData } from "../../utils/completedWorkoutsChartFunctions/utility/groupBodyTrackerDataByTimePeriodAvg";
import NoAvailableDataBox from "../../components/ui/NoAvailableDataBox";
import {
  statisticsOptionsBodyTracker,
  intervalOptions,
} from "../../utils/completedWorkoutsChartFunctions/statisticsOptions";
import groupBodyTrackerDataByTimePeriodAvg from "../../utils/completedWorkoutsChartFunctions/utility/groupBodyTrackerDataByTimePeriodAvg";
function BodyTrackerGraph() {
  const { userBodyTrackerData } = useContext(BodyTrackerDataContext);

  const [selectedDataGroup, setSelectedDataGroup] = useState("day");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");

  const userBodyTrackerDataArr = userBodyTrackerData;

  const [
    selectedStatisticsOptionsBodyTracker,
    setSelectedStatisticsOptionsBodyTracker,
  ] = useState(statisticsOptionsBodyTracker[0].label);
  userBodyTrackerDataArr.sort(
    (a: IUserBodyTrackerDataEntry, b: IUserBodyTrackerDataEntry) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateA.getTime() - dateB.getTime();
    }
  );

  const [bodyTrackerModeledData, setBodyTrackerModeledData] = useState<
    IBodyTrackerGroupedData[] | undefined | []
  >([]);

  useEffect(() => {
    setBodyTrackerModeledData(
      fetchBodyTrackerModeledData(
        userBodyTrackerDataArr,
        selectedStatisticsOptionsBodyTracker,
        selectedTimeframe,
        selectedDataGroup
      )
    );
  }, []);

  const handleStandardTimeframeChange = (option: any) => {
    const clickedTimeframe = option;
    setSelectedTimeframe(clickedTimeframe); // Update the selected timeframe
    setBodyTrackerModeledData(
      fetchBodyTrackerModeledData(
        userBodyTrackerDataArr,
        selectedStatisticsOptionsBodyTracker,
        clickedTimeframe,
        selectedDataGroup
      )
    );
  };

  const handleDataGroupChange = (option: string) => {
    const clickedDataGroup = option;
    setSelectedDataGroup(clickedDataGroup); // Update the selected timeframe
    setBodyTrackerModeledData(
      fetchBodyTrackerModeledData(
        userBodyTrackerDataArr,
        selectedStatisticsOptionsBodyTracker,
        selectedTimeframe,
        clickedDataGroup
      )
    );
  };

  const handleStatisticsBodyTrackerChange = (
    event: SelectChangeEvent<string>
  ) => {
    const selectedBodyTrackerOption = event.target.value;
    setSelectedStatisticsOptionsBodyTracker(selectedBodyTrackerOption);
    setBodyTrackerModeledData(
      fetchBodyTrackerModeledData(
        userBodyTrackerDataArr,
        selectedBodyTrackerOption,
        selectedTimeframe,
        selectedDataGroup
      )
    );
  };

  function handleGetGroupedData(
    bodyTrackerData: IUserBodyTrackerDataEntry[],
    kpi: string,
    timeframe: string,
    dataGroup: string
  ) {
    groupBodyTrackerDataByTimePeriodAvg(bodyTrackerData, dataGroup);

    const groupedData = groupBodyTrackerDataByTimePeriodAvg(
      bodyTrackerData,
      dataGroup
    );
    return groupedData;
  }

  const fetchBodyTrackerModeledData = (
    bodyTrackerData: IUserBodyTrackerDataEntry[],
    kpi: string,
    timeframe: string,
    dataGroup: string
  ) => {
    if (!selectedStatisticsOptionsBodyTracker) {
      return;
    }

    let data = handleGetGroupedData(bodyTrackerData, kpi, timeframe, dataGroup);
    return data;
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
          value={selectedStatisticsOptionsBodyTracker}
          onChange={handleStatisticsBodyTrackerChange}
        >
          {statisticsOptionsBodyTracker.map((stat: any, index) => (
            <MenuItem key={index} value={stat.label}>
              {stat.label}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="subtitle1" color="text.secondary">Select timeframe</Typography>
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

        <Typography variant="subtitle1" color="text.secondary">Interval grouped data</Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined secondary button group"
          fullWidth={true}
        >
          {intervalOptions.map((option) => (
            <Button
              key={option.label}
              style={{ flexGrow: 1 }}
              sx={{ backgroundColor: "#FFA500" }}
              onClick={() => handleDataGroupChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {bodyTrackerModeledData?.length !== 0 ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={500}
              height={200}
              data={bodyTrackerModeledData}
              syncId="bodyStats"
              margin={{
                top: 10,
                right: 5,
                left: 5,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={15} tick={{ dy: 10 }} 
              />
              <YAxis
                name="Weight"
                unit=" kg"
                fontSize={15}
                interval="preserveEnd"
              />
              <Tooltip />
              <Line
                type="monotone"
                name="Weight"
                dataKey="averageWeight"
                stroke="#520975"
                strokeWidth="4"
                dot={{
                  fill: "#2e4355",
                  stroke: "#520975",
                  strokeWidth: 2,
                  r: 5,
                }}
                activeDot={{
                  fill: "#2e4355",
                  stroke: "#8884d8",
                  strokeWidth: 5,
                  r: 10,
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={bodyTrackerModeledData}
              margin={{
                top: 25,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={15} tick={{ dy: 5 }} />
              <YAxis
                fontSize={15}
                dataKey="averageCaloricIntake"
                name="Caloric Intake"
                unit=" cal"
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                }
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="averageCaloricIntake"
                name="Caloric Intake"
                fill="#2e4355"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              >
                <LabelList
                  dataKey="averageCaloricIntake"
                  position="top"
                  formatter={(value: number) =>
                    new Intl.NumberFormat("en-US", {
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(value)
                  }
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              width={500}
              height={400}
              data={bodyTrackerModeledData}
              margin={{
                top: 15,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={15} tick={{ dy: 5 }} />
              <YAxis
                dataKey={`average${selectedStatisticsOptionsBodyTracker.replace(
                  /\s/g,
                  ""
                )}`}
                name={selectedStatisticsOptionsBodyTracker}
                fontSize={15}
              />

              <Tooltip />
              <Area
                type="monotone"
                dataKey={`average${selectedStatisticsOptionsBodyTracker.replace(
                  /\s/g,
                  ""
                )}`}
                stroke="#520975"
                fill="#FFA500"
                name={selectedStatisticsOptionsBodyTracker}
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      ) : (
        <Box
          display="flex"
          minHeight="500px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <NoAvailableDataBox />
        </Box>
      )}
    </Container>
  );
}

export default BodyTrackerGraph;
