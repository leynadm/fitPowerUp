import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import StarsIcon from "@mui/icons-material/Stars";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

// Create a styled component with rotation animation
const RotatingBox = styled(Box)({
  display: "inline-flex",
  animation: "rotate 2s linear infinite",

  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
});
/* 
const EllipsisTypography = styled(Typography)({
  "&::after": {
    content: '"."',
    animation: "ellipsis 1.5s infinite step-end",
  },

  "@keyframes ellipsis": {
    "0%": {
      content: '"..."',
    },
    "33%": {
      content: '"."',
    },
    "66%": {
      content: '".."',
    },
    "100%": {
      content: '"..."',
    },
  },
});
 */
function LoadingScreenDBZ() {
  return (
    <Box
      height="calc(100vh)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      bgcolor="neutral.main"      
    >
      <RotatingBox position="relative">
        <StarsIcon sx={{ color: "black",height:"3.5rem", width:"3.5rem" }}   />
      </RotatingBox>
      <Typography sx={{fontSize:"2rem",fontWeight:"normal",textAlign:"center",color:"black"}}>Gathering the <br/>dragon balls...</Typography>
    </Box>
  );
}

export default LoadingScreenDBZ;
