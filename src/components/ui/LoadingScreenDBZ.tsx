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
      height="calc(100vh - 112px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <RotatingBox position="relative">
        <StarsIcon sx={{ color: "#FFA500" }} fontSize="large" />
      </RotatingBox>
      <Typography>Gathering the dragon balls...</Typography>
    </Box>
  );
}

export default LoadingScreenDBZ;
