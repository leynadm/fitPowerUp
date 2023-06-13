import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PowerLevelSelect from "./PowerLevelSelect";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

function ProgressLevel(){

    return(
        <Container sx={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
             <Typography sx={{fontSize:"5rem", textAlign:"center"}}>
                0
             </Typography>

            <PowerLevelSelect/>
            <PowerLevelSelect/>
            <PowerLevelSelect/>

            <Button
                variant="contained"
                sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
              >
                Calculate Power Level
              </Button>
        </Container>
    )

}

export default ProgressLevel