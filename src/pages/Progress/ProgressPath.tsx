import React from "react";
import PathCarousel from "./PathCarousel";
import Container from '@mui/material/Container';

function ProgressPath(){

    return(
        <Container sx={{height:"100%"}}>
            <PathCarousel />
        </Container>
    )

}

export default ProgressPath