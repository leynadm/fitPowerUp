import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import IPresetWorkoutData from "../../../utils/interfaces/IPresetWorkoutsData";
import { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import capitalizeWords from "../../../utils/capitalizeWords";
import IPresetRoutineData from "../../../utils/interfaces/IPresetRoutineData";
import { TextField } from "@mui/material";
interface WorkoutCardProps {
  workoutData: IPresetWorkoutData;
  routine: IPresetRoutineData;
}

function WorkoutCard({ workoutData, routine }: WorkoutCardProps) {
  const navigate = useNavigate();

  const [exerciseImagesSrc, setExerciseImagesSrc] = useState<string[]>([]);

  useEffect(() => {
    const fetchImageURL = async () => {
      let exerciseImageRef;

      const tempImagesLinkArr: string[] = [];

      for (let index = 0; index < workoutData.wOvr.length; index++) {
        const exerciseName = workoutData.wOvr[index];

        exerciseImageRef = ref(
          storage,
          `assets/exercises-assets-small-size/${exerciseName.replaceAll(
            " ",
            "-"
          )}.jpg`
        );

        try {
          const url = await getDownloadURL(exerciseImageRef);
          tempImagesLinkArr.push(url);
        } catch (error) {
          //toast.error("Oops, there was an error fetching the image!");
          console.error("Error fetching image:", error);
        }
      }

      setExerciseImagesSrc(tempImagesLinkArr);
    };

    fetchImageURL();
  }, [workoutData]); //

  return (
    <Card variant="outlined" sx={{  height: "100%" }}>
      <CardContent sx={{ pt: 0 }}>
        <Typography
          align="center"
          color="text.secondary"
          variant="h6"
          gutterBottom
        >
          {capitalizeWords(workoutData.wName)}
        </Typography>

        <TextField
          id="outlined-read-only-input"
          value={workoutData.wDesc}
          multiline
          maxRows={6}
          fullWidth
          slotProps={{
            input:{
              readOnly:true,
              sx:{
                padding:1,
                fontFamily:"Raleway",
                fontWeight:700,
                color:"text.secondary"
              }

            }
          }}
          variant="outlined"
        />

        <Box pt={1} display="flex" flexDirection="column">
          <Typography sx={{ color: "text.secondary", fontSize: "1rem" }}>
            Workout Exercises
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(3, 1fr)", // 3 columns on extra-small screens
              sm: "repeat(3, 1fr)", // 5 columns on small screens and above
            }}
            gap={1}
          >
            {exerciseImagesSrc.length > 0
              ? exerciseImagesSrc.map((imageSrc, index) => (
                  <Box
                    key={index}
                    minHeight={{ xs: "48px", sm: "128px" }}
                    height={{ xs: "48px", sm: "128px" }}
                    width={{ xs: "85px", sm: "228px" }}
                  >
                    <img
                      src={imageSrc}
                      alt=""
                      style={{
                        height: "100%",
                        width: "auto",
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                ))
              : Array.from({
                  length: workoutData.wOvr.length,
                }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    sx={{
                      width: { xs: "85px", sm: "228px" },
                      height: { xs: "48px", sm: "128px" },
                      borderRadius: "4px",
                    }}
                  />
                ))}
          </Box>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          paddingTop: 0,
          position: "relative",
        }}
      >
        <Button
          onClick={() =>
            navigate(`workout-details/${workoutData.wName}`, {
              state: { workoutData, routine },
            })
          }
          sx={{ color: "text.secondary", fontSize: "1rem" }}
        >
          Go To Workout
        </Button>
      </CardActions>
    </Card>
  );
}

export default WorkoutCard;
