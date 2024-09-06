import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import { AuthContext } from "../../context/Auth";
import { useContext, useState } from "react";
import ViewCommentModal from "../ui/ViewCommentModal";
import { Card } from "@mui/material";

interface IWorkoutSetCardProps {
  exercise: { name: string; exercises: Exercise[] };
  index: number;
   handleExerciseSelect: () => void; 
}

export function WorkoutSetCard({
  exercise,
  index,
   handleExerciseSelect 
}: IWorkoutSetCardProps) {
  const { currentUserData } = useContext(AuthContext);

  const [openViewCommentModal, setOpenViewCommentModal] = useState(false);
  const [exerciseComment, setExerciseComment] = useState<string | undefined>("");

  return (
    <Card
      key={index}
variant="outlined"
      sx={{
        borderRadius: "4px",

      }}
    >
      <ViewCommentModal
        openViewCommentModal={openViewCommentModal}
        setOpenViewCommentModal={setOpenViewCommentModal}
        exerciseComment={exerciseComment}
      />

      <Button
        sx={{
          textAlign: "center",
          fontSize: "large",
          background: "#FFA500",
          color: "black",
          width: "100%",
          padding: 0,
        }}
         onClick={handleExerciseSelect} 
      >
        {exercise.name.toLocaleUpperCase()}
      </Button>

      {exercise.exercises.map((exercise: Exercise, exerciseIndex: number) => (
        <Box
          key={exerciseIndex}
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridTemplateColumns: "1fr 1fr 4fr",
            justifyContent: "space-evenly",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          {exercise.comment ? (
            <IconButton
              size="large"
              aria-label="view comment"
              aria-controls="menu-appbar"
              aria-haspopup="true"
               onClick={() =>
                handleViewCommentModalVisibility(
                  exercise.comment,
                  setExerciseComment,
                  setOpenViewCommentModal,
                  openViewCommentModal
                )
              } 
            >
              <CommentIcon sx={{ zIndex: 0 }} />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              aria-label="no comment"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              disabled
            >
              <CommentIcon style={{ opacity: 0 }} />
            </IconButton>
          )}

          {exercise.is_pr ? (
            <IconButton
              size="large"
              aria-label="personal record"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              disabled
            >
              <EmojiEventsIcon sx={{ zIndex: -1, color: "#520975" }} />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              aria-label="no personal record"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              disabled
            >
              <EmojiEventsIcon sx={{ opacity: 0, zIndex: 0 }} />
            </IconButton>
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(auto, 1fr))",
              alignItems: "center",
              justifyItems: "center",
              width: "100%",
              justifyContent: "space-evenly",
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
              <Typography>
                {exercise.reps}
                {exercise.amrap && "+"} reps
              </Typography>
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
    </Card>
  );
}

type SetExerciseCommentType = (comment: string) => void;
type SetOpenViewCommentModalType = (open: boolean) => void;

export function handleViewCommentModalVisibility(
  exerciseComment: string | undefined,
  setExerciseComment: SetExerciseCommentType,
  setOpenViewCommentModal: SetOpenViewCommentModalType,
  openViewCommentModal: boolean
) {
  if (exerciseComment) {
    setExerciseComment(exerciseComment);
    setOpenViewCommentModal(!openViewCommentModal);
  }
}

export default handleViewCommentModalVisibility;
