import Container from "@mui/material/Container";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserTrainingDataContext } from "../../context/UserTrainingData";


interface Props{
    handleLeftArrowClick:()=>void
    handleRightArrowClick:()=>void
}

export function CompletedWorkoutNavArrows({handleLeftArrowClick,handleRightArrowClick}:Props){

    const { dateForWorkout } = useContext(
        UserTrainingDataContext
      );

    return(
        <Container
        maxWidth="md"
        className="ThisIsTheWrappingContainerForTheFuncitionalDateBar"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          flexGrow: 1,
        }}
      >
        <IconButton aria-label="left arrow" onClick={handleLeftArrowClick}>
          <KeyboardArrowLeftIcon
            sx={{
              color: "black",
              fontSize: "2rem",
              backgroundColor: "#FFA500",
              borderRadius: "4px",
            }}
          />
        </IconButton>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            /* 
            background:"radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(204,136,10,1) 100%)", 
             */
            padding: 0,
            fontSize: "1.25rem",
            fontWeight: "500",
          }}
          disableRipple
          disableFocusRipple
          disableTouchRipple
          disableElevation
        >
          {dateForWorkout}
        </Button>

        <IconButton aria-label="left arrow" onClick={handleRightArrowClick}>
          <KeyboardArrowRightIcon
            sx={{
              color: "black",
              fontSize: "2rem",
              backgroundColor: "#FFA500",
              borderRadius: "4px",
            }}
          />
        </IconButton>
      </Container>
    )
}