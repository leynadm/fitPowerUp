import { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { doc, getDocs, collection } from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import toast from "react-hot-toast";
import { SkillNode } from "../pages/Progress/Mentor/SkillTree/SkillTree";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export type MentorData = {
  skillTree: SkillNode;
  description: string;
  id:string
};

type SkillTreesStructure = Record<string, MentorData>;

export const useSkillTreeData = () => {
  const { currentUser } = useContext(AuthContext);

  // State for skill tree structure and user progress
  const [skillTreesStructure, setSkillTreesStructure] = useState<SkillTreesStructure>({});
  const [userSkillTreeProgress, setUserSkillTreeProgress] = useState<
    Record<string, MentorData>
  >({});

  const fetchSkillTreesStructure = async () => {
    if (!currentUser) return;

    const skillTreesStructureRef = ref(
      storage,
      "assets/files/skillTreesStructure.json"
    );

    try {
      const skillTreesStructureURL = await getDownloadURL(skillTreesStructureRef);
      const response = await fetch(skillTreesStructureURL);
      const parsedJSON = await response.json();
      setSkillTreesStructure(parsedJSON);
      return parsedJSON; // Return data if needed elsewhere
    } catch (error) {
      console.error("Error fetching skill tree structure:", error);
      toast.error("Failed to fetch skill tree structure.");
    }
  };

  const fetchUserSkillTreesProgress = async () => {
    if (!currentUser) return;

    try {
      const usersDocRef = doc(db, "users", currentUser.uid);
      const userSkillTreesProgressColRef = collection(
        usersDocRef,
        "userSkillTreesProgress"
      );

      const querySnapshot = await getDocs(userSkillTreesProgressColRef);

      const progressData: Record<string, MentorData> = {};

      // Build progress data
      querySnapshot.forEach((doc) => {
        const data = doc.data() as MentorData;
        progressData[doc.id] = data; // Use the document ID as the key
      });

      setUserSkillTreeProgress(progressData); // Update state
    } catch (error) {
      console.error("Error fetching user skill tree progress:", error);
      toast.error("Failed to fetch user skill tree progress.");
    }
  };

  // Fetch data when `currentUser` changes
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        await fetchSkillTreesStructure();
        await fetchUserSkillTreesProgress();
        console.log('just fetched useSkillTreeData')
      }
    };
    fetchData();
  }, [currentUser]);

  // Return data and refetch functions
  return {
    skillTreesStructure,
    userSkillTreeProgress,
    refetchSkillTreesStructure: fetchSkillTreesStructure,
    refetchUserSkillTreesProgress: fetchUserSkillTreesProgress,
  };
};
