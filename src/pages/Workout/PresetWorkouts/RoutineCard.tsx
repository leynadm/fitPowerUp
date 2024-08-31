import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";
import IPresetRoutineData from "../../../utils/interfaces/IPresetRoutineData";
import { Skeleton } from "@mui/material";

function RoutineCard({ routine }: { routine: IPresetRoutineData }) {
  const [exerciseImagesSrc, setExerciseImagesSrc] = useState<string[]>([]);
  const [exercisesLimitCheck, setExercisesLimitCheck] = useState(false);

  const uniqueStrings = Array.from(
    new Set(routine.rWorkouts.flatMap((workout) => workout.wOvr)));

  useEffect(() => {
    const fetchImageURL = async () => {
      let exerciseImageRef;

      const tempImagesLinkArr: string[] = [];

      for (let index = 0; index < uniqueStrings.length; index++) {
        if (index > 5) {
          setExercisesLimitCheck(true);
          break;
        }

        const exerciseName = uniqueStrings[index];

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
  }, []); 

  const encodedParameter = encodeURIComponent(routine.rName);

  const navigate = useNavigate();

  return (
    <Card elevation={4} sx={{ backgroundColor: "#fafafa" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography align="center" color="#1c4595" variant="h6" gutterBottom>
          {routine.rName}
        </Typography>
        <Typography
          variant="subtitle2"
          p={0}
          m={0}
          align="right"
          component="div"
          color="#1c4595"
        >
          by {routine.rBy}
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box display="flex" gap={1}>
            <Typography color="text.secondary" fontSize="1.5rem">
              {routine.rWorkouts.length} Workouts
            </Typography>
            <Typography color="text.secondary" fontSize="1.5rem">
              {" "}
              -{" "}
            </Typography>

            <Typography color="text.secondary" fontSize="1.5rem">
              {uniqueStrings.length} Exercises
            </Typography>
          </Box>

          <Box
            width="100%"
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
                    minHeight={{ xs: "64px", sm: "128px" }}
                    height={{ xs: "64px", sm: "128px" }}
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
                  length: uniqueStrings.length>6?6:uniqueStrings.length,
                }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    sx={{
                      width: { xs: "85px", sm: "228px" },
                      height: { xs: "64px", sm: "128px" },
                      borderRadius: "4px",
                    }}
                  />
                ))}
          </Box>
          {exercisesLimitCheck && (
            <Typography color="text.secondary" fontSize="1.5rem">
              ...
            </Typography>
          )}
        </Box>

        <TextField
          id="outlined-read-only-input"
          defaultValue={routine.rDesc}
          multiline
          maxRows={5}
          fullWidth
          InputProps={{
            readOnly: true,
            sx: {
              fontFamily: "Acme, Arial, sans-serif",
              fontSize: "1rem",
              padding: 1,
            },
          }}
          variant="filled"
        />
      </CardContent>
      <CardActions
        sx={{
          paddingTop: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          onClick={() =>
            navigate(`preset-routine-details/${encodedParameter}`, {
              state: { routine },
            })
          }
          sx={{ color: "text.secondary", fontSize: "1rem" }}
        >
          Go To Routine
        </Button>

        {routine.rLink && (
          <Button
            size="small"
            component="a"
            target="_blank"
            href={routine.rLink}
            sx={{ color: "text.secondary", fontSize: "1rem" }}
          >
            Go To Source
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default RoutineCard;

/* 
             <img
              src={imageURL}
              alt=""
              loading="eager"
              style={{
                maxHeight: "512px",
                maxWidth: "512px",
                width: "100%",
                height: "auto", // Maintain aspect ratio
                minHeight: "100%",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                border: "2px solid orange",
              }}
              width="512px" // Set the width explicitly
              height="512px" // Set the height explicitly
            /> 
*/
