import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import Box from "@mui/material/Box";
import PowerLevelSelect from "./PowerLevelSelect";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import calculateMax1RM from "../../utils/progressFunctions/calculateMax1RM";
import calculateDOTS from "../../utils/progressFunctions/calculateDOTS";
import { useSpring, animated } from "react-spring";
import savePowerLevelEntry from "../../utils/CRUDFunctions/savePowerLevelEntry";
import getLastPowerLevelEntry from "./getLastPowerLevelEntry";
import countUniqueEntriesByDate from "../../utils/progressFunctions/countUniqueEntriesByDate";
import { ReactComponent as StrengthIcon } from "../../assets/strength.svg";
import { ReactComponent as ExperienceIcon } from "../../assets/gym.svg";
import { ReactComponent as PowerLevelIcon } from "../../assets/powerlevel.svg";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../context/Auth";
import { db } from "../../config/firebase";
import GuestProfileModal from "../../components/ui/GuestProfileModal";
import SuccessfulProfilePowerUploadAlert from "../../components/ui/SuccessfulProfilePowerUploadAlert";
interface ProgressProps {
  powerLevel: number;
  setPowerLevel: Dispatch<SetStateAction<number>>;
  strengthPowerLevel: number;
  setStrengthPowerLevel: Dispatch<SetStateAction<number>>;
  experiencePowerLevel: number;
  setExperiencePowerLevel: Dispatch<SetStateAction<number>>;
}

interface PowerLevelNumberProps {
  n: number;
}

function PowerLevelNumber({ n }: PowerLevelNumberProps) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 0,
    /* 
    config: { mass: 1, tension: 100, friction: 25 },
     */
  });

  return (
    <animated.div style={{ fontSize: "4rem", color: "black" }}>
      {number.to((n) => n.toFixed(0))}
    </animated.div>
  );
}

function SecondaryPowerLevelNumber({ n }: PowerLevelNumberProps) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 50,
    /* 
    config: { mass: 1, tension: 100, friction: 25 },
     */
  });

  return (
    <animated.div style={{ fontSize: "2rem", color: "black" }}>
      {number.to((n) => n.toFixed(0))}
    </animated.div>
  );
}

