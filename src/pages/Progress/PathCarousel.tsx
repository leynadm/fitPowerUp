import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import { getApp } from "firebase/app";
import { Paper, Button } from "@mui/material";

function PathCarousel(props: any) {
  const firebaseApp = getApp();
  const postsStorage = getStorage(firebaseApp, "gs://fitpowerup-2bbc8-posts");

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

  function handleNextClick() {
    const imageIndexToSearch =
      props.powerLevelImageMatchArr[props.imageIndex + 1];
    props.setCurrentImagePowerLevel(
      props.powerLevelImageMatchArr[props.imageIndex + 1]
    );
    props.setImageIndex(props.imageIndex + 1);
    props.setNextImagePowerLevel(
      props.powerLevelImageMatchArr[props.imageIndex + 2]
    );
    getPowerLevelImagePerIndex(imageIndexToSearch);
  }

  function handlePrevClick() {
    const imageIndexToSearch =
      props.powerLevelImageMatchArr[props.imageIndex - 1];
    props.setImageIndex(props.imageIndex - 1);
    props.setCurrentImagePowerLevel(
      props.powerLevelImageMatchArr[props.imageIndex - 1]
    );
    props.setNextImagePowerLevel(
      props.powerLevelImageMatchArr[props.imageIndex - 2]
    );
    getPowerLevelImagePerIndex(imageIndexToSearch);
  }

  return (
    <Carousel
      next={handleNextClick}
      prev={handlePrevClick}
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{paddingTop:"16px",paddingBottom:"16px"}}>
        <Typography sx={{ fontSize: "1.25rem", padding: "0.25rem" }}>
          Your Power Level: {props.powerLevel}
        </Typography>
        </Box>
        {props.powerLevel > props.currentImagePowerLevel ? (
          <CardMedia
            component="img"
            image={props.imageMatched}
            alt="level hero"
            sx={{ objectFit: "contain", 
            width: "100%", 
          justifySelf:"center",
            alignSelf:"center",
            animation: "fade-in 0.5s ease-in-out" // Apply the animation
           }}
          />
        ) : (
          <CardMedia
            component="img"
            image={props.imageMatched}
            alt="level hero"
            sx={{
              objectFit: "contain",
              width: "100%",
              height: "80%",
              filter: "blur(3px) grayscale(100%)",
              opacity: "25%",
              animation: "fade-in 0.5s ease-in-out", // Apply the animation
            }}
          />
        )}

        <Box sx={{  }}>
          <Typography sx={{ fontSize: "1.25rem" }}>
            Warrior Power Level: {props.currentImagePowerLevel}
          </Typography>
        </Box>
      </Box>
    </Carousel>
  );
}

export default PathCarousel;
