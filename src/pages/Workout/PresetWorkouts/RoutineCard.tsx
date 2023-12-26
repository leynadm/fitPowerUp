import { IPresetWorkoutGroup } from "./PresetWorkoutsOverview";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
interface RoutineCardProps {
  routineName: string;
  groupData: IPresetWorkoutGroup;
}

function RoutineCard({ routineName, groupData }: RoutineCardProps) {
  const encodedParameter = encodeURIComponent(routineName);
  const navigate = useNavigate();
  
  return (
    <Card elevation={4} sx={{ backgroundColor: "#fafafa" }}>
      <CardContent sx={{ pt: 0 }}>
        <Typography
          align="center"
          color="text.secondary"
          variant="h6"
          gutterBottom
        >
          {routineName.toLocaleUpperCase()}
        </Typography>
        <Typography
          variant="subtitle2"
          p={0}
          m={0}
          align="right"
          component="div"
        >
          by {groupData.details.routineBy}
        </Typography>

        <TextField
          id="outlined-read-only-input"
          label="Description"
          defaultValue={groupData.details.routineDescription}
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
          onClick={() => navigate(`preset-routine-details/${encodedParameter}`)}
        >
          Go To Routine
        </Button>
        {groupData.details.routineLinkReference !== "" && (
          <Button
            size="small"
            component="a"
            target="_blank"
            href={groupData.details.routineLinkReference}
          >
            Go To Source
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default RoutineCard;
