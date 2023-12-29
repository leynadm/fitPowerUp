import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface BrowserTileInterface {
  firstImageLink: string;
  secondImageLink: string;
  thirdImageLink: string;
  browser: string;
}

function BrowserTile({
  firstImageLink,
  secondImageLink,
  thirdImageLink,
  browser,
}: BrowserTileInterface) {
  const [activeStep, setActiveStep] = useState("first-step");
  /* 

  const handleClick = (step: string) => {
    setActiveStep(step);
  }; */

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if(newAlignment!==null){
        setActiveStep(newAlignment);
    }

  };

  return (
    <>
      <Box className="feature text-center is-revealing" display="flex" flexDirection="column" gap={1}>
        <Typography align="center" variant="subtitle1">
          {browser}
        </Typography>
        <Box
          className="feature-inner"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              height: "auto",
              minHeight:"402px",
              minWidth:"200px",
              width: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {activeStep === "first-step" && (
              <img
                style={{ height: "100%", width: "100%" }}
                src={firstImageLink}
                alt="First Step"
              />
            )}
            {activeStep === "second-step" && (
              <img
                style={{ height: "100%", width: "100%" }}
                src={secondImageLink}
                alt="Second Step"
              />
            )}
            {activeStep === "third-step" && (
              <img
                style={{ height: "100%", width: "100%" }}
                src={thirdImageLink}
                alt="Third Step"
              />
            )}
          </Box>
        </Box>
        <ToggleButtonGroup
          value={activeStep}
          exclusive
          onChange={handleClick}
          aria-label="text alignment"
          sx={{display:"flex", justifyContent:"center",alignItems:"center"}}
        >
          <ToggleButton value="first-step" aria-label="left aligned">
            Step 1
          </ToggleButton>
          <ToggleButton value="second-step" aria-label="centered">
            Step 2
          </ToggleButton>
          <ToggleButton value="third-step" aria-label="right aligned">
            Step 3
          </ToggleButton>
        </ToggleButtonGroup>
        </Box>


    </>
  );
}

export default BrowserTile;
