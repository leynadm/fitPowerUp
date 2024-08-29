import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IUserFeatsDataEntry } from "../../utils/interfaces/IUserFeats";
import formatNumber from "../../utils/formatNumber";
import Rating from "@mui/material/Rating";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import StarsIcon from "@mui/icons-material/Stars";
import { VariableSizeList } from "react-window";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import { AuthContext } from "../../context/Auth";
import { UserFeatsDataContext } from "../../context/UserFeatsData";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
function ProgressGraph() {
  const { userFeatsData, refetchUserFeatsData } =
    useContext(UserFeatsDataContext);
  const { currentUserData } = useContext(AuthContext);
  const [filterSelection, setFilterSelection] = useState("All");

  const userFeatsDataArr = getFilteredUserFeatsArr();
  const { userExercisesLibrary } = useContext(UserExercisesLibraryContext);
  useEffect(() => {
    const fetchData = async () => {
      if (userFeatsData.length === 0) {
        await refetchUserFeatsData();
      }
    };

    fetchData().catch(console.error); // Handle errors
  }, [userFeatsData]);

  function getFilteredUserFeatsArr() {
    const userFeatsDataArr = userFeatsData;
    if (filterSelection === "All") {
      return userFeatsDataArr;
    } else if (filterSelection === "Complete") {
      const filteredFeatsDataArr = userFeatsDataArr.filter(
        (item: IUserFeatsDataEntry) => item.state === true
      );
      return filteredFeatsDataArr;
    } else if (filterSelection === "Incomplete") {
      const filteredFeatsDataArr = userFeatsDataArr.filter(
        (item: IUserFeatsDataEntry) => item.state === false
      );
      return filteredFeatsDataArr;
    }
  }

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const featEntry = userFeatsDataArr[index];

    const customStyle: React.CSSProperties = {
      ...style,
    };

    const variableObjective = checkVariableRecord(
      featEntry.type,
      featEntry.featValue
    );

    function checkVariableRecord(type: string, featValue: number) {
      const userWeightMeasurementChoice =
        currentUserData.unitsSystem === "metric" ? "kg" : "lbs";

      if (type === "Volume") {
        if (userWeightMeasurementChoice === "kg") {
          const formattedNumber = formatNumber(featValue);
          return `${formattedNumber} kg`;
        } else {
          const formattedNumber = formatNumber(featValue * 2.2);
          return `${formattedNumber} lbs`;
        }
      }
    }

    return (
      <Box sx={{ width: "100%" }} style={customStyle} key={index}>
        <Typography sx={{  paddingTop: "8px",fontSize:"1.25rem" }}>
          {featEntry.name}
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Typography variant="overline" color="text.secondary">
            {featEntry.feat} {variableObjective}
          </Typography>
          {featEntry.state && (
            <CheckCircleIcon fontSize="small" sx={{ color: "#520975" }} />
          )}
        </Box>

        <Box display="flex" alignItems="center" sx={{ marginBottom: 0 }}>
          <Typography variant="subtitle2">Difficulty: </Typography>
          <Rating
            icon={<StarsIcon fontSize="inherit" />}
            name="read-only"
            value={featEntry.level}
            max={7}
            readOnly
            size="small"
            sx={{ color: "#FFA500" }}
          />
        </Box>

        <Box sx={{ position: "relative", width: "100%" }}>
          {featEntry.state ? (
            <TextField
              id="filled-basic"
              variant="outlined"
              InputProps={{
                readOnly: true,
                sx: {
                  // Apply styles to the input element
                  input: {
                    paddingTop: 0,
                    margin:0
                     // Example padding value, adjust as needed
                  },
                }
              }}
              maxRows={4}
              size="small"
              
              defaultValue={featEntry.description}
              sx={{
                width: "100%",
                background:"orange",
              }}
              multiline
            />
          ) : (
            <Box height="64px" width="100%" borderRadius="4px"></Box>
          )}
          {!featEntry.state && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "72px",
                  width: "100%",
                  borderRadius: "4px",
                  backgroundColor: "rgba(239, 239, 239, 1)", // Semi-transparent overlay
                  pointerEvents: "none", // To keep the text field interactable
                }}
              />

              <LockIcon
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "black", // Adjust color as needed
                  fontSize: "2rem", // Adjust size as needed
                }}
              />
            </>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"

    >
      {/* 
      <Button onClick={loopThroughData}>Check Data</Button>
       */}
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="All"
          name="radio-buttons-group"
          row
        >
          <FormControlLabel
            value="All"
            control={<Radio />}
            label="All"
            onChange={() => setFilterSelection("All")}
          />
          <FormControlLabel
            value="Complete"
            control={<Radio />}
            label="Complete"
            onChange={() => setFilterSelection("Complete")}
          />
          <FormControlLabel
            value="Incomplete"
            control={<Radio />}
            label="Incomplete"
            onChange={() => setFilterSelection("Incomplete")}
          />
        </RadioGroup>
      </FormControl>

      {userFeatsData.length === 0 ? (
        <LoadingScreenCircle text="Waiting for Piccolo to finish his dramatic entrance..." />
      ) : (
        <VariableSizeList
          height={window.innerHeight - 200}
          itemCount={userFeatsDataArr.length}
          itemSize={(index) => {
            const featEntry = userFeatsDataArr[index];
            const charactersNo = featEntry.description.length;
            const numberOfDescriptionRows = Math.ceil(charactersNo / 42);
            const totalDescriptionRowsHeight = numberOfDescriptionRows * 18;
            return totalDescriptionRowsHeight + 140;
          }}
          width="100%"
        >
          {Row}
        </VariableSizeList>
      )}
    </Box>
  );
}

export default ProgressGraph;
