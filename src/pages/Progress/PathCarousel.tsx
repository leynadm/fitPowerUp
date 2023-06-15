import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import { getApp } from "firebase/app";

function PathCarousel(props: any) {
  const firebaseApp = getApp();
  const postsStorage = getStorage(firebaseApp, "gs://fitpowerup-2bbc8-posts");

  useEffect(() => {
  }, [props]);

  async function getPowerLevelImagePerIndex(index: number) {
    const matchedImageRef = ref(postsStorage, `level/${index}_1024x1024.png`);

    try {
      const matchedImageURL = await getDownloadURL(matchedImageRef);
      console.log(matchedImageURL);
      props.setImageMatched(matchedImageURL);
    } catch (error) {
      // Handle the error here
    }
  }
  return (
    <Carousel
      next={() => {
        const imageIndexToSearch =
          props.powerLevelImageMatchArr[props.imageIndex + 1];

        props.setImageIndex(props.imageIndex + 1);
        getPowerLevelImagePerIndex(imageIndexToSearch);
      }}
      prev={() => {
        const imageIndexToSearch =
          props.powerLevelImageMatchArr[props.imageIndex - 11];
        props.setImageIndex(props.imageIndex - 1);
        getPowerLevelImagePerIndex(imageIndexToSearch);
      }}
      sx={{ width: "100%", height: "100%" }}
      PrevIcon={<KeyboardArrowLeftIcon />}
      NextIcon={<KeyboardArrowRightIcon />}
      fullHeightHover={true}
      navButtonsAlwaysVisible={true}
      animation="slide"
      autoPlay={false}
    >
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          paddingBottom: "56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.25rem" }}>
          Power Level: {props.powerLevel}
        </Typography>
        <Typography sx={{ fontSize: "1rem" }}>
          {props.powerLevel} points left until next level
        </Typography>
        
          <CardMedia
            component="img"
            image={props.imageMatched}
            alt="Paella dish"
            sx={{ objectFit: "contain", width: "100%", height: "100%",filter:"blur(3px)" }}
          />
        
      </Box>
    </Carousel>
  );
}

export default PathCarousel;