function ProgressLevel({
  powerLevel,
  setPowerLevel,
  strengthPowerLevel,
  setStrengthPowerLevel,
  experiencePowerLevel,
  setExperiencePowerLevel,
}: ProgressProps) {
  const [weight, setWeight] = useState(0);
  const [firstExerciseSelected, setFirstExerciseSelected] = useState<any>(null);
  const [secondExerciseSelected, setSecondExerciseSelected] =
    useState<any>(null);
  const [thirdExerciseSelected, setThirdExerciseSelected] = useState<any>(null);
  const { currentUser,currentUserData, setCurrentUserData } = useContext(AuthContext);
  const [guestProfileModalOpen, setGuestProfileModalOpen] = useState(false);
  const [profileUploadAlert, setProfileUploadAlert] = useState(false);
  const [alertTimeoutId, setAlertTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );

  function calculatePowerLevel() {
    console.log(
      { firstExerciseSelected },
      { secondExerciseSelected },
      { thirdExerciseSelected }
    );

    if (
      firstExerciseSelected !== null &&
      secondExerciseSelected !== null &&
      thirdExerciseSelected !== null &&
      weight !== 0
    ) {
      const firstExercisePromise = calculateMax1RM(
        firstExerciseSelected,
        "All"
      );
      const secondExercisePromise = calculateMax1RM(
        secondExerciseSelected,
        "All"
      );
      const thirdExercisePromise = calculateMax1RM(
        thirdExerciseSelected,
        "All"
      );

      Promise.all([
        firstExercisePromise,
        secondExercisePromise,
        thirdExercisePromise,
      ])
        .then(([firstExercise, secondExercise, thirdExercise]) => {
          const total: number = firstExercise + secondExercise + thirdExercise;
          const finalNumber = calculateDOTS(weight, total, false);

          countUniqueEntriesByDate()
            .then((count: number) => {
              const finalPowerLevel = finalNumber + count;
              setPowerLevel(finalPowerLevel);
              setStrengthPowerLevel(finalNumber);
              setExperiencePowerLevel(count);
              const currentDate = new Date();
              currentDate.setHours(0, 0, 0, 0);
              savePowerLevelEntry(
                finalPowerLevel,
                weight,
                firstExerciseSelected,
                secondExerciseSelected,
                thirdExerciseSelected,
                currentDate,
                finalNumber,
                count
              );
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
    }
  }

  const uploadPowerLevelToProfile = async (powerLevelData: any) => {
    if (currentUser.isAnonymous === true) {
      setGuestProfileModalOpen(true);
      return;
    }

    const docRef = doc(db, "users", currentUser.uid);

    await updateDoc(docRef, powerLevelData);
  };

  const handleUploadToProfile = async () => {
    const count = await countUniqueEntriesByDate();

    const powerLevelData = {
      powerLevel: strengthPowerLevel + count,
      weight: weight,
      firstPowerExercise: firstExerciseSelected,
      secondPowerExercise: secondExerciseSelected,
      thirdPowerExercise: thirdExerciseSelected,
      strengthLevel: strengthPowerLevel,
      experienceLevel: count,
    };

    await uploadPowerLevelToProfile(powerLevelData);
    showSuccessfulAlert();

    const updateCurrentUserData = () => {
      // Create a copy of the current user data
      const updatedUserData = { ...currentUserData };
      console.log('checking the value of the initial currentUserData:')
      console.log({currentUserData})
      // Modify the desired properties
      updatedUserData.powerLevel = strengthPowerLevel+count;
      updatedUserData.strengthLevel = strengthPowerLevel;
      updatedUserData.experienceLevel = count
      // Add more modifications as needed
      
      console.log('checking the value AFTER Update:')
      console.log({updatedUserData})
      
      // Update the state with the modified user data
      setCurrentUserData(updatedUserData);
    };

    updateCurrentUserData()
  };




  function showSuccessfulAlert() {
    setProfileUploadAlert(true);

    // Clear previous timeout if it exists
    if (alertTimeoutId) {
      clearTimeout(alertTimeoutId);
    }

    // Set new timeout to hide the alert after 2 seconds
    const timeoutId = setTimeout(() => {
      setProfileUploadAlert(false);
    }, 3000);

    setAlertTimeoutId(timeoutId);
    return;
  }

  useEffect(() => {
    getLastPowerLevelEntry()
      .then((lastEntry: any) => {
        if (lastEntry) {
          // Handle the last entry
          setPowerLevel(lastEntry.score);
          setFirstExerciseSelected(
            lastEntry.first !== undefined || null ? lastEntry.first : "Deadlift"
          );
          setSecondExerciseSelected(
            lastEntry.second !== undefined || null
              ? lastEntry.second
              : "Barbell Squat"
          );
          setThirdExerciseSelected(
            lastEntry.third !== undefined || null
              ? lastEntry.third
              : "Flat Barbell Bench Press"
          );
          setPowerLevel(lastEntry.score);
          setWeight(lastEntry.bodyweight);
          setStrengthPowerLevel(lastEntry.strength);
          setExperiencePowerLevel(lastEntry.experience);
        } else {
          // No entries found
          console.log("No entries found");
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        paddingBottom: "56px",
      }}
    >
      <GuestProfileModal
        guestProfileModalOpen={guestProfileModalOpen}
        setGuestProfileModalOpen={setGuestProfileModalOpen}
      />

      <SuccessfulProfilePowerUploadAlert
        profileUploadAlert={profileUploadAlert}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <PowerLevelIcon width="3.5rem" height="3.5rem" />
          <PowerLevelNumber n={powerLevel} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <SecondaryPowerLevelNumber n={strengthPowerLevel} />
            <StrengthIcon width="2rem" height="2rem" />
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <SecondaryPowerLevelNumber n={experiencePowerLevel} />
            <ExperienceIcon width="2rem" height="2rem" />
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <TextField
          type="number"
          id="outlined-basic"
          label="Add your weight"
          value={weight}
          variant="filled"
          sx={{
            marginTop: "8px",
            marginBottom: "8px",
            textAlign: "center",
            width: "100%",
          }}
          onChange={(e) => setWeight(parseInt(e.target.value))}
        />
        <PowerLevelSelect
          exerciseSelected={firstExerciseSelected}
          setSelectedExercise={setFirstExerciseSelected}
        />
        <PowerLevelSelect
          exerciseSelected={secondExerciseSelected}
          setSelectedExercise={setSecondExerciseSelected}
        />
        <PowerLevelSelect
          exerciseSelected={thirdExerciseSelected}
          setSelectedExercise={setThirdExerciseSelected}
        />
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ width: "100%", marginTop: "8px", marginBottom: "8px" }}
          onClick={calculatePowerLevel}
          color="success"
        >
          Calculate Power Level
        </Button>

        <Button
          variant="contained"
          sx={{ width: "100%", marginTop: "8px", marginBottom: "8px" }}
          onClick={handleUploadToProfile}
        >
          Upload to profile
        </Button>
      </Box>
    </Container>
  );
}

export default ProgressLevel;
