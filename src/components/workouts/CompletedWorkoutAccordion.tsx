import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Rating } from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DataBadge from "../../components/ui/DataBadge";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CommentIcon from "@mui/icons-material/Comment";
import ViewCommentModal from "../../components/ui/ViewCommentModal";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../context/Auth";
import DeleteCompletedWorkout from "../ui/DeleteCompletedWorkoutModal";
import {
  useContext,
  Dispatch,
  SetStateAction,
  MouseEvent,
  useState,
} from "react";
import ListItemText from "@mui/material/ListItemText";
import { IWorkoutData } from "../../utils/interfaces/IUserTrainingData";

interface ICompletedWorkoutAccordion {
  entry: IWorkoutData;
  filteredUserTrainingData: IWorkoutData[];
}

export function CompletedWorkoutAccordion({
  entry,
  filteredUserTrainingData,
}: ICompletedWorkoutAccordion) {
  const { currentUserData } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteCompletedWorkout, setOpenDeleteCompletedWorkout] =
    useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleOpenDeleteCompletedWorkout() {
    handleClose();
    setOpenDeleteCompletedWorkout(!openDeleteCompletedWorkout);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const workoutId = () => {
    if (filteredUserTrainingData.length > 0) {
      return filteredUserTrainingData[0].id;
    } else {
      return null;
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
        <Box>
        <DeleteCompletedWorkout
        setOpenDeleteCompletedWorkout={setOpenDeleteCompletedWorkout}
        openDeleteCompletedWorkout={openDeleteCompletedWorkout}
        workoutId={workoutId()}
      />
        </Box>


      <Accordion  sx={{ borderRadius: "4px", padding: 0,borderColor:"none" }} variant="outlined">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            margin: 0,
          }}
        >
          <Rating
            readOnly
            max={7}
            size="large"
            name="simple-controlled"
            sx={{ color: "#FFA500" }}
            value={entry.wEval.value}
            icon={<StarsIcon fontSize="inherit" />}
          />
        </AccordionSummary>
        <AccordionDetails sx={{ pb: 0, pt: 0 }}>
          <Typography color="text.secondary">
            "{entry.wEval.comment}"
          </Typography>
          <Box>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={entry.wEval.trainHarder} />}
                label="I trained harder than last time"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "text.secondary",
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox checked={entry.wEval.warmStretch} />}
                label="I stretched and warmed up properly"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "text.secondary",
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox checked={entry.wEval.feelPain} />}
                label="I didn't feel unusual or unwanted pain"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "text.secondary",
                  },
                }}
              />
            </FormGroup>
          </Box>
          <Box display="flex" justifyContent="space-around">
            <DataBadge dataValue={entry.power} dataLabel="PL" />
            <DataBadge dataValue={entry.stats.reps} dataLabel="reps" />
            <DataBadge dataValue={entry.stats.sets} dataLabel="sets" />
            <DataBadge
              dataValue={entry.stats.vol}
              dataLabel={
                currentUserData.unitsSystem === "metric" ? "kg" : "lbs"
              }
            />
          </Box>
          <Box width="100%" display="flex" flexDirection="row-reverse">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ p: 0 }}
            >
              <MoreHorizIcon sx={{ alignSelf: "flex-end" }} fontSize="small" />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  sx={{ p: 0, m: 0 }}
                  onClick={handleOpenDeleteCompletedWorkout}
                >
                  <DeleteForeverIcon
                    sx={{
                      zIndex: 0,
                    }}
                  />
                  <ListItemText>Delete workout</ListItemText>
                </IconButton>
              </MenuItem>
            </Menu>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
