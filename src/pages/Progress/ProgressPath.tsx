import { FixedSizeList } from "react-window";
import Typography from "@mui/material/Typography";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import pathPoints from "../../utils/pathPoints";
import LockIcon from '@mui/icons-material/Lock';
function ProgressPath() {
  const { currentUserData } = useContext(AuthContext);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const rowStyle: React.CSSProperties = {
      ...style,
      display: "grid",
      gridTemplateRows: "1fr 1fr",
      width: "100%",
      gap: "8px",
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingTop: "16px",
    };
    const pathPointsEntry = pathPoints[index];
    const originalPathPointsEntry =
      index > 0 ? pathPoints[index - 1] : pathPoints[0];

    const subsequentPathPointsEntry = pathPoints[index + 1];

    const MIN = pathPointsEntry;
    const MAX = subsequentPathPointsEntry;
    const normalise = (value: number) =>
      ((value - MIN.bracket) * 100) / (MAX.bracket - MIN.bracket);

    
      
    const isUnlocked = 
      currentUserData.powerLevel > pathPointsEntry.bracket
    

    const isWithinRange =
      currentUserData.powerLevel >= MIN.bracket &&
      currentUserData.powerLevel <= MAX.bracket;
    console.log(isWithinRange);

    return (
      <Box style={rowStyle} boxShadow={2} borderRadius="4px">
        <Box
          display="flex"
          gap={3}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            paddingTop: "8px",
            borderRadius: "4px",
          }}
        >

          {isUnlocked?(
            <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            {currentUserData.powerLevel > pathPointsEntry.bracket && (
              <CheckCircleIcon fontSize="large" sx={{ color: "#FFA500" }} />
            )}


            <Typography variant="button">
              YOU NEED:{" "}
              +{subsequentPathPointsEntry.bracket - currentUserData.powerLevel} PL
            </Typography>


              {isWithinRange&&
              
              <LinearProgress
                sx={{ width: "100%" }}
                variant="determinate"
                value={normalise(currentUserData.powerLevel)}
              />
            }

          </Box>
          ):(
            <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            paddingLeft="32px"
            paddingRight="32px"
            >

            <LockIcon fontSize="large"/>
            <Typography variant="button">LOCKED</Typography>
            </Box>
          )}

          

          <button
            style={{
              width: "142px",
              height: "142px",
              color: "#fff",
              background: "none",
              border: "none",
              borderRadius: "50%",
              position: "relative",
              zIndex: 0,
              transition: ".3s",
              cursor: "pointer",

              boxShadow: "0 0 0 1px #666",
            }}
          >
            <img
              src={pathPointsEntry.img}
              alt=""
              width="100%"
              height="100%"
              style={{
                height: "128px", // Adjusted height to match the button's height
                width: "128px", // Adjusted width to match the button's width
                borderRadius: "50%",
                backgroundColor: "white",
                filter: isUnlocked ? "none" : "blur(6px)", // Apply blur effect if not within range
              }}
            />
            <span
              style={{
                position: "absolute",
                inset: "-6px",
                padding: "10px",
                borderRadius: "50%",
                background:
                  "conic-gradient(#520975, #FFA500 30deg 120deg, #FFA500 150deg 180deg, #520975 210deg 300deg, #520975 330deg)",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "intersect",
                transition: ".5s, 99999s 99999s transform",
                transform: "rotate(36000deg)",
              }}
            ></span>
          </button>
        </Box>
      </Box>
    );
  };

  return (
    <>
      {/* <Typography align="center" variant="subtitle2" boxShadow={1} borderRadius="4px">Follow your progress path with the Dragon Ball Z Heroes</Typography>
       */}
      <FixedSizeList
        height={window.innerHeight - 150}
        itemCount={pathPoints.length}
        itemSize={180}
        width="100%"
      >
        {Row}
      </FixedSizeList>
    </>
  );
}

export default ProgressPath;
