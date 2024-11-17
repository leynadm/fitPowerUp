import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
interface Mentor {
  mentorName: string;
  mentorDescription: string;
  mentorExercises: string[];
  mentorImg: string;
}

export default function MentorCard({ mentor }: { mentor: Mentor }) {
  const navigate = useNavigate();

  return (
    <>
      <Card sx={{ minWidth: 275 }} variant="outlined">
        <CardContent>
          <Typography gutterBottom textAlign="center" variant="h5">
            {mentor.mentorName}
          </Typography>
          <Box maxHeight="512px" maxWidth="512px">
            <img src={mentor.mentorImg} alt="" width="100%" height="100%" />
          </Box>

          <Typography color="secondary" variant="body1">
            {mentor.mentorDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => navigate(mentor.mentorName)}
            variant="outlined"
          >
            See Skill Tree
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
