import React, { useState, SetStateAction, Dispatch } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Progress from "../Progress/Progress";
import Friends from "../Friends/Friends";
import Workout from "../Workout/Workout";
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
import VerifyEmailDialog from "../../components/ui/VerifyEmailDialog";
import RestTimer from "../../components/ui/RestTimer";
import { SocialDataProvider } from "../../context/SocialData";
import { LogDataProvider } from "../../context/LogData";
import { UserTrainingDataProvider } from "../../context/UserTrainingData";
import { UserExercisesLibraryDataProvider } from "../../context/UserExercisesLibrary";
import { BodyTrackerDataProvider } from "../../context/BodyTrackerData";
import { UserFeatsDataProvider } from "../../context/UserFeatsData";
interface AppProps {
  sessionVerificationEmailCheck: boolean;
  setSessionVerificationEmailCheck: Dispatch<SetStateAction<boolean>>;
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
      <UserTrainingDataProvider>
        <UserExercisesLibraryDataProvider>
          <BodyTrackerDataProvider>
          <UserFeatsDataProvider>
            <LogDataProvider>
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
                  element={<Friends existingExercises={existingExercises} />}
                />

                <Route path="progress/*" element={<Progress />} />
              </Routes>
            </LogDataProvider>
            </UserFeatsDataProvider>
          </BodyTrackerDataProvider>
        </UserExercisesLibraryDataProvider>
      </UserTrainingDataProvider>
    </SocialDataProvider>
  );
}

export default Home;
