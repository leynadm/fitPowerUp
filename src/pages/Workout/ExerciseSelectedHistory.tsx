import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Exercise from "../../utils/interfaces/Exercise";
import CommentIcon from "@mui/icons-material/Comment";
import ViewCommentModal from "../../components/ui/ViewCommentModal";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import Container from "@mui/material/Container";
import EditExerciseModal from "../../components/ui/EditExerciseModal";
import { VariableSizeList } from "react-window";

interface ExerciseSelectionProps {
  selectedExercise: { category: string; name: string; measurement: any[] };
  unitsSystem: string;
  weightIncrementPreference: number;
}

function ExerciseSelectedHistory({
  selectedExercise,
  unitsSystem,
  weightIncrementPreference
}: ExerciseSelectionProps) {
  const [openViewCommentModal, setOpenViewCommentModal] = useState(false);
  const [openEditExerciseModal, setOpenEditExerciseModal] = useState(false);
  const [exerciseCommentId, setExerciseCommentId] = useState(0);
  const [updateRenderTrigger, setUpdateRenderTrigger] = useState(0);
  const [existingExercises, setExistingExercises] = useState<
    { date: Date | string; exercises: Exercise[] }[]
  >([]);

  useEffect(() => {
    getExerciseHistory();
  }, []);

  useEffect(() => {
    getExerciseHistory();
  }, [updateRenderTrigger]);

  function getExerciseHistory() {
    const request = indexedDB.open("fitScouterDb", 1);

    request.onsuccess = function () {
      const db = request.result;

      const userEntryTransaction = db.transaction(
        "user-exercises-entries",
        "readonly"
      );

      const userEntryTransactionStore = userEntryTransaction.objectStore(
        "user-exercises-entries"
      );

      const exerciseNameIndex =
        userEntryTransactionStore.index("exercise_name");

      const range = IDBKeyRange.only(selectedExercise.name);

      const exercisesRequest = exerciseNameIndex.openCursor(range);
      const groupedExercises: { date: Date | string; exercises: Exercise[] }[] =
        [];
      exercisesRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          const exercise = cursor.value;
          const date = exercise.date.toDateString(); // Convert the date to a string for grouping

          // Find the group for the current date, or create a new group if it doesn't exist
          const group = groupedExercises.find((group) => group.date === date);
          if (group) {
            group.exercises.push(exercise);
          } else {
            groupedExercises.push({ date, exercises: [exercise] });
          }

          cursor.continue();
        } else {
          setExistingExercises(groupedExercises);
        }
      };

      exercisesRequest.onerror = function () {
        console.error("Error retrieving existing exercises");
      };

      userEntryTransaction.oncomplete = function () {
        db.close();
      };
    };

    request.onerror = function () {
      console.log("Error opening database");
    };
  }

  function handleViewCommentModalVisibility(exerciseId: number) {
    setExerciseCommentId(exerciseId);
    setOpenViewCommentModal(!openViewCommentModal);
  }

  function handleEditExerciseModalVisibility(exerciseId: number) {
    setExerciseCommentId(exerciseId);
    setOpenEditExerciseModal(!openEditExerciseModal);
  }

  if (existingExercises.length === 0) {
    return (
      <Box
        sx={{
          height: "calc(100vh - 144px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography variant="body1" align="center">
          No existing exercises found.
        </Typography>
      </Box>
    );
  }

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    
    const reversedIndex = existingExercises.length - 1 - index;
    const group = existingExercises[reversedIndex];
    
    return (
      <Box key={index} style={style}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "left",
            fontSize: "medium",
            paddingLeft: "1rem"
          }}
        >
          {group.date.toLocaleString()}
        </Typography>
        <Divider />

        {group.exercises.map((exercise, exerciseIndex) => (
          <Box
            key={exerciseIndex}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "center"
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr"
              }}
            >
              {exercise.comment ? ( // Check if 'comment' property exists
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() =>
                    handleViewCommentModalVisibility(exercise.id)
                  }
                >
                  <CommentIcon sx={{ zIndex: 0 }} />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  disabled // Placeholder element
                >
                  <CommentIcon style={{ opacity: 0 }} />
                </IconButton>
              )}

              {exercise.is_pr ? (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  disabled // Placeholder element
                >
                  <EmojiEventsIcon sx={{ zIndex: 0 }} />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  disabled // Placeholder element
                >
                  <EmojiEventsIcon sx={{ opacity: 0, zIndex: 0 }} />
                </IconButton>
              )}
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                justifyItems: "center",
                borderLeft: exercise.dropset ? "5px solid red" : "5px solid transparent"
              }}
              onClick={() =>
                handleEditExerciseModalVisibility(exercise.id)
              }
            >
              {exercise.weight !== 0 && (
                <Typography>
                  {`${exercise.weight.toFixed(2)} ${
                    unitsSystem === "metric" ? "kgs" : "lbs"
                  }`}
                </Typography>
              )}
              {exercise.reps !== 0 && (
                <Typography>{exercise.reps} reps</Typography>
              )}

              {exercise.distance !== 0 && (
                <Typography>{`${exercise.distance} ${exercise.distance_unit}`}</Typography>
              )}

              {exercise.time !== 0 && (
                <Typography>
                  {exercise.time !== 0 ? formatTime(exercise.time) : ""}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <ViewCommentModal
        openViewCommentModal={openViewCommentModal}
        setOpenViewCommentModal={setOpenViewCommentModal}
        exerciseCommentId={exerciseCommentId}
      />

      <EditExerciseModal
        openEditExerciseModal={openEditExerciseModal}
        setOpenEditExerciseModal={setOpenEditExerciseModal}
        exerciseCommentId={exerciseCommentId}
        selectedExercise={selectedExercise}
        weightIncrementPreference={weightIncrementPreference}
        setUpdateRenderTrigger={setUpdateRenderTrigger}
      />

      <Typography
        sx={{
          padding: {
            xs: "0.5rem", // Padding for extra small screens
            sm: "0.75rem", // Padding for small screens
            md: "1rem", // Padding for medium screens
            lg: "1.5rem" // Padding for large screens
          },
          textAlign: "center"
        }}
      >
        {selectedExercise.name.toLocaleUpperCase()}
      </Typography>
      <Divider sx={{ width: "100vw" }} />

      <Container
        sx={{
          width: "100vw",
          paddingBottom:"56px",
          height: "calc(100vh - 185px)",
        }}
      >
        <VariableSizeList
          height={window.innerHeight-185}
          itemCount={existingExercises.length}
          itemSize={index => {
            // Calculate the dynamic height for each item based on its content
            const group = existingExercises[existingExercises.length - 1 - index];
            const numExercises = group.exercises.length;
            const exerciseHeight = numExercises * 48; // Assuming each exercise takes 120px height
            return exerciseHeight +24; // Add some extra height for the group header
          }}
          width="100%"
        >
          {Row}
        </VariableSizeList>
      </Container>
    </Box>
  );
}

export default ExerciseSelectedHistory;
