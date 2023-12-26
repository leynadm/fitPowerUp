import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import ViewCommentModal from "../../components/ui/ViewCommentModal";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import Container from "@mui/material/Container";
import { VariableSizeList } from "react-window";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserTrainingDataContext } from "../../context/UserTrainingData";
import { AuthContext } from "../../context/Auth";
import getCompletedExercisesHistory from "../../utils/firebaseDataFunctions/getCompletedExercisesHistory";
function ExerciseSelectedHistory() {
  const [openViewCommentModal, setOpenViewCommentModal] = useState(false);
  const [exerciseComment, setExerciseComment] = useState("");
  const { exerciseName } = useParams();
  const { userTrainingData } = useContext(UserTrainingDataContext);
  const { currentUserData } = useContext(AuthContext);

  const exerciseHistoryArr = getCompletedExercisesHistory(
    userTrainingData,
    exerciseName
  );

  function handleViewCommentModalVisibility(
    exerciseComment: string | undefined
  ) {
    if (exerciseComment !== undefined) {
      setExerciseComment(exerciseComment);
      setOpenViewCommentModal(true);
    }
  }

  if (exerciseHistoryArr === undefined || exerciseHistoryArr.length === 0) {
    return (
      <Box
        sx={{
          height: "calc(100vh - 144px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" align="center">
          No data for this exercise.
        </Typography>
      </Box>
    );
  }

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const group = exerciseHistoryArr[index];

    return (
      <Box key={index} style={style} className="exercise-complete">
        <Typography
          variant="h6"
          sx={{
            textAlign: "left",
            fontSize: "medium",
            paddingLeft: "1rem",
            backgroundColor: "orange",
            borderRadius: "5px",
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
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {exercise.comment ? ( // Check if 'comment' property exists
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() =>
                    handleViewCommentModalVisibility(exercise.comment)
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
                borderLeft: exercise.dropset
                  ? "5px solid red"
                  : "5px solid transparent",
              }}
            >
              {exercise.weight !== 0 && (
                <Typography>
                  {`${exercise.weight.toFixed(2)} ${
                    currentUserData.unitsSystem === "metric" ? "kg" : "lbs"
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

        <Box
          display="flex"
          justifyContent="space-around"
          flexDirection="row-reverse"
        >
          <Typography variant="subtitle2">
            {group.stats.totalReps !== 0 && `${group.stats.totalReps} reps`}
          </Typography>

          {group.stats.totalVolume !== 0 && (
            <Typography variant="subtitle2">
              {group.stats.totalVolume !== 0 &&
                `${group.stats.totalVolume} ${
                  currentUserData.unitsSystem === "metric" ? "kg" : "lbs"
                }`}
            </Typography>
          )}
          {group.stats.totalDistance !== 0 && (
            <Typography variant="subtitle2">
              {group.stats.totalDistance !== 0 &&
                `Distance: ${group.stats.totalDistance}`}
            </Typography>
          )}
          {group.stats.totalTime !== 0 && (
            <Typography variant="subtitle2">
              {group.stats.totalTime !== 0 &&
                `Time: ${formatTime(group.stats.totalTime)}`}
            </Typography>
          )}
          <Typography variant="subtitle2">
            {group.stats.totalSets !== 0 && group.stats.totalSets} sets
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Container sx={{}} maxWidth="md">
      <ViewCommentModal
        openViewCommentModal={openViewCommentModal}
        setOpenViewCommentModal={setOpenViewCommentModal}
        exerciseComment={exerciseComment}
      />

      <Typography
        sx={{
          padding: {
            xs: "0.25rem", // Padding for extra small screens
            sm: "0.5rem", // Padding for small screens
            md: "0.75rem", // Padding for medium screens
            lg: "1.25rem", // Padding for large screens
          },
          textAlign: "center",
        }}
        variant="h6"
      >
        {exerciseName && exerciseName.toLocaleUpperCase()}
      </Typography>
      <Divider />

      <VariableSizeList
        height={window.innerHeight - 190}
        itemCount={exerciseHistoryArr.length}
        itemSize={(index) => {
          const group = exerciseHistoryArr[index];
          const numExercises = group.exercises.length;
          const exerciseHeight = numExercises * 48;
          return exerciseHeight + 56;
        }}
        width="100%"
      >
        {Row}
      </VariableSizeList>
    </Container>
  );
}

export default ExerciseSelectedHistory;
