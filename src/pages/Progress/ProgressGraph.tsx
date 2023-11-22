import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import { TrainingDataContext } from "../../context/TrainingData";
import getFlattenedAllExerciseData from "../../utils/completedWorkoutsChartFunctions/utility/getFlattenedAllExerciseData";
function ProgressGraph() {

  const {userTrainingData} = useContext(TrainingDataContext)

  function calculateUserFeats(){

    const userTrainingDataArr = getFlattenedAllExerciseData(userTrainingData,"all")


  }
  
  return (
    <>
    <Button onClick={()=>calculateUserFeats}>Test</Button>
    </>
  );
}

export default ProgressGraph;
