import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import getProgressExercises from "../../utils/progressFunctions/getProgressExercises";
interface Exercise {
  name: string;
  category: string;
  measurement: string;
  id: string;
}

export default function PowerLevelSelect(props: any) {
  const { setSelectedExercise,exerciseSelected } = props; // Destructure the prop

  const [allExercises, setAllExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const exercises: any = await getProgressExercises();
      const filteredExercises = exercises.filter(
        (exercise: Exercise) =>
          exercise.measurement.includes("weight") &&
          exercise.measurement.includes("reps")
      );
      setAllExercises(filteredExercises);
    };

    fetchExercises();
  }, []);

  const handleChange = (_: any, value: string | null) => {
    setSelectedExercise(value || null);
  };

  return (
    <Autocomplete
      value={exerciseSelected !== undefined ? exerciseSelected : "Deadlift"}
      disablePortal
      id="combo-box-demo"
      options={allExercises.map((exercise: any) => exercise.name)} // Extracting the 'name' property from each exercise object
      sx={{ width: "100%", paddingTop: "8px", paddingBottom: "8px" }}
      renderInput={(params) => (
        <TextField {...params} label="Pick an exercise" />
      )}
      onChange={handleChange} // Call handleChange on option selection
    />
  );
}
