import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from "@mui/material/IconButton";
import { useCallback } from "react";

interface ParentProps {
  exerciseName: string;
  exerciseIcon: string;
  handleTileClick:(exerciseName:string)=>void;
}

function ExerciseSelectionTile({ exerciseName, exerciseIcon,handleTileClick }: ParentProps) {
  
  const handleClick = useCallback(() => {
    handleTileClick(exerciseName);
  }, [handleTileClick, exerciseName]);

    return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        borderRadius: "5px",
        paddingTop: "16px",
        paddingBottom: "16px",
        paddingLeft: "4px",
        paddingRight: "4px",
        width: "10rem",
        minWidth: "10rem",
      }}
      onClick={handleClick}
    >
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        //onClick={getOnlyFavorites}
        sx={{display:"flex",justifyContent:"flex-end",padding:0}}
      >
        <MoreHorizIcon
          sx={{
            color: true ? "orange" : "white",  
        }}
        />{" "}
      </IconButton>

      <Typography align="center" variant="subtitle1" height="3rem">
        {exerciseName}
      </Typography>
      <Box display="flex" justifyContent="center">
        <img
          alt=""
          src={exerciseIcon}
          style={{
            width: "8rem",
            minWidth: "8rem",
            minHeight: "8rem",
            height: "8rem",
            paddingTop: "8px",
          }}
        ></img>
      </Box>
      <Typography variant="overline" textAlign="center">
        What
      </Typography>
    </Box>
  );
}

export default ExerciseSelectionTile;
