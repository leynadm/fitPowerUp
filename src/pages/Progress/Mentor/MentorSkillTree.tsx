import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
} from "beautiful-skill-tree";
import Button from '@mui/material/Button';
import { krillinSkillTree } from "../../../utils/progressFunctions/mentors/mentorsSkillTrees";
import { mentorSkillTreeThemes } from "./MentorSkillTreeThemes";
import {  useState } from "react";
import { ContextStorage } from "beautiful-skill-tree/dist/models";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { allMentorsSkillTreesWorkouts } from "../../../utils/progressFunctions/mentors/mentorsSkillTrees";
type SavedDataType = {
  [key: string]: {
    optional: boolean;
    nodeState: "selected" | "unlocked" | "locked";
  };
};



export default function MentorSkillTree() {
  
  const {id} = useParams()
  

  function handleMySave(
    storage: ContextStorage,
    treeId: string,
    skills: SavedDataType
  ) {
    console.log(treeId);
    console.log("Skills state on save:", skills);
    // Optional: Save to localStorage or your backend
    setStates({
      foundation: { optional: false, nodeState: "locked" },
    });

    skills["foundation"].nodeState = "selected";

    /*     if(skills['core-strength']){
      skills['core-strength'].nodeState = 'locked'
      skills['agility-master'].nodeState = 'selected'
  
    } */

    const updatedSkills: SavedDataType = Object.fromEntries(
      Object.entries(skills).map(([key, value]) => [
        key,

        { ...value, nodeState: "locked" },
      ])
    );
    console.log(updatedSkills);

    skills = updatedSkills;
  }

  const [states, setStates] = useState<SavedDataType>({
    foundation: { optional: false, nodeState: "locked" },
  });

  function handleNodeSelect(nodeId: any) {
    console.log(`Node clicked:`);
    console.log(nodeId);
  }

  const mentorSkillTreeData =
  id &&
  allMentorsSkillTreesWorkouts[id.toLocaleLowerCase() as keyof typeof allMentorsSkillTreesWorkouts]?.skillTree;

  if (!id || !mentorSkillTreeData) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error" variant="h6">
          Mentor not found.
        </Typography>
      </Box>
    );
  }

  return (
    <>
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          flexDirection="column"
          gap={2}
        >
          <Typography color="secondary" textAlign="center" variant="h5">
            Skill Tree
          </Typography>
          <Typography>{allMentorsSkillTreesWorkouts[id]["description"]}</Typography>
          <Box display="flex" width="100%" justifyContent="center" gap={2}>
            <Button variant="contained">Choose Mentor</Button>
          </Box>

          <SkillProvider>
            <SkillTreeGroup theme={mentorSkillTreeThemes["vegeta"]}>
              {() => (
                <SkillTree
                  collapsible={false}
                  treeId="my-new-tree-4"
                  title="my-new-tree-4"
                  data={
                    allMentorsSkillTreesWorkouts[id]["skillTree"]
                  }
                  savedData={states}
                  handleSave={handleMySave}
                  handleNodeSelect={handleNodeSelect}
                />
              )}
            </SkillTreeGroup>
          </SkillProvider>
        </Box>

    </>
  );
}
