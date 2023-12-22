import React, {
  useContext,
  useRef,
  useState
} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FixedSizeList } from "react-window";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import PercentIcon from "@mui/icons-material/Percent";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { AuthContext } from "../../context/Auth";
import { BodyTrackerDataContext } from "../../context/BodyTrackerData";
import { IUserBodyTrackerDataEntry } from "../../utils/interfaces/IBodyTracker";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
import BodyKPIIndicatorLeft from "../../components/ui/BodyKPIIndicatorLeft";
import BodyKPIIndicatorRight from "../../components/ui/BodyKPIIndicatorRight";
function BodyTrackerHistory() {
  const { userBodyTrackerData } = useContext(BodyTrackerDataContext);
  const { currentUserData } = useContext(AuthContext);

  const userBodyTrackerDataArr = userBodyTrackerData;

  const imgRef = useRef<HTMLImageElement>(null);

  const itemSize =()=>{
    if(window.innerWidth<=400){
      return 435
    } else if(window.innerWidth>400 && window.innerWidth<=600){
      return 475 
    } else {
      return 550
    }
  } 


  if (userBodyTrackerDataArr.length > 0) {
    userBodyTrackerDataArr.sort(
      (a: IUserBodyTrackerDataEntry, b: IUserBodyTrackerDataEntry) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB.getTime() - dateA.getTime();
      }
    );
  }

  const isMale = currentUserData.sex === "male" ? true : false;

  const muscleIndicatorsValues = {
    neck: {
      left: isMale ? 22 : 22,
      top: isMale ? 18 : 20,
      lineWidth: isMale ? 20 : 32,
    },

    rightBicep: {
      left: isMale ? 18 : 18,
      top: isMale ? 32 : 32,
      lineWidth: isMale ? 22 : 32,
    },
    rightForearm: {
      left: isMale ? 15 : 15,
      top: isMale ? 43 : 43,
      lineWidth: isMale ? 25 : 32,
    },

    rightThigh: {
      left: isMale ? 15 : 15,
      top: isMale ? 54 : 58,
      lineWidth: isMale ? 32 : 32,
    },

    rightCalf: {
      left: isMale ? 15 : 15,
      top: isMale ? 72 : 72,
      lineWidth: isMale ? 25 : 32,
    },

    waist: {
      left: isMale ? 1 : 1,
      top: isMale ? 37 : 37,
      lineWidth: isMale ? 122 : 122,
    },

    hips: {
      left: isMale ? 55 : 55,
      top: isMale ? 45 : 50,
      lineWidth: isMale ? 90 : 95,
    },

    leftCalf: {
      left: isMale ? 60 : 60,
      top: isMale ? 72 : 72,
      lineWidth: isMale ? 32 : 32,
    },

    leftThigh: {
      left: isMale ? 60 : 60,
      top: isMale ? 54 : 58,
      lineWidth: isMale ? 32 : 32,
    },

    leftForearm: {
      left: isMale ? 62 : 60,
      top: isMale ? 40 : 43,
      lineWidth: isMale ? 32 : 32,
    },
    leftBicep: {
      left: isMale ? 61 : 61,
      top: isMale ? 31 : 32,
      lineWidth: isMale ? 70 : 85,
    },
    shoulders: {
      left: isMale ? 60 : 60,
      top: isMale ? 25 : 26,
      lineWidth: isMale ? 32 : 32,
    },
  };
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const userBodyTrackerEntry = userBodyTrackerDataArr[index];

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    

    return (
      <Box style={style}>
        <Box
          width="100%"
          gap={1}
          display="flex"
          flexDirection="column"
          boxShadow={2}
          borderRadius="4px"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="subtitle1" paddingLeft="8px">
            {userBodyTrackerEntry.date}
          </Typography>

          <Box
            display="flex"
            width="100%"
            justifyContent="space-around"
            alignItems="center"
          >
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <MonitorWeightIcon fontSize="medium" />
              <Typography>
                {userBodyTrackerEntry.weight}{" "}
                {currentUserData.unitsSystem === "metric" ? "kgs" : "lbs"}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <PercentIcon fontSize="medium" />
              <Typography>{userBodyTrackerEntry.bodyFat}</Typography>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <RestaurantIcon fontSize="medium" />
              <Typography>{userBodyTrackerEntry.caloricIntake} cal</Typography>
            </div>
          </Box>

          <div
            style={{
              position: "relative",
              display: "block",
              maxWidth: "400px",
              height: "100%",
            }}
          >

              <img
                src={
                  currentUserData.sex === "male"
                    ? "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fchart-images%2Fmale-saiyan-chart.jpg?alt=media&token=6c6ce10d-d02b-4546-8137-6ea9d54b3114"
                    : "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fchart-images%2Ffemale-saiyan-chart-white-background-512.jpg?alt=media&token=1c30cdf3-1137-464a-98e8-cbe2f52f72fa"
                }
                alt=""
                height="100%"
                width="100%"
                ref={imgRef}
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  position: "relative",
                }}
                onLoad={() => setIsImageLoaded(true)}
              ></img>

            {
              isImageLoaded &&

              <>
              <BodyKPIIndicatorLeft
              KPIValue={userBodyTrackerEntry.neck}
              leftPosition={muscleIndicatorsValues.neck.left}
              topPosition={muscleIndicatorsValues.neck.top}
              indicatorLineWidth={muscleIndicatorsValues.neck.lineWidth}
              bodyPart="Neck"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
            <BodyKPIIndicatorLeft
              KPIValue={userBodyTrackerEntry.rightBicep}
              leftPosition={muscleIndicatorsValues.rightBicep.left}
              topPosition={muscleIndicatorsValues.rightBicep.top}
              indicatorLineWidth={muscleIndicatorsValues.rightBicep.lineWidth}
              bodyPart="Right Bicep"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
            <BodyKPIIndicatorLeft
              KPIValue={userBodyTrackerEntry.rightForearm}
              leftPosition={muscleIndicatorsValues.rightForearm.left}
              topPosition={muscleIndicatorsValues.rightForearm.top}
              indicatorLineWidth={muscleIndicatorsValues.rightForearm.lineWidth}
              bodyPart="Right Forearm"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
            <BodyKPIIndicatorLeft
              KPIValue={userBodyTrackerEntry.rightThigh}
              leftPosition={muscleIndicatorsValues.rightThigh.left}
              topPosition={muscleIndicatorsValues.rightThigh.top}
              indicatorLineWidth={muscleIndicatorsValues.rightThigh.lineWidth}
              bodyPart="Right Thigh"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
            <BodyKPIIndicatorLeft
              KPIValue={userBodyTrackerEntry.rightCalf}
              leftPosition={muscleIndicatorsValues.rightCalf.left}
              topPosition={muscleIndicatorsValues.rightCalf.top}
              indicatorLineWidth={muscleIndicatorsValues.rightCalf.lineWidth}
              bodyPart="Right Calf"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
            <BodyKPIIndicatorLeft
              KPIValue={userBodyTrackerEntry.waist}
              leftPosition={muscleIndicatorsValues.waist.left}
              topPosition={muscleIndicatorsValues.waist.top}
              indicatorLineWidth={muscleIndicatorsValues.waist.lineWidth}
              bodyPart="Waist"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
            <BodyKPIIndicatorRight
              KPIValue={userBodyTrackerEntry.hips}
              leftPosition={muscleIndicatorsValues.hips.left}
              topPosition={muscleIndicatorsValues.hips.top}
              indicatorLineWidth={muscleIndicatorsValues.hips.lineWidth}
              bodyPart="Hips"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
            <BodyKPIIndicatorRight
              KPIValue={userBodyTrackerEntry.leftCalf}
              leftPosition={muscleIndicatorsValues.leftCalf.left}
              topPosition={muscleIndicatorsValues.leftCalf.top}
              indicatorLineWidth={muscleIndicatorsValues.leftCalf.lineWidth}
              bodyPart="Left Calf"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
            <BodyKPIIndicatorRight
              KPIValue={userBodyTrackerEntry.leftThigh}
              leftPosition={muscleIndicatorsValues.leftThigh.left}
              topPosition={muscleIndicatorsValues.leftThigh.top}
              indicatorLineWidth={muscleIndicatorsValues.leftThigh.lineWidth}
              bodyPart="Left Thigh"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
            <BodyKPIIndicatorRight
              KPIValue={userBodyTrackerEntry.leftForearm}
              leftPosition={muscleIndicatorsValues.leftForearm.left}
              topPosition={muscleIndicatorsValues.leftForearm.top}
              indicatorLineWidth={muscleIndicatorsValues.leftForearm.lineWidth}
              bodyPart="Left Forearm"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
            <BodyKPIIndicatorRight
              KPIValue={userBodyTrackerEntry.leftBicep}
              leftPosition={muscleIndicatorsValues.leftBicep.left}
              topPosition={muscleIndicatorsValues.leftBicep.top}
              indicatorLineWidth={muscleIndicatorsValues.leftBicep.lineWidth}
              bodyPart="Left Bicep"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
            <BodyKPIIndicatorRight
              KPIValue={userBodyTrackerEntry.shoulders}
              leftPosition={muscleIndicatorsValues.shoulders.left}
              topPosition={muscleIndicatorsValues.shoulders.top}
              indicatorLineWidth={muscleIndicatorsValues.shoulders.lineWidth}
              bodyPart="Shoulders"
              unitsSystem={
                currentUserData.unitsSystem === "metric" ? "cm" : "in"
              }
            />
</>
            }
            
            
          </div>
        </Box>
      </Box>
    );
  };

  if (userBodyTrackerDataArr.length === 0) {
    return (
      <LoadingScreenCircle text="Searching for Senzu Beans, Krillin needs a few..." />
    );
  }

  return (
    <Container maxWidth="md">
      <FixedSizeList
        height={window.innerHeight - 150}
        itemCount={userBodyTrackerDataArr.length}
        itemSize={itemSize()}
        width="100%"
      >
        {Row}
      </FixedSizeList>
    </Container>
  );
}

export default BodyTrackerHistory;
