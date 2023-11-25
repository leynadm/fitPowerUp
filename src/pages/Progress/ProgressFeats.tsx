import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import {
  IUserFeatsDataEntry,
  TrainingDataContext,
} from "../../context/TrainingData";

import Rating from "@mui/material/Rating";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import StarsIcon from "@mui/icons-material/Stars";
import { VariableSizeList } from "react-window";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import NoAvailableDataBox from "../../components/ui/NoAvailableDataBox";
function ProgressGraph() {
  const { userTrainingData, userFeatsData } = useContext(TrainingDataContext);

  const [filterSelection, setFilterSelection] = useState("All");

  const userFeatsDataArr = getFilteredUserFeatsArr();

  function getFilteredUserFeatsArr() {
    const userFeatsDataArr = userFeatsData[0].userFeatsData;
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

    return (
      <Box sx={{ width: "100%" }} style={customStyle} key={index}>
        <Typography sx={{ fontWeight: "bold", paddingTop: "8px" }}>
          {featEntry.name}
        </Typography>
        <Typography variant="overline" color="text.secondary">
          {featEntry.feat}
        </Typography>
        <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
          <Typography variant="subtitle2">Difficulty: </Typography>
          <Rating
            icon={<StarsIcon fontSize="inherit" />}
            name="read-only"
            value={featEntry.level}
            max={7}
            readOnly
            sx={{ color: "#FFA500" }}
          />
        </Box>

        <Box sx={{ position: "relative", width: "100%" }}>
          <TextField
            id="filled-basic"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
            defaultValue={featEntry.description}
            sx={{
              width: "100%",
              verticalAlign: "center",
              alignContent: "center",
              textAlign: "center",
              // Other styles...
            }}
            multiline
          />
          {!featEntry.state && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
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
      height="calc(100% - 95px)"
    >
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

      {userFeatsDataArr.length === 0 ? (
        <Box height="100%" justifyContent="center" display="flex">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <NoAvailableDataBox />
          </Box>
        </Box>
      ) : (
        <VariableSizeList
          height={window.innerHeight - 150}
          itemCount={userFeatsDataArr.length}
          itemSize={(index) => {
            const featEntry = userFeatsDataArr[index];
            const charactersNo = featEntry.description.length;
            const numberOfDescriptionRows = Math.ceil(charactersNo / 42);
            const totalDescriptionRowsHeight = numberOfDescriptionRows * 18;
            return totalDescriptionRowsHeight + 150;
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
