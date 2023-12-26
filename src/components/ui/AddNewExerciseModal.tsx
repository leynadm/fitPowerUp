import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import toast from "react-hot-toast";
import getExercisesMuscleGroups from "../../utils/firebaseDataFunctions/getExercisesMuscleGroups";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
import capitalizeWords from "../../utils/capitalizeWords";
import { IUserExercisesLibrary } from "../../utils/interfaces/IUserExercisesLibrary";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Theme, useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { AuthContext } from "../../context/Auth";
import createNewExercise from "../../utils/firebaseDataFunctions/createNewExercise";
import { Typography } from "@mui/material";
interface ParentProps {
  openAddNewExerciseModal: boolean;
  setOpenAddNewExerciseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddNewExerciseModal({
  openAddNewExerciseModal,
  setOpenAddNewExerciseModal,
}: ParentProps) {
  const [exerciseName, setExerciseName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");

  const { currentUser, currentUserData } = useContext(AuthContext);
  const { userExercisesLibrary, refetchUserExercisesLibrary } = useContext(
    UserExercisesLibraryContext
  );

  
  const [exercisesMuscleGroupsArr, setExercisesMuscleGroupsArr] = useState<
    string[]
  >(getExercisesMuscleGroups(userExercisesLibrary));

  const [muscleGroupSwitchOption, setMuscleGroupSwitchOption] = useState(
    "Existing Muscle Group"
  );

  const [exerciseType, setExerciseType] = useState<string>("");
  const [equipment, setEquipment] = useState<string>("");
  const [musclesInvolved, setMusclesInvolved] = useState<string[]>([]);

  const theme = useTheme();
  const userExercisesLibraryStrArr = userExercisesLibrary[0].exercises
    .map((userExercise: IUserExercisesLibrary) =>
      userExercise.name.toLocaleLowerCase()
    )
    .sort((a: string, b: string) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

  const exerciseTypes = [
    "strength",
    "stretch",
    "mobility",
    "recovery",
    "balance",
    "cardio",
    "flexibility",
    "functional",
  ];

  const handleClose = () => setOpenAddNewExerciseModal(false);

  const muscleInvolvedArr = [
    "abdominals",
    "ankles",
    "anterior deltoids",
    "biceps",
    "calves",
    "deltoids",
    "elbow flexors",
    "fingers",
    "forearms",
    "glutes",
    "grip",
    "hamstrings",
    "hip abductors",
    "hip adductors",
    "hip flexors",
    "hip rotators",
    "lateral deltoids",
    "lats",
    "lower back",
    "middle back",
    "neck",
    "obliques",
    "pectoralis major",
    "peroneals",
    "piriformis",
    "quadriceps",
    "rear deltoids",
    "rotator cuff",
    "scapular muscles",
    "seratus anterior",
    "shoulders",
    "traps",
    "triceps",
    "upper back",
    "wrists",
  ];

  const typeOptions = [
    { label: "Weight and Reps", value: ["weight", "reps"] },
    { label: "Weight and Distance", value: ["weight", "distance"] },
    { label: "Weight and Time", value: ["weight", "time"] },
    { label: "Reps and Distance", value: ["reps", "distance"] },
    { label: "Reps and Time", value: ["reps", "time"] },
    { label: "Distance and Time", value: ["distance", "time"] },
    { label: "Weight", value: ["weight"] },
    { label: "Reps", value: ["reps"] },
    { label: "Distance", value: ["distance"] },
    { label: "Time", value: ["time"] },
  ];
  const [measurement, setMeasurement] = useState<{
    label: string;
    value: string[];
  }>({ label: "Weight and Reps", value: ["weight", "reps"] });


  const isFormValid = () => {
    if (exerciseName.trim() === "") {
      toast.error("Please add an exercise name!");
      return false;
    }

    if (muscleGroup === "") {
      toast.error("Please fill in the muscle group field!");
      return false;
    }

    if (exerciseType === "") {
      toast.error("Please choose the exercise type!");
      return false;
    }
    if (musclesInvolved.length === 0) {
      toast.error("Please choose the involved muscles!");
      return false;
    }

    if (
      !measurement ||
      measurement.label === "" ||
      measurement.value.length === 0
    ) {
      toast.error("Please choose a measurement option!");
      return false;
    }

    if (equipment === "") {
      toast.error("Please fill in the equipment field!");
      return false;
    }

    return true;
  };

  async function handleCreateNewExercise() {

    const formValidity = isFormValid()

    if(!formValidity){
      return
    }


    if (userExercisesLibraryStrArr.includes(exerciseName.toLocaleLowerCase())) {
      toast.error(`${capitalizeWords(exerciseName)} already exists!`);
      return;
    }

    let defaultImage;
    if (currentUserData.sex === "male") {
      defaultImage = "default_img_m";
    } else {
      defaultImage = "default_img_f";
    }

    const equipmentArr = []
    equipmentArr.push(equipment)
    const newlyCreatedExercise = {
      group: muscleGroup,
      id: defaultImage,
      name: exerciseName.toLocaleLowerCase(),
      measurement: measurement.value,
      type: "strength",
      favorite: false,
      equipment: equipmentArr,
      multi: false,
      mInvolved: musclesInvolved,
      erase: true,
    };

    try {
      await createNewExercise(currentUser.uid,newlyCreatedExercise)
      await refetchUserExercisesLibrary();
      toast.success('Exercise was created successfully!')
      handleClose()
    } catch (error) {}
  }

  const handleChange = (event: SelectChangeEvent<typeof musclesInvolved>) => {
    const {
      target: { value },
    } = event;

    const tempArr: string[] = [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index];

      tempArr.push(element);
    }

    setMusclesInvolved(tempArr);
  };

  const isWorkoutRoutineChecked = () => {
    return muscleGroupSwitchOption === "Existing Muscle Group" ? true : false;
  };

  function handleRoutineCheck() {
    if (muscleGroupSwitchOption === "Existing Muscle Group") {
      setMuscleGroupSwitchOption("New Muscle Group");
      setMuscleGroup("");
    } else {
      setMuscleGroupSwitchOption("Existing Muscle Group");
      setMuscleGroup("");
    }
  }

  return (
    <Box>
      <Modal
        open={openAddNewExerciseModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" variant="h6">
            Create New Exercise
          </Typography>
          <TextField
            required
            id="filled-required"
            label="New Exercise Name"
            variant="filled"
            sx={{
              width: "100%",
            }}
            onChange={(e) => setExerciseName(e.target.value)}
          />

          <FormControlLabel
            control={<Switch />}
            checked={isWorkoutRoutineChecked()}
            onChange={handleRoutineCheck}
            label={
              muscleGroupSwitchOption === "Existing Muscle Group"
                ? "Existing Muscle Group"
                : "New Muscle Group"
            }
          />

          {muscleGroupSwitchOption === "Existing Muscle Group" ? (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={exercisesMuscleGroupsArr}
              sx={{ width: "100%" }}
              value={capitalizeWords(muscleGroup)}
              onChange={(event, newValue: string | null) =>
                setMuscleGroup(newValue || "")
              }

              renderInput={(params) => (
                <TextField {...params} 
                label={muscleGroup!==''?'Muscle Group' : 'Muscle Group *'}
                required={muscleGroup!==''} />
              )} 
            />
          ) : (
            <TextField
              required
              id="filled-required"
              label="New Muscle Group"
              variant="filled"
              sx={{
                width: "100%",
              }}
              // Add the necessary logic to update the muscleGroup state for the Textfield
              onChange={(e) => setMuscleGroup(e.target.value)}
            />
          )}

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={exerciseTypes}
            sx={{ width: "100%", marginTop: "1rem", pb: 2 }}
            value={capitalizeWords(exerciseType)}
            ListboxProps={{
              style: { maxHeight: "225px", overflow: "auto" }, // Set your desired fixed height here
            }}
            onChange={(event, newValue: string | null) =>
              setExerciseType(newValue || "")
            }
            renderInput={(params) => (
              <TextField {...params} 
              label={exerciseType!==''?'Exercise Type' : 'Exercise Type *'}
              required={exerciseType!==''} />
            )} 

          />

          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-multiple-chip-label">
              Muscles Involved
            </InputLabel>
            <Select
              required
              className="MuiOutlinedInput-notchedOutline"
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={musclesInvolved}
              fullWidth
              onChange={handleChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Muscles Involved"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {muscleInvolvedArr.map((involvedMuscle) => (
                <MenuItem
                  key={involvedMuscle}
                  value={involvedMuscle}
                  style={getStyles(involvedMuscle, musclesInvolved, theme)}
                >
                  {involvedMuscle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Autocomplete
            disablePortal
            id="measurement-input"
            sx={{ width: "100%", pt: "1rem", pb: "1rem" }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Measurement Options *" />
            )}
            ListboxProps={{
              style: { maxHeight: "225px", overflow: "auto" }, // Set your desired fixed height here
            }}
            options={[...typeOptions]}
            value={measurement}
            onChange={(event, newValue) => {
              if (newValue) {
                const selectedValue = newValue as {
                  label: string;
                  value: string[];
                };
                setMeasurement(selectedValue);
              } 
            }}
            isOptionEqualToValue={(option, value) => {
              if (value === null) {
                return option.label === "" && option.value.length === 0;
              }
              return (
                value.label === option.label &&
                value.value.length === option.value.length
              );
            }}
          />

          <TextField
            required
            id="filled-required"
            label="Equipment Used"
            variant="outlined"
            placeholder="Add one piece of equipment used"
            value={equipment}
            sx={{
              width: "100%",
            }}
            onChange={(e) => setEquipment(e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              variant="dbz_save"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
              disabled={!isFormValid}
              onClick={handleCreateNewExercise}
            >
              Save
            </Button>
            <Button
              variant="dbz_clear"
              sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default AddNewExerciseModal;
