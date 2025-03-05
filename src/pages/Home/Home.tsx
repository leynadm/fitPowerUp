import React, { useState, useContext } from "react";
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
import { UserChallengesDataProvider } from "../../context/UserChallenges";
import { SkillTreeDataProvider } from "../../context/SkillTreeData";
import { Box } from "@mui/material";
function Home() {
  const [existingExercises, setExistingExercises] = useState<
    { name: string; exercises: Exercise[] }[]
  >([]);

  const { currentUser } = useContext(AuthContext);

  const [verifyEmailModalOpen, setVerifyEmailModalOpen] = useState(
    currentUser.emailVerified ? false : true
  );

  return (
    <UserTrainingDataProvider>
      <PresetWorkoutsDataProvider>
        <UserFeatsDataProvider>
          <UserExercisesLibraryDataProvider>
            <BodyTrackerDataProvider>
              <LogDataProvider>
                <FriendsSummaryProvider>
                  <SocialDataProvider>
                    <UserChallengesDataProvider>
                      <SkillTreeDataProvider>
                      <VerifyEmailDialog
                        verifyEmailModalOpen={verifyEmailModalOpen}
                        setVerifyEmailModalOpen={setVerifyEmailModalOpen}
                      />
                      <RestTimer />
                      <Navbar />
                      <Box
                        position="fixed"
                        top="56px"
                        bottom="56px"
                        overflow="auto"
                        width="100%"
                        className="XXXX---BOOXXnowbox"
                        paddingBottom={1}
                      >
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
                      </Box>
                      </SkillTreeDataProvider>
                    </UserChallengesDataProvider>
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
