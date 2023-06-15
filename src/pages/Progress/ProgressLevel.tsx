import React, { useState, useEffect,Dispatch,SetStateAction } from "react";
import Box from "@mui/material/Box";
import PowerLevelSelect from "./PowerLevelSelect";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import calculateMax1RM from "../../utils/progressFunctions/calculateMax1RM";
import calculateDOTS from "../../utils/progressFunctions/calculateDOTS";
import { useSpring, animated } from "react-spring";
import savePowerLevelEntry from "../../utils/CRUDFunctions/savePowerLevelEntry";
import getLastPowerLevelEntry from "./getLastPowerLevelEntry";

interface ProgressProps{
  powerLevel:number;
  setPowerLevel: Dispatch<SetStateAction<number>>;
}

interface PowerLevelNumberProps {
  n: number;
}

function PowerLevelNumber({ n }: PowerLevelNumberProps) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 50,
    config: { mass: 1, tension: 30, friction: 25 },
  });

  return (
    <animated.div style={{ fontSize: "5rem", color: "black" }}>
      {number.to((n) => n.toFixed(0))}
    </animated.div>
  );
}

function ProgressLevel({powerLevel,setPowerLevel}:ProgressProps) {
  const [weight, setWeight] = useState(0);
  const [firstExerciseSelected, setFirstExerciseSelected] = useState<any>(null);
  const [secondExerciseSelected, setSecondExerciseSelected] =
    useState<any>(null);
  const [thirdExerciseSelected, setThirdExerciseSelected] = useState<any>(null);


  function calculatePowerLevel() {
    console.log(
      { firstExerciseSelected },
      { secondExerciseSelected },
      { thirdExerciseSelected }
    );

    if (
      firstExerciseSelected !== null &&
      secondExerciseSelected !== null &&
      thirdExerciseSelected !== null &&
      weight !== 0
    ) {
      const firstExercisePromise = calculateMax1RM(
        firstExerciseSelected,
        "All"
      );
      const secondExercisePromise = calculateMax1RM(
        secondExerciseSelected,
        "All"
      );
      const thirdExercisePromise = calculateMax1RM(
        thirdExerciseSelected,
        "All"
      );

      Promise.all([
        firstExercisePromise,
        secondExercisePromise,
        thirdExercisePromise,
      ])
        .then(([firstExercise, secondExercise, thirdExercise]) => {
          const total: number = firstExercise + secondExercise + thirdExercise;
          const finalNumber = calculateDOTS(weight, total, false);
          setPowerLevel(finalNumber);
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          savePowerLevelEntry(
            finalNumber,
            weight,
            firstExerciseSelected.name,
            secondExerciseSelected.name,
            thirdExerciseSelected.name,
            currentDate
          );
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });

 

    }
  }

  useEffect(()=>{
    getLastPowerLevelEntry()
    .then((lastEntry:any) => {
      if (lastEntry) {
        // Handle the last entry
        setPowerLevel(lastEntry.score)
        setFirstExerciseSelected(lastEntry.first !== undefined ? lastEntry.first : "Deadlift");
        setSecondExerciseSelected(lastEntry.second !== undefined ? lastEntry.second : "Barbell Squat");
        setThirdExerciseSelected(lastEntry.third !== undefined ? lastEntry.third : "Flat Barbell Bench Press");
        setWeight(lastEntry.bodyweight)
      } else {
        // No entries found
        console.log("No entries found");
      }
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
  },[])


  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PowerLevelNumber n={powerLevel} />
      </Box>

      <TextField
        type="number"
        id="outlined-basic"
        label="Add your weight"
        value={weight}
        variant="filled"
        sx={{ marginTop: "8px", marginBottom: "8px", textAlign: "center" }}
        onChange={(e) => setWeight(parseInt(e.target.value))}
      />
      <PowerLevelSelect exerciseSelected={firstExerciseSelected} setSelectedExercise={setFirstExerciseSelected} />
      <PowerLevelSelect exerciseSelected={secondExerciseSelected} setSelectedExercise={setSecondExerciseSelected} />
      <PowerLevelSelect exerciseSelected={thirdExerciseSelected} setSelectedExercise={setThirdExerciseSelected} />

      <Button
        variant="contained"
        sx={{ width: "100%", marginTop: "8px" }}
        onClick={calculatePowerLevel}
      >
        Calculate Power Level
      </Button>
    </Container>
  );
}

export default ProgressLevel;
