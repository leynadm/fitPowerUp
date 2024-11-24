import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress, Skeleton } from "@mui/material";
interface Mentor {
  mentorName: string;
  mentorDescription: string;
  mentorExercises: string[];
  mentorImg: string;
}

export default function MentorCard({ mentor }: { mentor: Mentor }) {
  const navigate = useNavigate();

  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      <Card sx={{ minWidth: 275 }} variant="outlined">
        <CardContent sx={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
          <Typography gutterBottom textAlign="center" variant="h5">
            {mentor.mentorName}
          </Typography>
          <Box
            maxHeight="512px"
            maxWidth="512px"
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <img
              src={mentor.mentorImg}
              onLoad={() => setImageLoaded(true)}
              alt={mentor.mentorName}
              style={{
                display: imageLoaded ? "block" : "none",
                width: "100%",
                height: "100%",
                borderRadius:"4px"
              }}
            />

            {!imageLoaded && (

                <Skeleton
                  sx={{ 
                    minHeight:"316px",
                    maxHeight:"512px",
                    minWidth:"100%",
                    maxWidth:"512px",
                    borderRadius: "4px",
                    }}
                />
  
            )}
          </Box>

          <Typography color="secondary" variant="body1">
            {mentor.mentorDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => navigate(mentor.mentorName.toLocaleLowerCase())}
            variant="outlined"
          >
            See Skill Tree
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
