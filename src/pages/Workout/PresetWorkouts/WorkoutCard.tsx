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
interface WorkoutCardProps {
  workoutData: IPresetWorkoutData;
}

const styles = {
  textOverflow: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical" as "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: 400,
  },
};

function WorkoutCard({ workoutData }: WorkoutCardProps) {
  const navigate = useNavigate();

  const [exerciseImagesSrc, setExerciseImagesSrc] = useState<string[]>([]);

  useEffect(() => {
    const fetchImageURL = async () => {
      let exerciseImageRef;

      const tempImagesLinkArr: string[] = [];

      for (
        let index = 0;
        index < workoutData.exercisesinRoutine.length;
        index++
      ) {
        const exerciseName = workoutData.exercisesinRoutine[index];

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
  }, []); //

  return (
    <Card elevation={4} sx={{ backgroundColor: "#fafafa" }}>
      <CardContent sx={{ pt: 0 }}>
        <Typography
          align="center"
          color="text.secondary"
          variant="h6"
          gutterBottom
        >
          {capitalizeWords(workoutData.workoutName)}
        </Typography>
        <Typography variant="caption">Workout Description</Typography>
        <Typography style={styles.textOverflow as React.CSSProperties}>
          {workoutData.workoutDescription}
        </Typography>

        <Box pt={1} display="flex" flexDirection="column">
          <Typography variant="caption">Workout Exercises</Typography>
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
                  length: workoutData.exercisesinRoutine.length,
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
          size="small"
          onClick={() => navigate(`workout-details/${workoutData.workoutName}`)}
        >
          Go To Workout
        </Button>
      </CardActions>
    </Card>
  );
}

export default WorkoutCard;
