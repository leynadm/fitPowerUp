import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import { IWorkoutData } from "../../utils/interfaces/IUserTrainingData";
import { Box } from "@mui/system";
import { Button, Rating } from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import ExerciseCompletedStatTile from "../../components/ui/ExerciseCompletedStatTile";
interface IEndOfWorkoutQuotes {
  quote: string;
  imageURL: string;
  character: string;
}

function WorkoutCongratulations() {
  const workoutData: IWorkoutData = useLocation().state.workoutData;
  const { currentUserData } = useContext(AuthContext);

  const endOfWorkoutQuotes: IEndOfWorkoutQuotes[] = [
    {
      quote: "Don't stop until you're proud, like Vegeta!",
      character: "- Son Goku",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FGOKU_10.jpg?alt=media&token=a26055f7-de4c-46df-8547-8ffde17d5e6e&_gl=1*iu86n9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0NzUyLjEzLjAuMA..",
    },
    {
      quote:
        "The only person you're competing with is yesterday's you (unlike Vegeta)!",
      character: "- Son Goku",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FGOKU_07.jpg?alt=media&token=cc92bde1-64cf-4258-ba34-c3dd8a96e3d6&_gl=1*1rvk3x1*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0Nzc0LjYwLjAuMA..",
    },
    {
      quote:
        "Great job, soon you'll be stronger than Vegeta, faster than Burter and smarter than Goku!",
      character: "- Piccolo",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FPICCOLO_12.jpg?alt=media&token=313927f1-cd6b-4654-a122-a0eda945be18&_gl=1*1f4beso*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0Nzg3LjQ3LjAuMA..",
    },
    {
      quote:
        "You can't be Mr. Satan, so just keep being you - and secretly wish you were Mr. Satan!",
      character: "- Mr. Satan",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FSATAN_14.jpg?alt=media&token=42008990-72ea-4d39-b73f-e1e468514c70&_gl=1*237hy8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0ODExLjIzLjAuMA..",
    },

    {
      quote: "Your body can do more than your mind thinks it can.",
      character: "- Son Goku",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FGOKU_01.jpg?alt=media&token=51732ca4-564c-40dc-8e17-580e6c79b332&_gl=1*nsekmb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI1MDA2LjYwLjAuMA..",
    },
    {
      quote:
        "You shouldn't be tired now, you should be done. Now go take a good shower, I can feel the stink from here!",
      character: "- Piccolo",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FPICCOLO_12.jpg?alt=media&token=313927f1-cd6b-4654-a122-a0eda945be18&_gl=1*1f4beso*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0Nzg3LjQ3LjAuMA..",
    },
    {
      quote: "Don't stop until you reach your limit, and then go beyond it!",
      character: "- Vegeta",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FVEGETA_09.jpg?alt=media&token=a10d9890-410f-41d8-807a-1f254be9d8a0&_gl=1*1aqtnwy*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0OTQ0LjYwLjAuMA..",
    },
    {
      quote: "The best way to predict the future is to create it.",
      character: "- Trunks",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FTRUNKS_14.jpg?alt=media&token=f06a363e-3c31-4db9-b404-60540c426e5c&_gl=1*1xgglzc*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI2MTA3LjUzLjAuMA..",
    },
    {
      quote: "If you can dream it, you can do it.",
      character: "-Son Goku",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FGOKU_03.jpg?alt=media&token=da9336ee-9cce-4c1b-bbe1-592060973f07&_gl=1*8vb1py*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI1MDI2LjQwLjAuMA..",
    },
    {
      quote:
        "Even the strongest warriors can fall, but the truly great warriors always get back up.",
      character: "- Piccolo",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FPICCOLO_12.jpg?alt=media&token=313927f1-cd6b-4654-a122-a0eda945be18&_gl=1*1f4beso*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0Nzg3LjQ3LjAuMA..",
    },
    {
      quote: "The only way to protect what you love is to become stronger.",
      character: "- Son Goku",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FGOKU_11.jpg?alt=media&token=f36084d6-ea4e-4317-ade0-48aa778abeb9&_gl=1*11rontw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI1MDkxLjYwLjAuMA..",
    },
    {
      quote:
        "You don't have to be a Super Saiyan to be a hero. Striving to be the best you can be is worth far more than you think.",
      character: "- Gohan",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FGOHAN_13.jpg?alt=media&token=d1fb559c-fb00-4b04-a22f-5934b6def2c0&_gl=1*12rkoty*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI1MTQ3LjQuMC4w",
    },
    {
      quote:
        "Don't let your past define you. You're stronger than you think you are.",
      character: "- Piccolo",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FPICCOLO_12.jpg?alt=media&token=313927f1-cd6b-4654-a122-a0eda945be18&_gl=1*1f4beso*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0Nzg3LjQ3LjAuMA..",
    },
    {
      quote:
        "Perfection is a lie. The only way to truly grow is to try and be better than you were yesterday.",
      character: "- Son Goku",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FGOKU_02.jpg?alt=media&token=3cd23393-9725-4e26-9444-1ff99dd9fea2&_gl=1*zy4nvw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI1MTk4LjYwLjAuMA..",
    },
    {
      quote:
        "Train hard, eat right, and never give up. That's how you become a Super Saiyan! And even if you won't, at least you'll get in really good shape!",
      character: "- Son Goku",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FGOKU_07.jpg?alt=media&token=cc92bde1-64cf-4258-ba34-c3dd8a96e3d6&_gl=1*ujmqpd*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI1MjY2LjYwLjAuMA..",
    },
    {
      quote:
        "Even the smallest of gains can make a big difference in the long run. Just keep going, one step at a time.",
      character: "- Piccolo",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FPICCOLO_12.jpg?alt=media&token=313927f1-cd6b-4654-a122-a0eda945be18&_gl=1*1f4beso*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0Nzg3LjQ3LjAuMA..",
    },
    {
      quote:
        "Don't let anyone tell you that you can't do it. You're stronger than you think.",
      character: "- Piccolo",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FPICCOLO_12.jpg?alt=media&token=313927f1-cd6b-4654-a122-a0eda945be18&_gl=1*1f4beso*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0Nzg3LjQ3LjAuMA..",
    },
    {
      quote:
        "Even if you make mistakes, just keep trying. Everyone falls down sometimes, but the important thing is to get back up.",
      character: "- Son Goku",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FGOKU_10.jpg?alt=media&token=a26055f7-de4c-46df-8547-8ffde17d5e6e&_gl=1*g922pn*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI1NjAzLjYwLjAuMA..",
    },
    {
      quote:
        "If you want to be better than yesterday, you have to be willing to train harder than you did before.",
      character: "- Vegeta",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FVEGETA_04.jpg?alt=media&token=50c478e4-21ba-427e-99df-15cddce4c4f9&_gl=1*nua3k7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI1MzgyLjE1LjAuMA..",
    },
    {
      quote:
        "A strong body is a healthy body, and that's something worth striving for.",
      character: "- Son Goku",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FGOKU_02.jpg?alt=media&token=3cd23393-9725-4e26-9444-1ff99dd9fea2&_gl=1*gryeoa*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI1NDExLjYwLjAuMA..",
    },
    {
      quote:
        "It's not always about how much weight you lift or how many reps you do. It's about training with purpose and focus.",
      character: "- Vegeta",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FVEGETA_09.jpg?alt=media&token=a10d9890-410f-41d8-807a-1f254be9d8a0&_gl=1*17koei9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI1OTM0LjYwLjAuMA..",
    },
    {
      quote:
        "Don't be afraid to fail. Failure is just a stepping stone to success. At least when it comes to muscle building...",
      character: "- Son Goku",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FGOKU_08.jpg?alt=media&token=eecc3e60-6adf-4c33-aa87-74dc1fe7aef8&_gl=1*fgbsol*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI1MzM3LjYwLjAuMA..",
    },
    {
      quote:
        "Even the smallest of progress is progress. Celebrate your successes, big or small.",
      character: "- Piccolo",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FPICCOLO_12.jpg?alt=media&token=313927f1-cd6b-4654-a122-a0eda945be18&_gl=1*1f4beso*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0Nzg3LjQ3LjAuMA..",
    },
    {
      quote:
        "Don't be afraid to experiment and find new ways to train. There are multiple ways to do it!",
      character: "- Piccolo",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FPICCOLO_12.jpg?alt=media&token=313927f1-cd6b-4654-a122-a0eda945be18&_gl=1*1f4beso*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0Nzg3LjQ3LjAuMA..",
    },
    {
      quote:
        "If Goku can still improve, so can you. Don't forget that and keep pushing!",
      character: "- Piccolo",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fquotes-images%2FPICCOLO_12.jpg?alt=media&token=313927f1-cd6b-4654-a122-a0eda945be18&_gl=1*1f4beso*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODYyNDAxNy4xMTAuMS4xNjk4NjI0Nzg3LjQ3LjAuMA..",
    },
  ];

  let randomQuote = getRandomQuote();
  function getRandomQuote() {
    let maxQuoteNumber = endOfWorkoutQuotes.length;

    let quoteNumber = Math.floor(Math.random() * maxQuoteNumber);

    return quoteNumber;
  }
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "grid",
        placeItems: "center",
        paddingBottom: "72px",
        top: 0,
        left: 0,

        gap: 1,
        overflow: "scroll",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>Workout complete!</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={endOfWorkoutQuotes[randomQuote].imageURL}
          alt=""
          style={{
            width: "auto",
            height: "10rem",
            borderRadius: "50%",
            minHeight: "10rem",
          }}
          loading="lazy"
        ></img>

        <p style={{ textAlign: "center" }}>
          "{endOfWorkoutQuotes[randomQuote].quote}"
        </p>
        <p style={{ textAlign: "right", width: "100%" }}>
          {endOfWorkoutQuotes[randomQuote].character}
        </p>
      </div>

      <Rating
        readOnly
        max={7}
        size="large"
        name="simple-controlled"
        value={workoutData.wEval.value}
        icon={<StarsIcon fontSize="inherit" />}
        sx={{ paddingBottom: "8px", color: "#FFA500" }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          width: "100%",
        }}
      >
        <ExerciseCompletedStatTile
          statName="Session Power Level"
          statValue={workoutData.power}
          statDetail="PL"
          statColor="#520975"
          statTextColor="white"
          statIcon={null}
        />
        <ExerciseCompletedStatTile
          statName="Workout Reps"
          statValue={workoutData.stats.reps}
          statDetail="reps"
          statColor="#520975"
          statTextColor="white"
          statIcon={null}
        />
        <ExerciseCompletedStatTile
          statName="Workout Sets"
          statValue={workoutData.stats.sets}
          statDetail="sets"
          statColor="#520975"
          statTextColor="white"
          statIcon={null}
        />
        <ExerciseCompletedStatTile
          statName="Workout Volume"
          statValue={workoutData.stats.vol}
          statDetail={currentUserData.unitsSystem === "metric" ? "kg" : "lbs"}
          statColor="#520975"
          statTextColor="white"
          statIcon={null}
        />
      </Box>

      <TextField
        variant="filled"
        id="outlined-multiline-flexible"
        label="Your workout comment"
        multiline
        maxRows={4}
        minRows={2}
        sx={{
          width: "100%",
        }}
        InputProps={{
          readOnly: true,
        }}
        value={workoutData.wEval.comment}
      />

      <Box>
        <FormControlLabel
          control={<Switch />}
          label="Did you train better than the last time?"
          checked={workoutData.wEval.trainHarder}
        />
        <FormControlLabel
          control={<Switch />}
          label="Did you warm up/stretch properly?"
          checked={workoutData.wEval.warmStretch}
        />
        <FormControlLabel
          control={<Switch />}
          label="Did you exerience any discomfort?"
          checked={workoutData.wEval.feelPain}
        />
      </Box>
      {/* 
        <Button variant="dbz_mini">Share workout on your profile</Button>
     */}
    </Container>
  );
}

export default WorkoutCongratulations;
