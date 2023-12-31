import React, { useState, SetStateAction, Dispatch, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Progress from "../Progress/Progress";
import Friends from "../Friends/Friends";
import Workout from "../Workout/Workout";
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
import VerifyEmailDialog from "../../components/ui/VerifyEmailDialog";
import RestTimer from "../../components/ui/RestTimer";
import { LogDataProvider } from "../../context/LogData";
import { UserTrainingDataProvider } from "../../context/UserTrainingData";
import { UserExercisesLibraryDataProvider } from "../../context/UserExercisesLibrary";
import { BodyTrackerDataProvider } from "../../context/BodyTrackerData";
import { UserFeatsDataProvider } from "../../context/UserFeatsData";
import { FriendsSummaryProvider } from "../../context/FriendsSummary";
import { SocialDataProvider } from "../../context/SocialData";
import { PresetWorkoutsDataProvider } from "../../context/UserPresetWorkouts";
import { AuthContext } from "../../context/Auth";
import { auth } from "../../config/firebase";
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

  const {currentUser} = useContext(AuthContext)
  console.log(currentUser.emailVerified)
  const [verifyEmailModalOpen, setVerifyEmailModalOpen] = useState(currentUser.emailVerified?false:true);

  return (
    <UserTrainingDataProvider>
      <PresetWorkoutsDataProvider>
        <UserFeatsDataProvider>
          <UserExercisesLibraryDataProvider>
            <BodyTrackerDataProvider>
              <LogDataProvider>
                <FriendsSummaryProvider>
                  <SocialDataProvider>
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

                      <Route path="friends/*" element={<Friends />} />

                      <Route path="progress/*" element={<Progress />} />
                    </Routes>
                  </SocialDataProvider>
                </FriendsSummaryProvider>
              </LogDataProvider>
            </BodyTrackerDataProvider>
          </UserExercisesLibraryDataProvider>
        </UserFeatsDataProvider>
      </PresetWorkoutsDataProvider>
    </UserTrainingDataProvider>
  );
}

export default Home;
