import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Rating from "@mui/material/Rating";
interface FakeUserReviewProps{
    fakeUser:string;
    starsRating:number;
    avatarInitials:string;
    reviewText:string;
}
function FakeUserReviewCard({fakeUser,starsRating,avatarInitials,reviewText}:FakeUserReviewProps) {
  return (
    <Card sx={{ padding: 1,maxWidth:300 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar sx={{ width: 24, height: 24,bgcolor: deepPurple[500] }}>{avatarInitials}</Avatar>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          {fakeUser}
        </Typography>
        <Rating name="simple-controlled" value={starsRating} />
      </Stack>

      <Typography variant="subtitle2">{reviewText}</Typography>
    </Card>
  );
}

export default FakeUserReviewCard;
