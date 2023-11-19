import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TrainingDataContext } from "../../context/TrainingData";
import { IUserBodyTrackerDataEntry } from "../../context/TrainingData";
import { FixedSizeList } from "react-window";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import PercentIcon from "@mui/icons-material/Percent";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { AuthContext } from "../../context/Auth";
import NoAvailableDataBox from "../../components/ui/NoAvailableDataBox";
function BodyTrackerHistory() {
  const { userBodyTrackerData } = useContext(TrainingDataContext);
  const { currentUserData } = useContext(AuthContext);

  const userBodyTrackerDataArr = userBodyTrackerData[0].bodyTrackerData;

  if(userBodyTrackerDataArr.length>0){
    userBodyTrackerDataArr.sort(
      (a: IUserBodyTrackerDataEntry, b: IUserBodyTrackerDataEntry) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
  
        return dateB.getTime() - dateA.getTime();
      }
    );
  }
  

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const userBodyTrackerEntry = userBodyTrackerDataArr[index];

    return (
      <>
        <Box gap={2}>
          <Typography variant="subtitle1" paddingLeft="8px">
            {userBodyTrackerEntry.date}
          </Typography>

          <Accordion sx={{ margin: "8px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box display="flex" width="100%" justifyContent="space-between">
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
                  <Typography>
                    {userBodyTrackerEntry.caloricIntake} cal
                  </Typography>
                </div>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="grid" gridTemplateColumns="1fr 1fr">
                <Typography>
                  Neck: {userBodyTrackerEntry.neck}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
                <Typography>
                  Shoulders: {userBodyTrackerEntry.shoulders}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
                <Typography>
                  Chest: {userBodyTrackerEntry.chest}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
                <Typography>
                  Waist: {userBodyTrackerEntry.waist}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
                <Typography>
                  Left Bicep: {userBodyTrackerEntry.leftBicep}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
                <Typography>
                  Right Bicep: {userBodyTrackerEntry.rightBicep}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
                <Typography>
                  Left Forearm: {userBodyTrackerEntry.leftForearm}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
                <Typography>
                  Right Forearm: {userBodyTrackerEntry.rightForearm}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
                <Typography>
                  Left Thigh: {userBodyTrackerEntry.leftThigh}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
                <Typography>
                  Right Thigh: {userBodyTrackerEntry.rightThigh}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
                <Typography>
                  Left Calf: {userBodyTrackerEntry.leftCalf}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
                <Typography>
                  Right Calf: {userBodyTrackerEntry.rightCalf}{" "}
                  {/* {currentUserData.unitsSystem === "metric" ? "cm" : "in"} */}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </>
    );
  };

  if (userBodyTrackerDataArr.length === 0) {
    return (
      <Box
        display="flex"
        minHeight="500px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <NoAvailableDataBox />
      </Box>
    );
  }

  return (
    <>
      <Container maxWidth="md">
        <FixedSizeList
          height={window.innerHeight - 190}
          itemCount={userBodyTrackerDataArr.length}
          itemSize={50}
          width="100%"
        >
          {Row}
        </FixedSizeList>
      </Container>
    </>
  );
}

export default BodyTrackerHistory;
