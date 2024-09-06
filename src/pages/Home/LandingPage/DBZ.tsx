import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import OneStar from "../../../assets/1-star.svg";
import TwoStar from "../../../assets/2-star.svg"
import ThreeStar from "../../../assets/3-star.svg"
import FourStar from "../../../assets/4-star.svg"
import FiveStar from "../../../assets/5-star.svg"
import SixStar from "../../../assets/6-star.svg"
import SevenStar from "../../../assets/7-star.svg"

export const DBZ = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on medium and up
        gridTemplateColumns:{md: "1.5fr 1fr"},
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: {xs:2,md:20},
        background:
          "radial-gradient(circle, rgba(17,41,89,1) -12%, rgba(0,0,0,1) 90%)",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position:"relative",
          display:"flex",
          flexDirection:"column",
          gap:2,
          padding: {
            xs: 2,
            md: 20,
          },
          height: "100%",
        }}
        
      >
     {/*    <img
        alt=""
        src={OneStar}
        width={64}
        height={64}
        style={{
          position:"absolute",
          opacity:"75%",
          left:"50%",
          top:"0%"
        }}
        />
        <img
        alt=""
        src={TwoStar}
        width={64}
        height={64}
        style={{
          position:"absolute",
          opacity:"75%",
          left:"70%",
          top:"8%"
        }}
        />

                <img
        alt=""
        src={ThreeStar}
        width={64}
        height={64}
        style={{
          position:"absolute",
          opacity:"75%",
          left:"80%",
          top:"25%"
        }}
        />
                <img
        alt=""
        src={FourStar}
        width={64}
        height={64}
        style={{
          position:"absolute",
          opacity:"75%"
        }}
        />
                <img
        alt=""
        src={FiveStar}
        width={64}
        height={64}
        style={{
          position:"absolute",
          opacity:"75%"
        }}
        />
                <img
        alt=""
        src={SixStar}
        width={64}
        height={64}
        style={{
          position:"absolute",
          opacity:"75%"
        }}
        />
                <img
        alt=""
        src={SevenStar}
        width={64}
        height={64}
        style={{
          position:"absolute",
          opacity:"75%"
        }}
        /> */}
        
        <Typography fontSize={32} color="white">
          100% FREE
        </Typography>
        <Typography fontSize={48} color="#FFA500">
          Get fit & power up!
        </Typography>
        <Typography fontSize={24} fontWeight={700} variant="secondary" color="#FFA500">
          The #1 DBZ fan-made fitness app!          
        </Typography>
        <Typography variant="secondary" fontSize={24} fontWeight={700} color="#FFA500">
          Join a community of fitness
          enthusiasts and Dragon Ball Z fans, and train like never before!
        </Typography>
        <Box>
        <Button onClick={() => navigate("/login")} variant="dbz">
          Get Started
        </Button>
        </Box>        
      </Box>
      <Box
        sx={{
          position: "relative", // Position relative for the pseudo-element
          display: "inline-block", // Ensures the pseudo-element stays within this Box
          "&:before": {
            content: '""', // Required to display the pseudo-element
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Example: a dark overlay
            borderRadius: "50px 0 0 50px", // Match the border radius of the image
            zIndex: 1,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          },
        }}
      >
        <img
          src="/images/son-goku.jpeg"
          alt=""
          height="100%"
          width="100%"
          style={{
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            maxWidth: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
};
