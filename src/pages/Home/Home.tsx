import React, { useState, useEffect, useContext,SetStateAction,Dispatch } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Progress from "../Progress/Progress";
import Friends from "../Friends/Friends";
import Workout from "../Workout/Workout";
import Box from "@mui/material/Box";
import Exercise from "../../utils/interfaces/Exercise";
import VerifyEmailDialog from "../../components/ui/VerifyEmailDialog";
import { AuthContext } from "../../context/Auth";
import RestTimer from "../../components/ui/RestTimer";
import { SocialDataProvider } from "../../context/SocialData";
import { LogDataProvider } from "../../context/LogData";
import { TrainingDataProvider } from "../../context/TrainingData";

interface AppProps {
  sessionVerificationEmailCheck: boolean;
  setSessionVerificationEmailCheck: Dispatch<
    SetStateAction<boolean>
  >;
}

function Home({
  sessionVerificationEmailCheck,
  setSessionVerificationEmailCheck,
}: AppProps) {
  const [existingExercises, setExistingExercises] = useState<
    { name: string; exercises: Exercise[] }[]
  >([]);
  
  const [verifyEmailModalOpen, setVerifyEmailModalOpen] = useState(false);

  return (
    <SocialDataProvider>
      <TrainingDataProvider>
        <LogDataProvider>
          <Box
            sx={{
              height: "calc(100vh - 56px)",
            }}
          >
            <VerifyEmailDialog
              verifyEmailModalOpen={verifyEmailModalOpen}
              setVerifyEmailModalOpen={setVerifyEmailModalOpen}
            />

            <RestTimer />

            <Navbar />

            <Routes>
              <Route
                path="workout/*"
                index
                element={
                  <Workout
                    existingExercises={existingExercises}
                    setExistingExercises={setExistingExercises}
                  />
                }
              />

              <Route
                path="friends/*"
                element={
                  <Friends
                    existingExercises={existingExercises}
                  />
                }
              />
              <Route path="progress/*" element={<Progress />} />
            </Routes>
          </Box>
        </LogDataProvider>
      </TrainingDataProvider>
    </SocialDataProvider>
  );
}

export default Home;
