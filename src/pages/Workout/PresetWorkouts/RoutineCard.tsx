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
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchImageURL = async () => {
      let exerciseImageRef;

      if (routine.rImg !== "") {
        exerciseImageRef = ref(
          storage,
          `assets/workout-and-routines/preset-thumbnails/${routine.rImg}.webp`
        );
      } else {
        exerciseImageRef = ref(
          storage,
          `assets/workout-and-routines/preset-thumbnails/r-def.webp`
        );
      }

      try {
        const url = await getDownloadURL(exerciseImageRef);
        setImageURL(url);
      } catch (error) {
        //toast.error("Oops, there was an error fetching the image!");
        console.error("Error fetching image:", error);
      } finally {
        setIsLoading(false); // Stop loading whether there was an error or not
      }
    };

    fetchImageURL();
  }, []); // Dependency array includes index and userExercise

  const encodedParameter = encodeURIComponent(routine.rName);

  const navigate = useNavigate();

  return (
    <Card elevation={4} sx={{ backgroundColor: "#fafafa" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          align="center"
          color="text.secondary"
          variant="h6"
          gutterBottom
        >
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
          minHeight={350}
        >
          {imageURL === "" ? (
            <Skeleton height={350} width="100%" />
          ) : (
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
          )}
        </Box>

        <TextField
          id="outlined-read-only-input"
          label="Description"
          defaultValue={routine.rDesc}
          multiline
          maxRows={5}
          size="small"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
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
          sx={{ color: "#1c4595" }}
        >
          Go To Routine
        </Button>

        {routine.rLink && (
          <Button
            size="small"
            component="a"
            target="_blank"
            href={routine.rLink}
          >
            Go To Source
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default RoutineCard;
