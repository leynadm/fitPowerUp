import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from '@mui/material/Box';
import CardMedia from "@mui/material/CardMedia";

function PathCarousel(props: any) {
  useEffect(() => {
    console.log("logging props in carousel:");
    console.log(props);
  }, [props]);

  return (
    <Carousel
    next={() => {
        /* Do stuff */
      }}
      prev={() => {
        /* Do other stuff */
      }}
      sx={{ width: "100%", height: "100%",justifyContent:"center",alignItems:"center" }}
      PrevIcon={<KeyboardArrowLeftIcon />}
      NextIcon={<KeyboardArrowRightIcon />}
      fullHeightHover={true}
      navButtonsAlwaysVisible={true}
      animation="slide"
      autoPlay={false}
    >
      
      <Box sx={{width:"100%",height:"100vh",paddingBottom:"56px", display:"flex", justifyContent:"center",alignItems:"center"}}>
      <CardMedia
        component="img"
        image={props.imageMatched}
        alt="Paella dish"
        sx={{ objectFit: "contain", width: "100%", height: "100%" }}
      /> 
      </Box>
    </Carousel>
  );
}

function Item(props: any) {
  return (
    <Paper sx={{ width: "100%", height: "100%" }}>
      <img src={props} alt="matched power" />
    </Paper>
  );
}

export default PathCarousel;
